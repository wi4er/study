const express = require("express");
const path = require("path");
const request = require("supertest");

describe("Static routing", () => {
    const app = express();

    /**
     *
     * Можно задать мидлеваре для всего приложения
     */
    test("Should get file from folder", done => {
        app.use(express.static("mock"));

        request(app)
            .get("/text.txt")
            .expect(200)
            .then(result => {
                expect(result.text).toBe("SOME_TEXT\n");

                done();
            });
    });

    /**
     *
     * Можно получить содержимое статического файла из папки проекта
     */
    test("Should get static file", done => {
        app.use("/public/", express.static("mock"));

        request(app)
            .get("/public/text.txt")
            .expect(200)
            .then(result => {
                expect(result.text).toBe("SOME_TEXT\n");

                done();
            });
    });

    /**
     *
     * Можно получить содержимое статического файла на диске по абсолютному пути
     */
    test("Should get static file from full path", done => {
        app.use("/public/", express.static(path.join(__dirname, "mock")));

        request(app)
            .get("/public/text.txt")
            .expect(200)
            .then(result => {
                expect(result.text).toBe("SOME_TEXT\n");

                done();
            });
    });
});

describe("Static routing headers control", () => {
    const app = express();

    /**
     *
     * Общий заголовок Cache-Control используется для задания инструкций кэширования как для запросов, так и для ответов.
     * Инструкции кэширования однонаправленные: заданная инструкция в запросе не подразумевает,
     * что такая же инструкция будет указана в ответе
     *
     * При задании ключа в false, будут убраны все заголовки этого типа
     */
    test("Should set max age", done => {
        app.use(
            "/withcache/",
            express.static(
                "mock",
                {
                    cacheControl: false,
                }
            )
        );

        request(app)
            .get("/withcache/text.txt")
            .expect(200)
            .then(result => {
                expect(result.headers["cache-control"]).toBeUndefined()

                done();
            });
    });

    /**
     *
     * Заголовок HTTP ответа ETag является идентификатором специфической версии ресурса.
     * Он позволяет более эффективно использовать кеш и сохраняет пропускную способность,
     * позволяя серверу отправлять не весь ответ, если содержимое не изменилось.
     * С другой стороны, если контент все-так поменялся,
     * Etag помогает предотвратить одновременное обновление ресурса от перезаписи друг друга ("воздушная коллизия").
     */
    test("Should disable etag", done => {
        app.use(
            "/etag/",
            express.static(
                "mock",
                {
                    etag: false,
                }
            )
        );

        request(app)
            .get("/etag/text.txt")
            .expect(200)
            .then(result => {
                expect(result.headers["etag"]).toBeUndefined()

                done();
            });
    });

    /**
     *
     */
    test.todo("Should set dotfiles");

    /**
     *
     * Можно указать максимальное время в течение которого ресурс будет считаться актуальным,
     * В отличие от Expires, данная инструкция является относительной по отношению ко времени запроса.
     */
    test("Should set max age", done => {
        app.use(
            "/with_age/",
            express.static(
                "mock",
                {
                    maxAge: "1m"
                }
            )
        );

        request(app)
            .get("/with_age/text.txt")
            .expect(200)
            .then(result => {
                expect(result.headers["cache-control"].split(", ").includes("max-age=60")).toBeTruthy();

                done();
            });
    });

    /**
     *
     * Заголовок Last-Modified в ответе HTTP содержит дату и время, в которую, по мнению удалённого сервера,
     * запрашиваемый ресурс был изменён. Он используется в качестве средства проверки для определения того,
     * остался ли ресурс неизменным. Этот заголовок менее надёжный, чем ETag, и используется как резервный механизм.
     * Условный запрос, содержащий заголовок If-Modified-Since или If-Unmodified-Since позволяет серверу использовать
     * для сравнения эту дату.
     */
    test("Should set last modified", done => {
        app.use(
            "/with_last/",
            express.static(
                "mock",
                {
                    lastModified: false
                }
            )
        );

        request(app)
            .get("/with_last/text.txt")
            .expect(200)
            .then(result => {
                expect(result.headers["last-modified"]).toBeUndefined();

                done();
            });
    });

    /**
     *
     */
    test.todo("Should set redirect");

    /**
     * Indicates that the response body will not change over time.
     * The resource, if unexpired, is unchanged on the server and therefore the client should not send
     * a conditional revalidation for it (e.g. If-None-Match or If-Modified-Since) to check for updates,
     * even when the user explicitly refreshes the page.
     * Clients that aren't aware of this extension must ignore them as per the HTTP specification.
     * In Firefox, immutable is only honored on https:// transactions. For more information, see also this blog post.
     */
    test("Should set immutable", done => {
        app.use(
            "/immutable/",
            express.static(
                "mock",
                {immutable: true}
            )
        );

        request(app)
            .get("/immutable/text.txt")
            .expect(200)
            .then(result => {
                expect(result.headers["cache-control"].split(", ").includes("immutable")).toBeTruthy();

                done();
            });
    });

    /**
     *
     * Set file extension fallbacks.
     * When set, if a file is not found, the given extensions will be added to the file name and search for.
     * The first that exists will be served. Example: ['html', 'htm']. The default value is false
     */
    test("Should set extensions", done => {
        app.use(
            "/extensions/",
            express.static(
                "mock",
                {
                    extensions: ["txt"]
                }
            )
        );

        request(app)
            .get("/extensions/text")
            .expect(200)
            .then(result => done());
    });

    /**
     *
     * Можно задать файл по умолчанию для папки
     */
    test("Should set index file", done => {
        app.use(
            "/index/",
            express.static(
                "mock",
                {
                    index: ["file.html"]
                }
            )
        );

        request(app)
            .get("/index/")
            .expect(200)
            .then(result => {
                expect(result.text).toBe("<div>123</div>\n");

                done();
            });
    });

    /**
     *
     * Можно задать произвольный заголовок
     */
    test("Should set headers", done => {
        app.use(
            "/with_headers/",
            express.static(
                "mock",
                {
                    setHeaders(res) {
                        res.setHeader("some", "value")
                    }
                }
            )
        );

        request(app)
            .get("/with_headers/text.txt")
            .expect(200)
            .then(result => {
                expect(result.headers["some"]).toBe("value");
                
                done();
            });
    });
});
