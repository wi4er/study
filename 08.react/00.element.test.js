import React from "react";
import {mount} from "enzyme";
import ReactServerDom from "react-dom/server";

describe("Render to string", () => {
    describe("Creating element", () => {
        test("Should create element", () => {
            const element = React.createElement("div");

            expect(element.$$typeof).toBe(Symbol.for('react.element'));
        });

        test("Should create element with jsx", () => {
            const element = (
                <div/>
            );

            expect(element.$$typeof).toBe(Symbol.for('react.element'));
        });
    });

    describe("Render to string", () => {
        /**
         *
         */
        test("Should render to string", () => {
            const element = (
                <div className={"index"}>
                    {"TEST"}
                </div>
            );
            const str = ReactServerDom.renderToString(element);

            expect(str).toBe("<div class=\"index\" data-reactroot=\"\">TEST</div>");
        });

        /**
         *
         */
        test("Should render to static markup", () => {
            const str = ReactServerDom.renderToStaticMarkup(
                <div className={"index"}>
                    {"TEST"}
                </div>
            );

            expect(str).toBe("<div class=\"index\">TEST</div>");
        });sdfdsf
    });

    describe("Render with props", () => {
        test("Should render with props", () => {
            const wrap = mount(
                React.createElement(
                    "div",
                    {
                        className: "index",
                    }
                )
            );

            expect(wrap.html()).toBe("<div class=\"index\"></div>");
        });

        test("Should render with props in jsx", () => {
            const wrap = mount(
                <div className="index"/>,
            );

            expect(wrap.html()).toBe("<div class=\"index\"></div>");
        });
    });

    describe("Render with nesting", () => {
        test("Should render with child", () => {
            const wrap = mount(
                React.createElement(
                    "div",
                    {
                        className: "index"
                    },
                    React.createElement("div", {}, "123")
                )
            );

            expect(wrap.html()).toBe("<div class=\"index\"><div>123</div></div>");
        });

        test("Should render with child in jsx", () => {
            const wrap = mount(
                <div className="index">
                    <div>
                        {"123"}
                    </div>
                </div>
            );

            expect(wrap.html()).toBe("<div class=\"index\"><div>123</div></div>");
        });

        test("Should render with iterator in jsx", () => {
            const wrap = mount(
                <div className="index">
                    {[
                        <div key={1}>
                            {"111"}
                        </div>,
                        <div key={2}>
                            {"222"}
                        </div>
                    ]}
                </div>
            );

            expect(wrap.html()).toBe("<div class=\"index\"><div>111</div><div>222</div></div>");
        });
    });
});
