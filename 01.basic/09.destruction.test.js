/**
 *
 * Синтаксис деструктурирующего присваивания в выражениях JavaScript позволяет извлекать данные из массивов или объектов
 * при помощи синтаксиса, подобного литералов в объекта или массива.
 */
describe("Destructing", () => {
    /**
     *
     */
    describe("Destruction of iterator", () => {
        /**
         *
         * Объявляем переменные получая инициализирующие значение из массива
         */
        it("Should destruct array", () => {
            const arr = [1, 2, 3];
            const [a, b, c] = arr;

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });

        /**
         *
         * Первые значения можно присвоить в переменные, а остальные сложить в новый массив через оператор rest
         */
        it("Should destruct array with rest", () => {
            const arr = [1, 2, 3, 4, 5, 6];
            const [a, b, ...c] = arr;

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toEqual([3, 4, 5, 6]);
        });

        /**
         *
         * Если значений не достаточно, то новый массив будет пустым
         */
        it("Should destruct too short array with rest", () => {
            const arr = [1, 2, 3];
            const [a, b, c, ...d] = arr;

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            expect(d).toEqual([]);
        });

        /**
         *
         * Ненужные значения можно пропустить
         */
        it("Should destruct array with skip", () => {
            const arr = [1, 2, 3, 4, 5];
            const [, , , a, b] = arr;

            expect(a).toBe(4);
            expect(b).toBe(5);
        });

        /**
         *
         * Можно указать значения по умолчанию,
         * которые будут присвоены если при обращении к индексу будет получено undefined.
         * Значение по умолчанию на null не распростроняется
         */
        it("Should destruct with defaults", () => {
            const arr = [11, 22, undefined, null];
            const [a = 1, b = 2, c = 3, d = 4, e = 5] = arr;

            expect(a).toBe(11);
            expect(b).toBe(22);
            expect(c).toBe(3);
            expect(d).toBe(null);
            expect(e).toBe(5);
        });

        /**
         *
         * Можно получить значения для присвоения из вложенных массивов
         */
        it("Should desctuct with attachment", () => {
            let arr = [1, [2, [3, [4]]]];
            const [a, [b, [c, [d]]]] = arr;

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            expect(d).toBe(4);
        });

        /**
         *
         * Значения по умолчанию тоже могут иметь структуру с вложенностями
         */
        it("Should destruct with attachment and defaults", () => {
            const arr = [1, 2, 3];
            const [a, b, c, [ccc, [ddd]] = [333, [444]]] = arr;

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            expect(ccc).toBe(333);
            expect(ddd).toEqual(444);
        });

        /**
         *
         * Можно присваивать значения уже существующим переменным
         */
        it("Should set vars with array destruction", () => {
            let a = 1, b = 2;

            [a, b] = [b, a];

            expect(a).toBe(2);
            expect(b).toBe(1);
        });

        /**
         *
         * Можно деструктурировать Set
         */
        test("Should destructing set", () => {
            const set = new Set([1, 2, 1, 3, 4, 5]);

            const [a, b, c] = set;
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });

        /**
         *
         * Можно деструктурировать Map
         */
        test("Should destructing map", () => {
            const map = new Map();
            map.set("a", 1);
            map.set("b", 2);
            map.set("c", 3);

            const [a, b, c] = map;

            expect(a).toEqual(["a", 1]);
            expect(b).toEqual(["b", 2]);
            expect(c).toEqual(["c", 3]);
        });

        /**
         *
         * Можно деструктурировать String
         */
        test("Should destructing string", () => {
            const str = "qwertyu";

            const [a, b, c] = str;

            expect(a).toBe("q");
            expect(b).toBe("w");
            expect(c).toBe("e");
        });

        /**
         *
         * Можно деструктурировать генератор
         */
        test("Should destructing generator", () => {
            function* list() {
                yield 1;
                yield 2;
                yield 3;
            }

            const [a, b, c] = list();

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });


        /**
         *
         * Нельзя деструктуризировать объект как массив
         */
        it("Shouldn't destructing object as array", () => {
            const obj = {a: 1, b: 2, c: 3};

            expect(() => {
                const [a] = obj;
            }).toThrow(TypeError);
        });
    });

    describe("Destruction of object", () => {
        /**
         *
         * Объявляем переменные получая значения из объекта, равные одноименным свойсвам объекта
         */
        it("Should init vars with destruction", () => {
            const obj = {a: 1, b: 2, c: 3};
            const {a, b, c} = obj;

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });

        /**
         *
         * Присваиваем значения уже имеющимся переменным
         */
        it("Should set vars with destruction", () => {
            let a = 10, b = 20, c = 30;

            ({a, b, c} = {a: 1, b: 2, c: 3});

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });

        /**
         *
         * Можно присваивать значения из вложенных объектов
         */
        it("Should destruct with attachment", () => {
            const obj = {a: {aa: {aaa: {aaaa: 100}}}};
            const {a: {aa: {aaa: {aaaa}}}} = obj;

            expect(aaaa).toBe(100);
        });

        /**
         *
         * Можно задать значения по умолчанию
         */
        it("Should destruct with defaults", () => {
            const obj = {
                a: {
                    aa: 1,
                    ab: 2
                },
                b: {
                    ba: 3,
                    bb: 4
                },
            };

            const {
                a: {aa} = {},
                b: {bb} = {},
                c: {cc} = {cc: 55},
            } = obj;

            expect(aa).toBe(1);
            expect(bb).toBe(4);
            expect(cc).toBe(55);
        });

        /**
         *
         * Можно переименовать переменную
         */
        it("Should destruct with naming", () => {
            const obj = {a: {aa: 1}, b: {bb: 2}};
            const {
                a: {"aa": first},
                b: {bb: second},
            } = obj;

            expect(first).toBe(1);
            expect(second).toBe(2);
        });

        /**
         *
         * Можно получить значение по имени ключа из переменной
         */
        it("Should destruct with name from variable", () => {
            const varName = "value";
            const obj = {value: "value"};
            const {
                [varName]: name,
            } = obj;

            expect(name).toBe("value");
        });

        /**
         *
         * Можно переименовать переменную типа Symbol
         */
        it("Should destruct with symbol naming", () => {
            const obj = {[Symbol.split]: "value"};
            const {
                [Symbol.split]: value,
            } = obj;

            expect(value).toBe("value");
        });

        /**
         *
         * Все неиспользованные значения можно сложить в новый объект через оператор rest
         */
        it("Should destruct with rest", () => {
            const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
            const {a, d, ...rest} = obj;

            expect(a).toBe(1);
            expect(d).toBe(4);
            expect(rest).toEqual({b: 2, c: 3, e: 5});
        });

        /**
         *
         * Оператор rest можно использовать только один раз в конце деструттуризаци
         */
        it("Shouldn't use multiple rest", () => {
            const obj = {a: 1, b: 2, c: 3, d: 4};

            expect(() => {
                eval("const {a, ...rest, ...again} = obj;");
            }).toThrow(SyntaxError);
        });

        /**
         *
         * Можно получить свойства с enumerable = false
         */
        it("Should destruct with enumerable false", () => {
            const obj = Object.create(
                Object.prototype,
                {
                    a: {value: 10},
                    b: {value: 20},
                }
            );

            const {a, b} = obj;

            expect(a).toBe(10);
            expect(b).toBe(20);
        });

        /**
         *
         * Можно получить свойства из прототипа объекта
         */
        it("Should get properties from prototype", () => {
            const obj = Object.create({a: 10, b: 20});
            const {a, b} = obj;

            expect(a).toBe(10);
            expect(b).toBe(20);
        });
    });

    describe("Destruction in statements", () => {
        test("Should destruct array in for-of", () => {
            const arr = [1, 2, 3, 4, 5];
            let count = 0;

            for (const [index, value] of arr.entries()) {
                count += value;
            }

            expect(count).toBe(15);
        });

        test("Should have destruction array of objects", () => {
            const arr = [
                {a: 1, b: 11},
                {a: 2, b: 22},
                {a: 3, b: 33},
            ];
            let countA = 0;
            let countB = 0;

            for (const {a, b} of arr) {
                countA += a;
                countB += b;
            }

            expect(countA).toBe(6);
            expect(countB).toBe(66);
        });

        test("Should have destruction with Map", () => {
            const map = new Map([[1, 1], [2, 2], [3, 3]]);
            let count = 0;

            for (const [key, value] of map) {
                count += value;
            }

            expect(count).toBe(6);
        });

        test("Should destruct with try catch", done => {
            try {
                throw new Error("SOME ERROR");
            } catch ({message}) {
                expect(message).toBe("SOME ERROR");

                done();
            }
        });

        test("Should destruct with parameters", () => {
            function get({a, b, c}) {
                return a + b + c;
            }

            const obj = {a: 1, b: 10, c: 100};

            expect(get(obj)).toBe(111);
        });
    });
});
