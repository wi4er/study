"use strict";

describe("Functional syntax", () => {
    /**
     *
     * Можно создать экземпляр из любой функции имеюшей prototype
     */
    it("Should create instance", () => {
        function Type() {
        }

        const inst_1 = new Type();
        const inst_2 = new Type;

        expect(Type.prototype).toEqual({});
        expect(inst_1.constructor).toBe(Type);
        expect(inst_1.__proto__).toBe(Type.prototype);
        expect(inst_1 instanceof Type).toBeTruthy();
        expect(inst_2 instanceof Type).toBeTruthy();
    });

    /**
     *
     * При вызове оператора new значение this доступно в функции по умолчанию,
     * через него можно задать свои ключи объекта.
     * По умолчанию функция возвращает this результатом оператора new
     */
    it("Should create instance with state", () => {
        function Type() {
            // this = {};

            this.value = "VALUE";

            // return this;
        }

        const inst = new Type();

        expect(inst.value).toBe("VALUE");
        expect(Object.getOwnPropertyNames(inst)).toEqual(["value"]);
    });

    /**
     *
     * Можно передать аргументы в конструктор
     */
    it("Should get arguments", () => {
        function Type(arg1, arg2) {
            this.aa = arg1;
            this.bb = arg2;
        }

        const inst_1 = new Type(10, 20);
        expect(inst_1.aa).toBe(10);
        expect(inst_1.bb).toBe(20);

        const inst_2 = new Type(333, 444);
        expect(inst_2.aa).toBe(333);
        expect(inst_2.bb).toBe(444);
    });

    /**
     *
     * Можно изменить значение своего свойства объекта
     */
    it("Should change state of instance", () => {
        function Type() {
            this.value = "OLD";
        }

        const inst = new Type();
        expect(inst.value).toBe("OLD");

        inst.value = "NEW";
        expect(inst.value).toBe("NEW");
    });

    /**
     *
     * Свойство prototype по умолчанию равно пустому объекту.
     * В prototype можно добавлять любые значения.
     * Можно обратиться к свойствам из prototype через экземпляр объекта
     */
    it("Should create instance with prototype", () => {
        function Type(name) {
            this.name = name;
        }

        Type.prototype.getName = function () {
            return this.name;
        };

        const inst = new Type("VALUE");
        expect(inst.getName()).toBe("VALUE");
    });

    /**
     *
     * Нельзя использовать стрелочную функцию для создания экземпляра
     */
    it("Shouldn't create with arrow", () => {
        const Type = () => {
        };

        expect(Type.prototype).toBeUndefined();
        expect(() => new Type()).toThrow("is not a constructor");
    });

    /**
     *
     * Можно защитить функцию от прямого вызова
     */
    it("Should protect from invoke", () => {
        function Type() {
            if (!new.target) {
                throw SyntaxError();
            }
        }

        const inst = new Type();
        expect(inst instanceof Type).toBeTruthy();
        expect(Type).toThrow(SyntaxError);
    });

    /**
     *
     * Можно вернуть другой объект, который будет возвращен оператором new
     */
    it("Should return another object", () => {
        function Type() {
            this.aa = 100;
            this.bb = 200;

            return {
                a: 10,
                b: 20,
            };
        }

        const inst = new Type();

        expect(inst.a).toBe(10);
        expect(inst.b).toBe(20);

        expect(inst.aa).toBe(undefined);
        expect(inst.bb).toBe(undefined);
    });

    /**
     *
     * Если функция возвращает примитив, то он будет проигнорирован и оператор new вернёт this
     */
    it("Shouldn't return primitive", () => {
        function Type() {
            this.aa = 10;

            return 10;
        }

        const inst = new Type();

        expect(inst.aa).toBe(10);
    });

    /**
     *
     * Можно создать экземпляр с цепочкой прототипирования
     */
    it("Should create instance with prototype chain", () => {
        function Parent() {
            this.own_1 = "CCCC";
        }

        Parent.prototype = Object.create(
            Object.prototype,
            {
                getA: {
                    value() {
                        return "AAAA";
                    }
                }
            }
        );
        Parent.classState = "SOME_STATE";

        function Type() {
            Parent.call(this);

            this.own_2 = "DDDD";
        }

        Type.prototype = Object.create(
            Parent.prototype,
            {
                getB: {
                    value() {
                        return "BBBB";
                    },
                }
            }
        );
        Type.classState = "ANOTHER_STATE";

        const inst = new Type();

        // методы из прототипа
        expect(inst.getA()).toBe("AAAA");
        expect(inst.getB()).toBe("BBBB");

        // свои ключи объекта
        expect(inst.own_1).toBe("CCCC");
        expect(inst.own_2).toBe("DDDD");
        expect(Object.getOwnPropertyNames(inst)).toEqual(["own_1", "own_2"]);

        // свойства классов
        expect(Parent.classState).toBe("SOME_STATE");
        expect(Type.classState).toBe("ANOTHER_STATE");
    });

    /**
     *
     * Можно явно указать свойство __proto__
     */
    it("Should create instance with __proto__ prototype", () => {
        function Parent() {
        }

        Parent.prototype.getValue = () => "SOME_DATA";

        function Type() {
        }

        Type.prototype.__proto__ = Parent.prototype;

        const inst = new Type();
        expect(inst.getValue()).toBe("SOME_DATA");
    });
});

