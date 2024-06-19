const express = require("express");
const request = require("supertest");

describe("HTTP methods", () => {
    /**
     *
     */
    describe("GET method", () => {
        const app = express();

        /**
         *
         * Можно получить данные по GET запросу зная его URI
         */
        test("Should fetch get method", done => {
            app.get("/", (req, res) => {
                res.send("SOME_DATA");
            });

            request(app)
                .get("/")
                .then(result => {
                    expect(result.text).toBe("SOME_DATA");

                    done();
                });
        });

        /**
         *
         * Если запрошенного URI на сервере нет, то будет получен статус 404
         */
        test("Shouldn't fetch get method without resolver", done => {
            request(app)
                .get("/somedata/")
                .expect(404)
                .end(done);
        });

        /**
         *
         * Можно генерировать URI с динамическими параметрами
         */
        describe("Dynamic routing", () => {
            const data = {
                1: "DATA_1",
                2: "DATA_2",
                3: "DATA_3",
                4: "DATA_4",
                5: "DATA_5",
                6: "DATA_6",
            };

            app.get("/item/:id/", (req, res) => {
                const {id} = req.params;

                if (data[id]) {
                    res.send(data[id]);
                } else {
                    res.status(404);
                    res.end();
                }
            });

            test("Should fetch get method with param 3", async () => {
                await request(app)
                    .get("/item/3/")
                    .expect(200, "DATA_3")

                await request(app)
                    .get("/item/5/")
                    .expect(200, "DATA_5")
            });

            test("Should fetch get method with wrong param", async () => {
                await request(app)
                    .get("/item/100/")
                    .expect(404)
            });
        });

        /**
         *
         * Можно получить содержимое файла по GET запросу зная его URI
         */
        test("Should fetch get method", done => {
            app.get("/static/file.txt", (req, res) => {
                res.send("SOME_FILE");
            });

            request(app)
                .get("/static/file.txt")
                .then(result => {
                    expect(result.text).toBe("SOME_FILE");

                    done();
                });
        });
    });

    /**
     *
     */
    describe("POST method", () => {
        test("Should create post method", done => {
            const app = express();
            app.use(express.json());

            app.post("/", (req, res) => {
                const {count} = req.body;
                let sum = 0;

                for (let i = 0; i <= count; i++) {
                    sum += i;
                }

                res.json({result: sum});
            });

            request(app)
                .post("/")
                .send({count: 10})
                .then(result => {
                    expect(result.body).toEqual({result: 55});

                    done();
                });

            request(app)
                .post("/")
                .send({count: 20})
                .then(result => {
                    expect(result.body).toEqual({result: 210});

                    done();
                });
        });
    });
    /**
     *
     * Метод PUT требует, чтобы состояние целевого ресурса было создано или заменено состоянием,
     * определенным представлением, заключенным в полезную нагрузку сообщения запроса.
     * Успешный PUT данного представления предполагает,
     * что последующий GET на том же целевом ресурсе приведет к отправке эквивалентного представления в ответе 200 (OK).
     * Однако нет никакой гарантии, что такое изменение состояния будет наблюдаемым,
     * поскольку целевой ресурс может обрабатываться другими пользовательскими агентами параллельно
     * или может подвергаться динамической обработке исходным сервером до получения любого последующего GET.
     * Успешный ответ только означает, что намерение пользовательского агента было достигнуто во время его обработки исходным сервером.
     */
    describe("PUT method", () => {
        const app = express();
        app.use(express.json());

        const state = {};
        let user = {};

        app.put("/item/:id/", (req, res) => {
            const
                {params: {id}} = req,
                {body: {count}} = req;

            state[id] = count;

            res.json(state[id]);
        });

        app.put("/user/", (req, res) => {
            res.send(true);
        });

        test("Should update item by id", done => {
            request(app)
                .put("/item/22/")
                .send({count: {value: 10, count: 11}})
                .then(result => {
                    done();
                });
        });

        test("Should update user", done => {
            request(app)
                .put("/item/10/")
                .send({count: 10})
                .then(result => {

                    done();
                });
        });
    });


    describe("PATCH method", () => {
        const app = express();

        test("Should", () => {

        });
    });

    /**
     *
     * Метод DELETE требует, чтобы исходный сервер удалил связь между целевым ресурсом и его текущими функциями.
     * По сути, этот метод похож на команду rm в UNIX: он выражает операцию удаления в отображении URI исходного сервера,
     * а не ожидание удаления ранее связанной информации.
     */
    describe("DELETE method", () => {
        test("Should create delete method", done => {
            const app = express();
            const obj = {a: 1, b: 2, c: 3, d: 4};

            app.delete("/:key/", (req, res) => {
                const {key} = req.params;

                if (Object.getOwnPropertyDescriptor(obj, key) !== undefined) {
                    delete obj.key;

                    res.send(true);
                } else {
                    res.status(404);
                    res.end();
                }
            });

            done();
        });
    });

    /**
     *
     * Метод HEAD идентичен GET, за исключением того,
     * что сервер НЕ ДОЛЖЕН отправлять тело сообщения в ответе (т. Е. Ответ завершается в конце раздела заголовка).
     * Серверу СЛЕДУЕТ отправлять те же поля заголовка в ответ на запрос HEAD, которые он отправил бы,
     * если бы запрос был GET, за исключением того, что поля заголовка полезной нагрузки МОГУТ быть опущены.
     * Этот метод может использоваться для получения метаданных о выбранном представлении
     * без передачи данных представления и часто используется для проверки гипертекстовых ссылок на достоверность,
     * доступность и недавнюю модификацию.
     */
    describe("HEAD method", () => {
        test("Should create head method", done => {
            const app = express();

            app.head("/", (req, res) => {
                const {authorization} = req.headers;

                if (authorization === "some_token") {
                    res.status(200)
                    res.end();
                } else {
                    res.status(403);
                    res.end();
                }
            });

            request(app)
                .head("/")
                .set("authorization", "some_token")
                .expect(200)
                .then(() => done());

            request(app)
                .head("/")
                .set("authorization", "wrong_token")
                .expect(403)
                .then(() => done());
        });
    });

    describe("CONNECT method", () => {
        const app = express();

        app.connect("/", (req, res) => {

        });

        test("Should connect to app", () => {

        });
    })

    describe("OPTIONS method", () => {
        test("Should", () => {

        });
    });
});
