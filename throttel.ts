/**
 * Creates a throttled version of a function.
 *
 * Throttling ensures that the function is executed at most once
 * every `wait` milliseconds.
 *
 * If multiple calls happen during the waiting period,
 * only the LAST call's arguments will be used when the wait ends.
 *
 * This implementation also preserves `this` context.
 *
 * @template T - Generic type representing the function signature
 *
 * @param func
 * The original function to throttle.
 *
 * @param wait
 * Time in milliseconds to wait before allowing the next execution.
 *
 * @returns
 * A throttled version of the function.
 *
 * @example
 * const throttled = throttle(console.log, 1000)
 * throttled("A") // executes immediately
 * throttled("B") // ignored
 * throttled("C") // stored as lastArg
 * // after 1 second → prints "C"
 */
function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
  
    /** Indicates whether throttle is currently active */
    let waiting: boolean = false
  
    /** Stores last arguments received during waiting period */
    let lastArg: Parameters<T> | null = null
  
    /**
     * The throttled function that will be returned
     */
    return function (this: any, ...arg: Parameters<T>): void {
  
      // Case 1: Not waiting → execute immediately
      if (!waiting) {
  
        func.call(this, ...arg)
  
        waiting = true
  
        /**
         * Internal timeout handler.
         * After wait:
         * - reset waiting
         * - execute last stored call if exists
         * - restart throttle cycle
         */
        const runTimeout = () => {
          setTimeout(() => {
  
            waiting = false
  
            if (lastArg) {
              func.call(this, ...lastArg)
  
              waiting = true
  
              lastArg = null
  
              runTimeout()
            }
  
          }, wait)
        }
  
        runTimeout()
  
      }
      // Case 2: Already waiting → store latest args
      else {
        lastArg = arg
      }
    }
  }