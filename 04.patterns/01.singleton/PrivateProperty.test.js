"use strict";

const PrivateProperty = require("./PrivateProperty");

describe("Class singletone with private static property", () => {
    test("Should create instance", () => {
        const inst = new PrivateProperty();

    });

    test("Should create class singleton", () => {
        const obj1 = new PrivateProperty();
        const obj2 = new PrivateProperty();

        expect(obj1).toBe(obj2);
    });

    test("Should", () => {

        PrivateProperty.#instance;
    })
});
