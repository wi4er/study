"use strict";

describe("Exceptions", () => {
    /**
     *
     * Инструкция throw позволяет генерировать исключения, определяемые пользователем.
     * При этом выполнение текущей функции будет остановлено (инструкции после throw не будут выполнены),
     * и управление будет передано в первый блок catch в стеке вызовов.
     * Если catch блоков среди вызванных функций нет, выполнение программы будет остановлено.
     */
    describe("throw", () => {
        /**
         *
         * Можно выкинуть исключение в виде строки
         */
        it("Should throw string error", () => {
            function withThrow() {
                throw "Invalid value!";
            }

            expect(withThrow).toThrow("Invalid value");
        });

        /**
         *
         * Можно выбросить типизированную ошибку
         */
        it("Should throw exception with type", () => {
            function withThrow() {
                throw new TypeError("Invalid value!");
            }

            expect(withThrow).toThrow(TypeError);
        });

        /**
         *
         * Можно выкинуть ошибку через стек вызова
         */
        it("Should throw through chain", () => {
            function first() {
                second();
            }

            function second() {
                third();
            }

            function third() {
                throw "ERROR";
            }

            expect(first).toThrow("ERROR");
        });
    });

    describe("try catch", () => {
        /**
         *
         * Можно поймать пользовательское исключение
         */
        it("Should catch exception", () => {
            try {
                throw "Exception";
            } catch (err) {
                expect(err).toBe("Exception");
            }
        });

        /**
         *
         * Если исключение типизированное, то можно проанализировать тип
         */
        it("Should catch exception with type", () => {
            try {
                throw new TypeError("Exception");
            } catch (err) {
                expect(err.message).toBe("Exception");
                expect(err.constructor).toBe(TypeError);
            }
        });

        /**
         *
         * В блоке catch можно выкинуть новое исключение, которое можно будет обработать выше
         */
        it("Should multiple catch", () => {
            try {
                try {
                    throw "ERROR";
                } catch (err) {
                    expect(err).toBe("ERROR");

                    throw "ANOTHER";
                }
            } catch (err) {
                expect(err).toBe("ANOTHER");
            }
        });

        /**
         *
         * Можно опустить переменную ошибки
         */
        it("Should", () => {
            const done = jest.fn();

            try {
                throw "WRONG!";
            } catch {
                done();
            }

            expect(done).toBeCalledTimes(1);
        });


        /**
         *
         * Можно завершать функцию прямо внутри try..catch
         */
        it("Should return from catch", () => {
            function isOne(value) {
                if (value !== 1) {
                    throw RangeError();
                }
            }

            function check(value) {
                try {
                    isOne(value);

                    return true;
                } catch {
                    return false;
                }
            }

            expect(check(0)).toBeFalsy();
            expect(check(1)).toBeTruthy();
        });

        /**
         *
         * Можно писать break внутри try..catch
         */
        it("Should break from catch", () => {
            const list = [1, 2, 3, 4, 5];
            let count = 0;

            function notTree(value) {
                if (value === 3) {
                    throw RangeError();
                }
            }

            for (let i of list) {
                try {
                    count++;

                    notTree(i);
                } catch {
                    break;
                }
            }

            expect(count).toBe(3);
        });
    });

    describe("finally", () => {
        /**
         *
         * Блок finally будет выполнен не зависимо от того было ли выброшено исключение
         */
        it("Should execute finally", () => {
            const callBack = jest.fn();

            function execute(num, done) {
                try {
                    if (num === 1) {
                        throw "WRONG!"
                    }
                } catch (err) {
                    done();
                } finally {
                    done();
                }
            }

            execute(1, callBack);
            expect(callBack).toBeCalledTimes(2);

            callBack.mockClear();

            execute(0, callBack);
            expect(callBack).toBeCalledTimes(1);
        });

        /**
         *
         * Блок finally можно писать без блока catch
         */
        it("Should move to finally", () => {
            const callBack = jest.fn();

            function execute(done) {
                try {
                    throw "WRONG!"
                } finally {
                    done();
                }
            }

            expect(() => {
                execute(callBack);
            }).toThrow("WRONG!");
            expect(callBack).toBeCalledTimes(1);
        });
    });

    describe("Custom errors", () => {
        class CustomError extends Error {
            name = "CustomError";
        }

        /**
         *
         * Можно выкинуть кастомное исключение
         */
        test("Should throw custom error", () => {
            expect(() => {
                throw new CustomError("Some message!");
            }).toThrow(CustomError);
        });

        /**
         *
         * Можно обработать кастомное исключение
         */
        test("Should catch custom error", () => {
            try {
                throw new CustomError("Some message!");
            } catch (err) {
                if (!(err instanceof CustomError)) {
                    fail("Wrong error!");
                }
            }
        });

        /**
         *
         * Можно обработать тип ошибки и прокинуть её дальше
         */
        test("Should catch multiple errors", () => {
            function secure(callBack) {
                try {
                    callBack();
                } catch (err) {
                    switch (err.constructor) {
                        case CustomError:
                            return "CUSTOM"

                        case TypeError:
                            return "TYPE";

                        case RangeError:
                            return "RANGE";

                        default:
                            throw err;
                    }
                }
            }

            expect(secure(() => {
                throw new CustomError("MESSAGE");
            })).toBe("CUSTOM");

            expect(secure(() => {
                throw new TypeError("MESSAGE");
            })).toBe("TYPE");

            expect(secure(() => {
                throw new RangeError("MESSAGE");
            })).toBe("RANGE");

            expect(() => {
                secure(() => {
                    throw new SyntaxError("MESSAGE");
                });
            }).toThrow(SyntaxError);
        });
    });
});

