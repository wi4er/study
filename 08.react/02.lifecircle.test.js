import React from "react";
import {mount} from "enzyme";

describe("Life circle", () => {
    describe("Mounting", () => {
        describe("constructor", () => {
            test("Should have constructor", () => {
                class Item extends React.Component {
                    constructor(props) {
                        super(props);

                        props.fire();
                    }

                    render() {
                        return null;
                    }
                }

                const fire = jest.fn();
                const item = (
                    <Item fire={fire}/>
                );
                expect(fire).toBeCalledTimes(0);

                mount(<Item fire={fire}/>);
                expect(fire).toBeCalledTimes(1);
            });

            test("Should create without props in super", () => {
                class Item extends React.Component {
                    constructor() {
                        super();
                    }

                    render() {
                        return this.props.value;
                    }
                }

                const wrap = mount(
                    <Item value={"value"}/>
                );

                expect(wrap.html()).toBe("value");
            });

            test("Should have correct context", () => {
                const cont = React.createContext({value: "VALUE"});

                class Item extends React.Component {
                    static contextType = cont;

                    constructor(props, context) {
                        super(props, context);

                        props.fire(context.value);
                    }

                    render() {
                        return null;
                    }
                }

                const fire = jest.fn();
                mount(<Item fire={fire}/>);

                expect(fire).toBeCalledWith("VALUE");
            });
        });

        /**
         *
         * getDerivedStateFromProps вызывается непосредственно перед вызовом метода render,
         * как при начальном монтировании, так и при последующих обновлениях.
         * Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
         */
        describe("getDerivedStateFromProps", () => {
            test("Should get state from props", () => {
                class Item extends React.Component {
                    state = {};

                    static getDerivedStateFromProps(newProps) {
                        const {value} = newProps;

                        return {value};
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item value="value"/>
                );

                expect(wrap.state().value).toBe("value");
            });

            test("Should update state from props", () => {
                class Item extends React.Component {
                    state = {
                        value: "VALUE",
                    };

                    static getDerivedStateFromProps(newProps) {
                        const {value} = newProps;

                        return {value};
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item value="UPDATED"/>
                );

                expect(wrap.state().value).toBe("UPDATED");
            });

            test("Should add additional state from props", () => {
                class Item extends React.Component {
                    state = {
                        old: "OLD",
                    };

                    static getDerivedStateFromProps(newProps) {
                        const {value} = newProps;

                        return {new: value};
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item value="NEW"/>
                );

                expect(wrap.state().old).toBe("OLD");
                expect(wrap.state().new).toBe("NEW");
            });
        });

        /**
         *
         * componentDidMount() вызывается сразу после монтирования (то есть, вставки компонента в DOM).
         * В этом методе должны происходить действия, которые требуют наличия DOM-узлов.
         * Это хорошее место для создания сетевых запросов.
         */
        describe("componentDidMount", () => {
            test("Should have did mount", () => {
                const fire = jest.fn();

                class Item extends React.Component {
                    componentDidMount() {
                        const {fire, value} = this.props;

                        fire(value);
                    }

                    render() {
                        return null;
                    }
                }

                mount(
                    <Item
                        value={"value"}
                        fire={fire}
                    />
                );

                expect(fire).toBeCalledTimes(1);
                expect(fire).toBeCalledWith("value");
            });
        });
    });

    describe("Updating", () => {
        describe("getDerivedStateFromProps", () => {
            test("Should get state from props", () => {
                class Item extends React.Component {
                    state = {};

                    static getDerivedStateFromProps(newProps) {
                        const {value} = newProps;

                        return {value};
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item/>
                );
                expect(wrap.state().value).toBe(undefined);

                wrap.setProps({value: "else"})
                expect(wrap.state().value).toBe("else");
            });

            test("Should update state from props", () => {
                class Item extends React.Component {
                    state = {};

                    static getDerivedStateFromProps(newProps, oldState) {
                        const {value} = newProps;

                        if (!oldState.value) {
                            return {value};
                        }

                        return {};
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item/>
                );
                expect(wrap.state().value).toBe(undefined);

                wrap.setProps({value: "else"})
                expect(wrap.state().value).toBe("else");

                wrap.setProps({value: "wrong"})
                expect(wrap.state().value).toBe("else");
            });

            test("Should change exact state from props", () => {
                class Item extends React.Component {
                    state = {};

                    static getDerivedStateFromProps(newProps) {
                        return {...newProps};
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item/>
                );

                expect(wrap.state()).toEqual({});

                wrap.setProps({value_1: 111});
                expect(wrap.state()).toEqual({value_1: 111});

                wrap.setProps({value_2: 222});
                expect(wrap.state()).toEqual({value_1: 111, value_2: 222});

                wrap.setProps({value_3: 333});
                expect(wrap.state()).toEqual({value_1: 111, value_2: 222, value_3: 333});
            });
        });

        /**
         *
         */
        describe("shouldComponentUpdate", () => {
            test("Shouldn't update anytime", () => {
                class Item extends React.Component {
                    shouldComponentUpdate(nextProps, nextState) {
                        return false;
                    }

                    render() {
                        const {value} = this.props;

                        return value;
                    }
                }

                const wrap = mount(
                    <Item value={"OLD"}/>
                );

                expect(wrap.html()).toBe("OLD");
                wrap.setProps({value: "NEW"});

                expect(wrap.html()).toBe("OLD");
            });

            test("Should update on new props", () => {
                class Item extends React.Component {
                    shouldComponentUpdate(nextProps, nextState) {
                        if (nextProps.value === "NEW") {
                            return true;
                        }

                        return false;
                    }

                    render() {
                        const {value} = this.props;

                        return value;
                    }
                }

                const wrap = mount(
                    <Item value={"OLD"}/>
                );

                expect(wrap.html()).toBe("OLD");

                wrap.setProps({value: "WRONG"});
                expect(wrap.html()).toBe("OLD");

                wrap.setProps({value: "NEW"});
                expect(wrap.html()).toBe("NEW");
            });
        });

        /**
         *
         * getSnapshotBeforeUpdate() вызывается прямо перед этапом «фиксирования» (например, перед добавлением в DOM).
         * Он позволяет вашему компоненту брать некоторую информацию из DOM перед её возможным изменением.
         * Любое значение, возвращаемое этим методом жизненного цикла, будет передано как параметр componentDidUpdate().
         */
        describe("getSnapshotBeforeUpdate", () => {
            test("Should get snapshot", () => {
                class Item extends React.Component {
                    constructor(props) {
                        super(props);

                        this.state = {
                            value: null,
                        };
                    }

                    getSnapshotBeforeUpdate(prevProps, prevState) {
                        return {value: "UPDATE"};
                    }

                    componentDidUpdate(prevProps, prevState, snapshot) {
                        expect(snapshot.value).toBe("UPDATE");
                    }

                    render() {
                        return null;
                    }
                }

                mount(
                    <Item value="value"/>
                );
            });
        });


        /**
         *
         */
        describe("ComponentDidUpdate", () => {
            test("Should update from props", () => {
                const fire = jest.fn();

                class Item extends React.Component {
                    componentDidUpdate() {
                        const {value} = this.props;

                        fire(value);
                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item value="value_1"/>
                );

                wrap.setProps({value: "value_2"});
                expect(fire).toBeCalledWith("value_2");
            });

            test("Should update from state update", () => {
                class Item extends React.Component {
                    state = {value: "value_1"};

                    componentDidUpdate() {
                        const {fire} = this.props;

                        fire();
                    }

                    render() {
                        return null;
                    }
                }

                const fire = jest.fn();
                const wrap = mount(
                    <Item fire={fire}/>
                );

                expect(fire).toBeCalledTimes(0);

                wrap.setState({value: "updated"})
                expect(fire).toBeCalledTimes(1);
            });

            test("Should update from update context", () => {
                const fire = jest.fn();
                const context = React.createContext({});

                class Item extends React.Component {
                    componentDidUpdate() {
                        const {value} = this.context;

                        fire(value);
                    }

                    render() {
                        return null;
                    }
                }

                Item.contextType = context;

                const wrap = mount(
                    <context.Provider value={{value: "value_1"}}>
                        <Item/>
                    </context.Provider>
                );

                wrap.setProps({value: {value: "value_2"}})

                expect(fire).toBeCalledTimes(1);
                expect(fire).toBeCalledWith("value_2");
            });
        });
    });

    describe("Unmounting", () => {
        /**
         *
         * componentWillUnmount() вызывается непосредственно перед размонтированием и удалением компонента.
         * В этом методе выполняется необходимый сброс:
         * - отмена таймеров,
         * - сетевых запросов и подписок, созданных в componentDidMount().
         *
         * Не используйте setState() в componentWillUnmount(), так как компонент никогда не рендерится повторно.
         * После того, как экземпляр компонента будет размонтирован, он никогда не будет примонтирован снова
         */
        describe("componentWillUnmount", () => {
            test("Should have did unmount", () => {
                class Item extends React.Component {
                    componentWillUnmount() {
                        this.props.fire();
                    }

                    render() {
                        return null;
                    }
                }

                const fire = jest.fn();
                const wrap = mount(
                    <Item fire={fire}/>
                );

                wrap.unmount();
                expect(fire).toBeCalledTimes(1);
            });

            /**
             *
             *
             */
            test("Should unmount by click", () => {
                class Item extends React.Component {
                    componentWillUnmount() {
                        this.props.fire();
                    }

                    render() {
                        return null;
                    }
                }

                class List extends React.Component {
                    render() {
                        const {mount, fire} = this.props;

                        if (!mount) {
                            return null;
                        }

                        return <Item fire={fire}/>;
                    }
                }

                const fire = jest.fn();
                const wrap = mount(
                    <List fire={fire} mount/>
                );

                expect(fire).toBeCalledTimes(0);

                wrap.setProps({mount: false});
                expect(fire).toBeCalledTimes(1);
            });
        });
    });

    describe("Error Handling", () => {
        /**
         *
         * getDerivedStateFromError вызывается после возникновения ошибки у компонента-потомка.
         * Он получает ошибку в качестве параметра и возвращает значение для обновления состояния.
         */
        describe("getDerivedStateFromError", () => {
            test("Should throw error", () => {
                class Item extends React.Component {
                    static getDerivedStateFromError(error) {

                    }

                    render() {
                        return null;
                    }
                }

                const wrap = mount(
                    <Item/>
                );
            });
        });

        /**
         *
         * componentDidCatch вызывается после возникновения ошибки у компонента-потомка.
         * Он получает два параметра:
         * - error - перехваченная ошибка
         * - info — объект с ключом componentStack, содержащий информацию о компоненте, в котором произошла ошибка.
         */
        describe("componentDidCatch", () => {
            test("Should throw error", () => {
                class Item extends React.Component {
                    componentDidMount() {
                        // some
                        // throw Error("Something going wrong!")
                    }

                    render() {
                        return null;
                    }
                }

                class Wrap extends React.Component {
                    constructor(props) {
                        super(props);

                        this.state = {
                            error: null,
                        };
                    }

                    static getDerivedStateFromError(error) {
                        return {error};
                    }

                    componentDidCatch(error, info) {
                        // this.setState({error});

                        return null;
                    }

                    render() {
                        const
                            {children} = this.props,
                            {error} = this.state;

                        if (error) {
                            return (
                                <div>
                                    {"ERROR"}
                                </div>
                            );
                        }

                        return children;
                    }
                }

                // expect(() => {
                const wrap = mount(
                    <Wrap>
                        <Item/>
                    </Wrap>
                );
                // }).toThrow();

            });
        });
    });
});
