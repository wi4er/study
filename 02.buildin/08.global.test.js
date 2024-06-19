describe("Global object", () => {
    describe("Global properties", () => {
        test("Should have globalThis", () => {
            // var someKey = "someValue";
            //
            // expect(global.someKey).toBe("someValue");
        });

        test("Should have infinity", () => {
            expect(globalThis.Infinity).toBe(Infinity);
        });

        test("Should have NaN", () => {
            expect(globalThis.NaN).toBeNaN();
        });

        test("Should have undefined", () => {
            expect(globalThis.undefined).toBeUndefined();
        });
    });

    describe("Global buildins", () => {
        test("Should have collections", () => {
            expect(globalThis.Set).toBe(Set);
            expect(globalThis.Map).toBe(Map);
            expect(globalThis.Array).toBe(Array);
            expect(globalThis.WeakSet).toBe(WeakSet);
            expect(globalThis.WeakMap).toBe(WeakMap);

            expect(globalThis.TypedArray).toBe(undefined); // exists
        });

        test("Should have functions", () => {
            expect(globalThis.Function).toBe(Function);

            expect(globalThis.AsyncFunction).toBe(undefined); // exists
            expect(globalThis.GeneratorFunction).toBe(undefined); // exists
            expect(globalThis.AsyncGeneratorFunction).toBe(undefined); // exists
        });

        test("Should have Types", () => {
            expect(globalThis.Number).toBe(Number);
            expect(globalThis.BigInt).toBe(BigInt);
            expect(globalThis.String).toBe(String);
            expect(globalThis.Boolean).toBe(Boolean);
            expect(globalThis.Symbol).toBe(Symbol);

            expect(globalThis.Undefined).toBe(undefined); // not exists
            expect(globalThis.Null).toBe(undefined); // not exists
        });

        test("Should have errors", () => {
            expect(globalThis.Error).toBe(Error);
            expect(globalThis.EvalError).toBe(EvalError);
            expect(globalThis.RangeError).toBe(RangeError);
            expect(globalThis.ReferenceError).toBe(ReferenceError);
            expect(globalThis.SyntaxError).toBe(SyntaxError);
            expect(globalThis.TypeError).toBe(TypeError);
            expect(globalThis.URIError).toBe(URIError);
        });

        test("Should have special types", () => {
            expect(globalThis.ArrayBuffer).toBe(ArrayBuffer);
            expect(globalThis.DataView).toBe(DataView);
            expect(globalThis.Date).toBe(Date);
            expect(globalThis.Object).toBe(Object);
            expect(globalThis.Promise).toBe(Promise);
            expect(globalThis.Proxy).toBe(Proxy);
            expect(globalThis.RegExp).toBe(RegExp);
            expect(globalThis.SharedArrayBuffer).toBe(SharedArrayBuffer);
        });
    });

    describe("Global object methods", () => {
        test("Should have eval", () => {
            const a = globalThis.eval("10");

            expect(a).toBe(10);
        });

        test("Should have isFinite", () => {
            expect(globalThis.isFinite(NaN)).toBeFalsy();
            expect(globalThis.isFinite(Infinity)).toBeFalsy();
            expect(globalThis.isFinite(-Infinity)).toBeFalsy();
            expect(globalThis.isFinite("qwe")).toBeFalsy();
        });

        test("Should have isNaN", () => {
            expect(globalThis.isNaN(NaN)).toBeTruthy();
            expect(globalThis.isNaN("qwe")).toBeTruthy();
            expect(globalThis.isNaN({})).toBeTruthy();

            expect(globalThis.isNaN(123)).toBeFalsy();
            expect(globalThis.isNaN("321")).toBeFalsy();
        });

        test("Should have parseFloat", () => {
            expect(globalThis.parseFloat("123")).toBe(123);
            expect(globalThis.parseFloat("123.321")).toBe(123.321);
            expect(globalThis.parseFloat("123.abc")).toBe(123);
            expect(globalThis.parseFloat("abc.321")).toBe(NaN);
        });

        test("Should have parseInt", () => {
            expect(globalThis.parseInt("123")).toBe(123);
            expect(globalThis.parseInt("333qwe")).toBe(333);
            expect(globalThis.parseInt("333.333")).toBe(333);
            expect(globalThis.parseInt("qwe")).toBeNaN();
        });

        test("Should have decodeURI", () => {
            expect(globalThis.decodeURI("https://ukr.net")).toBe("https://ukr.net");
            expect(globalThis.decodeURI(
                "https://ukr.net?name=%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC"
            )).toBe("https://ukr.net?name=максим");
        });

        test("Should have encodeURI", () => {
            expect(globalThis.encodeURI(
                "https://ukr.net?name=максим"
            )).toBe("https://ukr.net?name=%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC");
        });

        test.todo("Should have encodeURIComponent");
    });
});
