describe("Ecmascript modules", () => {
    it("Should export module", () => {
        const module = require("./mock/module");

        expect(module.getSomething).not.toBeNull();
        expect(module.MyClass).not.toBeNull();
    });

    it("Should export function", () => {
       const {getSomething} = require("./mock/module");

       expect(getSomething()).toBe("Something");
    });

    it("Should export class", () => {
       const {MyClass} = require("./mock/module");
       const inst = new MyClass();

       expect(inst.getValue()).toBe("VALUE");
    });

    it("Should export constant", () => {
       const {SOME_CONSTANT} = require("./mock/module");
       
       expect(SOME_CONSTANT).toBe("SOME_CONSTANT");
    });
});

describe("Ecmascript modules in folder", () => {
    /**
     *
     */
    test("Should import from folder", () => {
        const folder = require("./mock/folder");

        expect(folder()).toBe("IN_FOLDER");
    });

    /**
     *
     */
    test("Should import from folder with package", () => {
        const folder = require("./mock/package");

        expect(folder()).toBe("WITH_PACKAGE");
    });

    /**
     *
     */
    test("Should import form default", () => {
        expect(process.env.NODE_PATH).toBe("mock/default");
        const def = require("default");

        expect(def()).toBe("DEFAULT");
    });

    /**
     *
     */
    test("Should import from node_modules", () => {
        const moment = require("moment");
        const begin = moment("2020-01-01")

        const date = begin.format("ll");
        expect(date).toBe("Jan 1, 2020");
    });

    /**
     * 
     */
    test("Should resolve module", () => {
        const mod = require.resolve("./mock/module");

        expect(mod.endsWith("module/mock/module.js")).toBeTruthy();
    });
});
