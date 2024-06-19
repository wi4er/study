const arr = [
    {
        id: 0,
        a: 1,
        b: 10,
    }, {
        id: 1,
        a: 4,
        b: 2
    }, {
        id: 2,
        a: 1,
        b: 5,
    }, {
        id: 3,
        a: 2,
        b: 7
    }, {
        id: 4,
        a: 2,
        b: 10
    }, {
        id: 5,
        a: 3,
        b: 6
    }
];

describe("functional command", () => {
    test("Should filter by a", () => {
        const exec = new CommandList(arr);

        exec.add(addFilter("a=1"));
        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([0, 2]);
    });

    test("Should filter by b", () => {
        const exec = new CommandList(arr);

        exec.add(addFilter("b=10"));
        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([0, 4]);
    });

    test("Should filter by a and b", () => {
        const exec = new CommandList(arr);

        exec
            .add(addFilter("a=2"))
            .add(addFilter("b=7"));

        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([3]);
    });

    test("Should sort by a asc", () => {
        const exec = new CommandList(arr);

        exec.add(addSort("a=asc"));
        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([0, 2, 3, 4, 5, 1]);
    });

    test("Should sort by a desc", () => {
        const exec = new CommandList(arr);

        exec.add(addSort("a=desc"));
        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([1, 5, 3, 4, 0, 2]);
    });

    test("Should sort by b asc", () => {
        const exec = new CommandList(arr);

        exec.add(addSort("b=asc"));
        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([1, 2, 5, 3, 4, 0]);
    });

    test("Should sort by b desc", () => {
        const exec = new CommandList(arr);

        exec.add(addSort("b=desc"));
        const res = exec.execute();
        expect(res.map(i => i.id)).toEqual([4, 0, 3, 5,  2, 1]);
    });
});
