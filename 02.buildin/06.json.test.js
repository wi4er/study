/**
 *
 * JSON (англ. JavaScript Object Notation, обычно произносится как /ˈdʒeɪsən/ JAY-sən[2]) —
 * текстовый формат обмена данными, основанный на JavaScript.
 */
describe("JSON in ecmascript", () => {
    describe("JSON.stringify", () => {
        /**
         *
         * Преобразование чистого объекта к строковому виду
         */
        test("Should stringify PO to json", () => {
            const a = {a: 1};

            expect(JSON.stringify(a)).toBe("{\"a\":1}");
        });

        /**
         *
         * Преобразование массива к строковому виду
         */
        test("Should stringify Array to json", () => {
            const a = [1, 2, 3];

            expect(JSON.stringify(a)).toBe("[1,2,3]");
        });

        /**
         *
         * Преобразование массива c пробелами к строковому виду
         */
        test("Should stringify Array to json", () => {
            const a = [1,,, 3];

            expect(JSON.stringify(a)).toBe("[1,null,null,3]");
        });

        /**
         *
         * Преобразование строки к строковому виду
         */
        test("Should stringify string to json", () => {
            const a = "qwerty";
            const b = "444";

            expect(JSON.stringify(a)).toBe('"qwerty"');
            expect(JSON.stringify(b)).toBe("\"444\"");
        });

        /**
         *
         * Преобразование числа к строковому виду
         */
        test("Should stringify number to json", () => {
            const a = 10;

            expect(JSON.stringify(a)).toBe("10");
        });

        /**
         *
         * Преобразование null к строковому виду
         */
        test("Should stringify null to json", () => {
            const a = null;

            expect(JSON.stringify(a)).toBe("null");
        });

        /**
         *
         * Преобразование логического типа к строковому виду
         */
        test("Should stringify string to json", () => {
            expect(JSON.stringify(true)).toEqual("true");
            expect(JSON.stringify(false)).toEqual("false");
        });

        /**
         *
         * Преобразование дерева объектов к строковому виду
         */
        test("Should stringify tree to json", () => {
            const data = {a: {aa: {aaa: 333}}};

            expect(JSON.stringify(data)).toEqual("{\"a\":{\"aa\":{\"aaa\":333}}}");
        });

        /**
         *
         * Несериализуемые типы преобразуются в пустой объект
         */
        test("Should stringify non serializable types", () => {
            const set = new Set([1, 2, 3]);
            const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
            const obj = Object.create({a: 1, b: 2, c: 3});

            expect(JSON.stringify(set)).toBe("{}");
            expect(JSON.stringify(map)).toBe("{}");
            expect(JSON.stringify(obj)).toBe("{}");
        });

        /**
         *
         * Не должно быть циклических ссылок
         */
        test("Should stringify circular pointer", () => {
            let a = {};
            let b = {a};
            a.b = b;

            expect(() => {
                JSON.stringify(a);
            }).toThrow("Converting circular structure to JSON");
        });

        /**
         *
         * Не должны учитываться свойства с enumerable: false
         */
        test("Should mention nonenumerable property", () => {
            const obj = {
                a: 1,
                b: 2,
                c: 3,
            };

            Object.defineProperty(obj, "c", {enumerable: false});
            expect(JSON.stringify(obj)).toBe("{\"a\":1,\"b\":2}");
        });

        /**
         *
         * Можно указать массив учитываемых свойств
         */
        test("Should use replacer array", () => {
            const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};

            expect(JSON.stringify(obj, ["a", "b", "c"])).toEqual("{\"a\":1,\"b\":2,\"c\":3}");
        });

        /**
         *
         * JSON является независимой от языка спецификацией для данных,
         * поэтому JSON.stringify пропускает некоторые специфические свойства объектов JavaScript.
         *
         * А именно:
         * - Свойства-функции.
         * - Символьные свойства.
         * - Свойства, содержащие undefined.
         */
        test("Should ignore some properties", () => {
            const obj = {
                a: 1,
                b: 2,
                c: () => "TEST",
                [Symbol("id")]: "ID",
                d: undefined,
            };

            expect(JSON.stringify(obj)).toBe("{\"a\":1,\"b\":2}");
        });

        /**
         *
         * Можно отформатировать строку пробелали и символами конца строки
         */
        test("Should stringify with spaces", () => {
            const obj = {a: 1};
            const json = JSON.stringify(obj, null, 4);

            expect(json).toBe("{\n    \"a\": 1\n}")
        });

        /**
         *
         * Для объекта можно указать метов toJSON
         */
        test("Should use toJson", () => {
            const obj = {
                a: 1,
                b: 2,
                c: {
                    something: "SOMETHING",
                    value: 3,
                    toJSON() {
                        return this.value;
                    },
                }
            };

            expect(JSON.stringify(obj)).toBe("{\"a\":1,\"b\":2,\"c\":3}");
        });
    });

    describe("JSON.parse", () => {
        test("Should parse from json", () => {
            const json = "{\"key\":\"value\"}";

            expect(JSON.parse(json)).toEqual({key: "value"});
        });

        /**
         *
         * Json можно выполнить как javascript
         */
        test("Should eval json", () => {
            const json = "{\"key\":[1, 2, 3]}";

            expect(JSON.parse(json)).toEqual({key: [1, 2, 3]});
            expect(eval(`(${json})`)).toEqual({key: [1, 2, 3]});
        });

        /**
         *
         * Нельзя ставить замыкающую запятую
         */
        test("Shouldn't parse with coma", () => {
            const json = "{\"key\":\"value\",}";
            //______________________________∆______________________

            expect(() => JSON.parse(json)).toThrow("Unexpected token");
        });

        /**
         *
         * Имена ключей должны быть завёрнуты в двойные кавычки
         */
        test("Shouldn't parse with coma", () => {
            const json = "{key:\"value\"}";
            //_______________∆_______________________________________

            expect(() => JSON.parse(json)).toThrow("Unexpected token");
        });

        test.todo("Parsing array with nulls");
    });
});

