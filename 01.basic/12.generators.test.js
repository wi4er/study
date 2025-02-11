describe("Generators", () => {
    /**
     *
     * Можно создать генератор
     */
    test("Should create generator", () => {
        function* getValue() {
            yield "VALUE";
        }

        const iterator = getValue();

        expect(typeof iterator[Symbol.iterator]).toBe("function");
        expect([...iterator]).toEqual(["VALUE"]);
    });


    test('Should call next in iterator', () => {
        const fire = jest.fn();

        function* getValue() {
            fire();
            yield "VALUE";
            fire();
        }

        const iterator = getValue();
        expect(fire).toBeCalledTimes(0);

        iterator.next();
        expect(fire).toBeCalledTimes(1);

        iterator.next();
        expect(fire).toBeCalledTimes(2);
    });


    test('Should send value to iterator', () => {
        const fire = jest.fn();

        function* getValue(first) {
            fire(first);

            fire(yield);
        }

        const iterator = getValue('FIRST');

        iterator.next();
        expect(fire).toBeCalledWith('FIRST');

        iterator.next('VALUE')
        expect(fire).toBeCalledWith('VALUE');
    });

    /**
     *
     * Значение возвращённое return игнорируется, но выполнение прекращается
     */
    test('Should have return', () => {
        function* getValue() {
            yield "First";

            return "RETURN";

            yield "Second";
        }

        const iterator = getValue();

        expect([...iterator]).toEqual(["First"]);
    });

    /**
     *
     * Можно заспредить генератор
     */
    test("Should spread generator", () => {
        function* getValue() {
            for (let i = 1; i <= 5; i++) {
                yield i;
            }
        }

        expect([...getValue()]).toEqual([1, 2, 3, 4, 5]);
    });

    /**
     *
     * Можно проитерировать генератор через for-of
     */
    test("Should iterate generator with for-of", () => {
        function* getValue() {
            for (let i = 1; i <= 5; i++) {
                yield i;
            }
        }

        let count = 0;

        for (let item of getValue()) {
            count += item;
        }

        expect(count).toEqual(15);
    });

    test("Should iterate generator with while-do", () => {
        function* getValue() {
            for (let i = 1; i <= 5; i++) {
                yield i;
            }
        }

        let count = 0;
        const iterator = getValue();
        let next;

        while (next = iterator.next(), !next.done) {
            count += next.value;
        }

        expect(count).toEqual(15);
    });

    /**
     *
     * Можно передать генератор в качестве аргумента
     */
    test("Should set generator as attribute", () => {
        function* getValue(max) {
            for (let i = 1; i <= max; i++) {
                yield [i, i * 10];
            }
        }

        const map = new Map(getValue(5));
        expect(map.get(1)).toBe(10);
        expect(map.get(5)).toBe(50);

        const obj = Object.fromEntries(getValue(3));
        expect(obj[1]).toBe(10);
        expect(obj[3]).toBe(30);
    });


    test.todo("Should iterate typed array");

    /**
     *
     * Можно создать генератор как свойства объекта
     */
    test("Should create generator property", () => {
        const obj = {
            * create() {
                for (let i = 1; i <= 100; i++) {
                    yield i;
                }
            }
        };

        let count = 0;

        for (let item of obj.create()) {
            count += item;
        }

        expect(count).toBe(5050);
    });

    /**
     *
     * Генератор может быть методом класса
     */
    test("Should create generator method", () => {
        class Custom {
            constructor(max) {
                this.max = max;
            }

            * create() {
                for (let i = 1; i <= this.max; i++) {
                    yield i;
                }
            }
        }

        let count = 0;
        const inst = new Custom(10);

        for (let item of inst.create()) {
            count += item;
        }

        expect(count).toBe(55);
    });

    /**
     *
     * Генератор может быть символьным свойством
     */
    test("Should create as symbol property", () => {
        class Custom {
            constructor(max) {
                this.max = max;
            }

            * [Symbol.iterator]() {
                for (let i = 0; i <= this.max; i++) {
                    yield i;
                }
            }

        }

        const inst = new Custom(5);
        let count = 0;

        for (let i of inst) {
            count += i;
        }

        expect(count).toBe(15);
    });

    /**
     *
     * Можно составлять итераторы
     */
    test("Should compose iterator", () => {
        function* getNumber(num) {
            for (let i = 0; i < num; i++) {
                yield num;
            }
        }

        function* getValue(max) {
            for (let i = 1; i < max; i++) {
                yield* getNumber(i);
            }
        }

        let result = "";

        for (const item of getValue(5)) {
            result += item;
        }

        expect(result).toBe("1223334444");
    });
});

describe("Async generators", () => {
    test("Should create async generator", async () => {
        async function* getValue(max) {
            for (let i = 1; i <= max; i++) {
                yield i;
            }
        }

        let count = 0;
        for await (const item of getValue(10)) {
            count += item;
        }

        expect(count).toBe(55);
    });

    test("Should yield promise", async () => {
        async function* getValue(max) {
            for (let i = 1; i <= max; i++) {
                yield new Promise(resolve => resolve(i));
            }
        }

        let count = 0;
        for await (const item of getValue(12)) {
            count += item;
        }

        expect(count).toBe(78);
    });

    test("Should create with async", async () => {
        async function plus1(value) {
            return value + 1;
        }

        async function* getValue(max) {
            for (let i = 1; i <= max; i++) {
                yield plus1(i);
            }
        }

        let count = 0;
        for await (const item of getValue(10)) {
            count += item;
        }

        expect(count).toBe(65);
    });

    test("Should create with compose", async () => {
        async function* getNumber(number) {
            for (let i = 1; i <= number; i++) {
                yield new Promise(resolve => resolve(String(number)));
            }
        }

        async function* getValue(max) {
            for (let i = 1; i <= max; i++) {
                yield* getNumber(i);
            }
        }

        let count = "";
        for await (const item of getValue(5)) {
            count += item;
        }

        expect(count).toBe("122333444455555");
    });
});
