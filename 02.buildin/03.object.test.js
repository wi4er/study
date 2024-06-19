"use strict";

describe("Object class methods", () => {
    describe("Object.create", () => {
        /**
         *
         * Можно создать объект через Object.create без прототипа
         */
        it("Should create object", () => {
            const inst = Object.create(null);

            expect(inst).not.toBeNull();
            expect(Object.getPrototypeOf(inst)).toBeNull();
        });

        /**
         *
         * Можно создать объект через Object.create с прототипом
         */
        it("Should create object", () => {
            const inst = Object.create({a: 1, b: 2});

            expect(inst.a).toBe(1);
            expect(inst.b).toBe(2);
            expect(inst).toEqual({});
        });

        /**
         *
         * Можно создать объект через Object.create с прототипом и own свойствами
         */
        it("Should create object", () => {
            const inst = Object.create(
                {a: 1, b: 2},
                {
                    c: {value: 3, enumerable: true},
                    d: {value: 4, enumerable: true},
                }
            );

            expect(inst.a).toBe(1);
            expect(inst.b).toBe(2);
            expect(inst).toEqual({c: 3, d: 4});
        });

        /**
         *
         * Можно задать свои свойства присваиванием
         */
        it("Should check own properties", () => {
            const inst = Object.create({a: 1, b: 2, c: 3});
            inst.c = 333;
            inst.d = 444;
            inst.e = 555;

            expect(inst.a).toBe(1);
            expect(inst.b).toBe(2);
            expect(inst.c).toBe(333);
            expect(inst.d).toBe(444);
            expect(inst.e).toBe(555);

            expect(inst).toEqual({c: 333, d: 444, e: 555});
            expect(inst.__proto__).toEqual({a: 1, b: 2, c: 3});
        });

        it("Should create accessor property", () => {
            const obj = Object.create(
                Object.prototype,
                {
                    _a: {
                        value: 10,
                        writable: true,
                    },
                    a: {
                        set(value) {
                            if (value < 0) {
                                this._a = 0;
                            } else {
                                this._a = value;
                            }

                            return this._a;
                        },
                        get() {
                            return this._a;
                        }
                    }
                }
            );

            expect(obj.a).toBe(10);

            obj.a = 20;
            expect(obj.a).toBe(20);

            obj.a = -20;
            expect(obj.a).toBe(0);
        });
    });

    describe("Object.fromEntries", () => {
        /**
         *
         * Можно создать объект из массива вида entries
         */
        it("Should create object from entries", () => {
            const inst = Object.fromEntries([["a", 1], ["b", 2], ["c", 3]]);

            expect(inst).toEqual({a: 1, b: 2, c: 3});
        });

        /**
         *
         * Можно создать объект из итератора entries
         */
        it("Should create object from entries", () => {
            const map = new Map();
            map.set("a", 1);
            map.set("b", 2);
            map.set("c", 3);
            const inst_1 = Object.fromEntries(map);
            expect(inst_1).toEqual({a: 1, b: 2, c: 3});

            const set = new Set([1, 2, 3]);
            const inst_2 = Object.fromEntries(set.entries());
            expect(inst_2).toEqual({1: 1, 2: 2, 3: 3});
        });
    });

    describe("Object.is", () => {
        /**
         *
         * Можно проверить равенство объектов
         */
        it("Should check object prototype", () => {
            const a = {a: 1};
            const b = a;
            const c = {a: 1};

            expect(Object.is(a, b)).toBeTruthy();
            expect(Object.is(a, c)).toBeFalsy();
        });

        it("Should check primitive", () => {
            expect(Object.is(100, 100)).toBeTruthy();
            expect(Object.is(NaN, NaN)).toBeTruthy();
            expect(Object.is("qwe", "qwe")).toBeTruthy();
            expect(Object.is(true, true)).toBeTruthy();
            expect(Object.is(null, null)).toBeTruthy();
        });

        it("Should check 0 is -0", () => {
            expect(Object.is(0, -0)).toBeFalsy();
        });
    });

    describe("Object.getPrototypeOf", () => {
        /**
         *
         * Можно получить прототип объекта
         */
        it("Should get prototype of object", () => {
            const proto = {a: 1, b: 2};
            const inst = Object.create(proto);

            expect(Object.getPrototypeOf(inst)).toBe(proto);
            expect(Object.getPrototypeOf(inst)).not.toBe({a: 1, b: 2});
        });

        test("Should have null proto", () => {
            const inst = Object.create(null);

            expect(Object.getPrototypeOf(inst)).toBe(null);
        });
    });

    describe("Object.getOwnPropertyNames", () => {
        /**
         *
         * Можно получить массив имён своих свойств объекта
         */
        it("Should get property keys", () => {
            const obj = {a: 1, b: 2, c: 3};

            expect(Object.getOwnPropertyNames(obj)).toEqual(["a", "b", "c"]);
        });

        /**
         *
         * Доступны даже те имена которые имеют enumerable=false
         */
        it("Should get object property names", () => {
            const obj = Object.create(
                Object.prototype,
                {
                    a: {value: 1},
                    b: {value: 2},
                    c: {value: 3}
                }
            );

            expect(Object.getOwnPropertyNames(obj)).toEqual(["a", "b", "c"]);
        });
    });

    describe("Object.setPrototypeOf", () => {
        /**
         *
         * Можно изменить протототип объекта
         */
        it("Should set prototype of object", () => {
            const obj = Object.create({a: 1, b: 2});
            expect(obj.a).toBe(1);
            expect(obj.b).toBe(2);

            Object.setPrototypeOf(obj, {a: 11, b: 22});
            expect(obj.a).toBe(11);
            expect(obj.b).toBe(22);
        });
    });

    describe("Object.assign", () => {
        /**
         *
         * Можно сложить все свои ключи из нескольких объектов в новый объект
         */
        it("Should assign object to plain object", () => {
            const a = {a: 1, b: 2, c: 3};
            const b = {d: 4, e: 5};
            const c = Object.assign({}, a, b);

            expect(c).not.toBe(a);
            expect(c).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5});
        });

        /**
         *
         * Складываются только ключи с enumerable = true
         */
        it("Should assign only numerable keys", () => {
            const inst = Object.create({}, {
                a: {value: 1, enumerable: false},
                b: {value: 2, enumerable: true},
            });

            const goal = Object.assign({}, inst);

            expect(Object.getOwnPropertyDescriptor(goal, "a")).toBeUndefined();
            expect(goal.b).toBe(2);
        });

        /**
         *
         * Можно сложить один объект в другой
         */
        it("Should assign 2 object", () => {
            const a = {a: 1, b: 2, c: 3};
            const b = {d: 4, e: 5};
            const c = Object.assign(a, b);

            expect(a).toBe(c);
            expect(a).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5});
            expect(b).toEqual({d: 4, e: 5});
        });
    });

    describe("Object.values", () => {
        /**
         *
         * Можно получить список значений своих свойств объекта
         */
        test("Should get property values", () => {
            const inst = {a: 1, b: 2, c: 3};

            expect(Object.values(inst)).toEqual([1, 2, 3]);
        });

        /**
         *
         * Учитываются только свойства с enumerable = true
         */
        test("Should get property values with enumerable=false", () => {
            const inst = Object.create({}, {
                a: {value: 1, enumerable: false},
                b: {value: 2, enumerable: true},
            });

            expect(Object.values(inst)).toEqual([2]);
        });

        /**
         *
         * Свойства прототипа не учитываются
         */
        it("Shouldn't get values from proto", () => {
            const inst = Object.create({a: 1, b: 2});

            expect(Object.values(inst)).toEqual([]);
        });
    });

    describe("Object.keys", () => {
        /**
         *
         * Можно получить список своих ключей объекта
         */
        it("Should get keys", () => {
            const inst = {a: 1, b: 2, c: 3};

            expect(Object.keys(inst)).toEqual(["a", "b", "c"]);
        });

        /**
         *
         * Учитываются только свойства с enumerable = true
         */
        test("Should get keys with enumerable=true", () => {
            const inst = Object.create({}, {
                a: {value: 1, enumerable: true},
                b: {value: 2, enumerable: true},
                c: {value: 3, enumerable: false},
            });

            expect(Object.keys(inst)).toEqual(["a", "b"]);
        });

        /**
         *
         * Свойства прототипа не учитываются
         */
        test("Shouldn't get keys from proto", () => {
            const inst = Object.create({a: 1, b: 2, c: 3});

            expect(Object.keys(inst)).toEqual([]);
        });
    });

    describe("Object.entries", () => {
        /**
         *
         * Можно получить массив массивов свойств
         */
        it("Should get entries", () => {
            const inst = {a: 1, b: 2, c: 3};

            expect(Object.entries(inst)).toEqual([["a", 1], ["b", 2], ["c", 3]]);
        });

        test("Shouldn't get entries from proto", () => {
            const inst = Object.create({a: 1, b: 2, c: 3});

            expect(Object.entries(inst)).toEqual([]);
        });

        test("Should get entries with enumerable=true", () => {
            const inst = Object.create({}, {
                a: {value: 1, enumerable: true},
                b: {value: 2, enumerable: true},
                c: {value: 3, enumerable: false},
            });

            expect(Object.entries(inst)).toEqual([["a", 1], ["b", 2]]);
        });
    });

    describe("Changing attributes", () => {
        /**
         *
         * Можно заморозить объект, запретив его изменения
         */
        it("Should freeze object", () => {
            const obj = {a: 1, b: 2, c: 3};
            Object.freeze(obj);

            expect(() => obj.a = 10).toThrow("Cannot assign to read only property 'a'");
            expect(() => obj.d = 10).toThrow("Cannot add property d, object is not extensible");
            expect(() => delete (obj.a)).toThrow("Cannot delete property 'a'");

            expect(Object.isSealed(obj)).toBeTruthy();
            expect(Object.isFrozen(obj)).toBeTruthy();
            expect(Object.isExtensible(obj)).toBeFalsy();
        });

        /**
         *
         * Моно запечатать объект, запретив добавление и удления свойств
         */
        it("Should seal object", () => {
            const obj = {a: 1, b: 2, c: 3};
            Object.seal(obj);

            expect(() => obj.d = 10).toThrow();
            expect(() => delete (obj.b)).toThrow();

            obj.a = 111;
            expect(obj).toEqual({a: 111, b: 2, c: 3});

            expect(Object.isSealed(obj)).toBeTruthy();
            expect(Object.isFrozen(obj)).toBeFalsy();
            expect(Object.isExtensible(obj)).toBeFalsy();
        });

        /**
         *
         * Можно запретить добавление новых свойств
         */
        it("Should prevent extensions", () => {
            const obj = {a: 1, b: 2, c: 3};

            Object.preventExtensions(obj);

            expect(() => obj.d = 44).toThrow("Cannot add property d, object is not extensible");
            obj.a = 111;
            delete(obj.c);
            expect(obj).toEqual({a: 111, b: 2});

            expect(Object.isExtensible(obj)).toBeFalsy();
            expect(Object.isFrozen(obj)).toBeFalsy();
            expect(Object.isSealed(obj)).toBeFalsy();
        });
    });
});

