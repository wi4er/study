describe("Bitwise operators", () => {
    it("Should check bitwise and", () => {
        const value = 74; //01001010
        const key = 9;    //00001001
        const res = 8;    //00001000

        expect(value & key).toBe(res);
    });

    it("Should check bitwise or", () => {
        const value = 74; //01001010
        const key = 7;    //00000111
        const res = 79;   //01001111

        expect(value | key).toBe(res);
    });

    it("Should check bitwise xor", () => {
        const value = 74; //01001010
        const key = 13;   //00001101
        const res = 71    //01000111

        expect(value ^ key).toBe(res);
        expect(res ^ key).toBe(value);
        expect(value ^ res).toBe(key);
    });

    it("Should check bitwise not", () => {
        const value = 74; //00000000 00000000 00000000 01001010
        const res = -75;  //11111111 11111111 11111111 10110101

        expect(~value).toBe(res);
    });

    it("Should shift left", () => {
        const value = 52; //00110100
        const res = 104;  //01101000

        expect(value << 1).toBe(res);
    });

    it("Should shift left with sign", () => {
        const value = -52; //11111111 11111111 11111111 11001100
        const res = -104;  //11111111 11111111 11111111 10011000

        expect(value << 1).toBe(res);
    });

    it("Should shift right", () => {
        const value = 52; //00110100
        const res = 26;   //00011010

        expect(value >> 1).toBe(res);
    });

    it("Should shift right with sign", () => {
        const value = -52; //11111111 11111111 11111111 11001100
        const res = -26;   //11111111 11111111 11111111 11100110

        expect(value >> 1).toBe(res);
    });

    it("Should bitwise shift right with sign", () => {
        const value = -52;      //11111111 11111111 11111111 11001100
        const res = 2147483622; //01111111 11111111 11111111 11100110

        expect(value >>> 1).toBe(res);
    });
});
