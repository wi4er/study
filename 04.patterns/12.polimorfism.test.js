describe("Polimorfism", () => {
    class List {
        constructor(max) {
            this.max = max;
        }

        [Symbol.iterator]() {
            const max = this.max;

            return {
                value: 0,
                max,
                next() {
                    if (this.value++ >= max) {
                        return {done: true};
                    }

                    return {value: this.value}
                }
            }
        }
    }

    it("Should feel like iterator", () => {
        const arr = [1, 2, 3, 4, 5];
        const set = new Set([1, 2, 3, 4, 5]);

        function* generate() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
        }

        /**
         *
         * @param iter - какой-нибудь итератор
         * @returns {number}
         */
        function calcSum(iter) {
            if (!iter[Symbol.iterator]) {
                throw TypeError("Only iterator enabled!");
            }

            let sum = 0;

            for (let item of iter) {
                if (typeof item !== "number") {
                    throw TypeError("Only number item iterator enabled!");
                }

                sum += item;
            }

            return sum;
        }

        const inst = new List(5);

        expect(calcSum(arr)).toBe(15);
        expect(calcSum(set)).toBe(15);
        expect(calcSum(generate())).toBe(15);
        expect(calcSum(inst)).toBe(15);

        expect(() => calcSum(10)).toThrow(TypeError);
        expect(() => calcSum([{}])).toThrow(TypeError);
        expect(() => calcSum(new Set("123"))).toThrow(TypeError);
        expect(() => calcSum(["123"])).toThrow(TypeError);
        expect(() => calcSum([false])).toThrow(TypeError);
    });

    it("Should feel number", () => {
        function calcSum(iter) {
            let sum = 0;

            for (let item of iter) {
                const val = Number(item);

                if (isNaN(val)) {
                    throw TypeError("Only number comparative enable!")
                }

                sum += val;
            }

            return sum;
        }

        expect(calcSum([
            1,
            2.0,
            "3",
            {
                valueOf() {
                    return 4;
                }
            },
            Object.create({
                valueOf() {
                    return 5;
                }
            }),
        ])).toBe(15);

        expect(() => calcSum([{}])).toThrow(TypeError);
        expect(() => calcSum([[1, 2]])).toThrow(TypeError);
        expect(() => calcSum([Symbol("123")])).toThrow(TypeError);
    });
});
