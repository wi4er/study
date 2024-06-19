const express = require("express");
const request = require("supertest");

describe("Express application", () => {
    test("Should create app on port", done => {
        const app = express();
        const port = 8089;

        app.get("/", (req, res) => {
            res.send("SOME_DATA");
        });

        const server = app.listen(port, err => {
            server.close();

            done();
        });
    });
});
