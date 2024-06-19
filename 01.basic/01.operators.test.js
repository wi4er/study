"use strict";

describe("Update expressions", () => {
    /**
     *
     * Увеличиваем значение на единицу
     */
    describe("Increment", () => {
        /**
         *
         * Можно увеличить значение на единицу сразу
         */
        test("Should prefix increment", () => {
            let value = 10;
            expect(++value).toBe(11);
            expect(value).toBe(11);
        });

        /**
         *
         * Можно увеличить значение на единицу после выражения
         */
        test("Should postfix increment", () => {
            let value = 10;

            expect(value++).toBe(10);
            expect(value).toBe(11);
        });

        /**
         *
         * Можно увеличить значение свойства
         */
        test("Should increment in object", () => {
            const obj = {
                a: 0,
            };

            obj.a++;

            expect(obj).toEqual({a: 1});
        });

        test("Should increment with other types", () => {
            let a = "";
            expect(++a).toBe(1);

            let b = null;
            expect(++b).toBe(1);

            let c = true;
            expect(++c).toBe(2);
        });

        /**
         *
         * Нельзя изменить константу
         */
        test("Shouldn't update with const", () => {
            const prefix = 10;
            expect(() => ++prefix).toThrow("Assignment to constant variable.");

            const postfix = 10;
            expect(() => postfix++).toThrow("Assignment to constant variable.");
        });
    });

    /**
     *
     * Уменьшаем значение на единицу
     */
    describe("Decrement", () => {
        test("Should prefix decrement", () => {
            let value = 10;

            expect(--value).toBe(9);
            expect(value).toBe(9);
        });

        test("Should postfix decrement", () => {
            let value = 10;

            expect(value--).toBe(10);
            expect(value).toBe(9);
        });

        test("Should decrement with other types", () => {
            let a = "";
            expect(--a).toBe(-1);

            let b = null;
            expect(--b).toBe(-1);

            let c = true;
            expect(--c).toBe(0);
        });

        /**
         *
         * Нельзя изменить константу
         */
        test("Shouldn't update with const", () => {
            const prefix = 10;
            expect(() => --prefix).toThrow("Assignment to constant variable.");

            const postfix = 10;
            expect(() => postfix--).toThrow("Assignment to constant variable.");
        });
    });
});

