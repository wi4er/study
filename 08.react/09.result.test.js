import React from "react";
import {mount} from "enzyme";

console.error = () => {
}

describe("Render result", () => {
    test("Should return react.element", () => {
        function Custom() {
            return (
                <div className="name">
                    {"SOME TEXT"}
                </div>
            );
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("<div class=\"name\">SOME TEXT</div>");
    });

    test("Should return Number", () => {
        function Custom() {
            return 123;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("123");
    });

    test("Should return String", () => {
        function Custom() {
            return "Some string";
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("Some string");
    });

    test("Should return BigInt", () => {
        function Custom() {
            return 333n;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe(null);
    });

    test("Should return Null", () => {
        function Custom() {
            return null;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe(null);
    });

    test("Should return Boolean", () => {
        function Custom() {
            return true;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe(null);
    });

    test("Should return Symbol", () => {
        function Custom() {
            return Symbol.iterator;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe(null);
    });

    test("Should return undefined", () => {
        function Custom() {
            return undefined;
        }

        expect(() => {
            mount(
                <Custom/>
            );
        }).toThrow();
    });

    test("Should return iterator", () => {
        function Custom() {
            return [
                <div key={1} />,
                <div key={2} />,
                <div key={3} />
            ];
        }

        const wrap = mount(
            <Custom />
        );

        expect(wrap.html()).toBe("<div></div><div></div><div></div>");
    });

    test.only("Should return inner iterator", () => {
        class Custom extends React.Component {
            *[Symbol.iterator]() {
                for (let i = 1; i < 10; i++) {
                    yield i;
                }
            }

            render() {
                const map = new Map([[1, 1], [2, 2], [3, 3]]);

                console.log(map.values());
                
                
                return map.values();

                // return {
                //     [Symbol.iterator]: () => map.values()
                // };
            }
        }

        const wrap = mount(
            <Custom />
        );

        console.log(wrap.html());
        
        

        // expect(wrap.html()).toBe("<div></div><div></div><div></div>");
    });
});
