const {createStore} = require("redux");

describe("Increase reducer", () => {
    const INCREASE = "INCREASE";
    const DECREASE = "DECREASE";

    const actions = {
        [INCREASE]: (state, action) => {
            if (action.count) {
                return {
                    ...state,
                    value: state.value + action.count,
                };
            }

            return state;
        },
        [DECREASE]: (state, action) => {
            if (action.count) {
                return Object.assign(
                    {},
                    state,
                    {value: state.value - action.count},
                );
            }

            return state;
        },
    };

    function reducer(state, action) {
        return actions[action.type]?.(state, action) || state
    }

    function createIncrease(count) {
        return {
            type: INCREASE,
            count: count,
        };
    }

    function createDecrease(count) {
        return {
            type: DECREASE,
            count: count,
        };
    }

    it("Should increase count", () => {
        const store = createStore(reducer, {value: 1});

        store.dispatch(createIncrease(1));
        expect(store.getState().value).toBe(2);
    });

    it("Should increase count", () => {
        const store = createStore(reducer, {value: 1});

        store.dispatch(createDecrease(1));
        expect(store.getState().value).toBe(0);
    });

    it("Should change state", () => {
        const state = {value: 1};
        const store = createStore(reducer, state);

        store.dispatch(createIncrease(1));
        expect(state === store.getState()).toBeFalsy();
    });

    it("Shouldn't change state", () => {
        const state = {value: 1};
        const store = createStore(reducer, state);

        store.dispatch({
            type: "SOMETHING_ELSE",
            count: 1,
        });
        expect(store.getState()).toBe(state);

        store.dispatch(createDecrease(undefined));
        expect(store.getState()).toBe(state);
    });

    it("Should increase count with subscribe", done => {
        const store = createStore(reducer, {value: 1});

        store.subscribe(() => {
            expect(store.getState().value).toBe(2);
            done();
        });

        store.dispatch(createIncrease(1));
    });
});
