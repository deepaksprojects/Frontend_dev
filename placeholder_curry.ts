// This is a JavaScript coding problem from BFE.dev

/**
 * Creates a curried version of a function with placeholder support.
 *
 * @param { (...args: any[]) => any } fn
 *   The original function to curry.
 *
 * @returns { (...args: any[]) => any }
 *   A curried function that:
 *   - Can be called multiple times
 *   - Supports placeholders
 *   - Executes only when enough valid arguments are collected
 */
function curry(fn) {

    /**
     * Main curried function.
     * It collects arguments until we have enough
     * non-placeholder values to execute `fn`.
     *
     * @param  {...any} arg - arguments passed in current call
     */
    return function curried(...arg) {
  
      /**
       * Condition to check whether we can execute the function:
       *
       * 1. We must have at least `fn.length` arguments
       * 2. First `fn.length` arguments must NOT contain placeholder
       *
       * `fn.length` → number of declared parameters in original function
       */
      const isValid =
        arg.length >= fn.length &&
        !arg.slice(0, fn.length).includes(curry.placeholder)
  
      // If valid → execute original function
      if (isValid) {
        return fn(...arg)
      }
  
      // Otherwise → return a function to collect more arguments
      return function (...nextArg) {
  
        /**
         * Replace placeholders from previous arguments
         * with new values from `nextArg`
         *
         * Logic:
         * - If item is placeholder
         * - And we still have new arguments
         * - Replace it using nextArg.shift()
         */
        const resultArg = arg.map(item =>
          item === curry.placeholder && nextArg.length
            ? nextArg.shift()
            : item
        )
  
        /**
         * Recursively call `curried`
         * with:
         *  - updated arguments (placeholders replaced)
         *  - remaining new arguments (if any)
         */
        return curried(...resultArg, ...nextArg)
      }
    }
  }
  
  /**
   * Placeholder symbol
   * Used to skip argument positions
   */
  curry.placeholder = Symbol()
  
  // Alias for easier usage
  const _ = curry.placeholder
  
  
  // Example function
  const join = (a, b, c) => {
    return `${a}_${b}_${c}`
  }
  
  // Create curried version
  const curriedJoin = curry(join)
  
  
  // Example usage:
  console.log(curriedJoin(_, _, 3, 4)(1, _)(2, 5))
  // Expected: '1_2_3'

  export {}