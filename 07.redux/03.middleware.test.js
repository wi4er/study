const {createStore, applyMiddleware} = require("redux");

describe("Increase reducer", () => {
    const INCREASE = "INCREASE";
    const DECREASE = "DECREASE";
    const SET_MAX_VALUE = "SET_MAX_VALUE";
    const state = {
        value: 1,
        max: 10,
    };

    Object.freeze(state);

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
        [SET_MAX_VALUE]: (state, action) => {
            return state;
        },
    };

    function reducer(state, action) {
        return actions[action.type]?.(state, action) || state
    }

    const validator = store => dispatch => action => {
        const {max, value} = store.getState();


        dispatch(action);
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

    function createSetMaxValue(value) {
        return {
            type: SET_MAX_VALUE,
            value,
        };
    }

    it("Should increase value", () => {
        const store = createStore(reducer, state, applyMiddleware(validator));

        store.subscribe(() => {
            expect(store.getState().value).toBe(2);
        });

        store.dispatch(createIncrease(1));
    });
});