describe("Error types", () => {
    describe("RangeError", () => {
        test("Should throw in String.prototype.repeat", () => {
            expect(() => {
                "qwerty".repeat(-1)
            }).toThrow(RangeError);
        });

        test("Should power big int", () => {
            expect(() => {
                100n ** -1n;
            }).toThrow(RangeError);
        });

        test("Should remainder from big int", () => {
            expect(() => {
                100n % 0n;
            }).toThrow(RangeError);
        });

        test("Should remainder from big int", () => {
            expect(() => {
                100n / 0n;
            }).toThrow(RangeError);
        });

        test("Should ", () => {
            expect(() => {
                BigInt(NaN);
            }).toThrow(RangeError);
        });

        test("Should create array", () => {
            expect(() => {
                Array(-1)
            }).toThrow(RangeError);
        });

        test("Should set array length", () => {
            expect(() => {
                const arr = [1, 2, 3];

                arr.length = -1;
            }).toThrow(RangeError);
        });
    });

    describe("ReferenceError", () => {
        test("Should get from refer", () => {
            expect(() => {
                let a = b;
            }).toThrow(ReferenceError);
        });

        test("Should get from assignment", () => {
            expect(() => {
                b = 100;
            }).toThrow(ReferenceError);
        });
    });

    describe("SyntaxError", () => {
        test("Should get from eval", () => {
            expect(() => {
                eval("123v");
            }).toThrow(SyntaxError);
        });

        test("Should get from big int", () => {
            expect(() => {
                BigInt("qwe");
            }).toThrow(SyntaxError);
        });
    });

    describe("TypeError", () => {
        test("Should get from bigint shift", () => {
            expect(() => {
                100n>>2
            }).toThrow(TypeError);
        });

        test("Should get from toNumber", () => {
            expect(() => {
                +100n;
            }).toThrow(TypeError);
        });

        test("Should get from toBigInt", () => {
            expect(() => {
                BigInt(undefined);
            }).toThrow(TypeError);
        });

        test("Should get from wrong call", () => {
            expect(() => {
                undefined();
            }).toThrow(TypeError);
        });

        test("Should get from wrong tag call ", () => {
            expect(() => {
                null`123`;
            }).toThrow(TypeError);
        });
    });

    describe("URIError", () => {
        test("Should get", () => {
            expect(() => {
                decodeURIComponent('%');
            }).toThrow(URIError);
        });
    });
});
