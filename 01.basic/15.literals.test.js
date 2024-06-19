"use strict";

/**
 *
 * Plain Object - чистый объект, так называется объект прототипируещий только от Object.prototype
 */
describe("Object literal notation", () => {
    /**
     *
     * Создание объекта через оператор фигурные скобки с инициализацией начальных значений
     */
    it("Should create plain object", () => {
        const obj = {a: 1, b: 2, c: 3};

        expect(obj.a).toBe(1);
        expect(obj.b).toBe(2);
        expect(obj.c).toBe(3);
    });

    /**
     *
     * Создание объекта через оператор фигурные скобки с получением значений из переменных
     * При этом имя переменной становится ключом свойства, а значение - значением свойства
     */
    it("Should create with autofill", () => {
        let a = "aa";
        let b = "bb";
        let c = "cc";

        const inst = {
            a,
            b,
            c,
        };

        expect(inst.a).toBe("aa");
        expect(inst.b).toBe("bb");
        expect(inst.c).toBe("cc");
    });

    /**
     *
     * Создание объекта через оператор фигурные скобки с получением значений в виде функций
     */
    it("Should create with functions", () => {
        const obj = {
            getValue() {
                return "VALUE";
            },
            getSomething() {
                return "SOMETHING";
            },
        };

        expect(obj.getValue()).toBe("VALUE");
        expect(obj.getSomething()).toBe("SOMETHING");
    });

    /**
     *
     * В созданный объект можно добавить новое свойство
     */
    it("Should add property to plain object", () => {
        const obj = {a: 1, b: 2, c: 3};
        obj.d = 4;
        obj.c = 33;

        expect(obj.d).toBe(4);
        expect(obj.c).toBe(33);
    });

    /**
     *
     * Имена свойств можно указывать в виде строк
     */
    it("Should create plain object with string names", () => {
        const obj = {"a": 1, "b": 2, "c": 3};

        obj["d"] = 4;

        expect(obj.a).toBe(1);
        expect(obj.b).toBe(2);
        expect(obj.c).toBe(3);
        expect(obj.d).toBe(4);
    });

    /**
     *
     * Имена свойств могут быть числовыми
     */
    it("Should create plain object with number names", () => {
        const obj = {11: 1, 22: 2, 33: 3};

        expect(obj[11]).toBe(1);
        expect(obj["11"]).toBe(1);
        expect(obj[22]).toBe(2);
        expect(obj[33]).toBe(3);
    });

    /**
     *
     * Имена свойств можно взять из переменных
     */
    it("Should create plain object with var names", () => {
        let a = "aa";
        let b = "bb";
        let c = "cc";
        const obj = {
            [a]: 1,
            [b]: 2,
            [c]: 3,
        };

        expect(obj.aa).toBe(1);
        expect(obj.bb).toBe(2);
        expect(obj.cc).toBe(3);
    });

    /**
     *
     * Именем свойства может быть любое значение приводимое к строке
     */
    it("Should create plain object with nontypical names", () => {
        const sym = Symbol("1");
        const ar = [1, 2, 3];
        const obj = {
            [true]: 1,
            [undefined]: 2,
            [null]: 3,
            [sym]: 4,
            [ar]: 5,
            [`value_${123}`]: 123,
        };

        const emptyVar = undefined;

        expect(obj[true]).toBe(1);

        expect(obj[undefined]).toBe(2);
        expect(obj.undefined).toBe(2);
        expect(obj["undefined"]).toBe(2);
        expect(obj[emptyVar]).toBe(2);

        expect(obj[null]).toBe(3);
        expect(obj.null).toBe(3);
        expect(obj["null"]).toBe(3);

        expect(obj[sym]).toBe(4);
        expect(obj["1,2,3"]).toBe(5);
        expect(obj.value_123).toBe(123);
    });

    /**
     *
     * Именем свойства может быть объект приводимый к строке
     */
    it("Should cast to string from object", () => {
        const obj = {
            [{toString: () => "VAR_NAME"}]: "VAR_VALUE",
        };
        
        expect(obj["VAR_NAME"]).toBe("VAR_VALUE");
        expect(obj[{toString: () => "VAR_NAME"}]).toBe("VAR_VALUE");
    });

    /**
     *
     * Обращаться к переменной можно
     * - Через точку, указав имя
     * - В квадратный скобках, указав имя в строке
     * - В квадратный скобках, указав имя в значении переменной
     */
    it("Should call plain object properties", () => {
        let cccc = "c";
        const obj = {a: 1, b: 2, c: 3};

        expect(obj.a).toBe(1);
        expect(obj["b"]).toBe(2);
        expect(obj[cccc]).toBe(3);
    });

    /**
     *
     * Прототипом является Object.prototype
     */
    it("Should check plain object proto", () => {
        const obj = {a: 1, b: 2, c: 3};

        expect(obj.__proto__).toBe(Object.prototype);
    });
});

describe("Array literal", () => {
    /**
     *
     * Можно создать массив
     */
    test("Should create array", () => {
        const arr = [1, 2, 3];

        expect(arr instanceof Array).toBeTruthy();
    });

    /**
     *
     * Можно пропускать элементы в литерале
     */
    test("Should skip elements", () => {
        const arr = [1, , 3, , 5];

        expect(arr.length).toBe(5);
        expect(Object.getOwnPropertyNames(arr)).toEqual(["0", "2", "4", "length"])
    });

    /**
     *
     * Можно использовать вместе с методом Array.prototype
     */
    test("Should use with methods", () => {
        const direction = "left";
        const exists = ["up", "down", "left", "right"].includes(direction);

        expect(exists).toBeTruthy();
    });

    /**
     *
     * Внутри литерала можно использовать оператор спред
     */
    test("Should use spread", () => {
        const arr = [1, 2, 3];
        const add = [1, 2, 3, ...arr];

        expect(add).toEqual([1, 2, 3, 1, 2, 3]);
    });
});

