import React from "react";
import {mount} from "enzyme";

describe("React context", function () {
    test("Should get with contextType", () => {
        const context = React.createContext({});

        class Custom extends React.Component {
            static contextType = context;

            render() {
                const {value} = this.context;

                return <div>{value}</div>;
            }
        }

        const wrap = mount(
            <context.Provider value={{value: "VALUE"}}>
                <Custom/>
            </context.Provider>
        );

        expect(wrap.html()).toBe("<div>VALUE</div>")
    });

    test("Should get with consumer", () => {
        const context = React.createContext({});

        function getValue(value) {
            return <div>{value}</div>;
        }

        const wrap = mount(
            <context.Provider value={"VALUE"}>
                <context.Consumer>
                    {getValue}
                </context.Consumer>
            </context.Provider>
        );

        expect(wrap.html()).toBe("<div>VALUE</div>");
    });

    test("Shouldn't get without provider", () => {
        const context = React.createContext("DEFAULT VALUE");

        function getValue(value) {
            expect(value).toBe("DEFAULT VALUE");

            return null;
        }

        mount(
            <context.Consumer>
                {getValue}
            </context.Consumer>
        );
    });

    test("Should get with useContext", () => {
        const context = React.createContext({});

        function Consumer() {
            const value = React.useContext(context);

            return (
                <div>
                    {value}
                </div>
            );
        }

        const wrap = mount(
            <context.Provider value={"WITH_HOOK"}>
                <Consumer/>
            </context.Provider>
        );

        expect(wrap.html()).toBe("<div>WITH_HOOK</div>");
    });

    test("Should get with multi consumer", () => {
        const context = React.createContext({});

        function getValue(value) {
            return <div>{value}</div>;
        }

        const wrap = mount(
            <div>
                <context.Provider value={"VALUE"}>
                    <context.Consumer>
                        {getValue}
                    </context.Consumer>

                    <context.Consumer>
                        {getValue}
                    </context.Consumer>

                    <context.Consumer>
                        {getValue}
                    </context.Consumer>
                </context.Provider>
            </div>
        );

        expect(wrap.html()).toBe("<div><div>VALUE</div><div>VALUE</div><div>VALUE</div></div>");
    });

    test("Should get with contextType", () => {
        const context = React.createContext({});

        class Custom extends React.Component {
            static contextType = context;

            render() {
                const {value, setValue} = this.context;

                return <div onClick={() => setValue("NEW")}>{value}</div>;
            }
        }

        class Provider extends React.Component {
            state = {
                value: "",
            };

            render() {
                const
                    {children} = this.props,
                    {value} = this.state;

                return (
                    <context.Provider value={Object.freeze({
                        value: value,
                        setValue: newValue => this.setState({value: newValue}),
                    })}>
                        {children}
                    </context.Provider>
                );
            }
        }

        const wrap = mount(
            <Provider>
                <Custom/>
            </Provider>
        );

        expect(wrap.html()).toBe("<div></div>")
        wrap.find(Custom).simulate("click");
        expect(wrap.html()).toBe("<div>NEW</div>")
    });

    test("Should render in double context", () => {
        const context = React.createContext({});

        mount(
            <context.Provider value={"VALUE_1"}>
                <context.Provider value={"VALUE_2"}>
                    <context.Consumer>
                        {value => {
                            expect(value).toBe("VALUE_2");
                        }}
                    </context.Consumer>
                </context.Provider>
            </context.Provider>
        )
    });
});
