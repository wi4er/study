"use strict";

/**
 *
 * Примитивными типами называются переменные следующих типов:
 * - Undefined
 * - Null
 * - Boolean
 * - Number
 * - BigInt
 * - Symbol
 * - String
 */
describe("Primitive values", () => {
    /**
     *
     * The Undefined type has exactly one value, called undefined.
     * Any variable that has not been assigned a value has the value undefined.
     */
    describe("Undefined", () => {
        /**
         *
         * undefined - это свойство глобального объекта
         */
        test("Should be global object property", () => {
            const descriptor = Object.getOwnPropertyDescriptor(
                globalThis,
                "undefined",
            );

            expect(descriptor.value).toBeUndefined();
        });

        /**
         *
         * Можно объявить переменную без значения
         */
        test("Should be undefined", () => {
            let value;

            expect(value).toBeUndefined();
        });

        /**
         *
         * Можно объявить переменную и явно присвоить undefined
         */
        test("Should assign to undefined", () => {
            const value = undefined;

            expect(value).toBeUndefined();
        });

        /**
         *
         * Можно создать обращением к несуществующему свойству
         */
        test("Should call property", () => {
            const obj = {a: 1, b: 2};

            expect(obj.something).toBeUndefined();
        });

        /**
         *
         * Можно получить вызовом функции без return
         */
        test("Shouldn't have return", () => {
            function get() {
            }

            expect(get()).toBeUndefined();
        });

        /**
         *
         * Можно получить передав параметр без аргумента
         */
        test("Should return parameter", () => {
            function get(a) {
                return a;
            }

            expect(get(10)).toBe(10);
            expect(get()).toBeUndefined();
        });

        /**
         *
         * Можно вызвать опциональную последовательность на null или undefined
         */
        test("Should optional chain return undefined", () => {
            const a = null;

            expect(a?.something).toBeUndefined();
        });

        /**
         *
         * Можно получить деструктуризируя несуществующее свойство
         */
        test("Should get from destruction", () => {
            const obj = {a: 1};
            const {b} = obj;

            expect(b).toBeUndefined();
        });

        /**
         *
         * Можно использовать оператор void
         */
        test("Should get void", () => {
            expect(void "SOME_VALUE").toBeUndefined();
        });

        /**
         *
         * typeof Undefined всегда равен undefined
         */
        test("Should get type", () => {
            expect(typeof undefined).toBe("undefined");
        });

        /**
         *
         * Можно привести к другим типам
         */
        test("Should convert", () => {
            expect(Number(undefined)).toBe(NaN);
            expect(() => BigInt(undefined)).toThrow("Cannot convert undefined to a BigInt");
            expect(String(undefined)).toBe("undefined");
            expect(Boolean(undefined)).toBe(false);
            expect(Symbol(undefined).toString()).toBe("Symbol()");
        });
    });

    /**
     *
     * The Null type has exactly one value, called null.
     */
    describe("Null", () => {
        /**
         *
         * Можно создать через null literal
         */
        test("Should be null", () => {
            const a = null;

            expect(a).toBeNull();
        });

        /**
         *
         * Можно привести к другим типам
         */
        test("Should convert", () => {
            expect(+null).toBe(0);
            expect(-null).toBe(-0);
            expect(String(null)).toBe("null");
            expect(() => BigInt(null)).toThrow();
            expect(Symbol(null).toString()).toBe("Symbol(null)");
        });

        /**
         *
         * type Null всегда равен object
         */
        test("Should get type", () => {
            expect(typeof null).toBe("object");
        });
    });

    /**
     *
     * The Boolean type represents a logical entity having two values, called true and false.
     */
    describe("Boolean", () => {
        /**
         *
         * Можно создать через boolean literal
         */
        test("Should be boolean", () => {
            const a = true;

            expect(a).toBeTruthy();
        });

        /**
         *
         * Можно создать через сравнения
         */
        test("Should get from relative operators", () => {
            expect(10 > 9).toBeTruthy();
            expect(10 < 9).toBeFalsy();
            expect(10 >= 10).toBeTruthy();
            expect(10 <= 10).toBeTruthy();
            expect("a" in {a: 10}).toBeTruthy();
            expect([] instanceof Array).toBeTruthy();
        });

        /**
         *
         * Можно получить через равенство
         */
        test("Should get from equality", () => {
            expect(10 === 10).toBeTruthy(); // Strict Equality Comparison
            expect(10 !== 9).toBeTruthy();
            expect(10 == "10").toBeTruthy(); // Abstract Equality Comparison
            expect(10 != "10").toBeFalsy();
        });

        /**
         *
         * Можно получить из логического отрицания
         */
        test("Should get from logical not", () => {
            const a = 10;

            expect(!a).toBe(false);
            expect(!!a).toBe(true);
        });

        /**
         *
         * Приведение типов
         */
        test("Should convert boolean", () => {
            expect(+true).toBe(1);
            expect(+false).toBe(0);
            expect(-true).toBe(-1);
            expect(-false).toBe(-0);

            expect(String(true)).toBe("true");
            expect(String(false)).toBe("false");

            expect(BigInt(true)).toBe(1n);
            expect(BigInt(false)).toBe(0n);

            expect(Symbol(false).toString()).toBe("Symbol(false)");
        });

        /**
         *
         * typeof Boolean всегда равен boolean
         */
        test("Should get type", () => {
            expect(typeof false).toBe("boolean");
            expect(typeof true).toBe("boolean");
        });
    });

    /**
     *
     * The Number type has exactly 18437736874454810627 values
     * representing the double-precision 64-bit format IEEE 754-2019 values
     * as specified in the IEEE Standard for Binary Floating-Point Arithmetic
     */
    describe("Number", () => {
        /**
         *
         * Можно присвоить через number literal
         */
        test("Should create number", () => {
            const a = 123;

            expect(a).toBe(123);
        });

        /**
         *
         * У типа Number есть специальные значения
         */
        test("Should have spacial values", () => {
            expect(NaN).toBeNaN();
            expect(Infinity).toBe(Infinity);
            expect(-Infinity).toBe(-Infinity);
        });

        /**
         *
         * Можно создать при помощи плавающей точкой
         */
        test("Should create number with floating point", () => {
            expect(1e1).toBe(10);
            expect(5e5).toBe(500000);
            expect(3.5e10).toBe(35000000000);
        });

        /**
         *
         * Можно создать из других систем исчисления
         */
        test("Should create number in different system", () => {
            expect(0x10).toBe(16);
            expect(0xAAA).toBe(2730);

            expect(0o10).toBe(8);
            expect(0o77).toBe(63);

            expect(0b1101).toBe(13);
            expect(0b11111111_11111111).toBe(65535);
        });

        /**
         *
         * Можно добавить разделители
         */
        test("Should create with separators", () => {
            expect(1_000_000).toBe(1000000);
            expect(1_2_3_4_5_6_7_8_9).toBe(123456789);

            expect(() => eval("_1")).toThrow();
            expect(() => eval("7777_")).toThrow();
        });

        /**
         *
         */
        test("Should change to boolean", () => {
            expect(Boolean(100)).toBe(true);
            expect(Boolean(Infinity)).toBe(true);
            expect(Boolean(-200)).toBe(true);
            expect(Boolean(-Infinity)).toBe(true);

            expect(Boolean(0)).toBe(false);
            expect(Boolean(NaN)).toBe(false);

        });

        test("Should change to string", () => {
            expect(String(200)).toBe("200");
            expect(String(200.123)).toBe("200.123");
            expect(String(1e10)).toBe("10000000000");
            expect(String(2_2_2_2)).toBe("2222");
        });

        test("Should change to big int", () => {
            expect(BigInt(300)).toBe(300n);
        });

        /**
         *
         * typeof Number всегда равен number
         */
        test("Should get type", () => {
            expect(typeof 100).toBe("number");
            expect(typeof NaN).toBe("number");
            expect(typeof Infinity).toBe("number");
        });
    });

    /**
     *
     * The BigInt type represents a mathematical integer value.
     * The value may be any size and is not limited to a particular bit-width.
     */
    describe("BigInt", () => {
        /**
         *
         * Можно создать через literal
         */
        test("Should be BigInt", () => {
            expect(3333n).toBe(3333n);
        });

        /**
         * 
         */
        test("Should be BigInt()", () => {
            expect(BigInt(222)).toBe(222n);
        });

        /**
         *
         * Нельзя смешивать BigInt c другими типами
         */
        test("Should throw exception", () => {
            const a = 100n;

            expect(() => a * 100).toThrow("Cannot mix BigInt and other types");
            expect(() => a * "100").toThrow("Cannot mix BigInt and other types");
        });


        /**
         *
         * Нельзя применять унарный плюс
         */
        test("Shouldn't use unary plus", () => {
            const a = 100n;

            expect(() => +a).toThrow("Cannot convert a BigInt value to a number");
        });

        /**
         *
         * Приведение типов
         */
        test("Should change to bigint", () => {
            expect(Boolean(200n)).toBe(true);
            expect(Boolean(0n)).toBe(false);
            expect(String(200n)).toBe("200");
            expect(Number(100n)).toBe(100);
            expect(Symbol(123n).toString()).toBe("Symbol(123)");
        });

        /**
         *
         * typeof BigInt всегда равен bigint
         */
        test("Should get type", () => {
            const a = BigInt(10_000);

            expect(typeof a).toBe("bigint");
        });
    });

    /**
     *
     * The Symbol type is the set of all non-String values that may be used as the key of an Object property.
     * Each possible Symbol value is unique and immutable.
     */
    describe("Symbol", () => {
        test("Should be Symbol", () => {
            const value_1 = Symbol("value");
            const value_2 = Symbol("value");

            expect(value_1 === value_2).toBeFalsy();
        });

        /**
         *
         * Можно создать символ через функцию Symbol
         */
        test("Should be Symbol", () => {
            const value_1 = Symbol("value");
            const value_2 = Symbol("value");

            const obj = {
                [value_1]: "VALUE_1",
                [value_2]: "VALUE_2",
            };
            
            expect(obj[value_1]).toEqual("VALUE_1");
            expect(obj[value_2]).toEqual("VALUE_2");
        });

        /**
         *
         * typeof Symbol всегда равен symbols
         */
        test("Should get type", () => {
            const a = Symbol("123");

            expect(typeof a).toBe("symbol");
        });
    });

    /**
     *
     * The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values
     * up to a maximum length of 2**53 - 1 elements.
     */
    describe("String", () => {
        /**
         *
         * Можно создать через string literal
         */
        test("Should be string", () => {
            const a = "123";
            const b = '321';

            expect(a).toBe("123");
            expect(b).toBe("321");
        });

        /**
         *
         * Можно создать из template literal
         */
        test("Should create form template literal", () => {
            const value = `value`;

            expect(`value is ${value}`).toBe("value is value");
        });

        /**
         *
         * Можно использовать суррогатные пары
         */
        test("Should have surrogate pairs", () => {
            const char = "🌎🌏";

            expect(char.length).toBe(4);
            expect(char.codePointAt(0)).toBe(127758);
            expect(char.codePointAt(2)).toBe(127759);
        });

        /**
         *
         * typeof string всегда равен string
         */
        test("Should get type", () => {
            expect(typeof "123").toBe("string");
        });

        /**
         *
         * Приведение типов
         */
        test("Should change to string", () => {
            expect(Number("123")).toBe(123);
            expect(Number("abc")).toBe(NaN);

            expect(Boolean("123")).toBeTruthy();
            expect(Boolean("")).toBeFalsy();

            expect(BigInt("")).toBe(0n);
            expect(BigInt("123")).toBe(123n);
            expect(() => BigInt("abc")).toThrow("Cannot convert abc to a BigInt");

            expect(Symbol("data").toString()).toBe("Symbol(data)");
        });
    });
});

describe("IEEE-754", function () {
    test("Should ", () => {
        let dec = 0b0111000000000000000000000000000000000000000000000000;
        let float = 0b10000000011;

        console.log((1 + dec / (2 ** 52)) * (2 ** (float - 1023)));
    });
});