describe("Unary operators", () => {
    describe("delete", () => {
        /**
         *
         * Удаляем свойство из объекта
         */
        test("Should delete value from object", () => {
            let a = {a: 10};
            expect(a.a).toBe(10);
            a.a = undefined;
            expect(Object.getOwnPropertyDescriptor(a, "a").value).toBe(undefined);
            expect(Object.keys(a)).toEqual(["a"]);

            let b = {b: 10};
            expect(b.b).toBe(10);
            expect(delete b.b).toBeTruthy();
            expect(Object.getOwnPropertyDescriptor(b, "b")).toBeUndefined();
            expect(Object.keys(b)).toEqual([]);
        });

        /**
         *
         * Нельзя удалить свойство с configurable = false
         */
        test("Shouldn't delete sealed property", () => {
            let obj = {};
            Object.defineProperty(obj, "a", {value: "aa"});
            expect(obj.a).toBe("aa");
            expect(() => delete(obj.a)).toThrow("Cannot delete property");
        });

        /**
         *
         * Удаляются только свои свойства
         */
        test("Shouldn't delete property from prototype", () => {
            const obj = Object.create({a: 1, b: 2});
            expect(obj.a).toBe(1);

            obj.a = 111;
            expect(obj.a).toBe(111);

            delete obj.a;
            expect(obj.a).toBe(1);

            delete obj.a;
            expect(obj.a).toBe(1);
        });
    });

    describe("void", () => {
        test("Should void", () => {
            expect(void 123).toBeUndefined();
            expect(void "qwerty").toBeUndefined();
            expect(void null).toBeUndefined();
            expect(void {}).toBeUndefined();
        });
    });

    describe("typeof", () => {
        test("Should get typeof", () => {
            expect(typeof undefined).toBe("undefined");
            expect(typeof null).toBe("object");
            expect(typeof true).toBe("boolean");
            expect(typeof 10).toBe("number");
            expect(typeof Symbol.iterator).toBe("symbol");
            expect(typeof 1000n).toBe("bigint");
            expect(typeof "abc").toBe("string");
            expect(typeof {}).toBe("object");
            expect(typeof (async () => {})).toBe("function");
        });
    });

    describe("Unary plus", () => {
        test("Should unary plus on string", () => {
            expect(+"333").toBe(333);
            expect(+"").toBe(0);
            expect(+"asd").toBeNaN();
            expect(+"123asd").toBeNaN();
        });

        test("Should unary plus on number", () => {
            expect(+444).toBe(444);
            expect(+-444).toBe(-444);
            expect(+NaN).toBe(NaN);
        });

        test("Should unary plus on boolean", () => {
            expect(+false).toBe(0);
            expect(+true).toBe(1);
        });

        test("Should unary plus on null", () => {
            expect(+null).toBe(0);
        });

        test("Should unary plus on undefined", () => {
            expect(+undefined).toBe(NaN);
        });

        test("Should unary plus on object", () => {
            expect(+{}).toBe(NaN);
            expect(+{a: 1}).toBe(NaN);
            expect(+[]).toBe(0);
            expect(+["10"]).toBe(10);
            expect(+["abd"]).toBe(NaN);
            expect(+[1, 2]).toBe(NaN);
            expect(+{valueOf(){ return 10; }}).toBe(10);
            expect(+{toString(){ return "22"; }}).toBe(22);
            expect(+{[Symbol.toPrimitive]: () => 20}).toBe(20);
        });

        test("Should unary plus on symbol", () => {
            expect(() => +Symbol.toPrimitive).toThrow();
        });
    });

    describe("Unary minus", () => {
        test("Should convert from string", () => {
            expect(-"123").toBe(-123);
            expect(-"-123").toBe(123);
            expect(-"asd").toBe(NaN);
        });

        test("Should convert from number", () => {
            let a = 300;
            expect(-a).toBe(-300);

            expect(0 === -0).toBeTruthy();
            expect(Object.is(0, -0)).toBeFalsy();
            expect(-200).toBe(-200);
        });

        test("Should convert from boolean", () => {
            expect(-true).toBe(-1);
            expect(-false).toBe(-0);
        });

        test("Should convert from null", () => {
            expect(-null).toBe(-0);
        });

        test("Should convert from undefined", () => {
            expect(-undefined).toBe(NaN);
        });

        test("Should convert from object", () => {
            expect(-{}).toBe(NaN);
            expect(-[10]).toBe(-10);
            expect(-["asd"]).toBe(NaN);
            expect(-[1, 2, 3]).toBe(NaN);
        });
    });

    describe("Bitwise not", () => {
        test("Should convert number", () => {
            expect(~10).toBe(-11);
            expect(~10n).toBe(-11n);

            expect(~-1).toBe(0);
            expect(~-1n).toBe(0n);
        });

        test("Should convert other types", () => {
            expect(~"").toBe(-1);
            expect(~"ABC").toBe(-1);
            expect(~false).toBe(-1);
            expect(~undefined).toBe(-1);
            expect(~null).toBe(-1);
            expect(~[]).toBe(-1);

            expect(~[10]).toBe(-11);
            expect(~{valueOf() { return 100 }}).toBe(-101);
        });
    });

    describe("Logical not", () => {
        test("Should convert to false", () => {
            expect(!10).toBeFalsy();
            expect(!-1).toBeFalsy();
            expect(!"123").toBeFalsy();
            expect(![]).toBeFalsy();
            expect(![1, 2, 3]).toBeFalsy();
            expect(!{}).toBeFalsy();
            expect(!{a: 1}).toBeFalsy();
            expect(!true).toBeFalsy();
            expect(!Symbol(10)).toBeFalsy();
        });

        test("Should convert to true", () => {
            expect(!0).toBeTruthy();
            expect(!0n).toBeTruthy();
            expect(!"").toBeTruthy();
            expect(!null).toBeTruthy();
            expect(!false).toBeTruthy();
            expect(!NaN).toBeTruthy();
            expect(!undefined).toBeTruthy();
        });

        test("Should convert double time", () => {
            expect(!!0).toBeFalsy();
            expect(!!false).toBeFalsy();
            expect(!!NaN).toBeFalsy();
        });
    });
});

describe("Exponentiation operator", () => {
    test("Should power value", () => {
        expect(2**2).toBe(4);
        expect(5**5).toBe(3125);
        expect(2.5**2.5).toBe(9.882117688026185);

        expect(4n**3n).toBe(64n);
    });

    test("Should power with other types", () => {
        expect("2" ** "2").toBe(4);
        expect(true ** true).toBe(1);
        expect(null ** null).toBe(1);
    });

    test("Should exponentiation assignment to variable", () => {
        const arr = [1, 2, 3]
        let num = 2;

        for (const i of arr) {
            num **= i;
        }

        expect(num).toBe(64);
    });
});

