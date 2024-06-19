const fs = require("fs");

describe("File system", () => {
    /**
     *
     * Можно прочитать содержимое файла синхронно
     */
    test("Should read file synchronously", () => {
        const file = fs.readFileSync("mock/data.txt", {encoding: "utf8"});

        expect(file).toBe("SOMEDATA\n");
    });

    /**
     *
     * Можно прочитать содержимое файла асинхронно, результат будет получен через калбэк функцию
     */
    test("Should read file asynchronously", done => {
        fs.readFile(
            "mock/data.txt",
            {encoding: "utf8"},
            (err, result) => {
                expect(result).toBe("SOMEDATA\n");

                done();
            }
        );
    });

    /**
     *
     * Можно прочитать содержимое файла асинхронно, результат можно отправить в промис
     */
    test("Should read file through promise", done => {
        const data = new Promise(resolve => {
            fs.readFile(
                "mock/data.txt",
                {encoding: "utf8"},
                (err, result) => resolve(result),
            );
        });

        data.then(result => {
            expect(result).toBe("SOMEDATA\n");

            done();
        });
    });

    test("Should read file with promise", done => {
        const data = fs.promises.readFile("mock/data.txt", {encoding: "utf8"});

        data.then(result => {
            expect(result).toBe("SOMEDATA\n");

            done();
        });
    });

    test("Should read dir", () => {
        // const dir = fs.readdirSync("mock");

        // console.log(dir[0]);
    });
});

describe("Class Dir", () => {
    test("Should create class", done => {

        fs.promises.opendir("mock")
            .then(async res => {

                for await(const dirent of res) {
                    console.log(dirent);
                }
            })
            .then(done);
    });
});
