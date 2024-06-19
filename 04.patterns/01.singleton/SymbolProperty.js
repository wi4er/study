const sym = Symbol("instance");

class SymbolProperty {
    static [sym] = null;

    constructor() {
        if (SymbolProperty[sym]) {
            return SymbolProperty[sym];
        }

        SymbolProperty[sym] = this;
    }

    someValue = "VALUE";

    someFun() {
        return "RESULT";
    }
}

module.exports = SymbolProperty;
