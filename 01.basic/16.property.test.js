describe("Properties", () => {
    /**
     *
     * A data property associates a key value with the attributes: [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
     */
    describe("Data property", () => {
        /**
         *
         * Можно создать свойство в объекте через литерал
         */
        test("Should create with object literal initialization", () => {
            const obj = {
                data: "VALUE",
            };

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать внутри функции конструктора
         */
        test("Should create with constructor function", () => {
            function Custom() {
                this.data = "VALUE";
            }

            const obj = new Custom();

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через свойство класса
         */
        test("Should create with class definition", () => {
            class Custom {
                data = "VALUE";
            }

            const obj = new Custom();

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через метод класса
         */
        test("Should create with class definition", () => {
            class Custom {
                getData() {
                    return "VALUE";
                }
            }

            const obj = new Custom();

            const descriptor = Object.getOwnPropertyDescriptor(obj.__proto__, "getData");
            expect(typeof descriptor.value).toBe("function");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через конструктор класса
         */
        test("Should create with class constructor", () => {
            class Custom {
                constructor() {
                    this.data = "VALUE";
                }
            }

            const obj = new Custom();

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через статическое свойство класса
         */
        test("Should create with class static", () => {
            class Custom {
                static data = "VALUE";
            }

            const descriptor = Object.getOwnPropertyDescriptor(Custom, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через присвоение свойства объекта
         */
        test("Should cate with property assignment", () => {
            const obj = {};

            expect(Object.isExtensible(obj)).toBeTruthy();

            obj.data = "VALUE";

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(true);
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через второй аргумент функции Object.create
         */
        test("Should create with object create", () => {
            const obj = Object.create(
                Object.prototype,
                {
                    data: {
                        value: "VALUE",
                    },
                }
            );

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(false);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.configurable).toBe(false);
        });

        /**
         *
         * Можно создать через метод Object.defineProperty
         */
        test("Should create with define property", () => {
            const obj = {};

            expect(Object.isExtensible(obj)).toBeTruthy();

            Object.defineProperty(
                obj,
                "data",
                {
                    value: "VALUE",
                }
            );

            const descriptor = Object.getOwnPropertyDescriptor(obj, "data");
            expect(descriptor.value).toBe("VALUE");
            expect(descriptor.writable).toBe(false);
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.configurable).toBe(false);
        });
    });

    /**
     *
     * An accessor property associates a key value with the attributes: [[Get]], [[Set]], [[Enumerable]], [[Configurable]]
     */
    describe("Accessor property", () => {
        /**
         *
         * Можно создать свойство через инициализацию объекта литералом
         * Свойство будет состоять из двух функций get и set
         */
        test("Should create with object literal initialization", () => {
            const obj = {
                value: 10,

                get getValue() {
                    return this.value;
                },

                set getValue(value) {
                    this.value = value;
                },
            };

            expect(obj.getValue).toBe(10);
            obj.getValue = 20;
            expect(obj.getValue).toBe(20);

            const descriptor = Object.getOwnPropertyDescriptor(obj, "getValue");
            expect(typeof descriptor.get).toBe("function");
            expect(typeof descriptor.set).toBe("function");
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать сеттер без геттера
         */
        test("Should create set without get", () => {
            const obj = {
                set value(val) {

                }
            }

            expect(obj.value).toBeUndefined();
            obj.value = 10;
            expect(obj.value).toBeUndefined();

            const descriptor = Object.getOwnPropertyDescriptor(obj, "value");
            expect(descriptor.get).toBe(undefined);
            expect(typeof descriptor.set).toBe("function");
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через декларацию класса
         */
        test("Should create with class definition", () => {
            class Custom {
                value = 10;

                get getValue() {
                    return this.value;
                }

                set getValue(value) {
                    this.value = value;
                }
            }

            const obj = new Custom();

            expect(obj.getValue).toBe(10);
            expect(obj.getValue = 20).toBe(20);

            const descriptor = Object.getOwnPropertyDescriptor(obj.__proto__, "getValue"); //!!!!!!!!!!!!!!
            expect(typeof descriptor.get).toBe("function");
            expect(typeof descriptor.set).toBe("function");
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.configurable).toBe(true);
        });

        /**
         *
         * Можно создать через Object.create
         */
        test("Should create with object create", () => {
            const obj = Object.create(
                Object.prototype,
                {
                    value: {
                        value: 10,
                    },
                    getValue: {
                        get() {
                            return this.value;
                        },
                        set(value) {
                            this.value = value;
                        }
                    }
                }
            );

            expect(obj.getValue).toBe(10);
            expect(obj.getValue = 20).toBe(20);

            const descriptor = Object.getOwnPropertyDescriptor(obj, "getValue");
            expect(typeof descriptor.get).toBe("function");
            expect(typeof descriptor.set).toBe("function");
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.configurable).toBe(false);
        });

        /**
         *
         * Можно создать через Object.defineProperty
         */
        test("Should create with define property", () => {
            const obj = {
                value: 22,
            };

            Object.defineProperty(obj, "getValue", {
                get() {
                    return this.value;
                },
                set(value) {
                    this.value = value;
                }
            });

            expect(obj.getValue).toBe(22);
            obj.getValue = 33
            expect(obj.getValue).toBe(33);

            const descriptor = Object.getOwnPropertyDescriptor(obj, "getValue");
            expect(typeof descriptor.get).toBe("function");
            expect(typeof descriptor.set).toBe("function");
            expect(descriptor.enumerable).toBe(false);
            expect(descriptor.configurable).toBe(false);
        });

        /**
         *
         * Моно создать свойство в прототипе
         */
        test("Should create in prototype", () => {
            function Custom() {
                this.value = 10;
            }

            Custom.prototype = {
                get getValue() {
                    return this.value;
                },
                set getValue(value) {
                    this.value = value;
                }
            };

            const obj = new Custom();

            expect(obj.getValue).toBe(10);
            obj.getValue = 20;
            expect(obj.getValue).toBe(20);

            const descriptor = Object.getOwnPropertyDescriptor(obj.__proto__, "getValue");
            expect(typeof descriptor.get).toBe("function");
            expect(typeof descriptor.set).toBe("function");
            expect(descriptor.enumerable).toBe(true);
            expect(descriptor.configurable).toBe(true);
        });
    });

    describe("String keys", () => {
        test("Should have key", () => {
            const obj = {
                a: 10,
                "b": 20,
            };

            expect(obj.a).toBe(10);
            expect(obj.b).toBe(20);
        });

        test("Should have long string key", () => {
            const obj = {};

            obj["some property key"] = "VALUE";

            expect(obj["some property key"]).toBe("VALUE");
        });

        test("Should have surrogate key", () => {
            const obj = {};

            obj["😃😇😎"] = "VALUE";

            expect(obj["😃😇😎"]).toBe("VALUE");
        });

        test("Should convert key name", () => {
            const obj = {};

            obj[true] = "TRUE";
            obj[1] = 1
            obj[null] = "NULL"

            expect(obj["true"]).toBe("TRUE");
            expect(obj["1"]).toBe(1);
            expect(obj["null"]).toBe("NULL");
        });

        /**
         *
         * Можно получить список полей
         */
        test("Should get key names", () => {
            const inst = {
                a: 10,
                b: 20,
            };

            expect(Object.getOwnPropertyNames(inst)).toEqual(["a", "b"]);
        })
    });

    describe("Symbol keys", () => {
        /**
         *
         * Можно создать свойство с символьным ключем
         */
        test("Should create with object literal notation", () => {
            const sym = Symbol("UNIQ");
            const fun = Symbol("UNIQ");

            const obj = {
                [sym]: "DATA",

                [fun]() {
                    return "VALUE";
                }
            };

            expect(obj[sym]).toBe("DATA");
            expect(obj[fun]()).toBe("VALUE");
        });

        /**
         *
         * Можно добавить символьное свойство в уже существующий объект
         */
        test("Should create with assignment", () => {
            const sym = Symbol("UNIQ");

            const obj = {};

            obj[sym] = "DATA";
            expect(obj[sym]).toBe("DATA");
        });

        /**
         *
         * Можно создать через Object.defineProperty
         */
        test("Should create with object define property", () => {
            const sym = Symbol("UNIQ");
            const obj = {};

            Object.defineProperty(
                obj,
                sym,
                {
                    value: "DATA"
                }
            );

            expect(obj[sym]).toBe("DATA");
        });

        /**
         *
         * Можно создать через Object.create
         */
        test("Should create with object create", () => {
            const sym = Symbol("UNIQ");
            const obj = Object.create(
                Object.prototype,
                {
                    [sym]: {
                        value: "DATA"
                    }
                }
            );

            expect(obj[sym]).toBe("DATA");
        });

        /**
         *
         * Можно создать через свойства класса
         */
        test("Should create with class definition", () => {
            const sym = Symbol("UNIQ");
            const fun = Symbol("UNIQ");

            class Custom {
                [sym] = "DATA";

                [fun]() {
                    return "VALUE";
                }
            }

            const obj = new Custom();
            expect(obj[sym]).toBe("DATA");
            expect(obj[fun]()).toBe("VALUE");
        });

        /**
         *
         * Свойства с символьными ключами могут быть статическими
         */
        test("Should create static property with class definition", () => {
            const sym = Symbol("UNIQ");
            const fun = Symbol("UNIQ");

            class Custom {
                static [sym] = "DATA";

                static [fun]() {
                    return "VALUE";
                }
            }

            const obj = new Custom();
            expect(obj[sym]).toBeUndefined();
            expect(Custom[sym]).toBe("DATA");
            expect(Custom[fun]()).toBe("VALUE");
        });

        /**
         *
         * Можно создать через инициализацию в функции конструкторе
         */
        test("Should create with function initialization", () => {
            const sym = Symbol("UNIQ");

            function Custom() {
                this[sym] = "DATA";
            }

            const obj = new Custom();
            expect(obj[sym]).toBe("DATA");
        });

        /**
         *
         * Можго получить список символьных полей
         */
        test("Should get Symbol keys", () => {
            const inst = {
                [Symbol.match]: "MATCH",
                [Symbol.search]: "SEARCH",
            };

            expect(Object.getOwnPropertySymbols(inst)).toEqual([Symbol.match, Symbol.search]);
        });
    });
});
