const {createStore, applyMiddleware} = require("redux");


describe("Redux store", () => {
    /**
     *
     */
    test("Should create store", () => {
        function reducer(state) {
            return state;
        }

        const store = createStore(reducer);

        expect(store.getState()).toBeUndefined();
    });

    /**
     *
     */
    test("Should create store with state", () => {
        const reducer = jest.fn(state => state);

        const store = createStore(reducer, {value: 1});

        expect(store.getState()).toEqual({value: 1});
        expect(reducer).toBeCalledTimes(1);
    });

    /**
     *
     */
    test("Should create store with state", () => {
        const reducer = jest.fn(state => state);
        const middleware = jest.fn(store => next => action => next(action));

        const store = createStore(
            reducer,
            {value: 1},
            applyMiddleware(middleware),
        );

        expect(store.getState()).toEqual({value: 1});
        expect(reducer).toBeCalledTimes(1);
        expect(middleware).toBeCalledTimes(1);
    });

    /**
     *
     */
    test("Should create store with action", () => {
        const reducer = jest.fn((state, action) => {
            if (action.type === "ACTION") {
                return {value: action.value};
            }

            return state;
        });

        const store = createStore(reducer, {});
        expect(reducer).toBeCalledTimes(1);

        store.dispatch({type: "ACTION", value: 10});

        expect(store.getState().value).toBe(10);
        expect(reducer).toBeCalledTimes(2);
    });

    /**
     *
     */
    test("Should create store with subscribe", () => {
        const fire = jest.fn();
        const reducer = jest.fn((state, action) => {
            if (action.type === "ACTION") {
                return {value: action.value};
            }

            return state;
        });

        const store = createStore(reducer, {});
        store.subscribe(() => {
            fire();
        });

        store.dispatch({type: "ACTION", value: 10});
        expect(fire).toBeCalledTimes(1);
    });
});
