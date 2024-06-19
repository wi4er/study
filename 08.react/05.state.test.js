import React from "react";
import {mount} from "enzyme";

describe("State control", () => {
    /**
     *
     * Можно задать state через setState на основании уже имеющегося state,
     * state передаётся в setState первым параметром
     */
    test("Should set state dependent on state", () => {
        class List extends React.Component {
            constructor(props) {
                super(props);

                this.state = {open: false};
            }

            renderItem() {
                const {open} = this.state;

                if (!open) {
                    return null;
                }

                return (
                    <div className="open"/>
                );
            }

            get handleClick() {
                return () => this.setState(({open}) => ({open: !open}));
            }

            render() {
                return (
                    <div
                        className="item"
                        onClick={this.handleClick}
                    >
                        {this.renderItem()}
                    </div>
                );
            }
        }

        const wrap = mount(
            <List/>
        );
        expect(wrap.find(".open").length).toBe(0);

        wrap.find(".item").simulate("click");
        expect(wrap.find(".open").length).toBe(1);

        wrap.find(".item").simulate("click");
        expect(wrap.find(".open").length).toBe(0);
    });

    /**
     *
     * Можно задать state через setState только на основании props,
     * props передаётся в setState вторым параметром
     */
    test("Should set state dependent on props", () => {
        class List extends React.Component {
            constructor(props) {
                super(props);
                this.state = {name: ""};
                this.handleClick = this.handleClick.bind(this);
            }

            handleClick() {
                this.setState((_, {name}) => ({name}));
            }

            render() {
                const {name} = this.state;

                return (
                    <div
                        className="item"
                        onClick={this.handleClick}
                    >
                        <div className="open">
                            {name}
                        </div>
                    </div>
                );
            }
        }

        const wrap = mount(
            <List name={"SOMETHING"}/>
        );
        expect(wrap.find(".open").text()).toBe("");

        wrap.find(".item").simulate("click");
        expect(wrap.find(".open").text()).toBe("SOMETHING");
    });
});
