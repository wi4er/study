
const arr = [
    {
        id: 0,
        a: 1,
        b: 10,
    }, {
        id: 1,
        a: 4,
        b: 2
    }, {
        id: 2,
        a: 1,
        b: 5,
    }, {
        id: 3,
        a: 2,
        b: 7
    }, {
        id: 4,
        a: 2,
        b: 10
    }, {
        id: 5,
        a: 3,
        b: 6
    }
];

const list = {
    filter: function(arr, filter) {
        const pars = filter.split("=");

        return arr.filter(item => {
            return item[pars[0]] === Number(pars[1]);
        });
    },
    sort: function(arr, sort) {
        const pars = sort.split("=");

        return arr.sort((a, b) => {
            if (pars[1] === "asc") {
                return Number(a[pars[0]]) - Number(b[pars[0]]);
            } else {
                return Number(b[pars[0]]) - Number(a[pars[0]]);
            }
        });
    }
}

function execute(commandList) {
    let res = arr;

    for (let item of commandList) {
        if (typeof list[item.type] === "function") {
            res = list[item.type](res, item.command);
        }
    }

    return res;
}


class StringCommand {

}