describe("Class syntax", () => {
    /**
     *
     * Можно создать экземпляр класса
     */
    it("Should create instance of class", () => {
        expect(() => Type).toThrow("before initialization");

        class Type {
        }

        const inst = new Type();

        expect(inst instanceof Type).toBeTruthy();
    });

    /**
     *
     * Экземпляр класс может иметь состояние, являющееся своими свойствами объекта
     */
    it("Should create instance with state", () => {
        class Type {
            value_1 = "VALUE";
            value_2;
        }

        const inst = new Type();
        expect(inst.value_1).toBe("VALUE");
        expect(inst.value_2).toBe(undefined);
        expect(Object.getOwnPropertyNames(inst)).toEqual(["value_1", "value_2"]);
    });

    /**
     *
     * Можно создать класс с методами в прототипе
     */
    it("Should create instance with method", () => {
        class Type {
            getValue() {
                return "VALUE";
            }
        }

        const inst = new Type();
        expect(typeof inst.__proto__.getValue).toBe("function");
        expect(inst.getValue()).toBe("VALUE");
    });

    /**
     *
     * Можно присвоить объект класса в любую переменную
     */
    it("Should create by another name", () => {
        const Another = class Type {
            getValue() {
                return "VALUE";
            }
        }

        expect(() => Type).toThrow("Type is not defined");
        const inst = new Another();
        expect(inst.getValue()).toBe("VALUE");
    });

    /**
     *
     * Можно передать аргументы в конструктор
     */
    it("Should create instance with constructor", () => {
        class Type {
            constructor(value) {
                expect(this.constructor).toBe(Type);
                expect(Object.getPrototypeOf(this)).toBe(Type.prototype);

                this.value = value;
            }
        }

        const inst = new Type(100);
        expect(inst.value).toBe(100);
        expect(Object.getOwnPropertyNames(inst)).toEqual(["value"]);
    });

    /**
     *
     * Конструктор может вернуть другой объект в качестве результата оператора new
     */
    it("Should return another context", () => {
        class Type {
            constructor(value) {
                this.value = value;

                return this.invoke.bind(this);
            }

            invoke() {
                return this.value;
            }
        }

        const inst = new Type("VALUE");

        expect(inst instanceof Function).toBeTruthy();
        expect(inst()).toBe("VALUE");
    });

    /**
     *
     * Можно унаследовать родительский класс через оператор extends,
     * экземпляр этого класса будет видеть все методы в цепочке наследования
     */
    it("Should create instance with extends", () => {
        class Parent {
            parentFun() {
                return "PARENT";
            }
        }

        class Type extends Parent {
            ownFun() {
                return "OWN";
            }
        }

        const inst = new Type();

        expect(Type.__proto__).toBe(Parent);
        expect(inst.parentFun()).toBe("PARENT");
        expect(inst.ownFun()).toBe("OWN");
    });

    /**
     *
     * Родительский класс получает контекс из текущего
     */
    it("Should create instance with extends", () => {
        class Parent {
            constructor() {
                this.parentValue = "parentValue";
            }
        }

        class Type extends Parent {
            constructor() {
                super();

                this.ownValue = "ownValue";
            }
        }

        const inst = new Type();

        expect(inst.parentValue).toBe("parentValue");
        expect(inst.ownValue).toBe("ownValue");
        expect(Object.getOwnPropertyNames(inst)).toEqual(["parentValue", "ownValue"]);
    });

    /**
     *
     * Можно передать аргументы в родительский класс через оператор super
     */
    it("Should create instance with extends and args", () => {
        class Parent {
            constructor(value) {
                this.value = value * 2;
            }
        }

        class Type extends Parent {
            constructor(value) {
                super(value);
            }
        }

        const inst = new Type(10);

        expect(inst.value).toBe(20);
    });

    /**
     *
     * Нельзя обратиться к this перед super
     */
    it("Shouldn't call this before super", () => {
        class Parent {
            constructor() {
            }
        }

        class Type extends Parent {
            constructor() {
                eval("this");
                super();
            }
        }

        expect(() => new Type()).toThrow(ReferenceError);
    });

    /**
     *
     * Нельзя добавить конструктор  в класс с наследованием без super
     */
    it("Shouldn't call without super", () => {
        class Parent {
            constructor() {
            }
        }

        class Type extends Parent {
            constructor() {
            }
        }

        expect(() => {
            new Type();
        }).toThrow(ReferenceError);
    });

    /**
     *
     * Можно создать класс перекрывающий методы родительского класса
     */
    it("Should create class with overloading", () => {
        class Parent {
            someFun() {
                return "PARENT";
            }
        }

        class Type extends Parent {
            someFun() {
                const val = super.someFun();

                return `${val}_WITH_CHILD`;
            }
        }

        const inst = new Type();

        expect(inst.someFun()).toBe("PARENT_WITH_CHILD");
    });

    /**
     *
     * Можно создать приватное свойство через оператор #,
     * оно будет доступно только внутри класса
     */
    it("Should create instance with private properties", () => {
        class Type {
            #value = "VALUE";

            getValue() {
                return this.#value;
            }
        }

        const inst = new Type();

        expect(() => eval("inst.#value")).toThrow("must be declared in an enclosing class");
        expect(inst.value).toBeUndefined();
        expect(inst.getValue()).toBe("VALUE");
    });

    /**
     *
     * Можно работать с приватным свойством через геттер и сеттер
     */
    it("Should create class with getter and setter", () => {
        class Type {
            #value = 0;

            get value() {
                return this.#value;
            }

            set value(some) {
                if (some > 100) {
                    this.#value = 100;
                } else {
                    this.#value = some;
                }
            }
        }

        const inst = new Type();
        expect(inst.value).toBe(0);

        inst.value = 100;
        expect(inst.value).toBe(100);

        inst.value = 200;
        expect(inst.value).toBe(100);
    });

    /**
     *
     * Можно создать класс со статическими свойствами
     */
    it("Should create class with static properties", () => {
        class Type {
            static getValue() {
                return "VALUE";
            }
        }

        const inst = new Type();

        expect(() => inst.getValue()).toThrow("is not a function");
        expect(Type.getValue()).toBe("VALUE");
    });

    /**
     *
     * Можно наследовать статические свойства класса
     */
    it("Should extend class with static properties", () => {
        class Parent {
            static getValue() {
                return "PARENT";
            }
        }

        class Type extends Parent {
        }

        expect(Type.getValue()).toBe("PARENT");
    });

    it("Should create class with private static properties", () => {
        class Type {
            static #getValue() {
                return "VALUE";
            }

            getValue() {
                return Type.#getValue();
            }
        }

        const inst = new Type();

        expect(inst.getValue()).toBe("VALUE");
        expect(() => {
            eval("Type.#getValue()")
        }).toThrow("Private field '#getValue' must be declared in an enclosing class");// expect(Type.getValue()).toBe("VALUE");
    });
});
