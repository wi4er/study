const express = require("express");
const request = require("supertest");
const cheerio = require('cheerio');


describe("Render to html", () => {

    describe("File render", () => {
        const app = express();

        app.set("view engine", "twig");
        app.set("views", "./views");

        app.get("/", (req, res) => {
            res.render("index", {hello: "world!"});
        });

        test("Should get data", done => {
            request(app)
                .get("/")
                .expect(200, "<div>Hello world!</div>\n")
                .end(done);
        });
    });

    describe("File list", () => {
        const app = express();

        app.set("view engine", "twig");
        app.set("views", "./views");

        const list = [{
            name: "item1"
        }, {
            name: "item2"
        }, {
            name: "item3"
        }];

        app.get("/", (req, res) => {
            res.render("list", {list});
        });

        test("Should get list", done => {
            request(app)
                .get("/")
                .expect(result => {
                    const $ = cheerio.load(result.text);

                    expect($(".item").length).toBe(3);
                    expect($(".item")[0].children[0].data.trim()).toBe("item1");
                    expect($(".item")[1].children[0].data.trim()).toBe("item2");
                    expect($(".item")[2].children[0].data.trim()).toBe("item3");
                })
                .end(done);
        });
    });

})
