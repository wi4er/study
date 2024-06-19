"use strict";

describe("Spread with arrays", () => {
    /**
     *
     * Можно заспредить любой итерируемый объект в массив
     */
    it("Should spread array", () => {
        const a = [1, 2, 3];
        const b = [...a];

        expect(b).toEqual([1, 2, 3]);
    });

    /**
     *
     * Можно использовать спред несколько раз в одном литерале
     */
    it("Should spread two arrays", () => {
        const a = [1, 2, 3];
        const b = [4, 5, 6];
        const c = [...a, ...b];
        const d = [...b, ...a];

        expect(c).toEqual([1, 2, 3, 4, 5, 6]);
        expect(d).toEqual([4, 5, 6, 1, 2, 3]);
    });

    /**
     *
     * Можно заспредить в любом месте литерала вместе с другими значениями
     */
    it("Should spread with values", () => {
        const a = [3, 4, 5];
        const b = [1, 2, ...a, 6, 7];

        expect(b).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    /**
     *
     * Будут использованы только валидные индексы массива
     */
    it("Should spread with custom keys", () => {
        const arr = [1, 2, 3];
        arr.key_1 = "aaa";
        arr.push(4);
        arr.key_2 = "bbb";
        arr.push(5);

        const target = [...arr];
        expect(target).toEqual([1, 2, 3, 4, 5]);
    });

    /**
     *
     * Можно заспредить строку в массив
     */
    it("Should spread string into array", () => {
        const str = "qwerty🌏";

        expect([...str]).toEqual(["q", "w", "e", "r", "t", "y", "🌏"])
    });

    /**
     *
     * Можно заспредить сет в массив
     */
    it("Should spread Set into array", () => {
        const set = new Set([1, 2, 3, 1, 4]);

        expect([...set]).toEqual([1, 2, 3, 4]);
    });

    /**
     *
     * Можно заспредить мап в массив
     */
    it("Should spread Map into array", () => {
        const map = new Map();
        map.set("a", 1);
        map.set("b", 2);
        map.set("c", 3);

        const a = [...map, ["d", 4], ["e", 5]];

        expect(a).toEqual([["a", 1], ["b", 2], ["c", 3], ["d", 4], ["e", 5]]);
    });

    /**
     *
     * Можно заспредить генератор в Array literal
     */
    it("Should spread generator", () => {
        function* generate() {
            yield 1;
            yield 2;
            yield 3;
        }

        const a = [...generate(), 4];
        expect(a).toEqual([1, 2, 3, 4]);
    });

    /**
     *
     * Можно заспредить кастомный итератор в Array literal
     */
    it("Should spread custom iterator", () => {
        function Iterator() {
            this.count = 0;
        }

        Iterator.prototype[Symbol.iterator] = function () {
            return {
                count: this.count,
                next() {
                    if (++this.count <= 3) {
                        return {value: this.count};
                    }

                    return {done: true};
                }
            };
        }

        const inst = new Iterator();

        expect([...inst]).toEqual([1, 2, 3]);
    });

    /**
     *
     * Неитерируемый объект заспредить нельзя
     */
    it("Shouldn't spread Object into array", () => {
        const a = {a: 1, b: 2, c: 3};

        expect(() => [...a]).toThrow("a is not iterable");
    });

    /**
     *
     * Нельзя заспредить примитив
     */
    it("Shouldn't spread primitive", () => {
        const a = 10;

        expect(() => [...a]).toThrow("a is not iterable");
    });
});

describe("Spread with objects", () => {
    /**
     *
     * Можно заспредить один объект в другой
     */
    it("Should spread object", () => {
        const a = {a: 1, b: 2};
        const b = {...a};

        expect(b).toEqual({a: 1, b: 2});
    });

    /**
     *
     * Можно использовать спред несколько раз
     */
    it("Should spread multiple object", () => {
        const a = {a: 1, b: 2};
        const b = {c: 3, d: 4};
        const c = {...a, ...b};

        expect(c).toEqual({a: 1, b: 2, c: 3, d: 4});
    });

    /**
     *
     * Можно спредить в любом месте литерала и мешать с другими значениями
     */
    it("Should spread with values", () => {
        const a = {c: 3, d: 4};
        const b = {a: 1, b: 2, ...a, e: 5, f: 6};

        expect(b).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6});
    });

    /**
     *
     * Будут использовать только свои свойства объекта
     */
    it("Should spread object with prototype", () => {
        const inst = Object.create({a: 1, b: 2});

        const a = {...inst, c: 3};
        expect(a).toEqual({c: 3});
    });

    /**
     *
     * У мап нет своих свойств, поэтому результат спреда всегда будет пустым
     */
    it("Should spread Map", () => {
        const map = new Map();
        map.set("a", 1);
        map.set("b", 2);
        map.set("c", 3);

        const a = {...map, d: 4};

        expect(Object.getOwnPropertyNames(map)).toEqual([]);
        expect(a).toEqual({d: 4});
    });

    /**
     *
     * У объекта функции нет своих ключей, поэтому результат спреда будет пустым
     */
    it("Should spread function", () => {
        function a() {
        }

        const b = {a: 1, ...a, b: 2};

        expect(b).toEqual({a: 1, b: 2});
    });

    /**
     *
     * Можно заспредить массив в объект, в таком случае будут индексы будут использованы как свойства
     */
    it("Should spread array into object", () => {
        const a = [1, 2, 3];
        a.key = "aaa";
        const b = {...a, ...a, 4: 4444};

        expect(b).toEqual({0: 1, 1: 2, 2: 3, 4: 4444, key: "aaa"});
    });

    /**
     *
     * Можно заспредить строку поэлементно
     */
    it("Should", () => {
        const str = "qwe";

        expect({...str}).toEqual({0: "q", 1: "w", 2: "e"})
    });

    /**
     *
     * Будут учитываться только те ключи у которых enumerable = true
     */
    it("Should spread with enumerable", () => {
        const obj = Object.create(Object.prototype, {
            a: {
                value: 1,
                enumerable: false,
            },
            b: {
                value: 2,
                enumerable: true,
            }
        });

        const target = {...obj};
        expect(target).toEqual({b: 2});
    });

    /**
     *
     * Можно заспредить примитив и специальные значения
     */
    it("Should spread primitive", () => {
        expect({...10}).toEqual({});
        expect({...true}).toEqual({});
        expect({...null}).toEqual({});
        expect({...undefined}).toEqual({});
    });
});

