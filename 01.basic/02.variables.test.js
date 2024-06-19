"use strict";

/**
 *
 * @see https://learn.javascript.ru/variables
 */
describe("Ecmascript let variables", () => {
    /**
     *
     * Переменная создаётся оператором let
     * При создании переменной её значение равно undefined
     */
    test("Should create let variable", () => {
        let a;
        expect(a).toBeUndefined();
    });

    /**
     *
     * Можно создать переменную с инициализирующим значением
     */
    test("Should create with init value", () => {
        let b = 10;
        expect(b).toBe(10);
    });

    /**
     *
     * Можно присвоить значение переменной
     */
    test("Should set let variable", () => {
        let a;

        a = "123";
        expect(a).toBe("123");
    });

    /**
     *
     * Созданная переменная доступна во вложенных скоупах
     */
    test("Should create let variable in scope", () => {
        let c = 20;
        {
            expect(c).toBe(20);
        }
    });

    /**
     *
     * Переменная созданная во вложенном скоупе не доступна во снаружи
     */
    test("Should create let variable in nested scope", () => {
        {
            let d = 20;
        }
        expect(() => d).toThrow("is not defined");
    });

    /**
     *
     * Имя переменной чувствительно с регистру символов
     */
    test("Should create case sensitive variable", () => {
        let someData = 10;
        let Somedata = 20;

        expect(someData).not.toBe(Somedata);
    });

    /**
     *
     * Можно создать несколько переменных в одном выражении
     */
    test("Should create multiple let variables", () => {
        let
            a = 10,
            b = a + 10,
            c = b + 10;

        expect(a).toBe(10);
        expect(b).toBe(20);
        expect(c).toBe(30);
    });

    test("Should reassign variables", () => {
        let a = 10;
        let b = a = 20;
        let c = b = a = 30;

        expect(a).toBe(30);
        expect(b).toBe(30);
        expect(c).toBe(30);
    });

    /**
     *
     * Можно создать переменные с повторяющимися именами во вложенных скоупах
     */
    test("Should create tree declaration", () => {
        let a = 10;
        let b = 10;
        expect(a).toBe(10);
        expect(b).toBe(10);

        {
            let a = 20;
            expect(a).toBe(20);
            expect(b).toBe(10);

            {
                let a = 30;
                b = 30;
                expect(a).toBe(30);
                expect(b).toBe(30);
            }
        }

        expect(a).toBe(10);
        expect(b).toBe(30);
    });


    /**
     *
     * Нельзя создать несколько переменных с одинаковым именем в одном скоупе
     */
    test("Shouldn't create two variables with same name", () => {
        expect(() => eval(
            "let a = 10;" +
            "let a = 20;"
        )).toThrow("has already been declared");
    });
});

describe("Ecmascript constants", () => {
    /**
     *
     * Константы создаются через оператор const
     */
    test("Should create const variable", () => {
        const a = 10;
        expect(a).toBe(10);
    });
    /**
     *
     * Константа должна быть обязательно инициирована
     */
    test("Should have init value", () => {
        expect(() => eval("const a;")).toThrow("Missing initializer in const declaration");
    });

    /**
     *
     * Значение константы нельзя изменить
     */
    test("Shouldn't change value", () => {
        const b = 10;
        expect(() => b = 20).toThrow("Assignment to constant variable");
    });

    /**
     *
     * Константный объект переопределить нельзя, но внутри него это не распростроняется
     */
    test("Should create const object", () => {
        const c = {value: "OLD"};
        expect(c.value).toBe("OLD");

        c.value = "VALUE";
        expect(c.value).toBe("VALUE");
    });

    /**
     *
     * Можно создать сразу несколько констант в одном выражении,
     * в следующих константах можно использовать преведущие
     */
    test("Should create multiple const variables", () => {
        const
            a = 10,
            b = a + 10,
            c = b + 10;

        expect(a).toBe(10);
        expect(b).toBe(20);
        expect(c).toBe(30);
    });
});
