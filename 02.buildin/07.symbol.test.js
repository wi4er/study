/**
 *
 * Primitive value that represents a unique, non-String Object property key
 */
describe("Custom symbol", () => {
    test("Should set property key", () => {
        const key_1 = Symbol("key");
        const key_2 = Symbol("key");

        expect(key_1 === key_2).toBe(false);

        const obj = {
            [key_1]: "value_1",
            [key_2]: "value_2",
        };

        expect(obj[key_1]).toBe("value_1");
        expect(obj[key_2]).toBe("value_2");
    });

    test("Should get symbol from global registry", () => {
        const key_1 = Symbol.for("key");
        const key_2 = Symbol.for("key");

        expect(key_1).toBe(key_2);
    });

    test("Should get key for symbol", () => {
        const value = Symbol.for("key");

        expect(Symbol.keyFor(value)).toBe("key");
    });
});

describe("Iteration symbol", () => {
    describe("Symbol.asyncIterator", () => {
        test("Should use with async generator", async () => {
            async function *create(size) {
                for (let i = 1; i <= size; i++) {
                    yield i;
                }
            }

            const list = create(10);
            expect(typeof list[Symbol.asyncIterator]).toBe("function");

            const fire = jest.fn();

            for await(let count of list) {
                fire(count);
            }

            expect(fire).toBeCalledTimes(10);
            expect(fire).toBeCalledWith(1)
            expect(fire).toBeCalledWith(10)
        });

        test("Should use async iterator", async () => {
            class List {
                constructor(count) {
                    this.count = count;
                }

                [Symbol.asyncIterator]() {
                    return {
                        count: this.count,
                        current: 0,
                        next() {
                            return new Promise(resolve => {
                                if (++this.current > this.count) {
                                    resolve({
                                        done: true,
                                    });
                                } else {
                                    resolve({
                                        value: this.current,
                                        done: false,
                                    });
                                }
                            });
                        },
                    }
                }
            }

            const list = new List(10);
            const fire = jest.fn();

            for await(let count of list) {
                fire(count);
            }

            expect(fire).toBeCalledTimes(10);
            expect(fire).toBeCalledWith(1)
            expect(fire).toBeCalledWith(10)
        });
    });

    describe("Symbol.iterator", () => {
        test("Should iterate with array", () => {
            const arr = [1, 2, 3, 4, 5];
            let count = 0;

            expect(typeof arr[Symbol.iterator]).toBe("function");
            for (const a of arr) {
                count += a;
            }

            expect(count).toBe(15);
        });

        test("Should iterate with iterator", () => {
            const map = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
            let count = 0;

            const iterator = map.values();
            expect(typeof iterator[Symbol.iterator]).toBe("function");

            for (const a of iterator) {
                count += a;
            }

            expect(count).toBe(15);
        });

        test("Should iterate with generator", () => {
            function *create() {
                yield 1;
                yield 2;
                yield 3;
                yield 4;
                yield 5;
            }
            let count = 0;

            const iterator = create();
            expect(typeof iterator[Symbol.iterator]).toBe("function");

            for (const a of iterator) {
                count += a;
            }

            expect(count).toBe(15);
        });

        test("Should get from custom iterator", () => {
            const obj = {
                max: 10,
                [Symbol.iterator]() {
                    return {
                        count: this.max,
                        current: 0,
                        next() {
                            if (++this.current <= this.count) {
                                return {
                                    value: this.current,
                                    done: false,
                                };
                            } else {
                                return {
                                    done: true,
                                };
                            }
                        }
                    };
                }
            };

            let count = 0;
            for (const i of obj) {
                count += i;
            }

            expect(count).toBe(55);
        });
    });
});

