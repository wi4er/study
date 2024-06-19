describe("Iterator", () => {
    /**
     *
     * Итерация массива
     */
    test("Should iterate Array", () => {
        const arr = [1, 2, 3, 4, 5];
        let count = 0

        expect(typeof arr[Symbol.iterator]).toBe("function");

        for (let item of arr) {
             count += item;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Итерация типизированного массива
     */
    test("Should iterate TypedArray", () => {
        const arr = new Int8Array([1, 2, 3, 4, 5]);
        let count = 0

        expect(typeof arr[Symbol.iterator]).toBe("function");

        for (let item of arr) {
            count += item;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Итерация строки
     */
    test("Should iterate String", () => {
        const str = "qweqrtqy";
        let qCount = 0

        expect(typeof str[Symbol.iterator]).toBe("function");

        for (let item of str) {
            if (item === "q") {
                qCount++;
            }
        }

        expect(qCount).toBe(3);
    });

    /**
     *
     * Итерация сета
     */
    test("Should iterate Set", () => {
        const set = new Set([1, 2, 1, 3, 1, 4, 5]);
        let count = 0

        expect(typeof set[Symbol.iterator]).toBe("function");

        for (let item of set) {
            count += item;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Итерация мапы
     */
    test("Should iterate Map", () => {
        const map = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
        let count = 0

        expect(typeof map[Symbol.iterator]).toBe("function");

        for (let [key, value] of map) {
            count += value;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Итерация генератора
     */
    test("Should iterate generator", () => {
        function* gen() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
        }

        let count = 0

        const iterator = gen();
        expect(typeof iterator[Symbol.iterator]).toBe("function");

        for (let item of iterator) {
            count += item;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Итерация кастомного итератора
     */
    test("Should iterate custom iterator", () => {
        const obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,
            [Symbol.iterator]() {
                return Object.values(this).values();
            }
        };
        let count = 0

        expect(typeof obj[Symbol.iterator]).toBe("function");

        for (let item of obj) {
            count += item;
        }

        expect(count).toBe(15);
    });
});

describe("Async iterator",  () => {
    /**
     *
     * Итерация через асинхронную функция
     */
    test("Should iterate with async", async () => {
        class Custom {
            constructor(max) {
                this.max = max;
            }

            [Symbol.asyncIterator]() {
                return {
                    current: 0,
                    max: this.max,
                    async next() {
                        if (++this.current <= this.max) {
                            return {
                                value: this.current,
                            };
                        } else {
                            return {
                                done: true,
                            };
                        }
                    }
                }
            }
        }

        const obj = new Custom(10);
        let count = 0;

        for await (let item of obj) {
            count += item;
        }

        expect(count).toBe(55);
    });

    /**
     *
     * Итерация через создания промиса
     */
    test("Should iterate with promise resolve", async () => {
        class Custom {
            constructor(max) {
                this.max = max;
            }

            [Symbol.asyncIterator]() {
                return {
                    current: 0,
                    max: this.max,
                    next() {
                        if (++this.current <= this.max) {
                            return Promise.resolve({
                                value: this.current,
                            });
                        } else {
                            return Promise.resolve({
                                done: true,
                            });
                        }
                    }
                }
            }
        }

        const obj = new Custom(5);
        let count = 0;

        for await (let item of obj) {
            count += item;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Итерация через асихронный генератор
     */
    test("Should iterate with async generator", async () => {
        class Custom {
            constructor(max) {
                this.max = max;
            }

            async *[Symbol.asyncIterator]() {
                const {max} = this;

                for (let i = 0; i <= max; i++) {
                    yield Promise.resolve(i);
                }
            }
        }

        const obj = new Custom(10);
        let count = 0;

        for await (let item of obj) {
            count += item;
        }

        expect(count).toBe(55);
    });
});
