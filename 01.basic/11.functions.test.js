"use strict";

describe("Function syntax", () => {
    describe("Function statement declaration", () => {
        /**
         *
         * Можно создать объект функции
         */
        test("Should create function statement", () => {
            expect(doSomething()).toBe("RESULT");

            function doSomething() {
                return "RESULT";
            }

            expect(doSomething()).toBe("RESULT");
        });

        /**
         *
         * Объект функции может иметь свойства
         */
        test("Should create function with properties", () => {
            expect(withState()).toBe("RESULT");
            expect(withState.value).toBe(undefined);

            withState.value = "OLD";
            expect(withState.value).toBe("OLD");

            function withState() {
                return "RESULT";
            }

            withState.value = "VALUE";

            expect(withState()).toBe("RESULT");
            expect(withState.value).toBe("VALUE");
        });

        /**
         *
         * Объект функции виден внутри функции и можно работать с его свойствами и вызывать
         */
        test("Should see function in scope", () => {
            function withState() {
                if (!withState.value) {
                    withState.value = 1;
                } else {
                    withState.value++;
                }

                return withState.value;
            }

            expect(withState()).toBe(1);
            expect(withState()).toBe(2);
            expect(withState()).toBe(3);
        });
    });

    describe("Function expression definition", () => {
        /**
         *
         * Можно создать анонимную функцию и сохранить её в переменную
         */
        test("Should create function with function expression", () => {
            expect(() => doSomething).toThrow("Cannot access 'doSomething' before initialization");

            const doSomething = function () {
                return "RESULT";
            }

            expect(doSomething()).toBe("RESULT");
        });

        /**
         *
         * Можно использовать переменную в которую присвоена функция внутри функции
         */
        test("Should use themself", () => {
            const doSomething = function () {
                return doSomething;
            }

            expect(doSomething()).toBe(doSomething);
        });

        /**
         *
         * Объект анонимной функции может иметь состояние
         */
        test("Should have state", () => {
            const doSomething = function () {
                return "RESULT";
            }

            doSomething.value = "VALUE";

            expect(doSomething()).toBe("RESULT");
            expect(doSomething.value).toBe("VALUE");
        });
    });

    /**
     *
     * Выражения стрелочных функций имеют более короткий синтаксис по сравнению с функциональными выражениями
     * и лексически привязаны к значению this (но не привязаны к собственному this, arguments, super, или new.target).
     * Выражение стрелочных функций не позволяют задавать имя, поэтому стрелочные функции анонимны,
     * если их ни к чему не присвоить.
     */
    describe("Arrow arrow function definition", () => {
        /**
         *
         * Можно создать стрелочную функцию
         */
        test("Should create arrow function", () => {
            const func = () => "ARROW";

            expect(func()).toBe("ARROW");
        });

        /**
         *
         * Если передаётся один параметр, то он может указываеться без скобок
         */
        test("Should create arrow function with one param", () => {
            const func = param => param * 10;

            expect(func(10)).toBe(100);
        });

        /**
         *
         * Если параметров несколько, то нужно указывать их в круглых скобках
         */
        test("Should create arrow function with multiple param", () => {
            const func = (param_1, param_2) => param_1 * param_2;

            expect(func(10, 20)).toBe(200);
        });

        /**
         *
         * Нельзя задать контекст для стрелочной функции
         */
        test("Shouldn't set context", () => {
            const sum = item => item + this.count;

            const list = [1, 2, 3].map(sum, {count: 10});

            expect(list).toEqual([NaN, NaN, NaN]);
        });

        /**
         *
         * Можно передать контекст через скоуп HOF
         */
        test("Should set context from HOF", () => {
            const context = {
                count: 10,
                getFun() {
                    return item => item + this.count;
                }
            };

            const list = [1, 2, 3].map(context.getFun());

            expect(list).toEqual([11, 12, 13]);
        });

        /**
         *
         * Прототип стрелочной функции равен undefined
         */
        test("Shouldn't have prototype", () => {
            const func = () => {
            };

            expect(func.prototype).toBe(undefined);
        });
    });
});

