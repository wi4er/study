"use strict";


describe("String operators", () => {
    /**
     *
     * Можно сравнить две строки
     */
    it("Should compare strings", () => {
        // Strict equality
        expect("11111" === "11111").toBeTruthy();
        expect("11111" === 11111).toBeFalsy();
        expect("VALUE" === {toString: () => "VALUE"}).toBeFalsy();

        // Abstract equality
        expect("11111" == 11111).toBeTruthy();
        expect("true" == true).toBeFalsy();
        expect("null" == null).toBeFalsy();
        expect("undefined" == undefined).toBeFalsy();
        expect("VALUE" == {toString: () => "VALUE"}).toBeTruthy();
    });

    /**
     *
     */
    it("Should relationing strings", () => {
        expect("111" > "11").toBeTruthy();
        expect("11" > "1111").toBeFalsy();
        expect("112" > "111").toBeTruthy();
        expect("22222" > "11111").toBeTruthy();
        expect("a" > "A").toBeTruthy();
        expect("aAAAA" > "Aaaaa").toBeTruthy();

        expect("a" >= "a").toBeTruthy();
    });

    it("Should summary to string with primitive", () => {

    });

    /**
     *
     */
    it("Should operate with string", () => {
        expect("qwe" + "rty").toBe("qwerty");

        expect("100" - "44").toBe(56);
        expect("abc" - "cba").toBe(NaN);

        expect("20" * "20").toBe(400);
        expect("20a" * "20a").toBe(NaN);

        expect("444" / "4").toBe(111);
        expect("10" / "a").toBe(NaN);
    });
});

/**
 *
 * Объект класса String используется, чтобы представить и конструировать последовательность символов.
 */
