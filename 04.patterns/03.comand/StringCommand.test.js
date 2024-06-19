describe("String command", () => {

    test("Should filter by a", () => {
        const query = [{
            type: "filter",
            command: "a=1",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([0, 2]);
    });

    test("Should filter by b", () => {
        const query = [{
            type: "filter",
            command: "b=10",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([0, 4]);
    });

    test("Should filter by a and b", () => {
        const query = [{
            type: "filter",
            command: "a=2",
        }, {
            type: "filter",
            command: "b=7",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([3]);
    });

    test("Should sort by a asc", () => {
        const query = [{
            type: "sort",
            command: "a=asc",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([0, 2, 3, 4, 5, 1]);
    });

    test("Should sort by a desc", () => {
        const query = [{
            type: "sort",
            command: "a=desc",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([1, 5, 3, 4, 0, 2]);
    });

    test("Should sort by b asc", () => {
        const query = [{
            type: "sort",
            command: "b=asc",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([1, 2, 5, 3, 4, 0]);
    });

    test("Should sort by b desc", () => {
        const query = [{
            type: "sort",
            command: "b=desc",
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([4, 0, 3, 5,  2, 1]);
    });

    test("Should filter by a and sort by b", () => {
        const query = [{
            type: "filter",
            command: "a=1"
        }, {
            type: "sort",
            command: "b=asc"
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([2, 0]);
    });

    test("Should filter by b and sort by a", () => {
        const query = [{
            type: "filter",
            command: "b=10"
        }, {
            type: "sort",
            command: "a=desc"
        }];

        const res = execute(query);
        expect(res.map(i => i.id)).toEqual([4, 0]);
    });
});