describe("Function return statement", () => {
    /**
     *
     * Функция может возвращать значение при помощи оператора return
     */
    test("Should create function with return", () => {
        function getResult() {
            // Какие-то вычисления

            return "RESULT";

            // Никогда не выполнится
        }

        expect(getResult()).toBe("RESULT");
    });

    /**
     *
     * Оператор return можно использовать многократно в одной функции
     */
    test("Should create function with multiple return", () => {
        function getResult(value = false) {
            if (value === true) {
                return "TRUE";
            }

            return "FALSE";
        }

        expect(getResult(true)).toBe("TRUE");
        expect(getResult(false)).toBe("FALSE");
        expect(getResult()).toBe("FALSE");
    });

    test.todo("REturn in try-catch, for etc");
    
    /**
     *
     * return без выражения после него возвращает undefined
     */
    test("Should return undefined", () => {
        function check() {
            return;
        }

        expect(check()).toBeUndefined();
    });

    /**
     *
     * return возвращает выражение в той же строке, в которой он находится
     */
    test("Shouldn't return expression", () => {
        function check() {
            return
            [
                1, 2, 3
            ]
        }

        expect(check()).toBeUndefined();
    });

    /**
     *
     * В стрелочный функциях можно не указывать return,
     * если фунция не содержит фигурных скобок и состоит из одного выражения
     */
    test("Should create function without return", () => {
        const getResult = () => "RESULT";

        expect(getResult()).toBe("RESULT");
    });

    /**
     *
     * Результат стрелочной функции можно завернуть в круглые скобки,
     * тогда функция вернёт последнее значение в цепочке
     */
    test("Should create function without return and with brackets", () => {
        const getResult = () => (2 + 2 === 4, Math.random(), "RESULT");

        expect(getResult()).toBe("RESULT");
    });

    /**
     *
     * Если функция не содержит return, то её вызов вернёт undefined
     */
    test("Should create function without return and with braces", () => {
        const getResult = () => {
            "RESULT";
        };

        expect(getResult()).toBe(undefined);
    });
});

/**
 *
 * HOF (Higher order function)
 * - это функция, принимающая в качестве аргументов другие функции или возвращающая другую функцию в качестве результата.
 */
describe("Higher order functions", () => {
    /**
     *
     * Возвращаемую функцию можно создать внутри HOF
     */
    test("Should create HOF with inner statement", () => {
        function hoFun() {
            return function childFun() {
                return "CHILD_RESULT";
            }
        }

        const child = hoFun();
        expect(typeof child).toBe("function");
        expect(child()).toBe("CHILD_RESULT");
    });

    /**
     *
     * Возвращаемая функция - это объект, поэтому он может иметь состояние
     */
    test("Should create HOF with properties", () => {
        function hoFun(value) {
            const childFun = () => {
                return "CHILD_RESULT";
            }
            childFun.value = value;

            return childFun;
        }

        const child_1 = hoFun("VALUE_1");
        expect(typeof child_1).toBe("function");
        expect(child_1()).toBe("CHILD_RESULT");
        expect(child_1.value).toBe("VALUE_1");

        const child_2 = hoFun("VALUE_2");
        expect(child_2.value).toBe("VALUE_2");
    });

    /**
     *
     * При каждом новом вызове hoFun создаётся новый экземпляр функции
     */
    test("Should create two HOF", () => {
        function hoFun() {
            return function childFun() {
                return "RESULT";
            }
        }

        expect(hoFun() === hoFun()).toBeFalsy();
    });

    /**
     *
     * Функция создаваемая в HOF, получает скоуп HOF, поэтому в неё можно передавать аргументы через вызов HOF
     */
    test("Should use hof with argument", () => {
        function parent(arg1, arg2) {
            return function (div) {
                return [arg1 / div, arg2 / div];
            }
        }

        expect(parent(12, 30)(2)).toEqual([6, 15]);
        expect(parent(10, 100)(10)).toEqual([1, 10]);
    });

    test.todo("Should return self instance");

    /**
     *
     * Функция может получать объект функции в качесве параметра
     */
    test("Should use hof with argument", () => {
        function execute(fun) {
            if (typeof fun === "function") {
                return fun();
            } else {
                return null;
            }
        }

        const res1 = execute(() => "RESULT");
        expect(res1).toBe("RESULT");

        const res2 = execute("RESULT");
        expect(res2).toBe(null);

        const res3 = execute(execute);
        expect(res3).toBe(null);
    });

    /**
     *
     * Можно возвращать объект функции созданный в другом месте
     */
    test("Should return another function", () => {
        function sum(a, b) {
            return a + b;
        }

        function subtr(a, b) {
            return a - b;
        }

        function calc(action) {
            if (action === "SUM") {
                return sum;
            } else {
                return subtr;
            }
        }

        expect(calc("SUM")(100, 200)).toBe(300);
        expect(calc("SUBTRACTION")(200, 100)).toBe(100);
    });
});

