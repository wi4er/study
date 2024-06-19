const express = require("express");
const request = require("supertest");

const fetchData = require("./fetch/fetchData");

jest.mock("./fetch/fetchData", () => slug => {
    return Promise.resolve(require(`./mock/${slug}.mock.json`));
});

describe("Api mocks", () => {
    test("Should fetch for women", () => {
        fetchData("for_women")
            .then(result => {
                expect(result.length).toBe(2);
            });
    })

    test("Should fetch for men", () => {
        fetchData("for_men")
            .then(result => {
                expect(result.length).toBe(4);
            });
    })
});
