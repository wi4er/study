describe("Hoisting", () => {
    describe("Hoisting with let statement", () => {
        /**
         *
         */
        test("Should hoist", () => {
            expect(() => b).toThrow("b is not defined");
            expect(() => a).toThrow("Cannot access 'a' before initialization");

            let a = 10;
        });

        /**
         *
         */
        test("Shouldn't hoist", () => {
            expect(() => a).toThrow("a is not defined");

            if (true) {
                expect(() => a).toThrow("Cannot access 'a' before initialization");

                let a = 10;

                expect(a).toBe(10);
            }
        });

        /**
         *
         */
        test("Should hoist with let in subscope", () => {
            let a = 10;
            let b = 20;

            if (true) {
                expect(b).toBe(20);
                expect(() => a).toThrow("Cannot access 'a' before initialization");

                let a = 20;
            }

            expect(a).toBe(10);
        });

        /**
         *
         */
        test("Should get from scope", () => {
            function get() {
                return value;
            }

            expect(() => get()).toThrow("Cannot access 'value' before initialization");

            let value = 10;

            expect(get()).toBe(10);
        });

        /**
         *
         */
        test("Should get from scope", () => {
            let value = 10;

            function get() {
                return value;

                let value = 20;
            }

            expect(() => get()).toThrow("Cannot access 'value' before initialization");
        });
    });

    describe("Hoisting with function statement", () => {
        /**
         *
         */
        test("Should hoist", () => {
            expect(get()).toBe("value");

            function get() {
                return "value";
            }

            expect(get()).toBe("value");
        });

        /**
         *
         */
        test("Should hoist", () => {
            expect(get).toBeUndefined();

            {
                expect(get()).toBe("value");

                function get() {
                    return "value";
                }
            }

            expect(get()).toBe("value");
        });

        /**
         *
         */
        test("Should hoist with self invoke function", () => {
            expect(() => getValue).toThrow("getValue is not defined");

            (function getValue() {
                return "bottom";
            })();

            expect(() => getValue).toThrow("getValue is not defined");
        });

        /**
         *
         */
        test("Should hoist in different instances", () => {
            function getValue() {
                return "top";
            }

            expect(getValue()).toBe("top");

            if (true) {
                expect(getValue()).toBe("bottom");

                function getValue() {
                    return "bottom";
                }
            }

            expect(getValue()).toBe("bottom");
        });
    });

    describe("Hoisting with class definition", () => {
        /**
         *
         */
        test("Should hoist class", () => {
            expect(() => Type).toThrow("Cannot access 'Type' before initialization");

            class Type {
            }

            expect(typeof Type).toBe("function");
        });
    });
});