describe("Multiplicative operators", () => {
    describe("Multiplication", () => {
        it("Should multiply", () => {
            expect(2 * 2).toBe(4);
            expect(1.5 * 1.5).toBe(2.25);

            expect(25n * 25n).toBe(625n);
        });

        it("Should multiply with other types", () => {
            expect("10" * "20").toBe(200);
            expect("22" * true).toBe(22);
            expect("123" * false).toBe(0);
            expect("321" * undefined).toBe(NaN);
        });

        it("Should multiplication assignment", () => {
            let a = 2;

            for (let i = 0; i < 10; i++) {
                a *= 2;
            }

            expect(a).toBe(2048);
        });
    });

    describe("Division", () => {
        it("Should divine", () => {
            expect(100 / 10).toBe(10);
            expect(20 / -10).toBe(-2);
            expect(-10 / -5).toBe(2);
            expect(2 / 0).toBe(Infinity);
            expect(0 / 0).toBe(NaN);

            expect(200n / 15n).toBe(13n);
        });

        it("Should division assignment", () => {
            let a = 1024;

            for (let i = 0; i < 10; i++) {
                a /= 2;
            }

            expect(a).toBe(1);
        });
    });

    describe("Remainder", () => {
        test("Should remain", () => {
            expect(10 % 3).toBe(1);
            expect(100 % 3).toBe(1);
            expect(22 % 100).toBe(22);

            expect(() => 22n % 100).toThrow(TypeError);
        });

        test("Should remain from float", () => {
            expect(1.3 % 1).toBeCloseTo(.3);
            expect(101.101 % 2).toBeCloseTo(1.101);
        });

        test("Should remainder assignment", () => {
            let value = 1000;

            value %= 210;
            value %= 13;

            expect(value).toBe(4);
        });
    });
});

describe("Additive operators", () => {
    describe("Addition", () => {
        it("Should add number", () => {
            expect(2 + 2).toBe(4);
            expect(100 + -50).toBe(50);
            expect(100 + NaN).toBeNaN();
        });

        it("Should add bigint", () => {
            expect(2n + 2n).toBe(4n);
            expect(200n + -50n).toBe(150n);

            expect(() => 100 + 100n).toThrow();
        });

        it("Should add string", () => {
            expect("qwe" + "rty").toBe("qwerty");
            expect("qwe" + 123).toBe("qwe123");
            expect(123 + "qwe").toBe("123qwe");
            expect("123" + null).toBe("123null");
            expect(false + "111" ).toBe("false111");
            expect("Ba" + NaN + "a").toBe("BaNaNa");
            expect(() => "is" + Symbol.iterator).toThrow();
            expect("-->" + {}).toBe("-->[object Object]");
        });

        it("Should add object", () => {
            expect(10 + {valueOf: () => 20}).toBe(30);
            expect({valueOf: () => 20} + 30).toBe(50);
            expect("qqq" + {toString: () => "www"}).toBe("qqqwww");
        });

        it("Shouldn't adding symbol", () => {
            expect(() => "Ba" + Symbol(123) + "a").toThrow();
        });

        it("Should adding with other types", () => {
            expect(null + null).toBe(0)
            expect(true + true).toBe(2)
            expect(undefined + undefined).toBe(NaN)
        });

        it("Should addition assignment", () => {
            let a = 10;
            a += 10;

            expect(a).toBe(20);
        });

        it("Should addition assignment to string", () => {
            let a = "";

            for (let i = 0; i < 10; i++) {
                a += String.fromCharCode(i + 65);
            }

            expect(a).toBe("ABCDEFGHIJ");
        });
    });

    describe("Subtraction", () => {
        it("Should substract", () => {
            expect(100 - 50).toBe(50);
            expect("100" - 33).toBe(67);
            expect("100" - true).toBe(99);
            expect(null - 33).toBe(-33);
        });

        it("Should subtraction assignment", () => {
            let a = 10;
            a -= 4;

            expect(a).toBe(6);
        });
    });
});

