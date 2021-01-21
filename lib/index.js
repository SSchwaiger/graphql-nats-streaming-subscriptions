'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var iterall = require('iterall');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var PubSubAsyncIterator = (function () {
    function PubSubAsyncIterator(pubsub, eventNames, setStartAtSequence) {
        this.setStartAtSequence = 0;
        this.pubsub = pubsub;
        this.pullQueue = [];
        this.pushQueue = [];
        this.listening = true;
        this.eventsArray = typeof eventNames === "string" ? [eventNames] : eventNames;
        this.setStartAtSequence = setStartAtSequence;
        this.allSubscribed = this.subscribeAll();
    }
    PubSubAsyncIterator.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.allSubscribed];
                    case 1:
                        _a.sent();
                        return [2, this.listening ? this.pullValue() : this.return()];
                }
            });
        });
    };
    PubSubAsyncIterator.prototype.return = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.emptyQueue;
                        return [4, this.allSubscribed];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2, { value: undefined, done: true }];
                }
            });
        });
    };
    PubSubAsyncIterator.prototype.throw = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.emptyQueue;
                        return [4, this.allSubscribed];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2, Promise.reject(error)];
                }
            });
        });
    };
    PubSubAsyncIterator.prototype[iterall.$$asyncIterator] = function () {
        return this;
    };
    PubSubAsyncIterator.prototype.pushValue = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.allSubscribed];
                    case 1:
                        _a.sent();
                        if (this.pullQueue.length !== 0) {
                            this.pullQueue.shift()({ value: message, done: false });
                        }
                        else {
                            this.pushQueue.push(message);
                        }
                        return [2];
                }
            });
        });
    };
    PubSubAsyncIterator.prototype.pullValue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.pushQueue.length !== 0) {
                resolve({ value: _this.pushQueue.shift(), done: false });
            }
            else {
                _this.pullQueue.push(resolve);
            }
        });
    };
    PubSubAsyncIterator.prototype.emptyQueue = function (subscriptionIds) {
        if (this.listening) {
            this.listening = false;
            this.unsubscribeAll(subscriptionIds);
            this.pullQueue.forEach(function (resolve) { return resolve({ value: undefined, done: true }); });
            this.pullQueue.length = 0;
            this.pushQueue.length = 0;
        }
    };
    PubSubAsyncIterator.prototype.subscribeAll = function () {
        var _this = this;
        return Promise.all(this.eventsArray.map(function (eventName) { return _this.pubsub.subscribe(eventName, _this.pushValue.bind(_this), { setStartAtSequence: _this.setStartAtSequence }); }));
    };
    PubSubAsyncIterator.prototype.unsubscribeAll = function (subscriptionIds) {
        for (var _i = 0, subscriptionIds_1 = subscriptionIds; _i < subscriptionIds_1.length; _i++) {
            var subscriptionId = subscriptionIds_1[_i];
            this.pubsub.unsubscribe(subscriptionId);
        }
    };
    return PubSubAsyncIterator;
}());

var NatsPubSub = (function () {
    function NatsPubSub(stan, messageParser, subscriptionOptions) {
        if (messageParser === void 0) { messageParser = null; }
        if (subscriptionOptions === void 0) { subscriptionOptions = null; }
        this.nats = stan;
        this.subscriptions = [];
        this.messageParser = messageParser;
        this.subscriptionOptions = subscriptionOptions !== null ? subscriptionOptions : this.nats.subscriptionOptions();
    }
    NatsPubSub.prototype.publish = function (subject, payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.nats.publish(subject, JSON.stringify(payload))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    NatsPubSub.prototype.subscribe = function (subject, onMessage, options) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options.setStartAtSequence) {
                            this.subscriptionOptions.setStartAtSequence(options.setStartAtSequence);
                        }
                        return [4, this.nats.subscribe(subject, this.subscriptionOptions)];
                    case 1:
                        subscription = _a.sent();
                        subscription.on("message", function (msg) {
                            var data = JSON.parse(msg.getData());
                            if (_this.messageParser) {
                                data = _this.messageParser(data);
                            }
                            onMessage({ data: data, msg: msg });
                        });
                        this.subscriptions.push(subscription);
                        return [2, Promise.resolve(this.subscriptions.length)];
                }
            });
        });
    };
    NatsPubSub.prototype.unsubscribe = function (sid) {
        var subscription = this.subscriptions[sid];
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    NatsPubSub.prototype.asyncIterator = function (subjects) {
        return new PubSubAsyncIterator(this, subjects, 0);
    };
    NatsPubSub.prototype.asyncIterator2 = function (subjects, setStartAtSequence) {
        return new PubSubAsyncIterator(this, subjects, setStartAtSequence);
    };
    return NatsPubSub;
}());

exports.NatsPubSub = NatsPubSub;
