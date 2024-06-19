describe("Multitone", () => {
    describe("Class multitone with private", () => {
        class Custom {
            static #list = new Map();

            constructor(id) {
                if (
                    typeof id !== "number"
                    || isNaN(id)
                ) {
                    throw RangeError("id argument number type expected")
                }

                if (Custom.#list.has(id)) {
                    return Custom.#list.get(id);
                }

                Custom.#list.set(id, this);
            }
        }

        test("Should create instances with same id", () => {
            const obj1 = new Custom(1);
            const obj2 = new Custom(1);

            expect(obj1).toBe(obj2);
        });

        test("Should create instances with different id", () => {
            const obj1 = new Custom(1);
            const obj2 = new Custom(2);

            expect(obj1).not.toBe(obj2);
        });

        test("Shouldn't create with wrong id", () => {
            expect(() => new Custom("qwe")).toThrow(RangeError);
            expect(() => new Custom(NaN)).toThrow(RangeError);
        });
    });

    describe("Class multitone with symbol", () => {
        const sym = Symbol("instance");

        class Custom {
            static [sym] = new Map();

            constructor(id) {
                if (
                    typeof id !== "number"
                    || isNaN(id)
                ) {
                    throw RangeError("id argument number type expected")
                }

                if (Custom[sym].has(id)) {
                    return Custom[sym].get(id);
                }

                Custom[sym].set(id, this);
            }
        }

        test("Should create class instances with same id", () => {
            const obj1 = new Custom(1);
            const obj2 = new Custom(1);

            expect(obj1).toBe(obj2);
        });

        test("Should create instances with different id", () => {
            const obj1 = new Custom(1);
            const obj2 = new Custom(2);

            expect(obj1).not.toBe(obj2);
        });

        test("Shouldn't create with wrong id", () => {
            expect(() => new Custom("qwe")).toThrow(RangeError);
            expect(() => new Custom(NaN)).toThrow(RangeError);
        });
    });
});
