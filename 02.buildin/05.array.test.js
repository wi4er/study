describe("Array prototype functions", () => {
    /**
     *
     * Возвращает новый массив, состоящий из массива, полученного из контекста,
     * соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
     *
     * @param valueN - список элементов для добавления
     */
    describe("Array.prototype.concat", () => {
        it("Should concat primitive", () => {
            expect([1, 2, 3].concat(4)).toEqual([1, 2, 3, 4]);
            expect([1, 2, 3].concat(4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it("Should concat array", () => {
            expect([1, 2, 3].concat([4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
            expect([1, 2, 3].concat([4], [5], [6])).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it("Should concat mixed", () => {
            expect([1, 2, 3].concat(4, [5], [6, 7, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });

    /**
     *
     * Возвращает ссылку на функцию Object, создавшую прототип экземпляра.
     * Обратите внимание, что значение этого свойства является ссылкой на саму функцию
     */
    describe("Array.prototype.constructor", () => {
        it("Should get constructor", () => {
            const arr = [1, 2, 3];

            expect(arr.constructor).toBe(Array);
        });

        it("Should get constructor from extends", () => {
            class Type extends Array {
            }

            const inst = new Type(1, 2, 3);
            inst.push(4);

            expect(inst.constructor).toBe(Type);
            expect(inst).toEqual([1, 2, 3, 4]);
        });
    });

    /**
     *
     * Копирует последовательность элементов массива внутри него в позицию, начинающуюся по индексу target.
     * Копия берётся по индексам, задаваемым вторым и третьим аргументами start и end.
     * Аргумент end является необязательным и по умолчанию равен длине массива.
     *
     * @param target - Начальный индекс позиции цели, куда копировать элементы.
     * @param start - Начальный индекс позиции источника, откуда начинать копировать элементы.
     * @param end - Необязательный параметр. Конечный индекс позиции источника, где заканчивать копировать элементы.
     */
    describe("Array.prototype.copyWithin", () => {
        it("Should copy with in", () => {
            expect([1, 2, 3, 4, 5, 6].copyWithin(0, 4)).toEqual([5, 6, 3, 4, 5, 6]);
            expect([1, 2, 3, 4, 5, 6].copyWithin(4, 0, 3)).toEqual([1, 2, 3, 4, 1, 2]);
        });
    });

    /**
     *
     * Возвращает новый объект итератора массива Array Iterator,
     * содержащий массив из двух элементов:
     * - ключ в 0 индексе
     * - значение в 1 индексе
     * для каждого индекса в массиве.
     */
    describe("Array.prototype.entries", () => {
        it("Should get entries", () => {
            const arr = [1, 2, 3];

            const entr = [...arr.entries()];
            expect(entr).toEqual([[0, 1], [1, 2], [2, 3]]);
        });

        it("Should get entries iterator", () => {
            const arr = [1, 2, 3, 4, 5];

            let count = 0;
            for (let [index, value] of arr.entries()) {
                if (index === 2) {
                    continue;
                }

                count += value;
            }

            expect(count).toBe(12);
        });
    });

    /**
     *
     * Проверяет, удовлетворяют ли все элементы массива условию, заданному в функции переданной в первом аргументе.
     *
     * @param callback - Функция проверки каждого элемента, принимает три аргумента:
     * - currentValue: Текущий обрабатываемый элемент массива.
     * - indexНеобязательный: Индекс текущего обрабатываемого элемента массива.
     * - arrayНеобязательный: Массив, по которому осуществляется проход.
     * @param thisArg - Значение, используемое в качестве this при выполнении функции callback
     */
    describe("Array.prototype.every", () => {
        it("Should check every item", () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arr.every(item => item > 0)).toBeTruthy();
        });

        it("Shouldn't check every item ", () => {
            const arr = [1, 2, 3, 4, null, 5, 6];
            expect(arr.every(item => item !== null)).toBeFalsy();
        });

        it("Should check every item with this", () => {
            const withThis = [1, 2, 3, 4, 5, 7, 8].every(
                function (item) {
                    return item !== this.value;
                },
                {value: 5}
            );

            expect(withThis).toBeFalsy();
        });

        /**
         *
         * Стрелочные фунции в аргументе не получают контеста
         */
        it("Shouldn't check every item with this and arrow", () => {
            const withThis = [5, 6, 7, 8, 9, 10].every(
                item => item >= this.value,
                {value: 5}
            );

            expect(withThis).toBeFalsy();
        });
    });

    /**
     *
     * Заполняет все элементы массива от начального до конечного индексов одним значением.
     *
     * @param value - Значение, заполняющее массив.
     * @param start -  Начальная позиция, от которого начнётся заполнение
     * @param end - Конечная позиция на которой закончится заполнение
     */
    describe("Array.prototype.fill", () => {
        it("Should fill array", () => {
            const arr = new Array(10);
            arr.fill(2);

            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
            expect(sum).toBe(20);
        });

        it("Should fill array part", () => {
            const arr = new Array(10);
            arr.fill(2, 0, 5);
            sum = 0;

            for (let i = 0; i < arr.length; i++) {
                sum += arr[i] || 0;
            }

            expect(sum).toBe(10);
        });
    });

    /**
     *
     * Создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
     *
     * @param callback - Функция, которая будет вызвана для каждого элемента массива.
     * Если функция возвращает true, то элемент остаётся в массиве, если false, то удаляется.
     * В функцию будет передано три аргумента:
     * - element: Текущий обрабатываемый элемент в массиве.
     * - index: Индекс текущего обрабатываемого элемента в массиве.
     * - array: Массив, по которому осуществляется проход.
     * @param thisArg - используемое в качестве this при вызове функции callback.
     */
    describe("Array.prototype.filter", () => {
        it("Should filter array", () => {
            const arr = [1, -2, 3, -4, 5];

            expect(arr.filter(item => item < 0)).toEqual([-2, -4]);
        });

        it("Should filter array to empty", () => {
            const arr = [1, -2, 3, -4, 5];

            expect(arr.filter(item => item === 0)).toEqual([]);
        });

        it("Should check every item with this", () => {
            const withThis = [1, 2, 3, 4, 5, 6, 7, 8].filter(
                function (item) {
                    return item !== this.value;
                },
                {value: 5}
            );

            expect(withThis).toEqual([1, 2, 3, 4, 6, 7, 8]);
        });
    });

    /**
     *
     * Возвращает значение первого найденного в массиве элемента,
     * которое удовлетворяет условию переданному в callback функции.
     * В противном случае возвращается undefined.
     */
    describe("Array.prototype.find", () => {
        it("Should find in array", () => {
            const tree = [1, 2, 3, 4, 5].find(item => item === 3);
            expect(tree).toBe(3);

        });

        it("Shouldn't find in array", () => {
            const ten = [1, 2, 3, 4, 5].find(item => item === 10);
            expect(ten).toBeUndefined();
        });

        it("Should check every item with this", () => {
            const withThis = [1, 2, 3, 4, 5, 6, 7, 8].find(
                function (item) {
                    return item === this.value;
                },
                {value: 5}
            );

            expect(withThis).toEqual(5);
        });
    });

    /**
     *
     * Возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции.
     * В противном случае возвращается -1.
     */
    describe("Array.prototype.findIndex", () => {
        it("Should findIndex array", () => {
            const arr = [6, 5, 4, 3, 2, 1];
            const index = arr.findIndex(item => item === 2);
            expect(index).toBe(4);
        });

        it("Should find 0 index", () => {
            const arr = [6, 5, 4, 3, 2, 1];
            const index = arr.findIndex(item => item === 6);
            expect(index).toBe(0);
        });

        it("Shouldn't find index", () => {
            const arr = [6, 5, 4, 3, 2, 1];
            const index = arr.findIndex(item => item === 11);
            expect(index).toBe(-1);
        })

        it("Should check with bitwise not", () => {
            const arr = [6, 5, 4, 3, 2, 1];
            const index = arr.findIndex(item => item === 22);
            expect(~index).toBe(0);
        });
    });

    /**
     *
     * Возвращает новый массив,
     * в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth.
     */
    describe("Array.prototype.flat", () => {
        it("Should flat array", () => {
            const arr = [1, 2];
            arr.push([3, 4]);
            arr.push([[5, 6]]);

            const flat = arr.flat(2);
            expect(flat).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    /**
     *
     * Метод flatMap() сначала применяет функцию из первого аргумента к каждому элементу массива,
     * а затем преобразует полученный результат в одноуровневый массив.
     * Это идентично map функции, с последующим применением функции flat с параметром depth ( глубина ) равным 1,
     * но flatMap часто бывает полезным, так как работает немного более эффективно.
     */
    describe("Array.prototype.flatMap", () => {
        it("Should flatMap array", () => {
            const res = [1, 2, 3].flatMap(item => [item, item]);

            expect(res).toEqual([1, 1, 2, 2, 3, 3]);
        });

        it("Should flat map with empty arrays", () => {
            const res = [1, 2, 3].flatMap(item => {
                if (item === 1) {
                    return [];
                } else {
                    return [item, item];
                }
            });

            expect(res).toEqual([2, 2, 3, 3]);
        });

        it("Should flat map with number value", () => {
            const res = [1, 2, 3].flatMap(item => {
                if (item === 2) {
                    return 2;
                } else {
                    return [item, item];
                }
            });

            expect(res).toEqual([1, 1, 2, 3, 3]);
        });
    });

    /**
     *
     * Метод forEach() выполняет функцию аргумента один раз для каждого элемента массива.
     * Всегда возвращает undefined.
     */
    describe("Array.prototype.forEach", () => {
        it("Should foreach array", () => {
            const arr = [1, 2, 3, 4, 5];
            let sum = 0;

            expect(arr.forEach(item => sum += item)).toBeUndefined();
            expect(sum).toBe(15);
        });

        it("Should foreach empty array", () => {
            const arr = [];
            let sum = 0;

            expect(arr.forEach(item => sum += item)).toBeUndefined();
            expect(sum).toBe(0);
        });

        it("Should iterate with undefined", () => {
            const fire = jest.fn();
            const arr = [undefined, undefined, undefined];

            arr.forEach(fire);
            expect(fire).toBeCalledTimes(3);
        });
    });

    /**
     *
     * Определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
     */
    describe("Array.prototype.includes", () => {
        it("Should includes array", () => {
            const arr = [1, 2, 3, -4, 5];

            const negative = arr.includes(-4);
            expect(negative).toBeTruthy();

            const ten = arr.includes(10);
            expect(ten).toBeFalsy();

        });

        it("Shouldn't includes with wrong object", () => {
            const
                first = {a: 1},
                second = {b: 2},
                third = {c: 3};

            const obj = [first, second, third];

            expect(obj.includes(second))    .toBeTruthy();
            expect(obj.includes({a: 1})).toBeFalsy();
        });
    });

    /**
     *
     * Возвращает первый индекс, по которому данный элемент может быть найден в массиве
     * или -1, если такого индекса нет.
     */
    describe("Array,prototype.indexOf", () => {
        it("Should find index", () => {
            const arr = [1, 2, 3, 4, 5];

            expect(arr.indexOf(3)).toBe(2);
        });
    });

    /**
     *
     * объединяет все элементы массива (или массивоподобного объекта) в строку.
     */
    describe("Array.prototype.join", () => {
        it("Should join array", () => {
            const arr = [1, 2, 3, 4, 5];

            expect(arr.join(" ")).toBe("1 2 3 4 5")
        });

        it("Should join array with toString object", () => {
            const arr = [
                "aa",
                "bb",
                {
                    toString() {
                        return "cc";
                    }
                }
            ];

            expect(arr.join("_")).toBe("aa_bb_cc");
        });

        it("Should join array like object", () => {
            const obj = {
                0: "aa",
                1: "bb",
                2: "cc",
                length: 3,
            }

            const res = Array.prototype.join.call(obj, "+");
            expect(res).toBe("aa+bb+cc");
        });
    });

    describe("Array.prototype.keys", () => {
        it("Should get iterator from array", () => {
            const arr = [1, 2, 3];
            const res = [];

            for (let key of arr.keys()) {
                res.push(key);
            }

            expect(res).toEqual([0, 1, 2]);
        });

        it("Should get keys in broken array", () => {
            const arr = [1, , 2, , 3];
            const res = [];

            for (let key of arr.keys()) {
                res.push(key);
            }

            expect(res).toEqual([0, 1, 2, 3, 4]);
        });
    });


    describe("Array.prototype.lastIndexOf", () => {
        it("Should get last index in array", () => {

        });
    });

    /**
     *
     * Метод map() создаёт новый массив с результатом вызова функции первого аргумента для каждого элемента массива.
     * Второй аргумент указывает контекст вызова
     *
     * Параметры функции первого аргумента
     * @param current - обрабатываемый элемент массива
     * @param index - индекс обрабатываемого элемента в массиве
     * @param array - обрабатываемый массив
     */
    describe("Array.prototype.map", () => {
        /**
         *
         * Создаём новый массив перебрав имеющийся
         */
        it("Should map array", () => {
            const arr = [1, 2, 3, 4, 5, 6];

            const invert = arr.map(item => 7 - item);
            expect(invert).toEqual([6, 5, 4, 3, 2, 1]);
        });

        /**
         *
         * Создаём новый массив на основании заданного контекста
         */
        it("Should get context", () => {
            const arr = [1, 2, 3, 4, 5];
            const context = {count: 10};

            const res = arr.map(function (item) {
                return item + this.count;
            }, context);

            expect(res).toEqual([11, 12, 13, 14, 15]);
        });

        /**
         *
         * Последний элемент массива хаменяем на null
         * функция идущая первым аргументом получает значение элемента, индекс элемента и весь массив целиком
         */
        it("Should check array index", () => {
            const arr = [1, 2, 3, 4, 5];

            const res = arr.map((item, index, array) => {
                if (index === array.length - 1) {
                    return null;
                } else {
                    return item + 10;
                }
            });

            expect(res).toEqual([11, 12, 13, 14, null]);
        });

        /**
         *
         * Если первым аргументом идёт не функция, то получаем ошибку
         */
        it("Should throw exception", () => {
            const arr = [1, 2, 3];

            expect(() => {
                arr.map(10000);
            }).toThrow(TypeError);
        });
    });

    describe("Arrat.prototype.pop", () => {
        it("Should pop array", () => {
            const arr = [1, 2, 3, 4, 5];

            expect(arr.pop()).toBe(5);
            expect(arr.pop()).toBe(4);
            expect(arr.pop()).toBe(3);
            expect(arr.pop()).toBe(2);
            expect(arr.pop()).toBe(1);
            expect(arr.pop()).toBe(undefined);

            expect(arr).toEqual([]);
        });
    });

    describe("Array.prototype.push", () => {
        it("Should push values", () => {
            const arr = [];

            arr.push(1);
            arr.push(2);
            arr.push(3);

            expect(arr).toEqual([1, 2, 3]);
        });

        it("Should push array", () => {
            const arr = [1, 2, 3];

            arr.push([4, 5]);

            expect(arr).toEqual([1, 2, 3, [4, 5]])
        });
    });

    /**
     *
     * Метод reduce() применяет функцию первого аргумента к каждому элементу массива (слева-направо),
     * возвращая одно результирующее значение аккумулятора.
     * Второй аргумент указывает на начальное значение аккумулятора.
     *
     * Параметры функции первого аргумента
     * @param accumulator - текущее значение аккумулятора
     * @param current - обрабатываемый элемент массива
     * @param index - индекс обрабатываемого элемента в массиве
     * @param array - обрабатываемый массив
     */
    describe("Array.prototype.reduce", () => {
        it("Should reduce array", () => {
            const sum = [1, 2, 3, 4, 5, 6].reduce(
                (acum, item) => acum + item,
                0,
            );
            expect(sum).toBe(21);

            const obj = [1, 2, 3, 4, 5, 6].reduce(
                (acum, item) => {
                    acum[item] = item;

                    return acum;
                },
                {},
            );
            expect(obj).toEqual({1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6});
        });
    });

    describe("Array.prototype.reduceRight", () => {
        it("Should reduce right array", () => {
            const arr = [1, 2, 3, 4, 5, 6];
            const sum = arr.reduce((acum, item) => acum + item, 0);

            expect(sum).toBe(21);
        });
    });

    /**
     * Изменяет исходный массив.
     * После его применения порядок элементов в массиве меняется на обратный.
     */
    describe("Array.prototype.reverse", () => {
        it("Should reverse array", () => {
            const arr = [1, 2, 3, 4, 5];
            const rev = arr.reverse();

            expect(rev).toEqual([5, 4, 3, 2, 1]);
            expect(arr).toEqual([5, 4, 3, 2, 1]);
        });
    });

    describe("Array.prototype.shift", () => {
        it("Should shift array", () => {
            const arr = [1, 2, 3, 4, 5, 6];

            expect(arr.shift()).toBe(1);
            expect(arr.shift()).toBe(2);
            expect(arr.shift()).toBe(3);
            expect(arr.shift()).toBe(4);
            expect(arr.shift()).toBe(5);
            expect(arr.shift()).toBe(6);
            expect(arr.shift()).toBe(undefined);
        });
    });

    describe("Array.prototype.slice", () => {
        it("Should slice array", () => {
            const arr = [1, 2, 3, 4, 5];

            expect(arr.slice(1, 3)).toEqual([2, 3]);
            expect(arr.slice(0)).toEqual([1, 2, 3, 4, 5]);
            expect(arr).toEqual([1, 2, 3, 4, 5]);
        });

        it("Should negative slice", () => {
            const arr = [1, 2, 3, 4, 5];

            expect(arr.slice(-3, -1)).toEqual([3, 4]);
        });
    });

    describe("Array.prototype.some", () => {
        it("Should some array", () => {
            const arr_1 = [1, 2, 3, 4, 0, 5];
            const zero = arr_1.some(item => item === 0);
            expect(zero).toBeTruthy();

            const arr_2 = [1, 2, 3, 4, 5];
            const negative = arr_2.some(item => item < 0);
            expect(negative).toBeFalsy();
        });
    });

    describe("Array.prototype.sort", () => {
        it("Should sort array", () => {
            const arr = [1, 5, 4, 6, 2, 3];

            expect(arr.sort(
                (a, b) => a - b
            )).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe("Array.prototype.splice", () => {
        it("Should splice single element", () => {
            const arr = [1, 2, 3, 4, 5];

            expect(arr.splice(0, 1)).toEqual([1]);
            expect(arr.splice(-1, 1)).toEqual([5]);
            expect(arr).toEqual([2, 3, 4]);
        });

        it("Should splice array", () => {
            const arr = [1, 2, 3, 4, 5];
            const sub = arr.splice(1, 2);

            expect(arr).toEqual([1, 4, 5]);
            expect(sub).toEqual([2, 3]);
        });
    });

    describe("Array.prototype.toLocalString", () => {
        it("Should tolocalstring array", () => {
            const arr_1 = [1, 2, 3, 4, 5];
            expect(arr_1.toLocaleString()).toBe("1,2,3,4,5");

            const arr_2 = [{
                toLocaleString() {
                    return "VALUE_1";
                },
            }, {
                toLocaleString() {
                    return "VALUE_2";
                },
            }];

            expect(arr_2.toLocaleString()).toBe("VALUE_1,VALUE_2");
        });
    });

    describe("Array.prototype.toString", () => {
        it("Should tostring array", () => {
            const arr_1 = [1, 2, 3, 4, 5];
            expect(arr_1.toString()).toBe("1,2,3,4,5");

            const arr_2 = [
                10.10,
                "bbbb",
                {
                    toString() {
                        return "VALUE_1";
                    },
                },
            ];

            expect(arr_2.toLocaleString()).toBe("10.1,bbbb,VALUE_1");
        });
    });

    describe("Array.prototype.unshift", () => {
        it("Should unshift array", () => {
            const arr = [];

            arr.unshift(1);
            arr.unshift(2);
            arr.unshift(3);

            expect(arr).toEqual([3, 2, 1]);
        });
    });


    describe("Array.prototype.values", () => {
        it("Should get iterator from array", () => {
            const arr = [1, 2, 3, 4, 5, 6];
            let sum = 0;

            for (let item of arr.values()) {
                sum += item;
            }

            expect(sum).toBe(21);
        });
    });
});
