/**
 * Curry implementation (BFE.dev coding problem).
 *
 * Transforms a function that takes multiple arguments into a sequence of
 * functions that each take one or more arguments. The original function
 * is only invoked once all required arguments have been supplied.
 */

/**
 * Returns a curried version of the given function.
 *
 * The curried function can be called with fewer arguments than the original.
 * Each call returns a new function that accepts the remaining arguments,
 * until the full arity is reached, at which point the original function runs.
 *
 * @param fn - The function to curry. Its length (arity) determines how many
 *   arguments must be supplied before the function is invoked.
 * @returns A curried function that accepts arguments in one or more calls.
 *
 * @example
 * const sum = (a, b, c) => a + b + c;
 * const curriedSum = curry(sum);
 *
 * curriedSum(1, 2, 3);   // 6 — all args at once
 * curriedSum(1, 2)(3);   // 6 — two calls
 * curriedSum(1)(2)(3);   // 6 — three calls
 */
function curry(fn: (...args: any[]) => any): (...args: any[]) => any {
  return function curried(...arg: any[]) {
    // If we have at least as many arguments as the original function expects,
    // call the original function with the collected arguments.
    if (arg.length >= fn.length) {
      return fn(...arg);
    }
    // Otherwise, return a new function that will collect more arguments and
    // pass them (along with the current ones) back to curried.
    return (...nextArg: any[]) => curried(...arg, ...nextArg);
  };
}

/** Example binary function used to test curry. */
function sum(a: number, b: number, c: number): number {
  return a + b + c;
}

// --- Demo: curry in action ---
const testCurry = curry(sum);

console.log(testCurry(1, 2, 3));   // 6 — single call
console.log(testCurry(1, 2)(3));   // 6 — two calls
console.log(testCurry(1)(2)(3));   // 6 — three calls


export {}