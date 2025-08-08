function getTaskOrder(tasks) {

}


describe('Test', () => {
    const valList = [{
        id: null,
        value: 'VALUE'
    }, {
        id: undefined,
        value: 'VALUE'
    }, {
        id: '',
        value: 'VALUE'
    }, {
        id: 'null',
        value: 'VALUE'
    }];

    test('Should', () => {
        function toMap(list) {
            const res = {};

            for (const item of list) {
                const key = item.id;
                res[key] = item.value;
            }

            return res;
        }

        expect(Reflect.ownKeys(toMap(valList))).toHaveLength(4);
    });

    test('Should correct', () => {
        function toMap(list) {
            const res = {};

            for (const item of list) {
                const key = item.id === null ? Symbol.for('null') : item.id;
                res[key] = item;
            }

            return res;
        }

        expect(Reflect.ownKeys(toMap(valList))).toHaveLength(4);
    });
});