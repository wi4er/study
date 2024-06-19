import React from "react";
import {mount} from "enzyme";

describe("Common react hooks", () => {
    describe("React.useState", () => {
        test("Should use state", () => {
            function WithHook() {
                const [value, setValue] = React.useState("OLD");

                return (
                    <div onClick={() => setValue("NEW")}>
                        {value}
                    </div>
                );
            }

            const wrap = mount(
                <WithHook />
            );

            expect(wrap.html()).toBe("<div>OLD</div>")
            wrap.find("div").simulate("click");
            expect(wrap.html()).toBe("<div>NEW</div>")
        });

        test("Should use multi state", () => {
            function WithHook() {
                const [value_1, setValue_1] = React.useState("OLD");
                const [value_2, setValue_2] = React.useState("OLD");

                return (
                    <div
                        onClick={() => setValue_1("NEW")}
                        onDoubleClick={() => setValue_2("NEW")}
                    >
                        {value_1}

                        {value_2}
                    </div>
                );
            }

            const wrap = mount(
                <WithHook />
            );

            expect(wrap.html()).toBe("<div>OLDOLD</div>")

            wrap.find("div").simulate("click");
            expect(wrap.html()).toBe("<div>NEWOLD</div>")

            wrap.find("div").simulate("doubleclick");
            expect(wrap.html()).toBe("<div>NEWNEW</div>")
        });

        test("Should use state in loop", () => {
            function WithHook() {
                let list = [];

                for (let i = 0; i < 3; i++) {
                    list[i] = React.useState("OLD");
                }

                return (
                    <div>
                        <div onClick={() => list[0][1]("NEW")}>{list[0][0]}</div>
                        <div onClick={() => list[1][1]("NEW")}>{list[1][0]}</div>
                        <div onClick={() => list[2][1]("NEW")}>{list[2][0]}</div>
                    </div>
                );
            }

            const wrap = mount(
                <WithHook />
            );

            expect(wrap.html()).toBe("<div><div>OLD</div><div>OLD</div><div>OLD</div></div>")

            wrap.find("div").at(1).simulate("click");
            expect(wrap.html()).toBe("<div><div>NEW</div><div>OLD</div><div>OLD</div></div>")

            wrap.find("div").at(2).simulate("click");
            expect(wrap.html()).toBe("<div><div>NEW</div><div>NEW</div><div>OLD</div></div>")

            wrap.find("div").at(3).simulate("click");
            expect(wrap.html()).toBe("<div><div>NEW</div><div>NEW</div><div>NEW</div></div>")
        });

        test("Should use state with initial state", () => {
            function WithHook() {
                const [value, setValue] = React.useState(() => "OLD");

                return (
                    <div onClick={() => setValue("NEW")}>
                        {value}
                    </div>
                );
            }

            const wrap = mount(
                <WithHook />
            );

            expect(wrap.html()).toBe("<div>OLD</div>")
            wrap.find("div").simulate("click");
            expect(wrap.html()).toBe("<div>NEW</div>")
        });
    });

    describe("React.useEffect", () => {
        test("Should call effect", () => {
            function WithEffect() {
                React.useEffect(() => {
                    fire();
                });

                return null;
            }

            const fire = jest.fn();

            const wrap = mount(
                <WithEffect />
            );

            expect(fire).toBeCalledTimes(1);
        });

        test("Should call from state update", () => {
            function WithHook() {
                React.useEffect(() => {
                    fire();
                });

                return null;
            }

            const fire = jest.fn();
            const wrap = mount(
                <WithHook />
            );

            expect(fire).toBeCalledTimes(1);

            wrap.setProps({});
            expect(fire).toBeCalledTimes(2);

            wrap.setProps({});
            expect(fire).toBeCalledTimes(3);
        });

        test("Should call with cleanup", () => {
            function WithHook() {
                React.useEffect(() => {
                    fire();

                    return clean;
                });

                return null;
            }

            const fire = jest.fn();
            const clean = jest.fn();

            const wrap = mount(
                <WithHook />
            );

            expect(fire).toBeCalledTimes(1);

            wrap.setProps({});
            expect(fire).toBeCalledTimes(2);
            expect(clean).toBeCalledTimes(1);

            wrap.setProps({});
            expect(fire).toBeCalledTimes(3);
            expect(clean).toBeCalledTimes(2);
        });
    });

    describe("React.useContext", () => {
        test("Should get context", () => {
            const context = React.createContext({});

            function Consumer() {
                return React.useContext(context);
            }

            const wrap = mount(
                <context.Provider value="VALUE">
                    <Consumer />
                </context.Provider>
            );

            expect(wrap.html()).toBe("VALUE");
        });

        test("Should get multi context", () => {
            const context_1 = React.createContext({});
            const context_2 = React.createContext({});
            const context_3 = React.createContext({});

            function Consumer() {
                const value = [
                    React.useContext(context_1),
                    React.useContext(context_2),
                    React.useContext(context_3),
                ];

                return value.join("");
            }

            const wrap = mount(
                <context_1.Provider value="VA">
                    <context_2.Provider value="LU">
                        <context_3.Provider value="E">
                            <Consumer />
                        </context_3.Provider>
                    </context_2.Provider>
                </context_1.Provider>
            );

            expect(wrap.html()).toBe("VALUE");
        });
    });
});

describe("Additional react hooks", () => {
    describe("React.useReducer", () => {

    });
});
