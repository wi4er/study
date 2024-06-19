"use strict";

const SymbolProperty = require("./SymbolProperty");

describe("Symbol property", () => {
    test("Should create instance", () => {
        const inst = new SymbolProperty();

        expect(inst.someValue).toBe("VALUE");
        expect(inst.someFun()).toBe("RESULT");
    });

    test("Should create ", () => {
        const obj1 = new SymbolProperty();
        const obj2 = new SymbolProperty();

        expect(obj1).toBe(obj2);
    });
});
