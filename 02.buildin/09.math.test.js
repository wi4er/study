describe("Math", () => {
    describe("Math constants", () => {
        test("Should have Euler number", () => {
            expect(Math.E).toBe(2.718281828459045);
        });

        test("Should have ln2", () => {
            expect(Math.LN2).toBe(.6931471805599453);
        });

        test("Should have ln10", () => {
            expect(Math.LN10).toBe(2.302585092994046);
        });

        test("Should have log2e", () => {
            expect(Math.LOG2E).toBe(1.4426950408889634);
        });

        test("Should have log10e", () => {
            expect(Math.LOG10E).toBe(.4342944819032518);
        });

        test("Should have pi", () => {
            expect(Math.PI).toBe(3.141592653589793);
        });

        test("Should have sqrt1_2", () => {
            expect(Math.SQRT1_2).toBe(0.7071067811865476);
        });

        test("Should have sqrt2", () => {
            expect(Math.SQRT2).toBe(1.4142135623730951);
        });
    });

    describe("Math methods", () => {
        describe("Math.abs", () => {
            test("Should get absolute value", () => {
                const a = 10;
                const b = -20;

                expect(Math.abs(a)).toBe(10);
                expect(Math.abs(b)).toBe(20);
            });

            test("Should get from another types", () => {
                const a = "123";
                const b = null;
                const c = true;

                expect(Math.abs(a)).toBe(123);
                expect(Math.abs(b)).toBe(0);
                expect(Math.abs(c)).toBe(1);
            });

            test("Should get NaN", () => {
                expect(Math.abs())
            });
        });

        describe("Math.acos", () => {

        });

        describe("Math.asin", () => {

        });

        describe("Math.atan", () => {

        });

        describe("Math.atan2", () => {

        });

        describe("Math.cbrt", () => {

        });

        describe("Math.ceil", () => {

        });

        describe("Math.cos", () => {

        });

        describe("Math.exp", () => {

        });

        describe("Math.floor", () => {

        });

        describe("Math.hypot", () => {

        });

        describe("Math.log", () => {

        });

        describe("Math.max", () => {

        });

        describe("Math.min", () => {

        });

        describe("Math.pow", () => {

        });

        describe("Math.random", () => {

        });

        describe("Math.round", () => {

        });

        describe("Math.sin", () => {

        });

        describe("Math.sqrt", () => {

        });

        describe("Math.tan", () => {

        });
    });
});
