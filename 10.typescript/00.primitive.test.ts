
describe("Primitive types", () => {
    describe("Number types", () => {
        test("Should create number", () => {
            const value: Number = 10;
        });
    });

    describe("String type", () => {
        test("Should create string", () => {
            const value: String = "123";
        });
    });

    describe("Boolean type", () => {
        test("Should create boolean", () => {
            const value: Boolean = true;
        });

        test("Should reassign value", () => {
            let value: Boolean = false;

            value = 1 === 1;

            expect(value).toBe(true);
        });
    })
});
