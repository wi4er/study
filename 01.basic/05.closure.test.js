describe("Closure", () => {
    /**
     *
     * Можно получить доступ к переменным созданным в вышестоящих скоупах
     */
    test("Should get from closure", () => {
        let value = "VALUE";

        function getValue() {
            return value;
        }

        expect(getValue()).toBe("VALUE");
    });

    /**
     *
     * Доступ к переменной осуществляется через скоуп, который может меняться
     */
    test("Should get from expression below statement", () => {
        function getValue() {
            return value;
        }

        let value = "VALUE";

        expect(getValue()).toBe("VALUE");
    });

    /**
     *
     * Можно менять скоуп и функция увидит эти изменения
     */
    test("Should get from modified variable", () => {
        let value = "VALUE";

        function getValue() {
            return value;
        }

        expect(getValue()).toBe("VALUE");

        value = "ANOTHER";
        expect(getValue()).toBe("ANOTHER");
    });

    /**
     *
     * Функция может менять значение в скоупе
     */
    test("Should modify variable from scope", () => {
        let value = 1;

        function getValue() {
            return ++value;
        }

        getValue();
        expect(value).toBe(2);

        getValue();
        expect(value).toBe(3);

        getValue();
        expect(value).toBe(4);
    });

    /**
     *
     * Вложенность кложуров для функции может быть множественная
     */
    test("Should deep closure", () => {
        let value = "VALUE";

        function getValue() {
            let count = "COUNT";

            return function() {
                return value + " " + count;
            }
        }

        expect(getValue()()).toBe("VALUE COUNT");
    });
});
