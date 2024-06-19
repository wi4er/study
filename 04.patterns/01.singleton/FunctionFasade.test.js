"use strict";

const getInstance = require("./FunctionFasade");

describe("Class singleton with function", () => {
    test("Should create instance", () => {
        const inst = getInstance();

        expect(inst.someFun()).toBe("result");
        expect(inst.someValue).toBe("value");
    });

    test("Should by singleton", () => {
        const obj1 = getInstance();
        const obj2 = getInstance();

        expect(obj1).toBe(obj2);
    });
});
