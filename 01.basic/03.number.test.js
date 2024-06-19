describe("Number", () => {
    /**
     *
     * NaN является свойством глобального объекта.
     * Начальным значением NaN является Not-A-Number (не-число) — то же самое значение, что и у Number.NaN.
     * В современных браузерах NaN является ненастраиваемым и незаписываемым свойством.
     */
    describe("NaN", () => {
        test("Should get type", () => {
            expect(typeof NaN).toBe("number");
        });

        /**
         *
         * Приведение типов NaN
         */
        test("Should convert NaN", () => {
            expect(String(NaN)).toBe("NaN");
            expect(Boolean(NaN)).toBe(false);
            expect(Number(NaN)).toBe(NaN);
            expect(Symbol(NaN).toString()).toBe("Symbol(NaN)");
            expect(() => BigInt(NaN)).toThrow();
        });

        /**
         *
         * В jest можно проверить на NaN
         */
        test("Should be NaN", () => {
            expect(NaN).toBe(NaN);
            expect(NaN).toBeNaN();
        });

        /**
         *
         * NaN не равен ничему
         */
        test("Should compare NaN", () => {
            expect(NaN === NaN).toBeFalsy();
            expect(NaN == NaN).toBeFalsy();
            expect(NaN == null).toBeFalsy();
            expect(NaN == false).toBeFalsy();
            expect(NaN == 100).toBeFalsy();
            expect(NaN == "qwerty").toBeFalsy();
        });

        /**
         *
         * Математические операции с NaN всегда возвращают NaN
         */
        test("Should check expressions with NaN", () => {
            expect(NaN + 1).toBeNaN();
            expect(NaN / 0).toBeNaN();
            expect(0 / NaN).toBeNaN();
            expect(NaN - NaN).toBeNaN();
            expect(NaN ** NaN).toBeNaN();
            expect(NaN ** 0).toBe(1);
        });

        /**
         *
         * Сравнение с NaN всегда возвращает false
         */
        test("Should compare Nan", () => {
            expect(NaN > 0).toBeFalsy();
            expect(NaN < 0).toBeFalsy();
            expect(NaN >= 100).toBeFalsy();
            expect(NaN <= 100).toBeFalsy();
            expect(NaN in {}).toBeFalsy();
            expect(NaN instanceof Number).toBeFalsy();
        });

        /**
         *
         * Можно проверить является ли значение равным NaN, или приводится ли оно к NaN
         */
        test("Should use isNaN", () => {
            expect(isNaN(NaN)).toBeTruthy();
            expect(isNaN("123,123")).toBeTruthy();
            expect(isNaN("Something")).toBeTruthy();
            expect(isNaN({})).toBeTruthy();

            expect(isNaN(123)).toBeFalsy();
            expect(isNaN("12345")).toBeFalsy();
            expect(isNaN(null)).toBeFalsy();
            expect(isNaN(false)).toBeFalsy();
        });

        /**
         *
         * Можно получить NaN разными способами
         */
        describe("Should get NaN", () => {
            /**
             *
             * Приведение к числу неприводимого значения
             */
            test("Should get by convert to number", () => {
                expect(Number("www")).toBeNaN();
            });

            /**
             *
             * Деление 0 на 0
             */
            test("Should get NaN from operators", () => {
                expect(0 / 0).toBeNaN();
                expect(Infinity / Infinity).toBeNaN();
                expect(Infinity - Infinity).toBeNaN();
            });

            /**
             *
             * Использование неверных операндов в математических операциях
             */
            test("Should get by using wrong operand", () => {
                expect(2 * undefined).toBeNaN();
                expect(200 - undefined).toBeNaN();
                expect(200 ** undefined).toBeNaN();
                expect(100 / [1, 2]).toBeNaN();
                expect(200 + Symbol.observable).toBeNaN();
            });

            /**
             *
             * Передача неверных параметров в методы Math
             */
            test("Should get by Math", () => {
                expect(Math.sqrt(-1)).toBeNaN();
                expect(Math.round("www")).toBeNaN();
                expect(Math.sin({})).toBeNaN();
            });
        });
    });

    /**
     *
     * Глобальное свойство Infinity является числовым значением, представляющим бесконечность.
     */
    describe("Infinity", () => {
        test("Should check infinity", () => {
            expect(Infinity).toBe(Infinity);
            expect(Infinity === Infinity).toBeTruthy();

            expect(Infinity > 1).toBeTruthy();
            expect(Infinity > 1e100).toBeTruthy();

            expect(2 ** 1023).not.toBe(Infinity);
            expect(2 ** 1024).toBe(Infinity);
        });

        test("Should make expression with Infinity", () => {
            expect(Infinity + 1).toBe(Infinity);
            expect(Infinity / 2 ** 1023).toBe(Infinity);
            expect(Infinity * Infinity).toBe(Infinity);
            expect(Infinity ** Infinity).toBe(Infinity);

            expect(1 / 0).toBe(Infinity);
            expect(Infinity / 0).toBe(Infinity);
            expect(1 / Infinity).toBe(0);
            expect(2 ** 1000 / Infinity).toBe(0);

            expect(Infinity / Infinity).toBeNaN();
            expect(Infinity - Infinity).toBeNaN();
        });
    });

    describe("Number constants", () => {
        test("Should have constant", () => {
            expect(Number.MAX_VALUE).toBe(1.7976931348623157e+308); // 2**1024 - 1
            expect(Number.MIN_VALUE).toBe(5e-324);
            expect(Number.MAX_SAFE_INTEGER).toBe(9007199254740991); // 2**53 - 1
            expect(Number.MIN_SAFE_INTEGER).toBe(-9007199254740991); // (-2)**53 + 1
            expect(Number.POSITIVE_INFINITY).toBe(Infinity);
            expect(Number.NEGATIVE_INFINITY).toBe(-Infinity);
            expect(Number.NaN).toBe(NaN);
        });
    });

    describe("Number.isFinite", () => {
        test("Should by infinite", () => {
            expect(Number.isFinite(Infinity)).toBeFalsy();
            expect(Number.isFinite(-Infinity)).toBeFalsy();
            expect(Number.isFinite(NaN)).toBeFalsy();
            expect(Number.isFinite(200n)).toBeFalsy();
            expect(Number.isFinite("qwerty")).toBeFalsy();
        });

        test("Shouldn't be infinite", () => {
            expect(Number.isFinite(100)).toBeTruthy();
            expect(Number.isFinite(0)).toBeTruthy();
        });
    });

    describe("Number.isInteger", () => {
        test("Should be integer", () => {
            expect(Number.isInteger(100)).toBeTruthy();
            expect(Number.isInteger(0)).toBeTruthy();
            expect(Number.isInteger(-200)).toBeTruthy();
            expect(Number.isInteger(2**1023)).toBeTruthy();
        });

        test("Shouldn't be integer", () => {
            expect(Number.isInteger(100.1)).toBeFalsy();
            expect(Number.isInteger("100")).toBeFalsy();
            expect(Number.isInteger("abc")).toBeFalsy();
            expect(Number.isInteger(null)).toBeFalsy();
            expect(Number.isInteger(100n)).toBeFalsy();
            expect(Number.isInteger(Infinity)).toBeFalsy();
            expect(Number.isInteger(NaN)).toBeFalsy();
        });
    });

    describe("Number.isSafeInteger", () => {
        test("Should be safe", () => {
            expect(Number.isSafeInteger(0)).toBeTruthy();
            expect(Number.isSafeInteger(2**53 - 1)).toBeTruthy();
            expect(Number.isSafeInteger(-(2**53 - 1))).toBeTruthy();
        });

        test("Shouldn't be safe", () => {
            expect(Number.isSafeInteger(2**53)).toBeFalsy();
            expect(Number.isSafeInteger(2**1023)).toBeFalsy();
            expect(Number.isSafeInteger(Infinity)).toBeFalsy();
            expect(Number.isSafeInteger(null)).toBeFalsy();
            expect(Number.isSafeInteger(NaN)).toBeFalsy();
        });
    });

    describe("Number.parseInt", () => {
        test("Should parse", () => {
            expect(Number.parseInt("123")).toBe(123);
            expect(Number.parseInt("444.222")).toBe(444);
            expect(Number.parseInt("333abc")).toBe(333);
            expect(Number.parseInt("1 2 3")).toBe(1);
        });

        test("Shouldn't parse", () => {
            expect(Number.parseInt("abc")).toBe(NaN);
            expect(Number.parseInt("a1b2")).toBe(NaN);
            expect(Number.parseInt(true)).toBe(NaN);
            expect(Number.parseInt(null)).toBe(NaN);
            expect(Number.parseInt(undefined)).toBe(NaN);
        });
    });

    describe("Number.parseFloat", () => {
        test("Should parse", () => {
            expect(Number.parseFloat("123")).toBe(123);
            expect(Number.parseFloat("111.222")).toBe(111.222);
            expect(Number.parseFloat("222.333abc")).toBe(222.333);
        });

        test("Shouldn't parse", () => {
            expect(Number.parseFloat("dfg")).toBe(NaN);
            expect(Number.parseFloat(true)).toBe(NaN);
            expect(Number.parseFloat(null)).toBe(NaN);
            expect(Number.parseFloat(undefined)).toBe(NaN);
        });
    });
});