describe("Relational operator", () => {
    describe("Comparison operators", () => {
        test("Should compare number", () => {
            expect(10 > 9).toBeTruthy();
            expect(10 >= 10).toBeTruthy();
            expect(1 < 100).toBeTruthy();
            expect(20 <= 21).toBeTruthy();
        });

        test("Should compare string", () => {
            expect("abc" > "abb").toBeTruthy();
            expect("zzz" > "ZZZ").toBeTruthy();
            expect("abcd" > "abc").toBeTruthy();
        });

        test("Should compare other types", () => {
            expect(true > false).toBeTruthy();
            expect(true > null).toBeTruthy();
            expect(undefined > 10).toBeFalsy();
            expect(undefined < 10).toBeFalsy();
        });
    });

    describe("instanceof", () => {
        test("Should be instanceof", () => {
            const set = new Set();

            expect(set instanceof Set).toBeTruthy();
        });

        test("Should be instance from prototype", () => {
            class Custom extends Array {
            }

            const obj = new Custom();

            expect(obj instanceof Array).toBeTruthy();
        });

        test.todo("has instance");
    });

    describe("in", () => {
        test("Should be in own properties", () => {
            const obj = {
                a: 1,
                b: 2,
            };

            expect("a" in obj).toBeTruthy();
            expect("b" in obj).toBeTruthy();
            expect("c" in obj).toBeFalsy();
        });

        test("Should be in prototype", () => {
            const obj = Object.create({a: 1, b: 2});

            expect("a" in obj).toBeTruthy();
            expect("b" in obj).toBeTruthy();
            expect("c" in obj).toBeFalsy();
        });
    });
});

describe("Conditional operator", () => {
    test("Should condition", () => {
        let a = 20 ? 10 : 10;
    });

    test("Should return value with condition", () => {
        let a = 10;
        let b = a > 5 ? 20 : 30;

        expect(b).toBe(20);
    });

    test("Should return value with condition", () => {
        let a = 10 ? 10 : 20;
        let b = null ? 10 : 20;

        expect(a).toBe(10);
        expect(b).toBe(20);
    });

    test("Should return value from expression", () => {
        function getValue(value) {
            return value + 10;
        }

        const a = getValue(0) ? getValue(10) : getValue(20);
        const b = getValue(-10) ? getValue(10) : getValue(20);
        expect(a).toBe(20);
        expect(b).toBe(30);
    });
});

/**
 *
 * An optional chain is a chain of one or more property accesses and function calls,
 * the first of which begins with the token ?.
 */
describe("Optional chain", () => {
    test("Should use optional chain", () => {
        const a = {a: 10};
        const b = null;
        const c = undefined;

        expect(a?.a).toBe(10);
        expect(b?.a).toBe(undefined);
        expect(c?.a).toBe(undefined);
    });

    /**
     *
     * Можно обращаться к любому уровню вложенности
     */
    test("Should use optional chain multiple times", () => {
        const a = {a: {aa: {aaa: 100}}};
        const b = null;
        const c = {a: {}};

        expect(a?.a?.aa?.aaa).toBe(100);
        expect(b?.a?.aa?.aaa).toBe(undefined);
        expect(c?.a?.aa?.aaa).toBe(undefined);
    });

    /**
     *
     * Можно использовать с вызовом функции
     */
    test("Should use with function invoke", () => {
        const a = {
            getValue() {
                return "VALUE";
            }
        };
        const b = null;
        const c = {
            getValue: null,
        }

        expect(a?.getValue?.()).toBe("VALUE");
        expect(b?.getValue?.()).toBe(undefined);
        expect(c?.getValue?.()).toBe(undefined);
    });

    /**
     *
     * Можно использовать с индексом массива
     */
    test("Should use with array", () => {
        const a = [1, {aa: 10}, 3];
        const b = undefined;
        const c = [1, null, 3]

        expect(a?.[0]).toBe(1);
        expect(a?.[1]?.aa).toBe(10);
        expect(b?.[0]).toBe(undefined);
        expect(b?.[1]?.aa).toBe(undefined);
        expect(c?.[0]).toBe(1);
        expect(c?.[1]?.aa).toBe(undefined);
    });

    test("Should use nullable expression", () => {
        const a = {a: {aa: {aaa: 100}}};
        const b = {a: {aa: null}};
        const c = undefined;

        expect(a?.a?.aa?.aaa ?? 20).toBe(100);
        expect(b?.a?.aa?.aaa ?? 20).toBe(20);
        expect(c?.a?.aa?.aaa ?? 20).toBe(20);
    });
});