describe("Object define property", () => {
    /**
     *
     * Добавляем новое свойство для объекта через defineProperty
     */
    it("Should define property", () => {
        const obj = {};

        Object.defineProperty(
            obj,
            "prop",
            {
                value: "value",
                enumerable: true,
                writable: true,
                configurable: true,
            }
        );

        expect(obj.prop).toBe("value");
    });

    /**
     *
     * Можно добавить сразу несколько свойств
     */
    it("Should define couple properties", () => {
        const obj = {};

        Object.defineProperties(obj, {
            a: {
                value: 1,
                enumerable: true
            },
            b: {
                value: 2,
                enumerable: true
            }
        });

        expect(obj).toEqual({a: 1, b: 2});
    });

    /**
     *
     * Изменяем свойство для объекта через defineProperty
     */
    it("Should edit property", () => {
        const obj = {prop: "old"};
        expect(obj.prop).toBe("old");

        Object.defineProperty(
            obj,
            "prop",
            {value: "new"}
        );

        expect(obj.prop).toBe("new");
        expect(Object.getOwnPropertyDescriptor(obj, "prop").writable).toBeTruthy();
        expect(Object.getOwnPropertyDescriptor(obj, "prop").enumerable).toBeTruthy();
        expect(Object.getOwnPropertyDescriptor(obj, "prop").configurable).toBeTruthy();
    });

    /**
     *
     * Добавляем новое свойство c выключенным writable,
     * такое свойство нельзя редактировать
     */
    it("Should define property", () => {
        const obj = {};

        Object.defineProperty(
            obj,
            "prop",
            {
                value: "value",
                writable: false,
            }
        );

        expect(obj.prop).toBe("value");
        expect(() => {
            obj.prop = "Something";
        }).toThrow("Cannot assign to read only property 'prop' of object");
    });

    /**
     *
     * Добавляем новое свойство c выключенным enumerable,
     * такое свойство нельзя перечислять
     */
    it("Should define property", () => {
        const obj = {a: 1, b: 2, c: 3};

        Object.defineProperty(
            obj,
            "prop",
            {
                value: "value",
                writable: true,
                enumerable: false,
            }
        );

        expect(obj.prop).toBe("value");
        obj.prop = "new";
        expect(obj.prop).toBe("new");
        expect(obj.a).toBe(1);
        expect(obj.b).toBe(2);
        expect(obj.c).toBe(3);

        expect(obj).toEqual({a: 1, b: 2, c: 3});
        expect(Object.keys(obj).length).toBe(3);
    });

    /**
     *
     * Добавляем новое свойство c выключенным configurable,
     * такое свойство нельзя удалить или изменить его дескриптор
     */
    it("Should define property", () => {
        const obj = {a: 1, b: 2, c: 3};

        Object.defineProperty(
            obj,
            "prop",
            {
                value: "value",
                writable: true,
                enumerable: true,
                configurable: false,
            }
        );

        expect(() => {
            delete (obj.prop);
        }).toThrow("Cannot delete property 'prop' ");

        expect(() => {
            Object.defineProperty(
                obj,
                "prop",
                {
                    value: "value",
                    writable: true,
                    enumerable: true,
                    configurable: true,
                }
            );
        }).toThrow("Cannot redefine property: prop");
    });

    /**
     *
     * Получаем дескриптор свойства объекта
     */
    it("Should get property descriptor", () => {
        const obj = {a: 1};
        const descriptor = Object.getOwnPropertyDescriptor(obj, "a");

        expect(descriptor.value).toBe(1);
        expect(descriptor.writable).toBeTruthy();
        expect(descriptor.enumerable).toBeTruthy();
        expect(descriptor.configurable).toBeTruthy();
    });

    /**
     *
     * Получаем дескриптор свойства для замороженного объекта,
     * В этом случае все свойства объекта имеют writable и configurable равными false
     */
    it("Should get property descriptor for frozen object", () => {
        const obj = {a: 1, b: 2};
        Object.freeze(obj);

        const descriptor_a = Object.getOwnPropertyDescriptor(obj, "a");
        expect(descriptor_a.writable).toBeFalsy();
        expect(descriptor_a.enumerable).toBeTruthy();
        expect(descriptor_a.configurable).toBeFalsy();

        const descriptor_b = Object.getOwnPropertyDescriptor(obj, "b");
        expect(descriptor_b.writable).toBeFalsy();
        expect(descriptor_b.enumerable).toBeTruthy();
        expect(descriptor_b.configurable).toBeFalsy();
    });

    /**
     *
     * Получаем дескриптор свойства для запечатанного объекта,
     * В этом случае все свойства объекта имеют configurable равными false
     */
    it("Should get property descriptor for sealed object", () => {
        const obj = {a: 1, b: 2};
        Object.seal(obj);

        const descriptor_a = Object.getOwnPropertyDescriptor(obj, "a");
        expect(descriptor_a.writable).toBeTruthy();
        expect(descriptor_a.enumerable).toBeTruthy();
        expect(descriptor_a.configurable).toBeFalsy();

        const descriptor_b = Object.getOwnPropertyDescriptor(obj, "b");
        expect(descriptor_b.writable).toBeTruthy();
        expect(descriptor_b.enumerable).toBeTruthy();
        expect(descriptor_b.configurable).toBeFalsy();
    });

    /**
     *
     * Можно получить объект с дескрипторами всех свойств
     */
    it("Should get descriptor list", () => {
        const inst = {a: 1, b: 2, c: 3};

        const descr = Object.getOwnPropertyDescriptors(inst);

        expect(descr.a.value).toBe(1);
        expect(descr.a.writable).toBe(true);
        expect(descr.a.enumerable).toBe(true);
        expect(descr.a.configurable).toBe(true);
        expect(descr.b.value).toBe(2);
        expect(descr.c.value).toBe(3);
    });
});

