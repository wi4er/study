describe("setImmediate", () => {
    test("Should set immediate", done => {

    });
});

describe("setTimeout", function () {
    test("Should create timeout", done => {
        function create() {
            setTimeout(create);
        }

        create();
    });

    test("Should create timeout", done => {
        setTimeout(() => {
            done();
        }, 20);
    });

    test("Should clear timeout", done => {
        const inst = setTimeout(() => {
            done(Error("SHOULD NOT!"));
        }, 20);

        clearTimeout(inst);

        done();
    });
});

describe("setInterval", () => {

    test("Should create interval", () => {
        const interval = setInterval(() => {}, 100);

        expect(typeof interval).toBe("number");
    });

    test("Should clear interval", () => {
        const fire = jest.fn();
        const interval = setInterval(fire, 100);

        clearInterval(interval);

        expect(fire).toBeCalledTimes(0);
    });

    test("Should create interval", () => {
        let count = 0;
        const fire = jest.fn();

        const interval = setInterval(() => {
            fire();

            if (++count === 5 ) {
                clearInterval(interval);
            }
        }, 10);
    });
})
