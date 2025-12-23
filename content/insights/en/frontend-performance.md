---
title: "Visualizing the Pulse: Frontend Performance in HFT"
summary: "Implementing a 60FPS Order Book with React, Canvas, and Web Workers under heavy load."
date: "Nov 28, 2024"
readTime: "8 min read"
tags: ["Frontend", "Performance", "React", "Canvas"]
image: "https://placehold.co/1200x600/0f172a/38bdf8?text=High-Frequency+Rendering"
author:
  name: "Hardi Hsu"
  avatar: "https://github.com/hardihsu.png"
  role: "Lead Engineer"
claps: 342
---

In high-frequency trading (HFT) applications, the frontend is not just a UI; it's a real-time data visualization engine. When handling 500+ tick updates per second, React's standard reconciliation process becomes a significant bottleneck.

### The Challenge: React vs. Reality

React is fast, but re-rendering a deep DOM tree 500 times a second creates massive garbage collection (GC) overhead. We encountered significant "stuttering" (jank) in our Order Book component when market volatility spiked. The browser's main thread was choked by layout calculations.

### Solution 1: Throttling & Batching

The first line of defense is decoupling network frequency from render frequency.

```javascript
// Instead of updating state on every socket message:
const updateQueue = useRef([]);

useEffect(() => {
  const processQueue = () => {
    if (updateQueue.current.length > 0) {
      // Batch updates
      const batch = updateQueue.current.splice(0);
      updateOrderBookState(batch);
    }
    requestAnimationFrame(processQueue);
  };
  requestAnimationFrame(processQueue);
}, []);
```

By using `requestAnimationFrame`, we ensure we only attempt to render once per screen refresh (typically 16ms for 60Hz), discarding intermediate states that the human eye can't physically perceive.

### Solution 2: Off-Main-Thread Processing

Data aggregation—such as grouping thousands of Tick data points into OHLC (Open, High, Low, Close) bars—is CPU intensive. We offloaded this entire computation to **Web Workers**.

The Main Thread now effectively becomes a "dumb renderer," while the Worker Thread handles the heavy lifting of data normalization and structure. This keeps the UI responsive even during "market crashes" when data volume explodes.

### Solution 3: Canvas for Level 2 Data

For the Depth of Market (DOM) visualization, DOM elements are too heavy. We switched to the HTML5 `<canvas>` API. By drawing the depth chart as simple rectangles on a canvas layer, we bypass the browser's Layout and Paint composite stages entirely for those elements.

**Result**: We achieved consistent <16ms frame times (60FPS) even when processing 2,000+ messages per second.
