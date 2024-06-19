"use strict";

describe("Iterator types", () => {
    describe("Array", () => {
        /**
         *
         * Можно создаём массив из значений
         */
        describe("Should create array", () => {
            /**
             *
             * Можно создать массив указав начальные значения перечислением
             */
            test("Should create with Array function", () => {
                const arr = Array(1, 2, 3);
                expect(arr).toEqual([1, 2, 3]);
            });

            /**
             *
             * Можно создать массив через оператор new указав начальные значения перечислением
             */
            test("Should create with new", () => {
                const arr = new Array(1, 2, 3, 4, 5, 6);
                expect(arr).toEqual([1, 2, 3, 4, 5, 6]);
            });

            /**
             *
             * Можно создать массив указав длину, единственным аргументом
             */
            test("Should create array with new size", () => {
                const arr = new Array(5);
                expect(arr.length).toBe(5);

                expect(Object.getOwnPropertyNames(arr)).toEqual(["length"]);
            });

            /**
             *
             * Если аргумент один, то будет создан массив с указанной длиной,
             * а если более одного, то создан массив с этими аргументами,
             * это приводит к непредсказуемому поведению при использовании спред
             */
            test("Should create with spread", () => {
                const arr = new Array(...[100]);

                expect(arr.length).toBe(100);
            });

            /**
             *
             * Можно создать массив через array literal
             */
            test("Should create with array literal", () => {
                const arr = [1, 2, 3, 4, 5];

                expect(arr.length).toBe(5);
            });

            /**
             *
             * Можно создать массив через Array.of
             */
            test("Should create with Array.of", () => {
                const arr = Array.of(1, 2, 3, 4, 5);

                expect(arr.length).toBe(5);
            });
        });

        /**
         *
         * Можно создать массив из другого объекта
         */
        describe("Create array from object", () => {
            /**
             *
             * Можно создать массив из любого итератора
             */
            test("Should create from iterator", () => {
                const inst = Array.from(new Set([1, 2, 3]));

                expect(inst).toEqual([1, 2, 3]);
            });

            /**
             *
             * Можно создать из масивоподобного объекта
             */
            test("Should from array like", () => {
                const inst = Array.from({0: 3, 1: 2, 2: 1, length: 3});

                expect(inst).toEqual([3, 2, 1]);
            });

            /**
             *
             * Можно создать из значений своих свойств объекта
             */
            test("Should create with Object.values", () => {
                const obj = {a: 1, b: 2, c: 3};

                expect(Object.values(obj)).toEqual([1, 2, 3]);
            });

            /**
             *
             * Можно создать из имён ключей своих свойств объекта
             */
            test("Should create with Object.values", () => {
                const obj = {a: 1, b: 2, c: 3};

                expect(Object.keys(obj)).toEqual(["a", "b", "c"]);
            });

            /**
             *
             * Можно создать при помощи спреда внутри литерала
             */
            test("Should from spread", () => {
                const source = [1, 2, 3];
                const inst = [...source, 4];

                expect(inst).toEqual([1, 2, 3, 4]);
            });
        });

        /**
         *
         * Можно добавить элемент в массив
         */
        describe("Adding item to array", () => {
            /**
             *
             * Можно добавить элемент в конец массива
             */
            test("Should add item to array with Array.prototype.push", () => {
                const arr = [1, 2, 3, 4];

                arr.push(5);
                expect(arr.length).toBe(5);
                expect(arr).toEqual([1, 2, 3, 4, 5]);
            });

            /**
             *
             * Можно добавить элемент в начало массива
             */
            test("Should add item to array with Array.prototype.unshift", () => {
                const arr = [1, 2, 3, 4];

                arr.unshift(0);
                expect(arr.length).toBe(5);
                expect(arr).toEqual([0, 1, 2, 3, 4]);
            });

            /**
             *
             * Можно добавить элемент в любую позицию массива,
             * если позиция больше текущей длины, то длина будет исправлена
             */
            test("Should add with assignment", () => {
                const arr = [1, 2, 3, 4];

                arr[arr.length] = 5;
                expect(arr.length).toBe(5);
            });
        });

        /**
         *
         * Можно удалить элемент из массива
         */
        describe("Remove item from array", () => {
            /**
             *
             * Можно присвоить элементу значение undefined
             */
            test("Should assign to undefined", () => {
                const arr = [1, 2, 3, 4];

                arr[2] = undefined;
                expect(arr).toEqual([1, 2, undefined, 4]);
                expect(Object.keys(arr)).toEqual(["0", "1", "2", "3"]);
            });

            /**
             *
             * Можно удалить при помощи унарного оператора delete
             */
            test("Should delete from object", () => {
                const arr = [1, 2, 3, 4];

                delete arr[1];
                expect(Object.keys(arr)).toEqual(["0", "2", "3"]);
            });

            /**
             *
             * Можно вырезать часть массива при помощи Array.prototype.slice
             */
            test("Should remove item from array", () => {
                const arr = [1, 2, 3, 4];

                arr.splice(1, 1);
                expect(arr.length).toBe(3);
                expect(arr).toEqual([1, 3, 4]);
            });

            /**
             *
             * Можно удалить элемент массива из последнего индекса
             */
            test("Should remove from end", () => {
                const arr = [1, 2, 3, 4];

                expect(arr.pop()).toBe(4);
                expect(arr.pop()).toBe(3);
                expect(arr.pop()).toBe(2);
                expect(arr.pop()).toBe(1);
                expect(arr).toEqual([]);
            });

            /**
             *
             * Можо удалить элемент из начала массива
             */
            test("Should remove from begin", () => {
                const arr = [1, 2, 3, 4];

                expect(arr.shift()).toBe(1);
                expect(arr.shift()).toBe(2);
                expect(arr.shift()).toBe(3);
                expect(arr.shift()).toBe(4);
                expect(arr).toEqual([]);
            });
        });

        /**
         *
         * Можно проверить является ли переменная массивом
         */
        describe("Check array type", () => {
            /**
             *
             * Можно использовать Array.prototype.isArray
             */
            test("Should Array.isArray", () => {
                expect(Array.isArray([1, 2, 3])).toBeTruthy();
                expect(Array.isArray(123)).toBeFalsy();
            });

            /**
             *
             * Можно использовать оператор instanceof
             */
            test("Should instanceof", () => {
                expect([1, 2, 3] instanceof Array).toBeTruthy();
                expect({} instanceof Array).toBeFalsy();
            });

            /**
             *
             * Можно проверить свойство constructor
             */
            test("Should use constructor property", () => {
                expect([1, 2, 3].constructor === Array).toBeTruthy();
                expect({}.constructor === Array).toBeFalsy();
            });
        });

        describe("Array clearance", () => {
            /**
             *
             * Можно очистить массив присвоив свойство length
             */
            test("Should set length", () => {
                const arr = [1, 2, 3, 4];

                arr.length = 0;
                expect(arr.length).toBe(0);
                expect(arr[0]).toBe(undefined);
                expect(arr[1]).toBe(undefined);
            });

            /**
             *
             * Можно вырезать все элементы начиная с нулевого
             */
            test("Should splice array", () => {
                const arr = [1, 2, 3, 4];

                arr.splice(0);
                expect(arr.length).toBe(0);
                expect(arr[0]).toBe(undefined);
                expect(arr[1]).toBe(undefined);
            });
        });

        /**
         *
         * Итерация массива
         */
        describe("Iterate Array", () => {
            /**
             *
             * Если массив целостный, то его можно итерировать по индексам
             */
            it("Should iterate array with for", () => {
                let list = [1, 2, 3, 4, 5];
                let count = 0;

                for (let i = 0; i < list.length; i++) {
                    count += list[i];
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Можно итерировать с конца в начало
             */
            it("Should iterate array from end with for", () => {
                let list = [1, 2, 3, 4, 5];
                let count = 0;

                for (let i = list.length; i--;) {
                    count += list[i];
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Если массив не целостный, то при обращении к несуществующему индексу значение будет равно undefined
             */
            it("Should iterate broken array with for", () => {
                const list = [1, , 2, , 3, , 4, , 5];
                const fire = jest.fn();

                for (let i = 0; i < list.length; i++) {
                    if (list[i] !== undefined) {
                        fire();
                    }
                }

                expect(fire).toBeCalledTimes(5);
            });

            /**
             *
             * Можно получить список ключей массива и перебрать по ним при помощи for-in
             */
            it("Should iterate array with for-in", () => {
                let list = [1, 2, 3, 4, 5];
                let count = 0;

                for (let i in list) {
                    count += list[i];
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Если массив не целосный то всё-равно будут получены только актуальные ключи
             */
            it("Should iterate broken array with for-in", () => {
                let list = [1, , 2, , 3, , 4, , 5];
                let count = 0;

                for (let i in list) {
                    count += list[i];
                }

                expect(list.length).toBe(9);
                expect(count).toBe(15);
            });

            /**
             *
             * Если массив содержит undefined то for-in их тоже будет учитывать
             */
            it("Should iterate array with undefined with for-in", () => {
                let list = [1, undefined, 2, undefined, 3, undefined, 4, undefined, 5];
                let count = 0;
                let undefs = 0;

                for (let i in list) {
                    if (list[i] !== undefined) {
                        count += list[i];
                    } else {
                        undefs++;
                    }
                }

                expect(list.length).toBe(9);
                expect(count).toBe(15);
                expect(undefs).toBe(4);
            });

            /**
             *
             * Можно перебрать массив как итератор
             */
            it("Should iterate array with for-of", () => {
                let list = [1, 2, 3, 4, 5];
                let count = 0;

                expect(typeof list[Symbol.iterator]).toBe("function");

                for (let item of list) {
                    count += item;
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Если массив не целостный то будут учитываться и пустые значения тоже в for-of
             */
            it("Should iterate broken array with for-of", () => {
                let list = [1, , 2, , 3, , 4, , 5];
                let count = 0;
                let undefs = 0;

                for (let item of list) {
                    if (item !== undefined) {
                        count += item;
                    } else {
                        undefs++;
                    }
                }

                expect(count).toBe(15);
                expect(undefs).toBe(4);
            });

            /**
             *
             * При итерации через for-of и forEach учитываются только валидные индексы,
             * а при итерации через for-in все свои ключи и ключи прототипа
             */
            it("Should iterate with custom keys", () => {
                const arr = [];
                arr.key_1 = 1;
                arr.key_2 = 1;
                Object.defineProperty(arr, "key_3", {
                    value: 1,
                    enumerable: false,
                });

                arr.push(1);
                arr.push(1);

                let sumForOf = 0;
                for (let item of arr) {
                    sumForOf += item;
                }


                let sumForIn = 0;
                for (let key in arr) {
                    sumForIn += arr[key];
                }

                expect(sumForOf).toBe(2);
                expect(sumForIn).toBe(4);
            });

            /**
             *
             * Можно использовать внутренние итераторы Array.prototype
             */
            it("Should iterate array with foreach", () => {
                let list = [1, 2, 3, 4, 5];
                let count = 0;

                list.forEach(item => count += item);

                expect(count).toBe(15);
            });

            /**
             *
             * Можно итерировать через while обращаясь к индексам
             */
            it("Should iterate with while", () => {
                const arr = [1, 2, 3, 4, 5];

                let i = 0;
                let count = 0;

                while(i < arr.length) {
                    count += arr[i];
                    i++;
                }

                expect(count).toBe(15);
            });

            it("Should iterate with while and iterator", () => {
                const arr = [1, 2, 3, 4, 5];

                let count = 0;
                const iterator = arr[Symbol.iterator]();

                let item;
                while(!(item = iterator.next()).done) {
                    count += item.value;
                }

                expect(count).toBe(15);
            });

            it("Should iterate with do-while", () => {
                const arr = [1, 2, 3, 4, 5];

                const iterator = arr[Symbol.iterator]();
                let count = 0;
                let item;

                do {
                    item = iterator.next();

                    if (item.value) {
                        count += item.value;
                    }
                } while (!item.done);

                expect(count).toBe(15);
            });
        });
    });

    describe("TypedArray", () => {
        describe("Create typed array", () => {
            test("Should create array", () => {
                const arr = new Int8Array([1, 2, 3]);

                expect(arr.toString()).toEqual("1,2,3");
            });

            test("Should create with TypedArray.from", () => {
                const arr = Int16Array.from(new Set([1, 2, 3]));

                expect(arr.toString()).toEqual("1,2,3");
            });

            test("Should create with TypedArray.of", () => {
                const arr = Int16Array.of(10, 20, 30);

                expect(arr.toString()).toEqual("10,20,30");
            });
        });

        describe("Change typed item value", () => {
            test("Should change value", () => {
                const arr = new Int8Array([1, 2, 3]);

                arr[0] = 30;
                arr[1] = 20;
                arr[2] = 10;

                expect(arr.toString()).toBe("30,20,10");
            });

            test("Shouldn't change type", () => {
                const arr = new Int8Array([1, 2, 3]);

                arr[0] = {};

                expect(arr.toString()).toBe("0,2,3");
            });

            test("Should set correct value", () => {
                const arr = new Uint8Array([1, 2, 3]);

                arr[0] = -100;

                expect(arr.toString()).toBe("156,2,3");
            });
        });


        describe("Change typed value", () => {
            test("Shouldn't add value", () => {
                const arr = new Int8Array([1, 2, 3]);

                arr[10] = 30;

                expect(arr.toString()).toBe("1,2,3");
            });
        });
    });

    /**
     * Объекты класса Set позволяют вам сохранять уникальные значения любого типа,
     * как примитивы, так и другие типы объектов.
     */
    describe("Set", () => {
        /**
         *
         * Set создаётся через оператор new
         */
        test("Should create Set instance", () => {
            const inst = new Set();

            expect(inst instanceof Set).toBeTruthy();
            expect(inst.__proto__).toBe(Set.prototype);
        });

        /**
         *
         * Можно передать в конструктор любой итератор, например массив
         */
        test("Should create set from array", () => {
            const inst = new Set([1, 2, 3, 4, 5]);

            expect(inst.size).toBe(5);
        });

        /**
         * Можно создать set из другого set
         */
        test("Should create set from set", () => {
            const inst_1 = new Set([1, 2, 3, 4]);
            const inst_2 = new Set(inst_1);

            inst_1.add(55);
            inst_2.add(666);

            expect(inst_1.has(55)).toBeTruthy();
            expect(inst_2.has(666)).toBeTruthy();
            expect(inst_1.has(666)).toBeFalsy();
            expect(inst_2.has(55)).toBeFalsy();
        });

        /**
         *
         * Можно создать set из любого другого итератора
         */
        test("Should create set from map", () => {
            const source = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4], ["e", 1]]);

            const inst_1 = new Set(source.values());
            expect([...inst_1]).toEqual([1, 2, 3, 4]);

            const inst_2 = new Set(source.keys());
            expect([...inst_2]).toEqual(["a", "b", "c", "d", "e"]);
        });

        /**
         *
         * Можно добавить элемент в set
         */
        test("Should add item", () => {
            const inst = new Set();

            inst.add(10);
            expect(inst.size).toBe(1);
            expect([...inst.values()]).toEqual([10]);

            inst.add(20);
            expect(inst.size).toBe(2);
            expect([...inst.values()]).toEqual([10, 20]);
        });

        /**
         *
         * Все значения в set уникальные, повторяющиеся значения игнорируются
         */
        test("Should contain only unique value", () => {
            const inst = new Set();

            inst.add("123");
            inst.add("1234");
            inst.add("123");
            inst.add("1234");
            inst.add("12356");
            inst.add("1234");

            expect(inst.size).toBe(3);
            expect([...inst]).toEqual(["123", "1234", "12356"]);
        });

        /**
         *
         * Можно проверить существует ли значение в set
         */
        test("Should check item", () => {
            const inst = new Set();

            inst.add(10);
            inst.add(20);
            inst.add(30);

            expect(inst.has(10)).toBeTruthy();
            expect(inst.has(100)).toBeFalsy();
        });

        /**
         *
         * Существующее значение в set можно удалить
         */
        test("Should remove item", () => {
            const inst = new Set();

            inst.add(10);
            expect(inst.size).toBe(1);
            expect([...inst.values()]).toEqual([10]);

            inst.delete(10);
            expect(inst.size).toBe(0);
            expect([...inst.values()]).toEqual([]);
        });

        /**
         *
         * Можно очистить set целиком
         */
        test("Should clear set", () => {
            const inst = new Set();

            inst.add(10);
            inst.add(20);
            inst.add(30);
            inst.add(40);
            expect(inst.size).toBe(4);

            inst.clear();
            expect(inst.size).toBe(0);
        });

        describe("Iterate Set", () => {
            /**
             *
             * Можно перебрать Set как итератор
             */
            it("Should iterate set with for-of ", () => {
                const set = new Set([1, 2, 3, 4, 5]);
                let count = 0;

                expect(typeof set[Symbol.iterator]).toBe("function");

                for (let value of set) {
                    count += value;
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Нельзя перебрать через for-in, т.к. Set инеет enumerable ключей
             */
            it("Shouldn't iterate set with for-in ", () => {
                const set = new Set([1, 2, 3, 4, 5]);
                let count = 0;

                for (let value in set) {
                    count += value;
                }

                expect(count).toBe(0);
            });

            /**
             *
             * Можно преобразовать Set в Array через spread и потом перебрать его
             */
            it("Should iterate set with spread ", () => {
                const set = new Set([1, 2, 3, 4, 5]);
                let count = 0;

                for (let value of [...set]) {
                    count += value;
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Можно использовать внутренние итераторы Set.prototype
             */
            it("Should iterate set with foreach ", () => {
                const set = new Set([1, 2, 3, 4, 5]);
                let count = 0;

                set.forEach(item => count += item);

                expect(count).toBe(15);
            });

            /**
             *
             * Можно получить итератор через функции Set.prototype
             */
            it("Should iterate set with Set.prototype functions ", () => {
                const set = new Set([1, 2, 3, 4, 5]);
                let count = 0;

                for (let item of set.values()) {
                    count += item;
                }

                expect(count).toBe(15);
            });
        });
    });

    /**
     *
     */
    describe("Map", () => {
        /**
         *
         * Можно создать через оператор new
         */
        test("Should create Map instance", () => {
            const inst = new Map();

            expect(inst instanceof Map).toBeTruthy();
            expect(inst.__proto__).toBe(Map.prototype);
        });

        /**
         *
         * Можно создать map из массива массивов
         */
        test("Should create from array", () => {
            const inst = new Map([["a", 1], ["b", 2], ["c", 3]]);

            expect(inst.get("a")).toBe(1);
            expect(inst.get("b")).toBe(2);
            expect(inst.get("c")).toBe(3);
            expect(inst.size).toBe(3);
        });

        /**
         *
         * Можно создать map из объекта
         */
        test("Should create from any iterator", () => {
            const obj = {a: 11, b: 22, c: 33};
            const inst = new Map(Object.entries(obj));

            expect(inst.get("a")).toBe(11);
            expect(inst.get("b")).toBe(22);
            expect(inst.get("c")).toBe(33);
            expect(inst.size).toBe(3);
        });

        /**
         *
         * Можно создать map из другого map
         */
        test("Should create from another map", () => {
            const source = new Map([["a", 11], ["b", 22], ["c", 33]]);
            const inst = new Map(source);

            inst.set("d", 44);
            expect(inst.get("d")).toBe(44);
            expect(source.get("d")).toBe(undefined);
        });

        /**
         *
         * Можно довавить элемент в map
         */
        test("Should add item", () => {
            const inst = new Map();

            inst.set("a", 1);
            inst.set("b", 11);
            inst.set("c", 111);

            expect(inst.get("a")).toBe(1);
            expect(inst.get("b")).toBe(11);
            expect(inst.get("c")).toBe(111);
        });

        /**
         *
         * Ключём и значением может быть любой объект или примитив
         */
        test("Should add item with some keys", () => {
            const inst = new Map();
            const key_1 = {a: 1, b: 2};

            inst.set(key_1, 111);
            inst.set(Set.prototype, 222);
            inst.set(Symbol.iterator, 333);
            inst.set(888, 444);
            inst.set(null, 555);
            inst.set(undefined, 666);
            inst.set(0, 777);

            expect(inst.get(key_1)).toBe(111);
            expect(inst.get(Set.prototype)).toBe(222);
            expect(inst.get(Symbol.iterator)).toBe(333);
            expect(inst.get(888)).toBe(444);
            expect(inst.get("888")).toBe(undefined);
            expect(inst.get(null)).toBe(555);
            expect(inst.get(undefined)).toBe(666);
            expect(inst.get("undefined")).toBe(undefined);
            expect(inst.get(0)).toBe(777);
            expect(inst.get(-0)).toBe(777);
        });

        /**
         *
         * Можно проверить наличие элемента по его ключу
         */
        test("Should check map", () => {
            const inst = new Map([["a", 1], ["b", 2], ["c", 3]]);

            expect(inst.has("a")).toBeTruthy();
            expect(inst.has("aaa")).toBeFalsy();
        });

        /**
         *
         * Можно удалить элемент зная его ключ
         */
        test("Should delete item", () => {
            const inst = new Map();

            inst.set("a", 1);
            inst.set("b", 22);
            inst.set("c", 333);

            expect(inst.size).toBe(3);
            expect([...inst.values()]).toEqual([1, 22, 333]);

            inst.delete("b");
            expect(inst.size).toBe(2);
            expect([...inst.values()]).toEqual([1, 333]);
        });

        /**
         *
         * Можно полностью очистить map
         */
        test("Should clear map", () => {
            const inst = new Map();

            inst.set("a", 1);
            inst.set("b", 22);
            inst.set("c", 333);
            expect(inst.size).toBe(3);

            inst.clear();
            expect(inst.size).toBe(0);
        });

        describe("Iterate Map", () => {
            /**
             *
             * Можно перебрать Map как итератор
             */
            it("Should iterate map with for-of", () => {
                const map = new Map([[0, 1], [10, 2], [20, 3], [30, 4], [40, 5]]);
                let count = 0;

                expect(typeof map[Symbol.iterator]).toBe("function");

                for (let [key, value] of map) {
                    count += value;
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Map не имеет enumerable ключей поэтому for-in не сработает
             */
            it("Shouldn't iterate map with for-in", () => {
                const map = new Map([[0, 1], [10, 2], [20, 3], [30, 4], [40, 5]]);
                let count = 0;

                expect(Object.getOwnPropertyDescriptors(map)).toEqual({});

                for (let [key, value] in map) {
                    count += value;
                }

                expect(count).toBe(0);
            });

            /**
             *
             * Можно использовать внутренние итераторы
             */
            it("Should iterate map with foreach", () => {
                const map = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
                let count = 0;

                map.forEach((item, key) => count += item);

                expect(count).toBe(15);
            });

            /**
             *
             * Можно использовать функцию Map.prototype.values
             */
            it("Should iterate map with values", () => {
                const map = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
                let count = 0;

                for (let value of map.values()) {
                    count += value;
                }

                expect(count).toBe(15);
            });

            /**
             *
             * Можно использовать функцию Map.prototype.entries
             */
            it("Should iterate map with keys", () => {
                const map = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
                let count = 0;

                for (let [key, value] of map.entries()) {
                    count += value;
                }

                expect(count).toBe(15);
            });
        });
    });
});
