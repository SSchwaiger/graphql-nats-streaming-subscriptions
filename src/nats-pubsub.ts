import { Stan, Subscription, SubscriptionOptions } from "node-nats-streaming";
import { PubSubEngine } from "graphql-subscriptions";
import { PubSubAsyncIterator } from "./pubsub-async-iterator";

export class NatsPubSub implements PubSubEngine {
  private nats: Stan;
  private subscriptions: Subscription[];
  private messageParser: Function;
  private subscriptionOptions: SubscriptionOptions;

  constructor(stan: Stan, messageParser: Function = null, subscriptionOptions: SubscriptionOptions = null) {
    this.nats = stan;
    this.subscriptions = [];
    this.messageParser = messageParser;
    this.subscriptionOptions = subscriptionOptions !== null ? subscriptionOptions : this.nats.subscriptionOptions();
  }

  public async publish(subject: string, payload: any): Promise<void> {
    await this.nats.publish(subject, JSON.stringify(payload));
  }

  public async subscribe(subject: string, onMessage: Function, options: any): Promise<number> {
    if(options.setStartAtSequence) {
      this.subscriptionOptions.setStartAtSequence(options.setStartAtSequence);
    }

    const subscription: Subscription = await this.nats.subscribe(subject, this.subscriptionOptions);
    subscription.on("message", msg => {
      var data: any = JSON.parse(msg.getData());
      if (this.messageParser) {
        data = this.messageParser(data);
      }
      onMessage({ data, msg });
    });
    this.subscriptions.push(subscription);
    return Promise.resolve(this.subscriptions.length);
  }

  public unsubscribe(sid: number): void {
    const subscription: Subscription = this.subscriptions[sid];
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  public asyncIterator<T>(subjects: string | string[]): AsyncIterator<T> {
    return new PubSubAsyncIterator<T>(this, subjects, 0);
  }

  public asyncIterator2<T>(subjects: string | string[], setStartAtSequence: number): AsyncIterator<T> {
    return new PubSubAsyncIterator<T>(this, subjects, setStartAtSequence);
  }
}
