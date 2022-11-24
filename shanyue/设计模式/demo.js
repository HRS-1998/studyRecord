class Stuff {
    constructor() {
        this.a = 33;
        this.b = 66;
    }

    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => {
                return {
                    done: i > 1,
                    value: this[i++ === 0 ? "a" : "b"],
                };
            },
        };
    }

    get backwards() {
        let i = 0;
        return {
            next: () => {
                return {
                    done: i > 1,
                    value: this[i++ === 0 ? "b" : "a"],
                };
            },
            [Symbol.iterator]: function () {
                return this;
            },
        };
    }
}

const values = [100, 200, 300];
for (const i in values) {
    console.log(`索引 ${i} 的值 ${values[i]}`);
}

for (const v in values) {
    console.log(`值为 ${v}`);
}

const stuff = new Stuff();
console.log("=====>正常打印<======");
for (const item of stuff) {
    console.log(item);
}
console.log("=====>对调打印<======");
for (const item of stuff.backwards) {
    console.log(item);
}
