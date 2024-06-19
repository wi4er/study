import React from "react";
import {mount} from "enzyme";

describe("Class Component", () => {
    test("Should create", () => {
        class Custom extends React.Component {
            render() {
                return null;
            }
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe(null);
    });

    test("Should create with nesting", () => {
        class Custom extends React.Component {
            render() {
                return (
                    <div className="index">
                        <div className="inner"/>
                    </div>
                );
            }
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("<div class=\"index\"><div class=\"inner\"></div></div>");
    });

    test("Should create with props", () => {
        class Custom extends React.Component {
            render() {
                const {value} = this.props;

                return (
                    <div>
                        {value}
                    </div>
                );
            }
        }

        const wrap = mount(
            <Custom
                value={"VALUE"}
            />
        );

        expect(wrap.html()).toBe("<div>VALUE</div>");
    });

    test("Should create with children", () => {
        class Custom extends React.Component {
            render() {
                const {children} = this.props;

                return (
                    <div>
                        {children}
                    </div>
                );
            }
        }

        const wrap = mount(
            <Custom>
                <div>DATA</div>
            </Custom>
        );

        expect(wrap.html()).toBe("<div><div>DATA</div></div>")
    });

    test("Should create with handle method", () => {
        class Custom extends React.Component {
            state = {
                value: "",
            };

            handleClick = () => this.setState({value: "VALUE"});

            render() {
                const {value} = this.state;

                return (
                    <div onClick={this.handleClick}>
                        {value}
                    </div>
                );
            }
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("<div></div>")
        wrap.find("div").simulate("click");
        expect(wrap.html()).toBe("<div>VALUE</div>")
    });

    test("Should create with state", () => {
        class Custom extends React.Component {
            state = {
                value: "",
            };

            render() {
                const {value} = this.state;

                return (
                    <div onClick={() => this.setState({value: "VALUE"})}>
                        {value}
                    </div>
                );
            }
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("<div></div>")
        wrap.find("div").simulate("click");
        expect(wrap.html()).toBe("<div>VALUE</div>")
    });

    test("Should create with state and method", () => {
        class Custom extends React.Component {
            state = {
                value: "",
            };

            renderValue(value) {
                return value + value;
            }

            render() {
                const {value} = this.state;

                return (
                    <div>
                        {this.renderValue(value)}
                    </div>
                );
            }
        }

        const renderValue = jest.spyOn(Custom.prototype, "renderValue");

        const wrap = mount(
            <Custom/>
        );

        expect(renderValue).toBeCalledTimes(1);
        expect(renderValue.mock.calls[0][0]).toBe("");
        expect(renderValue.mock.results[0].value).toBe("");

        wrap.setState({value: "www"})

        expect(renderValue).toBeCalledTimes(2);
        expect(renderValue.mock.calls[1][0]).toBe("www");
        expect(renderValue.mock.results[1].value).toBe("wwwwww");
    });

    test("Should create with render props", () => {
        class Custom extends React.Component {
            render() {
                const {renderValue} = this.props;

                return (
                    <div>
                        {renderValue()}
                    </div>
                );
            }
        }

        const renderValue = jest.fn(() => (<div>VALUE</div>));

        const wrap = mount(
            <Custom renderValue={renderValue}/>
        );

        expect(renderValue).toBeCalledTimes(1);
        expect(wrap.html()).toBe("<div><div>VALUE</div></div>");
    });

    test("Should create with render props with args", () => {
        class Custom extends React.Component {
            render() {
                const {renderValue} = this.props;

                return (
                    <div>
                        {renderValue(1)}
                        {renderValue(2)}
                        {renderValue(3)}
                    </div>
                );
            }
        }

        const renderValue = jest.fn(
            value => {
                return (
                    <p>{value}</p>
                );
            }
        );

        const wrap = mount(
            <Custom renderValue={renderValue}/>
        );

        expect(renderValue).toBeCalledTimes(3);
        expect(wrap.html()).toBe("<div><p>1</p><p>2</p><p>3</p></div>");
    });

    test("Should create with life circle", () => {
        class Custom extends React.Component {
            componentDidMount() {
                const {fire} = this.props;

                fire();
            }

            render() {
                return (
                    <div>
                        VALUE
                    </div>
                );
            }
        }

        const fire = jest.fn();

        expect(fire).toBeCalledTimes(0);

        const wrap = mount(
            <Custom fire={fire}/>
        );

        expect(fire).toBeCalledTimes(1);
        expect(wrap.html()).toBe("<div>VALUE</div>");
    });

    test("Should create with context", () => {
        const context = React.createContext({value: "VALUE"});

        class Custom extends React.Component {
            static contextType = context;

            render() {
                const {value} = this.context;

                return (
                    <div>
                        {value}
                    </div>
                );
            }
        }

        const wrap = mount(
            <Custom />
        );

        expect(wrap.html()).toBe("<div>VALUE</div>");
    });
});


describe("Functional Component", () => {
    test("Should create", () => {
        function Custom() {
            return null;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBeNull();
    });

    test("Should create with arrow", () => {
        const Custom = () => {
            return null;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBeNull();
    });

    test("Should create with nesting", () => {
        function Custom() {
            return <div className="name"/>;
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("<div class=\"name\"></div>");
    });

    test("Should create with props", () => {
        function Custom(props) {
            const {name, value} = props;

            return (
                <div>
                    {name + " " + value}
                </div>
            );
        }

        const wrap = mount(
            <Custom
                value={10}
                name={"John"}
            />
        );

        expect(wrap.html()).toBe("<div>John 10</div>");
    });

    test("Should create with children", () => {
        function Custom(props) {
            const {children} = props;

            return (
                <div>
                    {children}
                </div>
            );
        }

        const wrap = mount(
            <Custom>
                VALUE
            </Custom>
        );

        expect(wrap.html()).toBe("<div>VALUE</div>");
    });

    test("Should create with state", () => {
        function Custom() {
            const [value, setValue] = React.useState("");

            return (
                <div onClick={() => setValue("VALUE")}>
                    {value}
                </div>
            );
        }

        const wrap = mount(
            <Custom/>
        );

        expect(wrap.html()).toBe("<div></div>")
        wrap.find("div").simulate("click");
        expect(wrap.html()).toBe("<div>VALUE</div>")
    });

    test("Should create with hook", () => {
        function Custom(props) {
            const {fire} = props;

            React.useEffect(fire);

            return (
                <div>
                    VALUE
                </div>
            );
        }

        const fire = jest.fn();

        const wrap = mount(
            <Custom fire={fire}/>
        );

        expect(fire).toBeCalledTimes(1);
    });
});

describe("Higher order component", () => {
    test("Should create with HOC", () => {
        function withCustom(Component) {
            return function WithCustom() {
                return (
                    <Component value={"CUSTOM"}/>
                );
            }
        }

        function Custom(props) {
            return (
                <div>{props.value}</div>
            );
        }

        const Hocked = withCustom(Custom);

        const wrap = mount(
            <Hocked />
        );

        expect(wrap.html()).toBe("<div>CUSTOM</div>")
    });

    test("Should create with context", () => {
        const context = React.createContext({value: "WITH_CONTEXT"});

        function withCustom(Component) {
            return function WithCustom() {
                const {value} = React.useContext(context);

                return (
                    <Component value={value}/>
                );
            }
        }

        function Custom(props) {
            return (
                <div>{props.value}</div>
            );
        }

        const Hocked = withCustom(Custom);

        const wrap = mount(
            <Hocked />
        );

        expect(wrap.html()).toBe("<div>WITH_CONTEXT</div>")
    });
});
