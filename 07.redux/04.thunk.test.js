const redux = require("redux");
const thunk = require("redux-thunk").default;

describe("Redux thunk", () => {
    const state = {
        value_1: 1,
        value_2: 2,
    };

    const CHANGE_VALUE_1 = "CHANGE_VALUE_1";
    const CHANGE_VALUE_2 = "CHANGE_VALUE_2";

    const actions = {
        [CHANGE_VALUE_1]: (state, action) => {
            const {newValue} = action;

            if (newValue) {
                return {
                    ...state,
                    value_1: newValue,
                };
            }
            return state;
        },
        [CHANGE_VALUE_2]: (state, action) => {
            return state;
        }
    };

    function reducer(state, action) {
        return actions[action.type]?.(state, action) || state;
    }

    function changeValue1(newValue) {
        return (dispatch, getState) => {
            return dispatch({
                type: CHANGE_VALUE_1,
                newValue,
            });
        }
    }

    function changeValue2(newValue) {
        return state => ({
            type: CHANGE_VALUE_2,
            newValue,
        });
    }

    it("Should change value_1", () => {
        const store = redux.createStore(reducer, state, redux.applyMiddleware(thunk));

        store.subscribe(() => {
            expect(store.getState().value_1).toBe(10);
        });
        store.dispatch(changeValue1(10));
    });
});
