class EventTarget {
  constructor() {
    // Map<eventName, Set<callbacks>>
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    // If event does not exist, create a new Set
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    // Add callback (Set prevents duplicates)
    this.listeners.get(event).add(callback);
  }

  removeEventListener(event, callback) {
    // If event exists, remove the callback
    if (!this.listeners.has(event)) return;

    const callbacks = this.listeners.get(event);
    callbacks.delete(callback);

    // Optional cleanup: remove event if no listeners left
    if (callbacks.size === 0) {
      this.listeners.delete(event);
    }
  }

  dispatchEvent(event) {
    // If no listeners for this event, do nothing
    if (!this.listeners.has(event)) return;

    // Call all callbacks for this event
    for (const callback of this.listeners.get(event)) {
      callback();
    }
  }
}
