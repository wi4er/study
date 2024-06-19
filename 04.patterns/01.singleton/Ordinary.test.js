"use strict"
const single = require("./Ordinary");

describe("Ordinary singleton", () => {
    test("Should use singleton", () => {
        expect(single.someFun()).toBe("SOME_FUN");
        expect(single.someValue).toBe("VALUE");
    });

    test("Shouldn't change singleton", () => {
        expect(() => {
            single.a = 10;
        }).toThrow("Cannot add property a, object is not extensible");

        expect(() => {
            single.someValue = 10;
        }).toThrow("Cannot assign to read only property 'someValue' of object ");
    });
});
