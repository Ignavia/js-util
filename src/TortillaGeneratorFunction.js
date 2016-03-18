import _ from "lodash";

export default class TortillaGeneratorFunction {

    static empty = new TortillaGeneratorFunction(function* () {});

    static constant(value) {
        return new TortillaGeneratorFunction(function* () {
            while (true) {
                yield value;
            }
        });
    }

    static range(start = 0, end = Number.POSITIVE_INFINITY, step = 1) {
        return new TortillaGeneratorFunction(function* () {
            for (let i = start; i < end; i += step) {
                yield i;
            }
        });
    }

    constructor(f) {
        this.f = f;
    }

    head(...params) {
        const [value] = this.f(...params);
        return value;
    }

    tail(...params) {
        return this.drop(1, ...params);
    }

    chunk(n, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            const iterator = that.f(...params);
            while (true) {
                const chunk = [];
                for (let i = 0; i < n; i++) {
                    const {value, done} = iterator.next();
                    if (done) break;
                    chunk.push(value);
                }
                if (chunk.length === 0) return;
                yield chunk;
            }
        });
    }

    without(values, ...params) {
        return this.reject(x => values.includes(x), ...params);
    }

    compact(...params) {
        return this.filter(x => x, ...params);
    }

    slice(start, end, ...params) {
        return this.apply(...params).drop(start).take(end - start);
    }

    drop(n, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            const iterator = that.f(...params);
            for (let i = 0; i < n; i++) {
                const {done} = iterator.next();
                if (done) return;
            }
            yield* iterator;
        });
    }

    dropWhile(predicate, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            const iterator = that.f(...params);
            let value, done;
            do {
                ({value, done} = iterator.next());
                if (done) return;
            } while (predicate(value));
            yield value;
            yield* iterator;
        });
    }

    take(n, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            const iterator = that.f(...params);
            for (let i = 0; i < n; i++) {
                const {value, done} = iterator.next();
                if (done) return;
                yield value;
            }
        });
    }

    takeWhile(predicate, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            const iterator = that.f(...params);
            while (true) {
                const {value, done} = iterator.next();
                if (done || !predicate(value)) return;
                yield value;
            }
        });
    }

    filter(predicate, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            for (let value of that.f(...params)) {
                if (predicate(value)) {
                    yield value;
                }
            }
        });
    }

    reject(predicate, ...params) {
        return this.filter(_.negate(predicate), ...params);
    }

    map(iteratee, ...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            for (let value of that.f(...params)) {
                yield iteratee(value);
            }
        });
    }

    flatten(...params) {
        const that = this;
        return new TortillaGeneratorFunction(function* () {
            for (let value of that.f(...params)) {
                yield* _.castArray(value);
            }
        });
    }

    apply(...outer) {
        const that = this;
        return new TortillaGeneratorFunction(function* (...inner) {
            const params = outer.concat(inner);
            yield* that.f(...params);
        });
    }

    [Symbol.iterator]() {
        return this.f();
    }

    /*
    concat
    zip
    unzip
    zipWith
    unzipWith
    */
}