describe("Special methods", () => {
    describe("toString", () => {
        test("Should to string", () => {
            const obj = {
                toString() {
                    return "VALUE";
                }
            };

            expect(String(obj)).toBe("VALUE");
        });

        test("Should convert to number", () => {
            const obj = {
                toString() {
                    return "123";
                }
            };

            expect(+obj).toBe(123);
        });

        test("Should to string with null", () => {
            const obj = {
                toString() {
                    return null;
                }
            };

            expect(String(obj)).toBe("null");
        });

        test("Should to string with null", () => {
            const obj = {
                toString() {
                    return;
                }
            };

            expect(String(obj)).toBe("undefined");
        });
    });

    describe("valueOf", () => {
        test("Should value of", () => {
            const obj = {
                valueOf() {
                    return 100;
                }
            };

            expect(+obj).toBe(100);
        });

        test("Should value of big int", () => {
            const obj = {
                valueOf() {
                    return 100;
                }
            };

            expect(BigInt(obj)).toBe(100n);
        });

        test("Should value of string", () => {
            const obj = {
                valueOf() {
                    return "VALUE";
                }
            };

            expect(String(obj)).toBe("[object Object]");
        });

        test("Should value of Boolean", () => {
            const obj = {
                valueOf() {
                    return 0;
                }
            };

            expect(Boolean(obj)).toBe(true);
        });
    });
});
