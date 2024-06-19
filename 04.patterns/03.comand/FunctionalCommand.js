
class FunctionalCommand {
    #list = [];
    #arr = [];

    constructor(arr) {
        if (Array.isArray(arr)) {
            this.#arr = arr;
        }
    }

    add(command) {
        if (typeof command === "function") {
            this.#list.push(command);
        }

        return this;
    }

    execute() {
        let res = this.#arr;

        for (let command of this.#list) {
            res = command(res);
        }

        return res;
    }
}

function addFilter(command) {
    const pars = command.split("=");

    return source => {
        return source.filter(item => {
            return item[pars[0]] === Number(pars[1]);
        });
    }
}

function addSort(command) {
    return source => {
        const pars = command.split("=");

        return source.sort((a, b) => {
            if (pars[1] === "asc") {
                return Number(a[pars[0]]) - Number(b[pars[0]]);
            } else {
                return Number(b[pars[0]]) - Number(a[pars[0]]);
            }
        });
    }
}

module.exports = FunctionalCommand;
