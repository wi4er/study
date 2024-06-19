"use strict";

describe("Carrying", () => {
    function sum(a, b, c) {
        return a + b + c;
    }

    test("Should use static currying", () => {
        function curry(func) {
            return function(a) {
                return function (b) {
                    return function (c) {
                        return func(a, b, c);
                    }
                }
            }
        }

        const transform = curry(sum);
        expect(transform(1)(2)(3)).toBe(6);
    });

    test("Should use dynamic currying", () => {
        function curry(func) {
            return function curried(...args) {
                if (args.length >= func.length) {
                    return func.apply(this, args);
                } else {
                    return function(...args2) {
                        return curried.apply(this, args.concat(args2));
                    }
                }
            }
        }

        const transform = curry(sum);
        expect(transform(1)(2)(3)).toBe(6);
        expect(transform(100)(100)(100)).toBe(300);
    });
});