describe("String symbols", () => {
    describe("Symbol.match", () => {
        test("Should match with regexp", () => {
            expect(typeof RegExp.prototype[Symbol.match]).toBe("function");

            const res = ['2'];
            res.index = 1;
            res.input = "123";

            expect("123".match(/2/)).toEqual(res);
        });

        test("Should match with custom object", () => {
            const obj = {
                [Symbol.match](str) {
                    return str.length <= 5;
                }
            };

            expect("123".match(obj)).toBeTruthy();
            expect("12345".match(obj)).toBeTruthy();
            expect("1234567".match(obj)).toBeFalsy();
        });

        test("Shouldn't match", () => {
            expect("123".match({})).toBeNull();
            expect("123".match(10)).toBeNull();
        });
    });

    describe("Symbol.matchAll", () => {
        test("Should matchAll with regexp", () => {
            expect(typeof RegExp.prototype[Symbol.matchAll]).toBe("function");

            const list = [..."1ab2df34".matchAll(/\d{1,}/g)];
            
            expect(list.map(item => item[0])).toEqual(["1", "2", "34"]);
        });

        test("Should match with extension", () => {
            class MyExp extends RegExp {
                [Symbol.matchAll](str) {
                    str = str.replace(/\d/g, "");
                    return super[Symbol.matchAll](str);
                }
            }

            const expr = new MyExp("\\w", "g");
            const clear = "123 333 wefw 213".matchAll(expr);
            
            expect([...clear].map(item => item[0])).toEqual(["w", "e", "f", "w"]);
        });

        test("Should match with custom object", () => {
            const obj = {
                *[Symbol.matchAll](str) {
                    for (const a of str) {
                        yield +a;
                    }
                }
            };

            expect([..."123".matchAll(obj)]).toEqual([1, 2, 3]);
        });

        test("Shouldn't match", () => {
            expect("123".matchAll({})).toBeNull();
            expect("123".matchAll(10)).toBeNull();
        });
    });

    describe("Symbol.replace", () => {

    });

    describe("Symbol.search", () => {

    });

    describe("Symbol.split", () => {

    });

    describe("Symbol.unscopables", () => {

    });
});

describe("Array symbols", () => {
    describe("Symbol.isConcatSpreadable", () => {
        test("Should concat array", () => {
            const arr = [1, 2, 3];

            expect(arr.concat([4, 5])).toEqual([1, 2, 3, 4, 5]);

            Object.defineProperty(
                arr,
                Symbol.isConcatSpreadable,
                {
                    value: false,
                }
            );

            expect(arr.concat([4, 5])).toEqual([[1, 2, 3], 4, 5]);
        });

        test("Should concat", () => {
            const arr = [1, 2, 3];

            expect(arr.concat([4, 5])).toEqual([1, 2, 3, 4, 5]);

            Object.defineProperty(
                arr,
                Symbol.isConcatSpreadable,
                {
                    value: false,
                }
            );

            expect(arr.concat([4, 5])).toEqual([[1, 2, 3], 4, 5]);
        });
    });
});

describe("Class symbols", () => {
    describe("Symbol.hasInstance", () => {
        test("Should be instanceof", () => {
            class WitInstance {
                static [Symbol.hasInstance](inst) {
                    return Object.getPrototypeOf(inst) === WitInstance.prototype;
                }
            }

            const inst = new WitInstance();

            expect(inst instanceof WitInstance).toBeTruthy();
            expect([] instanceof WitInstance).toBeFalsy();
        });

        test("Shouldn't be instanceof by self", () => {
            class WitInstance {
                static [Symbol.hasInstance](inst) {
                    return Array.isArray(inst);
                }
            }

            const inst = new WitInstance();

            expect(inst instanceof WitInstance).toBeFalsy();
            expect([] instanceof WitInstance).toBeTruthy();
        });
    });

    describe("Symbol.species", () => {
        test("Should return array", () => {
            class MyArray extends Array {
                constructor(...args) {
                    super(...args);

                    console.log(this.constructor[Symbol.species]);
                }
            }

            const arr = new MyArray(10);
        });
    });
});

describe("Convert symbols", () => {
    describe("Symbol.toPrimitive", () => {
        test("Should convert to primitive", () => {
            const obj = {
                [Symbol.toPrimitive](hint) {
                    switch (hint) {
                        case "string": {
                            return "some_string";
                        }

                        case "number": {
                            return 10;
                        }

                        case "default": {
                            return "default";
                        }
                    }

                    return 10;
                }
            }

            expect(+obj).toBe(10);
            expect(String(obj)).toBe("some_string");
            expect(obj + "").toBe("default");
        });
    });

    describe("Symbol.toStringTag", () => {
        test("Should get string tag", () => {
            const obj = {};

            expect(String(obj).toString()).toBe("[object Object]")
        });

        test("Should get standard string tag", () => {
            const obj = new Set([1, 2, 3]);

            expect(String(obj)).toBe("[object Set]")
        });

        test("Should get string tag from class object", () => {
            class Type {
            }

            expect(Object.prototype.toString.call(new Type())).toBe("[object Object]")
        });

        test("Should get custom string tag", () => {
            class Type {
                get [Symbol.toStringTag]() {
                    return "Type";
                }
            }

            expect(Object.prototype.toString.call(new Type())).toBe("[object Type]")
        });
    });
});
