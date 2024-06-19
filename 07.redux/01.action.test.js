"use strict";

const {createStore} = require("redux");

describe("Redux action", function () {
    describe("Action creator", () => {
        const SET_TYPE = "SET_TYPE";

        function createAction(value) {
            if (typeof value !== "number") {
                throw TypeError("Action value suppose to be Number.")
            }

            return Object.freeze({
                type: SET_TYPE,
                value: value,
            });
        }

        test("Should create action", () => {
            const action = createAction(10);

            expect(action.type).toBe("SET_TYPE");
            expect(action.value).toBe(10);
        });

        test("Shouldn't create action with wrong args", () => {
            expect(() => {
                createAction("qwe");
            }).toThrow();
        });

        test("Shouldn't mutate action", () => {
            const action = createAction(222);

            expect(() => {
                action.value = 333;
            }).toThrow();
        });
    });

    describe("Function action creator", () => {
        const SET_TYPE = "SET_TYPE";

        function createAction(value) {
            return dispatch => {
                dispatch({
                    type: SET_TYPE,
                    value,
                });
            }
        }

        test("Should create action", () => {
            const dispatch = jest.fn();
            const action = createAction(111);

            action(dispatch);

            expect(dispatch.mock.calls[0][0].value).toBe(111);
            expect(dispatch.mock.calls[0][0].type).toBe("SET_TYPE");
        });
    });

    describe("Promise action creator", () => {
        const SET_TYPE = "SET_TYPE";

        function createAction(value) {
            return new Promise(resolve => {
                resolve({
                    type: SET_TYPE,
                    value,
                });
            });
        }

        test("Should create action", () => {
            const dispatch = jest.fn();
            const action = createAction(111);

            Promise.resolve(action);

            // expect(dispatch.mock.calls[0][0].value).toBe(111);
            // expect(dispatch.mock.calls[0][0].type).toBe("SET_TYPE");
        });
    });

    describe("Counter with actions", function () {
        const SET_TYPE = "SET_TYPE";

        function createAction(value) {
            if (typeof value !== "number") {
                throw TypeError("Action value suppose to be Number.")
            }

            return {
                type: SET_TYPE,
                value: value,
            };
        }

        function reducer(state, action) {
            if (action.type === SET_TYPE) {
                return {
                    value: state.value + action.value,
                };
            }

            return state;
        }

        test("Should create action", () => {
            const action = createAction(1);

            expect(action.type).toBe(SET_TYPE);
            expect(action.value).toBe(1);
        });

        test("Shouldn't create action", () => {
            expect(() => {
                createAction("qwe");
            }).toThrow();
        });

        test("Should dispatch action", () => {
            const store = createStore(reducer, {value: 1});

            store.dispatch(createAction(1));
            expect(store.getState().value).toBe(2);
        });

        test("Should dispatch many actions", () => {
            const store = createStore(reducer, {value: 1});

            store.dispatch(createAction(1));
            expect(store.getState().value).toBe(2);

            store.dispatch(createAction(2));
            expect(store.getState().value).toBe(4);

            store.dispatch(createAction(3));
            expect(store.getState().value).toBe(7);
        });
    });

    test("Should ", () => {

    });
});