describe("String.prototype", () => {
    /**
     *
     * Форматирует строку в html
     */
    it("Should format for html", () => {
        const str = "qwe";

        expect(str.anchor("link")).toBe("<a name=\"link\">qwe</a>");
        expect(str.big()).toBe("<big>qwe</big>");
        expect(str.blink()).toBe("<blink>qwe</blink>");
        expect(str.bold()).toBe("<b>qwe</b>");
        expect(str.fixed()).toBe("<tt>qwe</tt>");
        expect(str.fontcolor("red")).toBe("<font color=\"red\">qwe</font>");
        expect(str.fontsize("2p")).toBe("<font size=\"2p\">qwe</font>");
        expect(str.italics()).toBe("<i>qwe</i>");
        expect(str.link("link")).toBe("<a href=\"link\">qwe</a>");
        expect(str.small()).toBe("<small>qwe</small>");
        expect(str.strike()).toBe("<strike>qwe</strike>");
        expect(str.sub()).toBe("<sub>qwe</sub>");
        expect(str.sup()).toBe("<sup>qwe</sup>");
    });

    /**
     *
     * Возвращает символ из строки, расположенный по индексу, указанному в первом аргументе.
     */
    it("Should get char at", () => {
        const str = "qwertyeuieop";
        let count = 0;

        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === "e") {
                count++;
            }
        }

        expect(count).toBe(3);

        expect(str.charAt(-100)).toBe("");
        expect(str.charAt(100)).toBe("");
        expect(str.charAt("www")).toBe("q");
        expect(str.charAt(true)).toBe("w");
        expect(str.charAt(false)).toBe("q");
    });

    /**
     *
     * Возвращает числовое значение Юникода для символа из строки,
     * расположенный по индексу, указанному в первом аргументе.
     */
    it("Should get char code at", () => {
        const str = "qwertyeuieop\u{1F600}";
        let count = 0;
        
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) === 101) {
                count++;
            }
        }

        expect(count).toBe(3);

        expect(str.charCodeAt(100)).toBe(NaN);
        expect(str.charCodeAt(-100)).toBe(NaN);
        expect(str.charCodeAt("www")).toBe(113); // q
        expect(str.charCodeAt(true)).toBe(119); // w
        expect(str.charCodeAt(false)).toBe(113); // q
    });

    /**
     *
     * Возвращает числовое значение UTF-16 для кодовой точки из строки,
     * расположенный по индексу, указанному в первом аргументе.
     */
    it("Should get code point at", () => {
        const str = "\u{439}\u{446}\u{443}\u{439}\u{43a}\u{435}\u{1F600}";
        let count = 0;


        for (let i = 0; i < str.length; i++) {
            const code = str.codePointAt(i);

            if (code === 1081) {
                count++;
            }
        }

        expect(count).toBe(2);
    });

    /**
     *
     * Объединяет текст из двух или более строк и возвращает новую строку.
     * Орининальная строка не меняется
     *
     * @param str - строка для добавления
     * @return - новая строка содержащая строку контекста и все встроки из аргументов
     */
    it("Should concat string", () => {
        const str1 = "qwe";

        expect(str1.concat("1")).toBe("qwe1");
        expect(str1.concat("1", "2")).toBe("qwe12");
        expect(str1.concat("1", "2", "3")).toBe("qwe123");
        expect(str1).toBe("qwe");
    });

    /**
     *
     * Проверяет, содержит ли строка символы из первого аргумента
     *
     * @param searchString - сторока для поиска
     * @param - позиция в строке, с которой начинать поиск, по умолчанию 0.
     * @returns - Boolean
     */
    it("Should includes string", () => {
        const str = "qwertyuiop[]";

        expect(str.includes("we")).toBeTruthy();
        expect(str.includes("ff")).toBeFalsy();

        expect(str.includes("qwe", 2)).toBeFalsy();
        expect(str.includes("wer", 1)).toBeTruthy();
    });

    /**
     *
     * Позволяет определить, заканчивается ли строка символами первого аргумента,
     *
     * @param searchString - строка для определения
     * @param length - количество символов учитываемых в определении, по умолчанию равна длине первого аргумента.
     * @returns - Boolean
     */
    it("Should ends with", () => {
        expect("qwertyui".endsWith("ui")).toBeTruthy();
        expect("qwertyui".endsWith("yu")).toBeFalsy();

        expect("qwertyui".endsWith("ty", 6)).toBeTruthy();
        expect("qwty".endsWith("ty", 6)).toBeTruthy();
        expect("qwertyui".endsWith("ty", 7)).toBeFalsy();

        expect("qwerty".endsWith({})).toBeFalsy()
        expect("[object Object]".endsWith({})).toBeTruthy();
    });

    /**
     *
     * Возвращает индекс первого вхождения символов первого аргумента
     *
     * @param searchValue - строка для поиска
     * @param position - позиция в строке, с которой начинать поиск, по умолчанию 0.
     * @returns - Integer, индекс первого вхождения, если вхождения не было, то -1
     */
    it("Should indexOf string", () => {
        expect("qwerty".indexOf("we")).toBe(1);
        expect("qwerty".indexOf("ty")).toBe(4);
        expect("qwerty".indexOf("22")).toBe(-1);

        expect("qwerty".indexOf("qwe", 2)).toBe(-1);
        expect("qwerty".indexOf("ert", 2)).toBe(2);
        expect(Boolean(~"qwerty".indexOf("qwe", 2))).toBeFalsy();
        expect("qwerty".indexOf("qwe", -10)).toBe(0);
    });

    /**
     *
     * Возвращает индекс последнего вхождения символов первого аргумента
     *
     * @param searchValue - строка для поиска
     * @param position - позиция в строке, до которой искать первый символ вхождения, по умолчанию 0.
     * @returns - Integer, индекс последнего вхождения, если вхождения не было, то -1
     */
    it("Should last index of string", () => {
        expect("qwerty".lastIndexOf("ty")).toBe(4);
        expect("qwerty".lastIndexOf("eee")).toBe(-1);

        expect("qwertytyty".lastIndexOf("ty")).toBe(8);
        expect("qwertytyty".lastIndexOf("yty", 4)).toBe(-1);
    });

    it.todo("Should local compare strings");

    it.todo("Should normalize string");

    /**
     *
     * Конструирует и возвращает новую строку,
     * содержащую указанное количество соединённых вместе копий строки из контекста,
     *
     * @param count - число повторений строки
     * @return - новая строка, содержащая указанное количество копий
     */
    it("Should repeat string", () => {
        const str = "qwe";

        expect(str.repeat(3)).toBe("qweqweqwe");
        expect(() => str.repeat(-1)).toThrow(RangeError);
        expect(str.repeat("qqq")).toBe("");
        expect(str.repeat(NaN)).toBe("");
        expect(str.repeat(true)).toBe("qwe");
        expect(str.repeat(false)).toBe("");
        expect(str.repeat(null)).toBe("");
    });

    /**
     *
     * Извлекает часть строки и возвращает новую строку без изменения оригинальной строки.
     *
     * @param beginIndex - индекс в строке с которого начинается извлечение
     * @param endIndex - индекс перед которым заканчивается извлечение
     * @return - новая строка полученная при извлечении
     */
    it("Should slice string", () => {
        const str = "qwertyu";

        expect(str.slice(0, 3)).toBe("qwe");
        expect(str.slice(-10, 3)).toBe("qwe");
        expect(str.slice("www", 3)).toBe("qwe");
        expect(str.slice(true, 3)).toBe("we");
        expect(str.slice(2, 5)).toBe("ert");
        expect(str.slice(4, 1)).toBe("");
        expect(str.slice(4, false)).toBe("");
        expect(str.slice(4)).toBe("tyu");
    });

    /**
     *
     * Позволяет определить, начинается ли строка символами первого аргумента,
     *
     * @param searchString - строка для определения
     * @param position - позиция в строке, с которой начинать определение, по умолчанию 0.
     * @returns - Boolean
     */
    it("Should starts with", () => {
        expect("qwertyui".startsWith("qw")).toBeTruthy();
        expect("qwertyui".startsWith("wer")).toBeFalsy();

        expect("qwerty".startsWith("ert", 2)).toBeTruthy();
        expect("qwerty".startsWith("ert", 3)).toBeFalsy();
    });

    /**
     *
     * возвращает указанное количество символов из строки, начиная с указанной позиции.
     *
     * @param start - индекс в строке с которого начинается извлечение
     * @param length - количество извлекаемых символов
     * @return - новая строка полученная при извлечении
     */
    it("Should substr string", () => {
        const str = "qwertyu";

        expect(str.substr(0, 3)).toBe("qwe");
        expect(str.substr(-10, 3)).toBe("qwe");
        expect(str.substr("www", 3)).toBe("qwe");
        expect(str.substr(1, 2)).toBe("we");
        expect(str.substr(2, 5)).toBe("ertyu");
        expect(str.substr(4, 1)).toBe("t");
        expect(str.substr(4, false)).toBe("");
        expect(str.substr(4)).toBe("tyu");
    });

    /**
     *
     * Извлекает часть строки и возвращает новую строку без изменения оригинальной строки.
     *
     * @param beginIndex - индекс в строке с которого начинается извлечение
     * @param endIndex - индекс перед которым заканчивается извлечение
     * @return - новая строка полученная при извлечении
     */
    it("Should get substring from string", () => {
        const str = "qwertyu";

        expect(str.substring(0, 3)).toBe("qwe");
        expect(str.substring(-10, 3)).toBe("qwe");
        expect(str.substring("www", 3)).toBe("qwe");
        expect(str.substring(true, 3)).toBe("we");
        expect(str.substring(2, 5)).toBe("ert");
        expect(str.substring(4, 1)).toBe("wer");
        expect(str.substring(4, false)).toBe("qwer");
        expect(str.substring(4)).toBe("tyu");
    });

    it.todo("Should convert to local lower case");
    it.todo("Should convert to local upper case");

    /**
     *
     * Возвращает значение строки, на которой он был вызван, преобразованное в нижний регистр.
     */
    it("Should convert to lower case", () => {
        const str = "QWERTY";

        expect(str.toLowerCase()).toBe("qwerty");
    });

    /**
     *
     * Возвращает значение строки, преобразованное в верхний регистр.
     */
    it("Should convert to upper case", () => {
        const str = "qwerty";

        expect(str.toUpperCase()).toBe("QWERTY");
    });

    /**
     *
     * Удаляет пробельные символы с начала и конца строки.
     */
    it("Should trim string", () => {
        expect("  qwe   ".trim()).toBe("qwe"); // пробел
        expect("\newq\n".trim()).toBe("ewq"); // конец строки
        expect("\teeeeeee\t".trim()).toBe("eeeeeee"); // табуляция
        expect("\rwww\r".trim()).toBe("www") // возврат корретки
        expect("\u00A0\u00A0\u00A0\u00A0www\u00A0\u00A0\u00A0\u00A0".trim()).toBe("www") // неразрывный пробел
    });

    /**
     *
     * Удаляет пробельные символы с начала строки.
     */
    it("Should trim from left string", () => {
        expect("  qwe   ".trimLeft()).toBe("qwe   "); // пробел
        expect("\newq\n".trimLeft()).toBe("ewq\n"); // конец строки
        expect("\teeeeeee\t".trimLeft()).toBe("eeeeeee\t"); // табуляция
        expect("\rwww\r".trimLeft()).toBe("www\r") // возврат корретки
        expect("\u00A0\u00A0\u00A0\u00A0www\u00A0\u00A0\u00A0\u00A0".trimLeft()).toBe("www\u00A0\u00A0\u00A0\u00A0") // неразрывный пробел
    });

    /**
     *
     * Удаляет пробельные символы с начала и конца строки.
     */
    it("Should trim from right string", () => {
        expect("  qwe   ".trimRight()).toBe("  qwe"); // пробел
        expect("\newq\n".trimRight()).toBe("\newq"); // конец строки
        expect("\teeeeeee\t".trimRight()).toBe("\teeeeeee"); // табуляция
        expect("\rwww\r".trimRight()).toBe("\rwww") // возврат корретки
        expect("\u00A0\u00A0\u00A0\u00A0www\u00A0\u00A0\u00A0\u00A0".trimRight()).toBe("\u00A0\u00A0\u00A0\u00A0www") // неразрывный пробел
    });
});

