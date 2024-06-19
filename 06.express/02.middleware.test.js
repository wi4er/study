const express = require("express");
const request = require("supertest");

describe("Express middleware", () => {
    describe("Simple middleware", () => {
        const app = express();

        app.use((req, res, next) => {
            req.extra = "EXTRA";

            next();
        });

        app.get("/", (req, res) => {
            res.send(req.extra + req.Reurl);
        });

        test("Should move through middleware", done => {
            request(app)
                .get("/")
                .expect(200)
                .then(result => {
                    expect(result.body).toBe("EXTRA/");
                })
        });
    });

    describe("Some middleware", () => {
        const app = express();

        app.use((req, res, next) => {
            const {authorization} = req.headers;

            if (authorization === "correct_token") {
                next();
            } else {
                res.status(403);
                res.end();
            }
        });

        app.get("/", (req, res) => {
            res.send("SOME_DATA");
        });

        app.get("/user/", (req, res) => {
            res.json({name: "SOME_NAME"});
        });

        /**
         *
         * Если middleware пропускает запрос то получаем результат
         */
        test("Should move through middleware", done => {
            request(app)
                .get("/")
                .set("authorization", "correct_token")
                .expect(200)
                .then(result => {
                    expect(result.text).toBe("SOME_DATA")

                    done();
                });
        });

        test("Should move through middleware", done => {
            request(app)
                .get("/user/")
                .set("authorization", "correct_token")
                .expect(200)
                .then(result => {
                    expect(result.body).toEqual({name: "SOME_NAME"});

                    done();
                });
        });

        /**
         *
         * Если middleware закрывает запрос то получаем ошибку
         */
        test("Shouldn't move with wrong token", done => {
            request(app)
                .get("/")
                .set("authorization", "wrong_token")
                .expect(403)
                .then(() => done());
        });

        test("Shouldn't move with wrong token", done => {
            request(app)
                .get("/user/")
                .set("authorization", "wrong_token")
                .expect(403)
                .then(() => done());
        });

        test("Should move through wrong endpoint", done => {
            request(app)
                .get("/wrong/")
                .set("authorization", "wrong_token")
                .expect(403)
                .then(() => done());
        });

        test("Should move through wrong endpoint", done => {
            request(app)
                .get("/wrong/")
                .set("authorization", "correct_token")
                .expect(404)
                .then(() => done());
        });
    });

    describe("Multiple middlewares", () => {
        const app = express();

        app.use((req, res, next) => {
            req.extra = [1];

            next();
        });

        app.use("/item/", (req, res, next) => {
            req.extra.push(2);

            next();
        });

        app.use("/user/", (req, res, next) => {
            req.extra.push(300);

            next();
        });

        function resolver(req, res) {
            let sum = 0;

            for (let i of req.extra) {
                sum += i;
            }

            res.send(String(sum));
        }

        app.get("/item/", resolver);
        app.get("/user/", resolver);

        test("Should move through middleware", done => {
            request(app)
                .get("/item/")
                .expect(200)
                .then(result => {
                    expect(result.text).toBe("3")

                    done();
                });
        });

        test("Should move through middleware", done => {
            request(app)
                .get("/user/")
                .expect(200)
                .then(result => {
                    expect(result.text).toBe("301")

                    done();
                });
        });
    });

    describe("Included middleware", () => {
        const app = express();

        function middleware(req, res, next) {
            res.count = 10;

            next();
        }

        app.get(
            "/user/",
            middleware,
            (req, res) => {
                res.send(`DATA_${res.count}`);
            }
        );

        app.get(
            "/group/",
            middleware,
            (req, res, next) => {
                res.count += 10;

                next();
            },
            (req, res, next) => {
                console.log(next);

                res.send(`DATA_${res.count}`);
            }
        );

        test("Should use middleware", done => {
            request(app)
                .get("/user/")
                .then(result => {
                    expect(result.text).toBe("DATA_10");

                    done();
                });
        });

        test("Should use middleware", done => {
            request(app)
                .get("/group/")
                .then(result => {
                    expect(result.text).toBe("DATA_20");

                    done();
                });
        });
    });
});
