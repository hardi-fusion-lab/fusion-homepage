---
title: "事件循环：单线程撮合引擎的设计"
summary: "为什么我们在 Node.js 而不是 Java 中构建核心撮合引擎，以及我们如何优化它。"
date: "2024年8月22日"
readTime: "10 分钟阅读"
tags: ["后端", "性能优化", "算法"]
image: "https://placehold.co/1200x600/172554/60a5fa?text=Event+Loop+Architecture"
author:
  name: "Hardi Hsu"
  avatar: "https://github.com/hardihsu.png"
  role: "Lead Engineer"
claps: 276
---

传统观点认为“不要用 Node.js 做 CPU 密集型任务”。然而，我们用 Node 构建了我们的核心撮合引擎。为什么？

### 撮合的真相

撮合一个订单实际上是 O(1) 或 O(log N) 的操作。它只是简单的算术：`if (buyPrice >= sellPrice) execute()`.
交易系统真正的瓶颈是 **IO** (数据库写入) 和 **锁竞争 (Lock Contention)**。

### 进入单线程模型

多线程引擎 (Java/C++) 需要复杂的锁 (Mutexes) 来防止当两个订单试图打击同一流动性时出现的竞争条件。锁是昂贵的；它们导致上下文切换。

**Node.js 是单线程的。**
这意味着由于我们拥有 **零锁竞争**。我们不需要锁定订单簿。我们只是按顺序逐个处理事件。

### JS 中的 LMAX Disruptor 模式

我们采用了类似于 LMAX Disruptor 的架构。

1.  **环形缓冲区 (Ring Buffer)**: 我们为传入的订单事件预分配内存，以避免垃圾回收 (GC)。
2.  **日志化 (Journaling)**: 我们不写入数据库（太慢），而是将每个事件异步追加到磁盘上简化的“仅追加文件” (AOF) 中。
3.  **内存状态**: 交易所的整个状态都存在于 RAM 中。

### 性能结果

通过从热路径中移除锁和数据库等待，我们的 Node.js 引擎可以在单个 CPU 核心上处理 **每秒 15,000 个订单**。这对于我们的模拟需求来说绰绰有余，并且与多线程 C++ 引擎相比，代码库大大简化。
