"use strict";

describe("Async await test", () => {
    const AsyncFunction = (async () => {
    }).constructor;

    describe("Async", () => {
        /**
         *
         * Можно создать асинхронную функцию
         */
        it("Should create async function", () => {
            async function execute() {
            }

            expect(typeof execute).toBe("function");
            expect(execute instanceof Function).toBeTruthy();
            expect(execute instanceof AsyncFunction).toBeTruthy();
        });

        /**
         *
         * Вызов асинхронной функции возвращает промис
         */
        it("Should invoke async function", () => {
            async function get() {
                return "TEXT";
            }

            expect(get()).toBeInstanceOf(Promise);
        });

        /**
         *
         * Результатом асинхронной функции является результат промиса
         */
        it("Should get results", async () => {
            async function get() {
                return "TEXT";
            }

            const value = get();

            await expect(value).resolves.toBe("TEXT");
        });

        it("Should get reason", async () => {
            async function get() {
                throw new Error("ERROR");
            }

            const value = get();

            await expect(value).rejects.toThrow("ERROR");
        });

        /**
         *
         * Асинхронная функция может быть стрелочной
         */
        it("Should create async with arrow expression", () => {
            const func = async () => {
            };

            expect(func()).toBeInstanceOf(Promise);
        });

        /**
         *
         * Можно передать аргументы в асинхронную функцию
         */
        it("Should get arguments", async () => {
            async function getValue(value) {
                return `VALUE ${value}`;
            }

            const value = getValue(123);

            await expect(value).resolves.toBe("VALUE 123");
        });

        /**
         *
         * Асинхронный метод может быть методом
         */
        it("Should be method", async () => {
            class Custom {
                async getValue() {
                    return "VALUE";
                }
            }

            const inst = new Custom();
            const value = 'inst.getValue();

            await expect(value).resolves.toBe("VALUE");
        });

        /**
         *
         * Нельзя создать экземпляр из асинхронной функции
         */
        it("Shouldn't create instance", () => {
            async function Create() {
            }

            expect(() => {
                new Create()
            }).toThrow(TypeError);
        });

        it("Should use as then argument", async () => {
            Promise.resolve()
                .then(async () => "VALUE")
                .then(res => {
                    expect(res).toBe("VALUE");
                });
        });
    });

    describe("await", () => {
        /**
         *
         */
        it("Should wait with primitive", async () => {
            expect(await "DATA").toBe("DATA");
            expect(await 100).toBe(100);
            expect(await 222n).toBe(222n);
            expect(await true).toBe(true);
            expect(await null).toBe(null);
            expect(await undefined).toBe(undefined);
            expect(await Symbol.iterator).toBe(Symbol.iterator);
        });

        /**
         *
         */
        it("Should wait resolve", async () => {
            const value = await Promise.resolve(10);

            expect(value).toBe(10);
        });

        /**
         *
         */
        it("Should await with thenable", async () => {
            class Thenable {
                then(resolve) {
                    resolve("VALUE")
                }
            }

            const value = await new Thenable();
            expect(value).toBe("VALUE");
        });

        /**
         *
         */
        it("Should await from same promise", async () => {
            const first = new Promise(resolve => resolve(10));
            const second = first.then(value => value + 10);
            const third = first.then(value => value + 20)
            const forth = first.finally(() => 88);

            expect(await first).toBe(10);
            expect(await second).toBe(20);
            expect(await third).toBe(30);
            expect(await forth).toBe(10);
        });

        /**
         *
         */
        it("Should get Promise result", async () => {
            const promise = new Promise(resolve => resolve("RESULT_1"))
                .then(() => "RESULT_2")
                .then(() => "RESULT_3");

            expect(await promise).toBe("RESULT_3");
        });

        /**
         *
         */
        it("Should get result from reject", async () => {
            const promise = new Promise(resolve => resolve("RESULT_1"))
                .then(() => Promise.reject())
                .then(() => "RESULT_2")
                .catch(() => "RESULT_3");

            expect(await promise).toBe("RESULT_3");
        });

        /**
         *
         */
        it("Should get result from finally", async () => {
            const promise = new Promise(resolve => resolve("RESULT_1"))
                .then(() => "RESULT_3")
                .finally(() => "RESULT_4");

            expect(await promise).toBe("RESULT_3");
        });

        /**
         *
         */
        it("Should get async result", async () => {
            async function get() {
                return "RESULT_1";
            }

            const res = await get()
                .then(() => "RESULT_2");


            expect(res).toBe("RESULT_2");
        });

    });
});
