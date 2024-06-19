"use strict";

describe("Iteration statements", () => {
    describe("for", () => {
        /**
         *
         * Можно выполнить статическое количество итераций
         */
        test("Should iterate static loop", () => {
            let sum = 0;

            for (let i = 1; i <= 10; i++) {
                sum += i;
            }

            expect(sum).toBe(55);
        });

        /**
         *
         * Можно задать любой шаг итерации
         */
        test("Should iterate with big step", () => {
            let sum = 0;

            for (let i = 0; i <= 100; i += 10) {
                sum += i;
            }

            expect(sum).toBe(550);
        });

        /**
         *
         * Можно итерировать с отрицательным шагом
         */
        test("Should backwards loop", () => {
            let sum = 0;

            for (let i = 11; i--;) {
                sum += i;
            }

            expect(sum).toBe(55);
        });

        /**
         *
         * Можно остановить текущую итерацию и перейти к следующей
         */
        test("Should continue in for", () => {
            const str = "q2wer5ty";
            let count = 0;

            for (let i = 0; i < str.length; i++) {
                if (str[i].match(/\d/)) {
                    continue;
                }

                count++;
            }

            expect(count).toBe(6);
        });

        /**
         *
         * Можно остановить итерацию и выйти из цикла
         */
        test("Should break in for", () => {
            const str = "qwer5ty";
            let count = "";

            for (let i = 0; i < str.length; i++) {
                if (str[i].match(/\d/)) {
                    break;
                }

                count += str[i];
            }

            expect(count).toBe("qwer");
        });

        test.todo("Should loop with 2 vars");

        /**
         *
         * Без выражений в скобках получим бесконечный цикл
         */
        test("Should iterate without params", () => {
            let i = 0;
            let count = 0;

            for (;;) {
                if ((count += ++i) > 100) {
                    break;
                }
            }

            expect(count).toBe(105);
        });
    });

    describe("for-in", () => {
        /**
         *
         * Можно проитерировать объект
         */
        test("Should iterate object", () => {
            const obj = {a: 1, b: 2, c: 3};
            let count = 0;

            for (const key in obj) {
                count += obj[key];
            }

            expect(count).toBe(6);
        });

        /**
         *
         * Можно проитерировать строку
         */
        test("Should iterate string", () => {
            let str = "qyweyrty";
            let count = 0;

            for (let key in str) {
                if (str[key] === "y") {
                    count++;
                }
            }

            expect(count).toBe(3);
        });

        /**
         *
         * При итерации примитива ошибки не будет но и тело цикла не выполнится
         */
        test("Shouldn't iterate null", () => {
            for (let key in null) {
                fail("Not here!!!");
            }

            for (let key in undefined) {
                fail("Not here!!!");
            }

            for (let key in false) {
                fail("Not here!!!");
            }

            for (let key in 123) {
                fail("Not here!!!");
            }

            for (let key in 312n) {
                fail("Not here!!!");
            }

            for (let key in Symbol.iterator) {
                fail("Not here!!!");
            }
        });

        /**
         *
         * Без свойств объекта тело итератора не будет выполнено ни разу
         */
        test("Shouldn't iterate without keys", () => {
            const obj = {};

            for (const key in obj) {
                fail("Cant access!");
            }
        });

        /**
         *
         * Можно остановить текущую итерацию и перейти к следующей
         */
        test("Should continue in for-in", () => {
            const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let count = 0;

            for (let key in obj) {
                if (key === "c") {
                    continue;
                }

                count += obj[key];
            }

            expect(count).toBe(12);
        });

        /**
         *
         * Можно остановить итерацию и выйти из цикла
         */
        test("Should break in for-in", () => {
            const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
            let count = "";

            for (let key in obj) {
                if (key === "c") {
                    break;
                }

                count += key;
            }

            expect(count).toBe("ab");
        });

        /**
         *
         * Можно получить доступ к свойствам прототипа
         */
        test("Should iterate with prototype", () => {
            const list = {
                a: 1,
                b: 2,
                c: 3,
                __proto__: {
                    d: 4,
                    e: 5,
                    __proto__: {
                        f: 6,
                        g: 7,
                    }
                }
            };
            let count = 0;

            for (let key in list) {
                count += list[key];
            }

            expect(count).toBe(28);
        });

        /**
         *
         * Свойства с enumerable = false учитываться не будут
         */
        test("Shouldn't use nonenumerable properties", () => {
            const obj = Object.create(
                Object.prototype,
                {
                    a: {
                        value: 1,
                        enumerable: true,
                    },
                    b: {
                        value: 2,
                    },
                    c: {
                        value: 3,
                        enumerable: true,
                    }
                }
            );
            let count = 0;

            for (let key in obj) {
                count += obj[key];
            }

            expect(count).toBe(4);
        });

        /**
         *
         * Перекрытые свойства не учитываются
         */
        test("Should iterate use with overlay", () => {
            const proto = Object.create(
                Object.prototype,
                {
                    a: {
                        value: "a",
                        enumerable: true,
                    },
                    b: {
                        value: "b",
                    },
                    c: {
                        value: "c",
                    }
                }
            );

            const obj = Object.create(
                proto,
                {
                    c: {
                        value: "c",
                        enumerable: true,
                    }
                }
            );

            let count = "";

            for (let key in obj) {
                count += obj[key];
            }

            expect(count).toBe("ca");
        });
    });

    describe("for-of", () => {
        /**
         *
         * Можно проитерировать любой итератор
         */
        test("Should iterate iterator", () => {
            const arr = [1, 2, 3, 4, 5];
            let count = 0;

            for (let item of arr) {
                count += item;
            }

            expect(count).toBe(15);
        });

        /**
         *
         * Можно остановить текущую итерацию и перейти к следующей
         */
        test("Should continue in for-of", () => {
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let count = 0;

            for (let item of arr) {
                if (item % 2 === 1) {
                    continue;
                }

                count += item;
            }

            expect(count).toBe(20);
        });

        /**
         *
         * Можно остановить итерацию и выйти из цикла
         */
        test("Should break in for-of", () => {
            const arr = ["1", 2, "3", 4, 5, "a", 7, 8, 9];
            let count = 0;

            for (let item of arr) {
                if (/\D/.test(item)) {
                    break;
                }

                count += +item;
            }

            expect(count).toBe(15);
        });

        /**
         *
         * Можно проитерировать Set
         */
        test("Should iterate set", () => {
            const set = new Set([1, 2, 3, 4, 5]);
            let count = 0;

            for (let item of set) {
                count += item;
            }

            expect(count).toBe(15);
        });

        /**
         *
         * Можно проитерировать Map
         */
        test("Should iterate map", () => {
            const map = new Map();
            map.set(1, 1);
            map.set(2, 2);
            map.set(3, 3);
            map.set(4, 4);
            map.set(5, 5);
            let count = 0;

            for (let [key, value] of map) {
                count += value;
            }

            expect(count).toBe(15);
        });

        /**
         *
         * Можно проитерировать строку
         */
        test("Should iterate string", () => {
            const str = "qwerteye";
            let count = 0;

            for (let char of str) {
                if (char === "e") {
                    count++;
                }
            }

            expect(count).toBe(3);
        });

        test("Should iterate number", done => {
            const fire = jest.fn();

            Number.prototype[Symbol.iterator] = function*() {
                let cur = this;

                while (cur) {
                    yield cur % 10;

                    cur /= 10;
                    cur >>= 0;
                }
            }

            for (const i of 23456) {
                fire(i);
            }

            expect(fire).toBeCalledTimes(5);
            expect(fire.mock.calls[0][0]).toBe(6);
            expect(fire.mock.calls[1][0]).toBe(5);
            expect(fire.mock.calls[2][0]).toBe(4);
            expect(fire.mock.calls[3][0]).toBe(3);
            expect(fire.mock.calls[4][0]).toBe(2);

            done();
        });

        /**
         *
         * Можно проитерировать генератор
         */
        test("Should iterate generator", () => {
            function* generate() {
                yield 1;
                yield 2;
                yield 3;
                yield 4;
                yield 5;
            }

            let count = 0;

            for (let item of generate()) {
                count++;
            }

            expect(count).toBe(5);
        });

        /**
         *
         * Можно проитерирова кастомный итератор
         */
        test("Should iterate custom iterator", () => {
            const obj = {
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5,
                *[Symbol.iterator]() {
                    for (let key in this) {
                        if (key !== "c") {
                            yield this[key];
                        }
                    }
                }
            }

            let count = 0;
            for (let i of obj) {
                count += i;
            }

            expect(count).toBe(12);
        });
    });

    describe("while", () => {
        test("Should iterate with while", () => {
            let arr = [1, 2, 3, 4, 5];
            let pos = 0;
            let count = 0

            while (pos < arr.length) {
                count += arr[pos++];
            }

            expect(count).toBe(15);
        });
    });

    describe("do-while", () => {
        test("Should iterate with do-while", () => {
            let arr = [1, 2, 3, 4, 5];
            let pos = 0;
            let count = 0

            do {
                count += arr[pos];
            } while (++pos < arr.length);

            expect(count).toBe(15);
        });
    });
});
