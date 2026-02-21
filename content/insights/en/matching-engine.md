---
title: "The Event Loop: Single-Threaded Matching"
summary: "Why we built our Matching Engine in Node.js instead of Java, and how we optimized it."
date: "Aug 22, 2024"
readTime: "10 min read"
tags: ["Backend", "Performance", "Algorithms"]
image: "https://placehold.co/1200x600/172554/60a5fa?text=Event+Loop+Architecture"
author:
  name: "Hardi Hsu"
  avatar: "https://github.com/hardihsu.png"
  role: "Lead Engineer"
claps: 276
---

Conventional wisdom says "Don't use Node.js for CPU-intensive tasks." Yet, we built our core Matching Engine in Node. Why?

### The Reality of Matching

Matching an order is actually O(1) or O(log N). It's simple arithmetic: `if (buyPrice >= sellPrice) execute()`.
The real bottlenecks in trading systems are **IO** (Database writes) and **Lock Contention**.

### Enter the Single-Threaded Model

Multi-threaded engines (Java/C++) require complex Locks (Mutexes) to prevent race conditions when two orders try to hit the same resting liquidity. Locks are expensive; they cause context switching.

**Node.js is Single-Threaded.**
This means we have **Zero Lock Contention**. We don't need to lock the Order Book. We just process events one by one, in order.

### The LMAX Disruptor Pattern in JS

We adopted an architecture similar to the LMAX Disruptor.

1.  **Ring Buffer**: We pre-allocate memory for incoming order events to avoid Garbage Collection.
2.  **Journaling**: Instead of writing to a DB (slow), we append every event to a simplified "Append-Only File" (AOF) on disk asynchronously.
3.  **In-Memory State**: The entire state of the exchange lives in RAM.

### Performance Results

By removing locks and DB waits from the hot path, our Node.js engine can process **15,000 orders per second** on a single CPU core. This is more than enough for our simulation needs and drastically simplifies the codebase compared to a multi-threaded C++ engine.
