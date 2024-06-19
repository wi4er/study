import React from "react";
import {mount} from "enzyme";

describe("Nesting", () => {
    test("Should nest with aggregation", () => {
        function Inner() {
            return null;
        }

        function Outer() {
            return (
                <div>
                    <Inner />
                </div>
            );
        }

        const wrap = mount(
            <Outer />
        );

        expect(wrap.find(Outer).length).toBe(1);
        expect(wrap.find(Inner).length).toBe(1);
    });

    test("Should nest with containment", () => {
        function Inner() {
            return null;
        }

        function Outer(props) {
            const {children} = props;

            return (
                <div>
                    {children}
                </div>
            );
        }

        const wrap = mount(
            <Outer>
                <Inner />
            </Outer>
        );

        expect(wrap.find(Outer).length).toBe(1);
        expect(wrap.find(Inner).length).toBe(1);
    });

    test("Should nest with component injection", () => {
        function Inner() {
            return null;
        }

        function Outer(props) {
            const {inner: Nest} = props;

            return (
                <div>
                    <Nest />
                </div>
            );
        }

        const wrap = mount(
            <Outer inner={Inner} />
        );

        expect(wrap.find(Outer).length).toBe(1);
        expect(wrap.find(Inner).length).toBe(1);
    });

    test("Should nest with render method", () => {
        function Inner() {
            return null;
        }

        function Outer(props) {
            const {renderInner} = props;

            return (
                <div>
                    {renderInner()}
                </div>
            );
        }

        function renderInner() {
            return (
                <Inner />
            );
        }

        const wrap = mount(
            <Outer renderInner={renderInner} />
        );

        expect(wrap.find(Outer).length).toBe(1);
        expect(wrap.find(Inner).length).toBe(1);
    });

    test("Should nest with HOF render method", () => {
        function Inner() {
            return null;
        }

        function Outer(props) {
            const {renderInner} = props;

            return (
                <div>
                    {renderInner()}
                </div>
            );
        }

        function renderInner(index) {
            return () => {
                return (
                    <Inner index={index} />
                );
            }
        }

        const wrap = mount(
            <div>
                <Outer renderInner={renderInner(1)} />

                <Outer renderInner={renderInner(2)} />

                <Outer renderInner={renderInner(3)} />
            </div>
        );

        expect(wrap.find(Outer).length).toBe(3);
        expect(wrap.find(Inner).length).toBe(3);
        expect(wrap.find(Inner).at(1).props().index).toBe(2);
    });
});
