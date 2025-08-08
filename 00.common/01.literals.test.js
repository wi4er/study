"use strict";

describe('Literals', function () {
    test("Primitive literals", async () => {
        const number = 1;
        const string = '1';
        const boolean = true;
        const bigInt = 1n;
        const nul = null;

        expect(number).toBe(1);
        expect(string).toBe('1');
        expect(boolean).toBe(true);
        expect(bigInt).toBe(1n);
        expect(nul).toBe(null);
    });
});
