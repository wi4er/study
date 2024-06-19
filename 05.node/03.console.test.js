const fs = require("fs");
const {Console} = require("console");

describe("Console", () => {
    describe("new Console", () => {
        test("Should console to file", () => {
            const output = fs.createWriteStream('./out/log_1.log');

            const logger = new Console({
                stdout: output,
            });

            logger.log("Some message!");
        });

        test("Should write log to file", () => {
            const output = fs.createWriteStream('./out/log_2.log', {flags: 'a'});
            const errorOutput = fs.createWriteStream('./out/error_2.log', {flags: 'a'});

            const logger = new Console({
                stdout: output,
                stderr: errorOutput,
            });

            logger.log("Some text!");
            logger.error("Some error!!!");
        });
    });

    describe("console.assert", () => {
        test("Should assert message", done => {
            const
                output = fs.createWriteStream('./out/log_assert.log'),
                logger = new Console({stdout: output});

            logger.assert(true, "Nothing happen!");
            logger.assert(false, "Something wrong!");

            output.end(() => {
                const res = fs.readFileSync("./out/log_assert.log", {encoding: "utf-8"});
                expect(res).toBe("Assertion failed: Something wrong!\n");

                done();
            });
        });
    });

    describe("console.clear", () => {
        test("Should clear console", () => {
            console.clear();
        });
    });

    describe("console.count", () => {
        test("Should default count console", done => {
            const
                output = fs.createWriteStream('./out/log_count.log'),
                logger = new Console({stdout: output});

            logger.count();
            logger.count();
            logger.count();

            output.end(() => {
                const res = fs.readFileSync("./out/log_count.log", {encoding: "utf-8"});
                expect(res).toBe("default: 1\ndefault: 2\ndefault: 3\n");

                done();
            });
        });

        test("Should count console", done => {
            const
                output = fs.createWriteStream('./out/log_count.log'),
                logger = new Console({stdout: output});

            logger.count("first");
            logger.count("first");
            logger.count("second");
            logger.count("second");

            output.end(() => {
                const res = fs.readFileSync("./out/log_count.log", {encoding: "utf-8"});
                expect(res).toBe("first: 1\nfirst: 2\nsecond: 1\nsecond: 2\n");

                done();
            });
        });
    });

    describe("console.countReset", () => {
        test("Should reset count", () => {
            const
                output = fs.createWriteStream('./out/log_count_reset.log'),
                logger = new Console({stdout: output});

            logger.count("first");
            logger.count("first");
            logger.countReset("first")
            logger.count("first");

            output.end(() => {
                const res = fs.readFileSync("./out/log_count_reset.log", {encoding: "utf-8"});
                expect(res).toBe("first: 1\nfirst: 2\nsecond: 1\nfirst: 1\n");

                done();
            });
        });
    });

    /**
     * @See console.log
     */
    describe("console.debug", () => {});


    describe("console.dir", () => {
        test("Should console dir", () => {
            const
                output = fs.createWriteStream('./out/log_dir.log'),
                logger = new Console({stdout: output});

            const obj = {a: 1, b: 2, c: {aa: 11}};

            logger.dir(obj, {showHidden: true, depth: 1});
        });
    });

    describe("console.dirxml", () => {

    });

    describe("console.error", () => {
        test("Should console error", done => {
            const output = fs.createWriteStream('./out/log_3.log');
            const errorOutput = fs.createWriteStream('./out/error_3.log');

            const logger = new Console({
                stdout: output,
                stderr: errorOutput,
            });

            logger.error("Some error!!!");

            errorOutput.end(() => {
                const res = fs.readFileSync("./out/error_3.log", {encoding: "utf-8"});
                expect(res).toBe("Some error!!!\n");

                done();
            });
        });
    });

    describe("console.group", () => {

    });

    describe("console.groupCollapsed", () => {

    });

    describe("console.groupEnd", () => {

    });

    describe("console.info", () => {

    });

    describe("console.log", () => {

    });

    describe("console.table", () => {

    });

    describe("console.time", () => {

    });

    describe("console.timeEnd", () => {

    });
    describe("console.timeLog", () => {

    });
    describe("console.trace", () => {

    });
    describe("console.warn", () => {

    });
});