describe("Function.prototype properties", () => {
    /**
     *
     * Создаёт новую функцию,
     * которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение.
     * В метод также передаётся набор аргументов,
     * которые будут установлены перед переданными в привязанную функцию аргументами при её вызове.
     */
    describe("Function.prototype.bind", () => {
        /**
         *
         * Задаём контекст вызова
         */
        test("Should bind function", () => {
            function withContext() {
                return this?.a;
            }

            const withBind = withContext.bind({a: 10});

            expect(withContext()).toBeUndefined();
            expect(withBind()).toBe(10);
            expect(withContext).not.toBe(withBind);
        });

        /**
         *
         * Нельзя задать контекст стрелочной функции
         */
        test("Shouldn't bind arrow function", () => {
            const withContext = () => {
                return this?.a;
            }

            const withBind = withContext.bind({a: 10});

            expect(withBind()).toBe(undefined);
        });

        /**
         *
         * Задаём контекст и набор аргументов
         */
        test("Should bind function arguments", () => {
            function withContext(first, second, third) {
                return [this.a, first, second, third];
            }

            const withBind = withContext.bind({a: 10}, 20, 30);

            expect(withBind(8888)).toEqual([10, 20, 30, 8888]);
        });

        /**
         *
         * Задаём контекст в виде примитива
         */
        test("Should set primitive value", () => {
            function withContext() {
                return this;
            }

            expect(withContext.bind("100")()).toBe("100");
            expect(withContext.bind(100)()).toBe(100);
            expect(withContext.bind(true)()).toBe(true);
        });
    });

    /**
     *
     * Вызывает функцию с указанным значением this и аргументами, предоставленными в виде массива
     */
    describe("Function.prototype.apply", () => {
        /**
         *
         * Можно вызвать функцию с определённым контекстом
         */
        test("Should apply function", () => {
            function withContext() {
                return this.a;
            }

            expect(withContext.apply({a: 22})).toBe(22);
        });

        /**
         *
         * Можно вызвать функцию с контекстом и аргументами в виде массива
         */
        test("Should apply function with arguments", () => {
            function withContext(first, second) {
                return [this.a, first, second];
            }

            expect(withContext.apply({a: 10}, [20, 30])).toEqual([10, 20, 30]);
        });

        /**
         *
         * Можно вызвать функцию с контекстом и аргументами в виде массиво подобного объекта
         */
        test("Should apply with array like object", () => {
            function withContext(a, b) {
                return [this, a, b];
            }

            expect(withContext.apply(
                10,
                {0: 20, 1: 30, length: 2}
            )).toEqual([10, 20, 30]);
        });
    });

    /**
     *
     * Вызывает функцию с указанным значением this и индивидуально предоставленными аргументами.
     */
    describe("Function.prototype.call", () => {
        /**
         *
         * Можно вызвать функцию с определённым контекстом
         */
        test("Should call function with context", () => {
            function withContext() {
                return this;
            }

            expect(withContext.call(100)).toBe(100);
        });

        /**
         *
         * Можно вызвать функцию с контекстом и перечисленными аргументами
         */
        test("Should call function with arguments", () => {
            function withContext(first, second) {
                return [this.a, first, second];
            }

            expect(withContext.call({a: 22}, 10, 20)).toEqual([22, 10, 20]);
        });

        /**
         *
         * Аргументы при вызове можно передать через rest
         */
        test("Should call function with spread and rest", () => {
            const args = new Set([200, 300])

            function withContext(...rest) {
                return [this, ...rest];
            }

            expect(withContext.call(100, ...args)).toEqual([100, 200, 300]);
        });
    });

    describe("Function.prototype.length", () => {
        /**
         *
         * Можно определить сколько параметров заявлено в функции
         */
        test("Should get length", () => {
            function withoutParams() {
                return null
            }

            expect(withoutParams.length).toBe(0);

            function withOneParam(a) {
                return null
            }

            expect(withOneParam.length).toBe(1);

            function withTreeParams(a, b, c) {
                return null
            }

            expect(withTreeParams.length).toBe(3);
        });

        /**
         *
         * В списке параметров оператор rest не учитывается
         */
        test("Shouldn't get rest param", () => {
            function withRest(...rest) {
                return null;
            }

            expect(withRest.length).toBe(0);

            function withArgsRest(a, b, c, ...rest) {
                return null;
            }

            expect(withArgsRest.length).toBe(3);
        });
    });

    describe("Function.prototype.name", () => {
        /**
         *
         * Можно узнать имя с которым создавалась функция
         */
        test("Should get name from statement", () => {
            function withName() {
                return null;
            }

            expect(withName.name).toBe("withName");
        });

        /**
         *
         * Если анонимная функция присвоена в переменную, то именем функции будет имя переменной
         */
        test("Should get name from expression", () => {
            const withName = function () {
                return null;
            }

            expect(withName.name).toBe("withName");
        });

        /**
         *
         * Если функция передана аргументом то она имени не имеет
         */
        test("Should get name from param", () => {
            function withArg(func) {
                return func.name;
            }

            expect(withArg(function () {
            })).toBe("");
        });

        /**
         * Если функцию с именем присвоить в переменную, то имя у функции сохраняется
         */
        test("Should get name from named expression", () => {
            const withName = function oldName() {
                return null;
            }

            expect(withName.name).toBe("oldName");
        });
    });

    describe("Function.prototype.toString", () => {
        test("Should get string", () => {
            function withBody() {
                return null;
            }

            expect(withBody.toString()).toBe("function withBody() {\n        return null;\n      }");
        });
    });

    describe("Function.prototype.constructor", () => {
        /**
         *
         * Свойство constructor функции всегда равно function
         */
        test("Should get constructor", () => {
            function func() {
            }

            expect(func.constructor).toBe(Function)
        });
    });
});
