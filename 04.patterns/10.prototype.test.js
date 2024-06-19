describe("Prototype", () => {
    function Parent() {

    }

    Parent.prototype = Object.create(
        Object.prototype,
        {

        }
    );

    function Custom() {
        Parent.call(this);

    }

    Custom.prototype = Object.create(
        Parent.prototype,
        {

        }
    );

    test("Should prototype", () => {

    });
});
