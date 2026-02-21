---
title: "Microservices: Python for CTP, Node.js for Web"
summary: "Decoupling legacy financial interfaces from modern web architecture using Redis Pub/Sub."
date: "Oct 15, 2024"
readTime: "12 min read"
tags: ["Backend", "Python", "Microservices", "Redis"]
image: "https://placehold.co/1200x600/1e293b/4ade80?text=Polyglot+Architecture"
author:
  name: "Hardi Hsu"
  avatar: "https://github.com/hardihsu.png"
  role: "Lead Engineer"
claps: 215
---

China's CTP (Comprehensive Transaction Platform) is the industry standard for futures trading, but primarily offers C++ and Python SDKs. Our core application stack, however, is built on Node.js/NestJS for its superior WebSocket handling and developer experience.

### The Polyglot Challenge

We needed a way to bridge the gap between the Python-based CTP interface and our Node.js web services. Directly embedding Python in Node (or vice-versa) often leads to brittle, hard-to-debug "Frankenstein" processes.

### Solution: The Redis Gateway Pattern

We decoupled the system into two distinct services communicating purely via **Redis Pub/Sub**:

1.  **The Connectivity Layer (Python)**:
    *   Uses `openctp-ctp` or `swig` bindings to talk to the exchange.
    *   It is a "dumb pipe". It receives `OnRtnDepthMarketData`, serializes the struct to JSON/MsgPack, and PUBLISHes it to Redis channels (e.g., `market.data.au2401`).
    *   **Advantage**: If the Python process crashes (due to a CTP segmentation fault), the main Web Server remains unaffected. We simply leverage Docker swarm/Kubernetes to auto-restart the Python container.

2.  **The Application Layer (Node.js)**:
    *   Subscribes to Redis channels.
    *   Forwards updates to frontend clients via Socket.io.
    *   Handles authentication, permissioning, and business logic.

```python
# Python CTP Callback
def OnRtnDepthMarketData(self, pDepthMarketData):
    tick = {
        "instrument": pDepthMarketData.InstrumentID,
        "price": pDepthMarketData.LastPrice,
        "volume": pDepthMarketData.Volume
    }
    # Fire and forget - ultra low latency
    redis_client.publish(f"market.{tick['instrument']}", json.dumps(tick))
```

### Why not use ZeroMQ or gRPC?

While ZeroMQ is faster, Redis provided us with an invaluable feature for free: **Persistence and Inspection**. During development, we could simply allow the Python gateway to run and inspect the Redis keys to verify data integrity without needing the Node.js backend to be online.
