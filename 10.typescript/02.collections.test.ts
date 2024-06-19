describe("Collections", () => {
    describe("Array", () => {
        test("Should create number array", () => {
            const list: Array<Number> = [];

            list.push(1);
            list.push(2);
            list.push(3);

            expect(list).toEqual([1, 2, 3]);
        });
    });

    describe("Set", () => {
        test("Should create number set", () => {
            const set: Set<Number> = new Set();

            set.add(1);
            set.add(2);
            set.add(3);

        });
    });

    describe("Map", () => {
        test("Should create string to number map", () => {
            const map: Map<String, Number> = new Map();

            map.set("FIRST", 1);
            map.set("SECOND", 2);
            map.set("THIRD", 3);
        });
    });
});