describe("Spread with functions", () => {
    /**
     *
     * Можно заспредить любой итератор в вызов функции, например массив
     */
    it("Should spread in arguments", () => {
        function getValue(arg1, arg2, arg3) {
            return `${arg1}+${arg2}+${arg3}`;
        }

        const params = [1, 2, 3];

        expect(getValue(...params)).toBe("1+2+3");
    });

    /**
     *
     * Можно заспредить сет в вызов функции
     */
    it("Should spread set", () => {
        function getValue(arg1, arg2, arg3) {
            return `${arg1}+${arg2}+${arg3}`;
        }

        const set = new Set([1, 2, 3]);
        expect(getValue(...set)).toBe("1+2+3");
    });

    /**
     *
     * Можно заспредить объект реализующий интерфейс литерации
     */
    it("Should spread object", () => {
        function getValue(arg1, arg2, arg3) {
            return `${arg1}+${arg2}+${arg3}`;
        }

        const obj = {
            a: 111,
            b: 222,
            c: 333,
            * [Symbol.iterator]() {
                for (let key in this) {
                    yield this[key];
                }
            }
        };

        expect(getValue(...obj)).toBe("111+222+333");
    });

    /**
     *
     * Нельзя заспредить объект
     */
    it("Shouldn't spread object without iteration interface", () => {
        function getValue(arg1, arg2) {
            return [arg1, arg2];
        }

        expect(() => {
            getValue(...{a: 1, b: 2});
        }).toThrow(TypeError);
    });
});
