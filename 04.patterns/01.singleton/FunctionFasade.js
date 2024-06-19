class Custom {
    someValue = "value";

    someFun() {
        return "result";
    }
}

let instance = null;

function getInstance() {
    if (!instance) {
        instance = new Custom();
        instance.constructor = null;
    }

    return instance;
}

module.exports = getInstance;
