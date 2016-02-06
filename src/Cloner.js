import {cloneSym} from "./Cloneable.js";

export default class Cloner {

    constructor() {
        this.recursionLevel = 0;
        this.context = new Map();
    }

    clone(p) {
        let result;

        this.recursionLevel++;
        if (this.isPrimitive(p)) {
            result = p;
        } else if (this.context.has(p)) {
            result = this.context.get(p);
        } else if (this.isDate(p)) {
            result = this.cloneDate(p);
        } else if (this.isRegExp(p)) {
            result = this.cloneRegExp(p);
        } else if (this.isArray(p)) {
            result = this.cloneArray(p);
        } else if (this.isObject(p)) {
            result = this.cloneObject(p);
        } else {
            throw new Error(`${p} cannot be cloned.`);
        }
        this.recursionLevel--;
        this.cleanup();

        return result;
    }

    /**
     * Tests if the given parameter is just a primitive value, i. e. it is not
     * an object or null.
     *
     * @param {*} p
     * The parameter to test.
     *
     * @return {Boolean}
     * If the given parameter is primitive.
     *
     * @private
     */
    isPrimitive(p) {
        return p === null || typeof p !== "object";
    }

    /**
     * Tests if the given parameter is a Date object.
     *
     * @param {*} p
     * The parameter to test.
     *
     * @return {Boolean}
     * If the given parameter is a Date object.
     *
     * @private
     */
    isDate(p) {
        return p instanceof Date;
    }

    /**
     * Clones a Date object
     *
     * @param {Date} date
     * The Date object to clone.
     *
     * @return {Date}
     * A clone of the Date object.
     *
     * @private
     */
    cloneDate(date) {
        let result = new Date(date.getTime());
        this.context.set(date, result);
        return result;
    }

    /**
     * Tests if the given parameter is a RegExp object.
     *
     * @param {*} p
     * The parameter to test.
     *
     * @return {Boolean}
     * If the given parameter is a RegExp object.
     *
     * @private
     */
    isRegExp(p) {
        return p instanceof RegExp;
    }

    /**
     * Clones a RegExp object.
     *
     * @param {RegExp} regExp
     * The RegExp object to clone.
     *
     * @return {RegExp}
     * A clone of the RegExp object.
     *
     * @private
     */
    cloneRegExp(regExp) {
        let result = new RegExp(regExp);
        this.context.set(regExp, result);
        return result;
    }

    /**
     * Tests if the given parameter is an array.
     *
     * @param {*} p
     * The parameter to test.
     *
     * @return {Boolean}
     * If the given parameter is an array.
     *
     * @private
     */
    isArray(p) {
        return Array.isArray(p);
    }

    /**
     * Clones an array.
     *
     * @param {Array} arr
     * The array to clone.
     *
     * @return {Array}
     * A clone of the array.
     *
     * @private
     */
    cloneArray(arr) {
        let result = [];
        this.context.set(arr, result);
        for (let v of arr) {
            result.push(this.cloneChild(v));
        }
        return result;
    }

    /**
     * Tests if the given parameter is an object.
     *
     * @param {*} p
     * The parameter to test.
     *
     * @return {Boolean}
     * If the given parameter is an object.
     *
     * @private
     */
    isObject(p) {
        return p instanceof Object;
    }

    /**
     * Clones an object.
     *
     * @param {Object} obj
     * The object to clone.
     *
     * @return {Object}
     * A clone of the object.
     */
    cloneObject(obj) {
        let result = {};
        this.context.set(obj, result);
        for (var [k, v] of Object.entries(obj)) {
            result[k] = this.cloneChild(v);
        }
        return result;
    }

    /**
     * Clones a value in a container.
     *
     * @param {*} child
     * The value to clone.
     *
     * @return {*}
     * A clone of the value.
     */
    cloneChild(child) {
        return this.isCloneable(child) ? this.cloneCloneable(child) : this.clone(child);
    }

    /**
     * Tests if the given parameter implements the Cloneable interface.
     *
     * @param {*} p
     * The parameter to test.
     *
     * @return {Boolean}
     * If the given parameter is Cloneable.
     */
    isCloneable(p) {
        return typeof p === "object" && typeof p[cloneSym] === "function";
    }

    /**
     * Clones a Cloneable object.
     *
     * @param {Object} cloneable
     * The object to clone.
     *
     * @return {Object}
     * A clone of the object.
     */
    cloneCloneable(cloneable) {
        return cloneable[cloneSym](this);
    }

    cleanup() {
        if (this.recursionLevel === 0) {
            this.context.clear();
        }
    }
}