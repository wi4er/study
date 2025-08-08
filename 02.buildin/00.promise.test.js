/**
 *
 * A Promise is an object that is used as a placeholder
 * for the eventual results of a deferred (and possibly asynchronous) computation.
 *
 * Any Promise object is in one of three mutually exclusive states: fulfilled, rejected, and pending
 */
describe("Promise", () => {
    describe("Promise.prototype", () => {
        /**
         *
         * Можно создать промис
         */
        it("Should create promise", () => {
            const inst = new Promise(resolve => resolve("DONE"));

            expect(inst instanceof Promise).toBeTruthy();
        });

        /**
         *
         * Можно создать новый промис который начнёт выполнятся после перехода приведущего в состояние fulfilled
         */
        it("Should have then", done => {
            new Promise(resolve => resolve("DONE"))
                .then(result => expect(result).toBe("DONE"))
                .then(done);
        });

        /**
         *
         * Каждый раз при вызове Promise.prototype.then создаётся новый промис
         */
        it("Should create promise instances", done => {
            const inst1 = new Promise(resolve => resolve("DONE"));
            const inst2 = inst1.then(result => {
                expect(result).toBe("DONE");

                return "VALUE";
            });
            const inst3 = inst2.then(result => expect(result).toBe("VALUE"))
                .then(done);

            expect(inst1).not.toBe(inst2);
            expect(inst2).not.toBe(inst3);
            expect(inst3).not.toBe(inst1);
        });

        /**
         *
         * У метода Promise.prototype.then если второй параметр,
         * который вызывается при переходе промиса в состояние rejected
         */
        it("Should reject promise with then", done => {
            new Promise((resolve, reject) => reject("REJECT"))
                .then(
                    () => fail("RESOLVED!"),
                    result => expect(result).toBe("REJECT"),
                )
                .then(done);
        });

        /**
         *
         * Можно создать промис только для состояние rejected
         */
        it("Should have catch", done => {
            new Promise((resolve, reject) => reject("REJECT"))
                .then(() => fail("RESOLVED!"))
                .catch(result => expect(result).toBe("REJECT"))
                .then(done);
        });

        /**
         *
         * Если в теле промиса выброшено исключение то он закроется как rejected
         */
        it("Should catch exception", done => {
            new Promise(() => {
                throw "REJECT";
            })
                .then(() => fail("RESOLVED!"))
                .catch(result => expect(result).toBe("REJECT"))
                .then(done);
        });

        /**
         *
         * Если в обработчике промиса выброшено исключение то закроется как rejected
         */
        it("Should have catch in then", done => {
            const inst = new Promise(resolve => resolve("VALUE"))
                .then(() => {
                    throw "WRONG";
                })
                .then(() => fail("RESOLVED!"))
                .catch(result => expect(result).toBe("WRONG"));

            inst.then(done);
        });

        /**
         *
         * Обработчик промиса может вернуть другой промис
         */
        it("Should then return promise", done => {
            new Promise(resolve => resolve("VALUE"))
                .then(result => {
                    expect(result).toBe("VALUE");

                    return new Promise(resolve => resolve())
                        .then(done);
                });
        });

        /**
         *
         * Обработчик промиса может вернуть другой PromiseLike объект
         */
        it("Should return PromiseLike object", () => {
            Promise.resolve()
                .then(() => {
                    return {
                        then(resolve) {
                            resolve("VALUE");
                        }
                    }
                })
                .then(result => {
                    expect(result).toBe("VALUE");
                });
        });

        /**
         *
         * Можно создать новый промис который выполнится не зависимо от результатов преведущего
         */
        it("Should resolve with finally", done => {
            new Promise(resolve => resolve(2))
                .finally(done);
        });

        /**
         *
         * У промиса есть свой стрингтег
         */
        it("Should have string tag", () => {
            const inst = new Promise(resolve => resolve());

            expect(String(inst)).toBe("[object Promise]");
        });

        /**
         *
         * Нельзя вызвать then, catch, finally с неправильным контекстом
         */
        it("Shouldn't call then", () => {
            const {then} = Promise.resolve();

            expect(() => {
                then.call({});
            }).toThrow("called on incompatible receiver");
        });
    });

    describe('Promise chaining', () => {
        test('Should chain', async () => {

            const inst = new Promise(resolve => resolve(10))


            console.log(data);
        });
    });


    describe("Promise extension", () => {
        test("Should extend", () => {
            class Custom extends Promise {
            }

            const inst = new Custom(resolve => resolve());
            const next = inst.then(() => {
            });

            expect(inst instanceof Custom).toBeTruthy();
            expect(next instanceof Custom).toBeTruthy();
        });

        test("Should use extra methods", () => {
            class Custom extends Promise {
                doSomething() {
                    return "VALUE";
                }
            }

            const inst = new Custom(resolve => resolve());
            const res = inst.doSomething();

            expect(res).toBe("VALUE");
        });

        test("Should use inner then", done => {
            class Custom extends Promise {
                extraThen() {
                    return this.then(result => result + 1);
                }
            }

            new Custom(resolve => resolve(1))
                .extraThen()
                .then(result => expect(result).toBe(2))
                .then(done);
        });
    });

    describe("Promise functions", () => {
        describe("Promise.resolve", () => {
            /**
             *
             * Можно создать промис в состоянии resolved
             */
            it("Should resolve with resolve", done => {
                Promise.resolve("DONE")
                    .then(result => expect(result).toBe("DONE"))
                    .then(done);
            });

            /**
             *
             */
            it("Should resolve with resolve args", done => {
                const inst = new Promise(resolve => resolve(10));

                Promise.resolve(inst)
                    .then(result => expect(result).toBe(10))
                    .then(done);
            });
        });

        describe("Promise.reject", () => {
            /**
             *
             * Можно создать промис в состоянии rejected
             */
            it("Should resolve with resolve", done => {
                Promise.reject("ERROR")
                    .catch(result => expect(result).toBe("ERROR"))
                    .then(done);
            });

            /**
             *
             * Можно вернуть созданный промис результатом обработчика
             */
            it("Should reject in resolver", done => {
                new Promise(resolve => resolve())
                    .then(() => Promise.reject())
                    .then(() => fail("RESOLVED!"))
                    .catch(done);
            });
        });

        describe("Promise.all", () => {
            /**
             *
             * Можно выполнить несколько промисов одновременно.
             * Promise.all возвращает новый промис
             */
            it("Should resolve with all", done => {
                Promise.all([
                    new Promise(resolve => resolve(1)),
                    new Promise(resolve => resolve(2)),
                    new Promise(resolve => resolve(3)),
                ])
                    .then(result => expect(result).toEqual([1, 2, 3]))
                    .then(done);
            });

            /**
             *
             */
            it("Should resolve with all", done => {
                Promise.all([
                    11,
                    22,
                    33,
                ])
                    .then(result => expect(result).toEqual([11, 22, 33]))
                    .then(done);
            });

            /**
             *
             * Можно выполнить несколько PromiseLike объектов одновременно
             */
            it("Should resolve with promise like", () => {
                Promise.all([
                    {
                        then(resolve) {
                            resolve(100);
                        }
                    }, {
                        then(resolve) {
                            resolve(200);
                        }
                    }, {
                        then(resolve) {
                            resolve(300);
                        }
                    }
                ]).then(result => {
                    expect(result).toEqual([100, 200, 300]);
                });
            });

            /**
             *
             * Можно передать в Promise.all любой итератор
             */
            it("Should resolve with set", done => {
                const set = new Set();
                set.add(new Promise(resolve => resolve(100)));
                set.add(new Promise(resolve => resolve(200)));
                set.add(new Promise(resolve => resolve(300)));

                Promise.all(set)
                    .then(resolve => expect(resolve).toEqual([100, 200, 300]))
                    .then(done);
            });

            /**
             *
             * В случае завершения хотя-бы одного промиса в итераторе аргумента как rejected
             * промис результата закрывается как rejected
             */
            it("Should reject with all", done => {
                Promise.all([
                    new Promise((resolve, reject) => reject()),
                    new Promise(resolve => resolve(2)),
                    new Promise(resolve => resolve(3)),
                ]).catch(done);
            });
        });

        describe("Promise.race", () => {
            it("Should", async () => {

            });
        });

        /**
         *
         * Можно выполнить несколько промисов и получить их результат независимо от статуса выполнения
         */
        it("Should resolve with all settled", done => {
            Promise.allSettled([
                new Promise(resolve => resolve(1)),
                new Promise(resolve => resolve(2)),
                new Promise((resolve, reject) => reject("BAD DAY!")),
            ])
                .then(result => {
                    expect(
                        result.map(item => item.status)
                    ).toEqual(
                        [
                            "fulfilled",
                            "fulfilled",
                            "rejected"
                        ]
                    );
                })
                .then(done);
        });

        describe('Promise.race', () => {
            /**
             *
             * Можно выполнить несколько промисов с результатов в виде первого закрытого промиса
             */
            it("Should resolve with race", async () => {
                const value = await Promise.race([
                    new Promise(resolve => resolve(1)),
                    new Promise(resolve => resolve(2)),
                    new Promise(resolve => resolve(3)),
                ]);

                expect(value).toBe(1);
            });

            it("Should reject with race", async () => {
                const inst = Promise.race([
                    new Promise((resolve, reject) => reject(111)),
                    new Promise(resolve => resolve(222)),
                    new Promise(resolve => resolve(333)),
                ]);

                await expect(inst).rejects.toBe(111);
            });

            it("Should reject with race", async () => {
                const inst = Promise.race([
                    new Promise(resolve => resolve(111)),
                    new Promise((resolve, reject) => reject(222)),
                    new Promise((resolve, reject) => reject(333)),
                ]);

                await expect(inst).resolves.toBe(111);
            });

            /**
             *
             * Порядок промисов в итераторе не имеет значения
             */
            it("Should reject with race and timeout", async () => {
                const value = await Promise.race([
                    new Promise(resolve => setTimeout(() => resolve(1), 10)),
                    new Promise(resolve => setTimeout(() => resolve(2), 5)),
                    new Promise(resolve => setTimeout(() => resolve(3), 20)),
                ]);

                expect(value).toBe(2);
            });
        });
    });
});