describe("String.prototype methods with regexp", () => {
    /**
     *
     * возвращает получившиеся совпадения при сопоставлении строки с регулярным выражением.
     */
    it("Should match string", () => {
        const reg = /.\d{2}./;
        const res = "qwerty22qwerty".match(reg);
        expect(res[0]).toBe("y22q");
        
        const res1 = "qwerty2qwerty".match(reg);
        expect(res1).toBeNull();

        const res2 = "qwerty22".match(reg);
        expect(res2).toBeNull();

        const res3 = "22qwerty".match(reg);
        expect(res3).toBeNull();
    });

    /**
     *
     * Возвращает новую строку с некоторыми или всеми сопоставлениями с шаблоном из первого атрибута,
     * заменёнными на строку из второго атрибута
     */
    it("Should replace string", () => {
        const repl = "qweTestTqqq";

        const clear = repl.replace(
            /(?<=[T])./g,
            "O",
        );
        expect(clear).toBe("qweTOstTOqq");
        
        const withGroup = repl.replace(
            /(.)([T])(.)/gm,
            "$1$3",
        );
        expect(withGroup).toBe("qweestqqq");

        const withFun = repl.replace(
            /[T]./g,
            () => "O",
        );
        expect(withFun).toBe("qweOstOqq");
    });

    it("Should search string", () => {
        const str = "String to be search in";

        expect(str.search("to")).toBe(7);

        expect(str.search(/[be]$/)).toBe(-1);
        expect(str.search(/[in]$/)).toBe(21);
    });

    /**
     *
     * Разбивает объект String на массив строк путём разделения строки символами из первого аргумента.
     *
     * @param separator - символы, используемые в качестве разделителя
     * @param limit - Целое число, определяющее ограничение на количество найденных подстрок
     * @returns - Array
     */
    it("Should split string", () => {
        expect("1 2 3".split(" ")).toEqual(["1", "2", "3"]);
        expect("123".split()).toEqual(["123"]);
        expect("123".split("")).toEqual(["1", "2", "3"]);
        expect("11,,, 22,,, 33".split(",,, ")).toEqual(["11", "22", "33"]);
        expect("1234567".split("", 5)).toEqual(["1", "2", "3", "4", "5"]);

        expect("qw1er3er4ty".split(/\d/)).toEqual(["qw", "er", "er", "ty"]);
        expect("qw12er34er4ty".split(/\d{2}/)).toEqual(["qw", "er", "er4ty"]);
        expect("qw12er34er4ty123ww".split(/\d{2,}/)).toEqual(["qw", "er", "er4ty", "ww"]);
    });
});

