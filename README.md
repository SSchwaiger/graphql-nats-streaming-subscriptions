# graphql-nats-streaming-subscriptions

This package implements the PubSubEngine Interface from the graphql-subscriptions package and also the new AsyncIterator interface. It allows you to connect your subscriptions manger to a nats streaming based Pub Sub mechanism to support multiple subscription manager instances.

## Usage

```javascript
import { NatsPubSub } from '@niemen/graphql-nats-streaming-subscriptions'

const pubsub = new NatsPubSub() // default connecting to nats://localhost:4222
// or
const pubsub = new NatsPubSub({ servers: ['nats://nats.io:4222', 'nats://nats.io:5222', 'nats://nats.io:6222'] })

// for more options see: https://github.com/nats-io/stan.js
```
