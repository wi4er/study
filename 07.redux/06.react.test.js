import React from "react"
import {createStore} from "redux";
import {Provider, connect} from "react-redux";
import {mount} from "enzyme";

describe("React redux context", function () {
    test("Should create with redux store", () => {
        const store = createStore(state => state, {value: "VALUE"});

        const Custom = connect(state => ({value: state.value}))(
            function(props) {
                return props.value;
            }
        );

        const wrap = mount(
            <Provider store={store}>
                <Custom />
            </Provider>
        );

        expect(wrap.html()).toBe("VALUE");
    });

    test("Should create with selector", () => {
        const store = createStore(state => state, {
            list: [1, 2, 3, 4]
        });

        const selector = state => ({
            list: state.list.filter(item => item % 2)
        });

        const Custom = connect(selector)(
            function(props) {
                return props.list.join(" ");
            }
        );

        const wrap = mount(
            <Provider store={store}>
                <Custom />
            </Provider>
        );

        expect(wrap.html()).toBe("1 3");
    });

    test("Should create with merge props", () => {
        const store = createStore(state => state, {value: "VALUE"});

        const mergeProps = (stateProps, newProps, ownProps) => {
            return {
                value: stateProps.value,
                own: ownProps.value,
            };
        };

        const Custom = connect(
            state => ({value: state.value}),
            dispatch => ({dispatch}),
            mergeProps,
        )(function(props) {
            return props.value + props.own;
        });

        const wrap = mount(
            <Provider store={store}>
                <Custom value={"value1"}/>
            </Provider>
        );

        expect(wrap.html()).toBe("VALUEvalue1");
    });

    test("Should create with options", () => {
        const store = createStore(state => state, {value: "VALUE"});

        const Custom = connect(
            state => ({value: state.value}),
            null,
            null,
            {
                pure: true,
            }
        )(
            function(props) {
                return props.value;
            }
        );

        const wrap = mount(
            <Provider store={store}>
                <Custom />
            </Provider>
        );

        expect(wrap.html()).toBe("VALUE");
    });
});
