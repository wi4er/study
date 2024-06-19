const path = require('path');

describe("Path basename", () => {
    /**
     *
     * Можно получить путь к файлу для своей системы в виде строки:
     */
    test("Should read filepath and return results OS", () => {
        const filepath = path.basename('C:\\temp\\myfile.html');

        expect(filepath).toBe("C:\\temp\\myfile.html");
        expect.stringContaining(filepath);
    });

    /**
     *
     * Можно получить путь к файлу для системы Windows:
     */
    test("Should read filepath and return results on Windows ", () => {
        const filepath = path.win32.basename('C:\\temp\\myfile.html');

        expect(filepath).toBe("myfile.html");
    });

    /**
     *
     * Можно получить путь к файлу для системы POSIX:
     */
    test("Should read filepath and return results on POSIX ", () => {
        const filepath = path.posix.basename('C:\\temp\\myfile.html');

        expect(filepath).toBe("C:\\temp\\myfile.html");
    });

    /**
     *
     * Можно получить часть пути до первого разделителя или имя файла basename(path[, ext]):
     */
    test("Should read filepath and return part string ", () => {
        const str = path.basename('/foo/bar/baz/asdf/quux.html', 'x.html');
        const filepath = path.basename('/foo/bar/baz/asdf/quux.html', '.html');

        expect(str).toBe("quu");
        expect(filepath).toBe("quux");
    });

    /**
     *
     * Модуль строгий к регистру:
     */
    test("Should read filePathOne and return full filename ", () => {
        const filePathOne = path.win32.basename('C:\\foo.html', '.html');
        const filePathTwo = path.win32.basename('C:\\foo.HTML', '.html');
        const filePathThree = path.basename('C:\\foo.HTML', '.html');

        expect(filePathOne).toBe("foo");
        expect(filePathTwo).toBe("foo.HTML");
        expect(filePathThree).toBe("C:\\foo.HTML");
    });

    /**
     *
     * Можно обработать разделитель пути : или ; в зависимости от OS:
     */
    test("Should read filePOSIX and split ", () => {
        const filePOSIX = '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin';
        const fileWindows = 'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\';

        const filePathOne = filePOSIX.split(path.delimiter);
        const filePathTwo = fileWindows.split(path.delimiter);

        expect(filePathOne).toStrictEqual(["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin"]);
        expect(filePathTwo).toStrictEqual(["C", "\\Windows\\system32;C", "\\Windows;C", "\\Program Files\\node\\",]);
    });

    /**
     *
     * Можно получить путь каталога без завершающего резделителя каталога:
     */
    test("Should read filepath and return path catalog ", () => {
        const filepath = path.dirname('/foo/bar/baz/asdf/quux');

        expect(filepath).toBe('/foo/bar/baz/asdf');
    });

    /**
     *
     * Можно получить символы после последней точки в пути:
     */
    test("Should read filepath and return file format", () => {
        const filepathOne = path.extname('file.html');
        expect(filepathOne).toBe('.html');

        const filepathTwo = path.extname('index.coffee.md');
        expect(filepathTwo).toBe('.md');

        const filepathThree = path.extname('index.');
        expect(filepathThree).toBe('.');

        const filepathFour = path.extname('index');
        expect(filepathFour).toBe('');

        const filepathFive = path.extname('.index');
        expect(filepathFive).toBe('');

        const filepathSix = path.extname('.index.md');
        expect(filepathSix).toBe('.md');
    });

    /**
     *
     * Можно получить с обэкта путь:
     */
    test("Should read objectPath and return path", () => {
        const objectPOSIX = path.format({
            root: '/ignored',
            dir: '/home/user/dir',
            base: 'file.txt'
        });

        expect(objectPOSIX).toBe('/home/user/dir/file.txt');

        const objectWindows = path.win32.format({
            dir: 'C:\\path\\dir',
            base: 'file.txt'
        });

        expect(objectWindows).toBe('C:\\path\\dir\\file.txt');
    });

    /**
     *
     * Можно определить является путь абсолютным:
     */
    test("Should read objectPath and return path", () => {
        const absolutePathPOSIXOne = path.isAbsolute('/foo/bar');
        expect(absolutePathPOSIXOne).toBeTruthy();

        const absolutePathPOSIXTwo = path.isAbsolute('/baz/..');
        expect(absolutePathPOSIXTwo).toBeTruthy();

        const absolutePathPOSIXThree = path.isAbsolute('qux/');
        expect(absolutePathPOSIXThree).toBeFalsy();

        const absolutePathPOSIXFour = path.isAbsolute('.');
        expect(absolutePathPOSIXFour).toBeFalsy();

        const absolutePathWindowsOne = path.win32.isAbsolute('//server');
        expect(absolutePathWindowsOne).toBeTruthy();

        const absolutePathWindowsTwo = path.win32.isAbsolute('\\\\server');
        expect(absolutePathWindowsTwo).toBeTruthy();

        const absolutePathWindowsThree = path.win32.isAbsolute('C:/foo/..');
        expect(absolutePathWindowsThree).toBeTruthy();

        const absolutePathWindowsFour = path.win32.isAbsolute('C:\\foo\\..');
        expect(absolutePathWindowsFour).toBeTruthy();

        const absolutePathWindowsFive = path.win32.isAbsolute('bar\\baz');
        expect(absolutePathWindowsFive).toBeFalsy();

        const absolutePathWindowsSix = path.win32.isAbsolute('bar/baz');
        expect(absolutePathWindowsSix).toBeFalsy();

        const absolutePathWindowsSeven = path.win32.isAbsolute('.');
        expect(absolutePathWindowsSeven).toBeFalsy();
    });

    /**
     *
     * Можно объединить части пути в один:
     */
    test("Should read segmentsPath and return full path", () => {
        const segmentsPath = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
        expect(segmentsPath).toBe('/foo/bar/baz/asdf');
    });

    /**
     *
     * Можно нормализовать путь:
     */
    test("Should read normalizePath and return normalize path", () => {
        const normalizePath = path.normalize('/foo/bar//baz/asdf/quux/..');
        expect(normalizePath).toBe('/foo/bar/baz/asdf');

        const normalizeWindowsPath = path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
        expect(normalizeWindowsPath).toBe('C:\\temp\\foo\\bar');
    });

    /**
     *
     * Можно преобразовать путь в обэкт:
     */
    test("Should read normalizePath and return normalize path", () => {
        const parsePath = path.parse('/home/user/dir/file.txt');
        expect(parsePath).toEqual({"base": "file.txt", "dir": "/home/user/dir", "ext": ".txt", "name": "file", "root": "/"});

        const parseWindowsPath = path.parse('C:\\path\\dir\\file.txt');
        expect(parseWindowsPath).toEqual({"base": "C:\\path\\dir\\file.txt", "dir": "", "ext": ".txt", "name": "C:\\path\\dir\\file", "root": ""});
    });

    /**
     *
     * Можно получить относительный путь от рабочей директории:
     */
    test("Should read relativePath and return relative path", () => {
        const relativePOSIXPath = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
        expect(relativePOSIXPath).toBe('../../impl/bbb');

        const relativeWindowsPath = path.win32.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
        expect(relativeWindowsPath).toBe('..\\..\\impl\\bbb');
    });

    /**
     *
     * Можно обеденить все последовательные пути в один абсолютный. Если абсолютный путь
     * не был сгенерирован берется текущий корневой каталог. Пути нулевой длины игнорируются.
     * Начальный и конечные косые линии удаляются:
     */
    test("Should read relativePath and return relative path", () => {
        const resolvePathOne = path.resolve('/foo/bar', './baz');
        expect(resolvePathOne).toBe("/foo/bar/baz");

        const resolvePathTwo = path.resolve('/foo/bar', '/tmp/file/');
        expect(resolvePathTwo).toBe('/tmp/file');

        const resolvePathThree = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
        expect(resolvePathThree).toBe("/home/frontstud/WebstormProjects/front_study/front_study/node/wwwroot/static_files/gif/image.gif");
    });

    /**
     *
     * Можно обеспечить подержку всех платформ OS:
     */
    test("Should read filePath and return array path", () => {
        const filePOSIX = 'foo/bar/baz';
        const fileWindows = 'foo\\bar\\baz';

        const filePathOne = filePOSIX.split(path.sep);
        const filePathTwo = fileWindows.split(path.win32.sep);

        expect(filePathOne).toStrictEqual(['foo', 'bar', 'baz']);
        expect(filePathTwo).toStrictEqual(['foo', 'bar', 'baz']);
    });

    /**
     *
     * Можно получить эквивалентный путь с префиксом пространства имен.
     * Применим только в системах Windows.
     * В системах POSIX метод не работает и всегда возвращается путь без изменений:
     */
    test("Should read filePath and return array path", () => {
        const filePOSIX = 'foo/bar/baz';
        const fileWindows = 'foo\\bar\\baz';

        const filePathOne = path.toNamespacedPath(filePOSIX)
        const filePathTwo = path.win32.toNamespacedPath(fileWindows)

        expect(filePathOne).toBe("foo/bar/baz");
        expect(filePathTwo).toStrictEqual("foo\\bar\\baz");
    });
})