describe("String literal", () => {
    /**
     *
     * Можно создать строку через литерал
     */
    test("Should create string", () => {
        const str_1 = "VALUE";
        const str_2 = 'VALUE';

        expect(str_1).toBe("VALUE");
        expect(str_2).toBe("VALUE");
    });

    /**
     *
     * Можно использовать экранирование символов
     */
    test("Should use escape symbols", () => {
        const value = "\\";

        expect(value.length).toBe(1);
        expect(value.charCodeAt(0)).toBe(92);
    });

    /**
     *
     * Можно вкладывать одни кавычки в другие
     */
    test("Should use inner quotes", () => {
        const value_1 = "'";
        const value_2 = '"';

        expect(value_1).toBe("'");
        expect(value_2).toBe("\"");
    });

    /**
     *
     * Можно использовать символы юникод
     */
    test("Should use with unicode", () => {
        expect("\u00FF\u00FF\u00FF").toBe("ÿÿÿ");
        expect("\u{AA}\u{AA}\u{AA}").toBe("ªªª");
    });

    /**
     *
     * Можно использовать суррогатные пары
     */
    test("Should use with surrogate pairs", () => {
        expect("\u{100002}").toBe("􀀂");
        expect("\uD800\uDC01").toBe("𐀁");
    });

    /**
     *
     * на литерале можно вызывать методы String.prototype
     */
    test("Should use method on literal", () => {
        expect("qwerty".length).toBe(6);
        expect("qwerty".toUpperCase()).toBe("QWERTY");
    });
});

describe("Template literal", () => {
    /**
     *
     * Можно создать литерал через обратные скобки
     */
    test("Should create literal", () => {
        const value = `VALUE`;

        expect(value).toBe("VALUE");
    });

    /**
     *
     * Литерал может получать переменные в фигурных скобках
     */
    test("Should template", () => {
        const b = 10;
        const a = `VALUE=${b}`;

        expect(a).toBe("VALUE=10");
    });

    /**
     *
     * Литерал может получать переменные в фигурных скобках
     */
    test("Should template", () => {
        let empty;
        const a = `VALUE=${empty}`;
        const b = `VALUE=${empty ?? ""}`;

        expect(a).toBe("VALUE=undefined");
        expect(b).toBe("VALUE=");
    });

    /**
     *
     * Литерал может быть многострочным
     */
    test("Should multiline template", () => {
        const a = 10;
        const b = 20;
        const c = 30;
        const list = `
    VALUE_1=${a}
    VALUE_2=${b}
    VALUE_3=${c}
`;

        expect(list).toBe("\n    VALUE_1=10\n    VALUE_2=20\n    VALUE_3=30\n");
    });

    /**
     *
     * Внутри литералов можно писать любые выражения
     */
    test("Should template with expression", () => {
        const getA = () => 10;
        const getB = () => 20;
        const template = `VALUE=${getA() + getB()}`

        expect(template).toBe("VALUE=30");
    });

    /**
     *
     * Результат выражения будет приведён к строке
     */
    test("Should template with primitive values", () => {
        expect(`VALUE=${undefined}`).toBe("VALUE=undefined");
        expect(`VALUE=${null}`).toBe("VALUE=null");
        expect(`VALUE=${false}`).toBe("VALUE=false");
    });

    /**
     *
     * Литерал можно вложить в другой литерал
     */
    test("Should template with included literal", () => {
        const a = 10;
        const b = 20;

        const list = `VALUE${a === 10 ? `=${a + b}` : `=${b - a}`}`

        expect(list).toBe("VALUE=30");
    });

    /**
     *
     * Можно использовать тэговую функцию, для кастомной шаблонизации
     */
    test("Should template with tag", () => {
        function withTag(template, ...args) {
            let res = "";
            
            for (let i in template) {
                if (template[i]) {
                    res += `${template[i]}=${args[i]}`;
                }
            }

            return res;
        }

        let a = 10;
        let b = 20;

        const tag = withTag`v1${a} v2${b}`;
        expect(tag).toBe("v1=10 v2=20");
    });

    /**
     *
     * Можно получить неэкранированные строки
     */
    test("Should get raw template", () => {
        function withTag(template) {
            return template.raw[0]
        }

        const a = withTag`Some string!\n`;

        expect(a).toBe("Some string!\\n")
    });
});

describe("Regular expression literal", () => {
    /**
     *
     * Можно создать регулярное выражение
     */
    test("Should create regular expression", () => {
        const expr = /\D/;

        expect(expr instanceof RegExp).toBeTruthy();
    });

    /**
     *
     * Можно создать регулярное выражение с флагами
     */
    test("Should create regular expression with flags", () => {
        const expr = /test/i;

        expect(expr.test("test")).toBeTruthy();
        expect(expr.test("TEST")).toBeTruthy();
        expect(expr.test("TeSt")).toBeTruthy();
    });

    /**
     *
     * На литерале можно вызывать методы RegExp.prototype
     */
    test("Should use regexp with method", () => {
        expect(/abc/.test("abcd")).toBeTruthy();
        expect(/abc/i.test("==ABC==")).toBeTruthy();
    });

    /**
     *
     * Литерал может содержать экранированные символы
     */
    test("Should create with escape character", () => {
        const expr = /\\|\n|\"|\//;

        expect(expr.test("\\")).toBeTruthy();
        expect(expr.test("/")).toBeTruthy();
        expect(expr.test('"')).toBeTruthy();
        expect(expr.test(`
        `)).toBeTruthy();
        expect(expr.test("abc")).toBeFalsy();
    });
});




