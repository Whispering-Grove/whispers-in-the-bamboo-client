export class Timeout {
  private timeoutId: NodeJS.Timeout | null
  private timeoutIds: Map<NodeJS.Timeout, boolean>

  constructor() {
    this.timeoutId = null
    this.timeoutIds = new Map()
  }

  startTimeout(callback: () => void, ms: number) {
    this.endTimeout()
    if (this.timeoutId === null) {
      this.timeoutId = setTimeout(() => {
        callback()
      }, ms)
    }
  }

  endTimeout() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  startTimeouts(callback: () => void, ms: number, endTimeCallback?: () => void) {
    const timeoutId = setTimeout(() => {
      callback()
      this.endTimeouts(timeoutId, endTimeCallback)
    }, ms)

    this.timeoutIds.set(timeoutId, true)
  }

  endTimeouts(id?: NodeJS.Timeout, callback?: () => void) {
    if (id !== undefined) {
      callback?.()
      clearTimeout(id)
      this.timeoutIds.delete(id)
      return
    }

    for (const key of this.timeoutIds.keys()) {
      clearTimeout(key)
    }

    this.timeoutIds.clear()
  }
}

export class Interval {
  intervalId: NodeJS.Timeout | null

  constructor() {
    this.intervalId = null
  }

  startInterval(callback: () => void, ms: number) {
    this.endInterval()
    if (this.intervalId !== null) {
      this.intervalId = setInterval(() => {
        callback()
      }, ms)
    }
  }

  endInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
