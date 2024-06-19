describe("RegExp", () => {
    describe("RegExp creation", () => {
        test("Should create regular expression with regexp literal", () => {
            const expr = /\D/;

            expect(typeof expr).toBe("object");
            expect(expr.test("A")).toBeTruthy();
        });

        test("Should create regular expression with regexp constructor", () => {
            const expr = new RegExp("\\d");

            expect(typeof expr).toBe("object");
            expect(expr.test("8")).toBeTruthy();
        });
    });

    test("Should have s flag", () => {
        const expr = /\D/s;

        expect(expr.dotAll).toBeTruthy();
    });

    describe("RegExp.prototype.flags", () => {
        test("Should have flags", () => {
            const expr = /\D/;

            expect(expr.flags).toBe("");
        });

        test("Should have flags", () => {
            const expr = /\d/ig;

            expect(expr.flags).toBe("gi");
        });
    });

    describe("RegExp.prototype", () => {
        test("Should ", () => {

        });
    });
});
