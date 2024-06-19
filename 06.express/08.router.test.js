const express = require("express");
const request = require("supertest");

describe("Express router", () => {
    test("Should create router", () => {
        const app = express();
        const router = express.Router()

        router.get("/item/", (req, res) => {
            res.send("ITEM");
        });

        router.get("/group/", (req, res) => {
            res.send("GROUP");
        });

        app.use("/api/", router);

        request(app)
            .get("/api/item/")
            .expect(200)
            .then(result => {
                expect(result.text).toBe("ITEM");
            });

        request(app)
            .get("/api/group/")
            .expect(200)
            .then(result => {
                expect(result.text).toBe("GROUP");
            });
    });
});
