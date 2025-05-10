export class Timeout {
  private timeoutId: number | null
  private timeoutIds: Record<number, boolean>

  constructor() {
    this.timeoutId = null
    this.timeoutIds = {}
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

  startTimeouts(callback: () => void, ms: number) {
    const timeoutId = setTimeout(() => {
      callback()
      this.endTimeouts(timeoutId)
    }, ms)

    this.timeoutIds[timeoutId] = true
  }

  endTimeouts(id?: number) {
    if (typeof id === 'number') {
      clearTimeout(id)
      delete this.timeoutIds[id]
      return
    }

    for (const key in this.timeoutIds) {
      const id = Number(key)
      clearTimeout(id)
    }

    this.timeoutIds = {}
  }
}

export class Interval {
  intervalId: number | null

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
