import _ from "lodash/fp";

import EventManager              from "../EventManager.js";
import {observableExtendedMixin} from "../Observable.js";

import GumpPath from "./GumpPath.js";
import GumpSet  from "./GumpSet.js";

/**
 * Signalizes that a parameter was not supplied.
 *
 * @ignore
 */
const EMPTY = Symbol("default");

/**
 * A data structure consisting of nested maps and sets. It provides easy access
 * to nested properties and monitors its children for any changes.
 */
export default class GumpMap {

    /**
     * Converts the given object to a GumpMap. Nested objects are also
     * transformed into GumpMaps and nested arrays become GumpSets.
     *
     * @param {Object} o
     * The object to convert.
     *
     * @return {GumpMap}
     * The converted object.
     */
    static fromObject(o) {
        const result = new GumpMap({ autoPurgeEmptyContainers: this.autoPurgeEmptyContainers });

        for (let [k, v] of Object.entries(o)) {
            if (_.isArray(v)) {
                result.add(k, new GumpSet(v));
            } else if (_.isPlainObject(v)) {
                result.add(k, GumpMap.fromObject(v));
            } else {
                result.add(k, v);
            }
        }

        return result;
    }

    /**
     * @param {Object} obj
     * The configuration object.
     *
     * @param {Iterable} [obj.initialValues=[]]
     * An iterable object containing the initial values of this map. Each entry
     * in this array is expected to match [path, value], where path is the place
     * where the value should be added.
     *
     * @param {Boolean} [obj.autPurgeEmptyContainers=false]
     * Whether a container should be deleted when it becomes empty after one of
     * its entries was deleted.
     */
    constructor({ initialValues = [], autoPurgeEmptyContainers = false } = {}) {

        /**
         * Stores the size of this map.
         *
         * @type {Number}
         */
        this.size = 0;

        /**
         * Whether a container should be deleted when it becomes empty after one of
         * its entries was deleted.
         *
         * @type {Boolean}
         * @private
         */
        this.autoPurgeEmptyContainers = autoPurgeEmptyContainers;

        /**
         * Stores the values of this map.
         *
         * @type {Map}
         * @private
         */
        this.children = new Map();

        /**
         * Maps from a direct child to the key used to access it.
         *
         * @type {Map}
         * @private
         */
        this.childToKey = new Map();

        /**
         * Handles listeners.
         *
         * @type {EventManager}
         * @private
         */
        this.eventManager = new EventManager();

        /**
         * Bubbles an add event.
         *
         * @type {Function}
         * @private
         */
        this.bubbleAddEvent = (e) => {
            const value = e.data.value;

            if (value instanceof GumpMap || value instanceof GumpSet) {
                this.size += value.size;
            } else {
                this.size++;
            }

            this.bubbleEvent(e, { value });
        };

        /**
         * Bubbles a clear event.
         *
         * @type {Function}
         * @private
         */
        this.bubbleClearEvent = (e) => {
            const deleted = e.data.deleted;
            this.size -= deleted.length;
            this.bubbleEvent(e, { deleted });
        };

        /**
         * Bubbles a delete event.
         *
         * @type {Function}
         * @private
         */
        this.bubbleDeleteEvent = (e) => {
            const value   = e.data.value;
            const deleted = e.data.deleted;
            this.size -= deleted.length;
            this.bubbleEvent(e, { value, deleted });

            if (this.autoPurgeEmptyContainers && e.source.size === 0) {
                const key = this.childToKey.get(e.source);
                this.delete(key);
            }
        };

        // Add initial values
        for (let [path, value] of initialValues) {
            this.add(path, value);
        }
    }

    /**
     * Adds the given value to this map under the given path.
     *
     * @param {*} path
     * Where the value should be added. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     *
     * @param {*} value
     * The value to add.
     */
    add(path, value) {
        path = GumpPath.toGumpPath(path);

        if (!path.isEmpty()) {
            const key           = path.head();
            const remainingPath = path.tail();

            if (remainingPath.isEmpty()) {
                this.addHere(key, value);
            } else {
                this.addDeeper(key, remainingPath, value);
            }
        }

        return this;
    }

    /**
     * Adds a value directly under this map using the given key.
     *
     * @param {*} key
     * Where the value should be added.
     *
     * @param {*} value
     * The value to add.
     *
     * @private
     */
    addHere(key, value) {
        if (this.children.has(key)) {
            this.addHereExisting(key, value);
        } else {
            this.addHereNew(key, value);
        }
    }

    /**
     * Adds the given value to the GumpSet accessible via the given key. If the
     * value under the key is no GumpSet, an error is thrown.
     *
     * @param {*} key
     * The key of the GumpSet.
     *
     * @param {*} value
     * The value to add to the GumpSet.
     *
     * @throws {Error}
     * If the value under the given key is no GumpSet.
     *
     * @private
     */
    addHereExisting(key, value) {
        const nextLevel = this.children.get(key);
        if (nextLevel instanceof GumpSet) {
            nextLevel.add(value);
        } else {
            throw new Error(`Expected a GumpSet, but found ${nextLevel}.`);
        }
    }

    /**
     * Adds the given value to this map under the given key. If it is already
     * an instance of GumpMap or GumpSet the value is used directly, otherwise
     * it is wrapped in a GumpSet.
     *
     * @param {*} key
     * Where the value should be added.
     *
     * @param {*} value
     * The value to add.
     *
     * @emits {Event}
     * If the value is used directly a new event is fired. The source is this
     * map, the type is "add" and the data is an object containing the path to
     * the value and the value itself.
     *
     * @private
     */
    addHereNew(key, value) {
        if (value instanceof GumpMap || value instanceof GumpSet) {
            this.setNextLevel(key, value);
            this.size += value.size;
            this.fireEvent(EventManager.makeEvent({
                source: this,
                type:   "add",
                data:   { path: GumpPath.toGumpPath(key), value }
            }));
        } else {
            const nextLevel = new GumpSet();
            this.setNextLevel(key, nextLevel);
            nextLevel.add(value);
        }
    }

    /**
     * Adds the value to a GumpMap listed under the given key.
     *
     * @param {*} key
     * The GumpMap to add the value to.
     *
     * @param {GumpPath} remainingPath
     * Where in that GumpMap the value should be placed.
     *
     * @param {*} value
     * The value to add.
     *
     * @private
     */
    addDeeper(key, remainingPath, value) {
        if (this.children.has(key)) {
            this.addDeeperExisting(key, remainingPath, value);
        } else {
            this.addDeeperNew(key, remainingPath, value);
        }
    }

    /**
     * Adds the value to the GumpMap accessible via the given key. If the value
     * under this key is no GumpMap, an error is thrown.
     *
     * @param {*} key
     * The key of the GumpMap.
     *
     * @param {GumpPath} remainingPath
     * Where the value should be added in the GumpMap under key.
     *
     * @throw {Error}
     * If the value under key is no GumpMap.
     *
     * @private
     */
    addDeeperExisting(key, remainingPath, value) {
        const nextLevel = this.children.get(key);
        if (nextLevel instanceof GumpMap) {
            nextLevel.add(remainingPath, value);
        } else {
            throw new Error(`Expected a GumpMap, but found ${nextLevel}.`);
        }
    }

    /**
     * Creates a new GumpMap under the given key and add the value at the
     * position specified by remainingPath.
     *
     * @param {*} key
     * The key of the GumpMap.
     *
     * @param {GumpPath} remainingPath
     * Where the value should be added in the GumpMap under key.
     *
     * @param {*} value
     * The value to add.
     *
     * @private
     */
    addDeeperNew(key, remainingPath, value) {
        const nextLevel = new GumpMap({ autoPurgeEmptyContainers: this.autoPurgeEmptyContainers });
        this.setNextLevel(key, nextLevel);
        nextLevel.add(remainingPath, value);
    }

    /**
     * A helper function that adds a GumpSet or GumpMap to this map under the
     * given key.
     *
     * @param {*} key
     * Where it should added.
     *
     * @param {GumpMap|GumpSet} nextLevel
     * What should be added.
     *
     * @private
     */
    setNextLevel(key, nextLevel) {
        this.setupListeners(nextLevel);
        this.children.set(key, nextLevel);
        this.childToKey.set(nextLevel, key);
    }

    /**
     * Empties the container under the given path completely.
     *
     * @param {*} [path=[]]
     * Where to find the container to empty. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     */
    clear(path = []) {
        path = GumpPath.toGumpPath(path);

        if (path.isEmpty()) {
            this.clearHere();
        } else {
            this.clearDeeper(path);
        }
    }

    /**
     * Clears this map.
     *
     * @emits {Event}
     * If this map actually had any entries an event is fired. Its source is
     * this map, the type is "clear" and data is an object. That object has a
     * path property, which is the path from this map to the cleared data
     * structure (it is thus the empty path). It also has another property
     * deleted which lists the deleted entries.
     *
     * @private
     */
    clearHere() {
        if (this.size > 0) {
            const deleted = [...this.entries()];

            for (const v of this.values({resolveMaps: false, resolveSets: false})) {
                this.takeDownListeners(v);
            }

            this.children.clear();
            this.size = 0;

            this.fireEvent(EventManager.makeEvent({
                source: this,
                type:   "clear",
                data:   { path: GumpPath.toGumpPath([]), deleted }
            }));
        }
    }

    /**
     * Clears the container under the given path.
     *
     * @param {GumpPath} path
     * Where to find the container to delete.
     *
     * @private
     */
    clearDeeper(path) {
        const finalLevel = this.get(path);
        if (finalLevel) {
            finalLevel.clear();
        }
    }

    /**
     * Deletes the value under the given path. If no value is given, the
     * complete data structure found under path is removed.
     *
     * @param {*} path
     * Where to find the value or container to delete. It must be understood by
     * the {@link GumpPath.toGumpPath} method.
     *
     * @param {*} [value]
     * The value to delete.
     *
     * @return {Boolean}
     * Whether something was removed.
     */
    delete(path, value = EMPTY) {
        path = GumpPath.toGumpPath(path);

        if (path.isEmpty()) {
            return false;
        }

        const key           = path.head();
        const remainingPath = path.tail();

        if (remainingPath.isEmpty()) {
            return this.deleteHere(key, value);
        } else {
            return this.deleteDeeper(key, remainingPath, value);
        }
    }

    /**
     * Removes the value from the container found under the given key. If no
     * value is given, the complete container is removed.
     *
     * @param {*} key
     * The key of the container.
     *
     * @param {*} value
     * The value to delete.
     *
     * @return {Boolean}
     * Whether something was removed.
     *
     * @private
     */
    deleteHere(key, value = EMPTY) {
        const nextLevel = this.children.get(key);
        if (nextLevel) {
            if (value === EMPTY) {
                return this.deleteHereContainer(key, nextLevel);
            } else if (nextLevel instanceof GumpSet) {
                return nextLevel.delete(value);
            }
        }

        return false;
    }

    /**
     * Removes the container nextLevel that can be under the given key.
     *
     * @param {*} key
     * The key of nextLevel.
     *
     * @param {GumpMap|GumpSet} nextLevel
     * The container to remove.
     *
     * @return {Boolean}
     * Whether the container was successfully removed. The return value
     * should always be true.
     *
     * @emits {Event}
     * The source is this map, the type is "delete" and the data is an object
     * with two properties. The first property path is a GumpPath containing
     * the given key. The second property deleted lists all entries/values of
     * the removed container, depending on whether it was a GumpMap or a
     * GumpSet.
     *
     * @private
     */
    deleteHereContainer(key, nextLevel) {
        const deleted = nextLevel instanceof GumpMap ?
            [...nextLevel.entries()] : [...nextLevel.values()];

        this.takeDownListeners(nextLevel);
        this.size -= deleted.length;
        this.fireEvent(EventManager.makeEvent({
            source: this,
            type:   "delete",
            data:   { path: GumpPath.toGumpPath(key), deleted }
        }));
        return this.children.delete(key);
    }

    /**
     * Tries to delete the given value in the data structure listed under the
     * given key. The location relative to that child is specified by
     * remainingPath.
     *
     * @param {*} key
     * The key of the child.
     *
     * @param {GumpPath} remainingPath
     * The path relative to the child.
     *
     * @param {*} [value]
     * The value to delete. If it is left empty, the whole data structure is
     * removed.
     *
     * @return {Boolean}
     * Whether something was deleted.
     *
     * @private
     */
    deleteDeeper(key, remainingPath, value = EMPTY) {
        let nextLevel = this.children.get(key);
        if (nextLevel instanceof GumpMap) {
            return nextLevel.delete(remainingPath, value);
        }

        return false;
    }

    /**
     * Deletes all references to empty GumpMaps or GumpSets in this map.
     */
    purgeEmptyContainers() {
        for (const [path, v] of this.entries({resolveMaps: false, resolveSets: false})) {
            if (v.size === 0) {
                this.delete(path);
            } else if (v instanceof GumpMap) {
                v.purgeEmptyContainers();
            }
        }
    }

    /**
     * Returns the value under the given path or undefined if the path leads nowhere.
     *
     * @param {*} path
     * Where to look for the value. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     *
     * @return {*}
     * The found value.
     */
    get(path) {
        path = GumpPath.toGumpPath(path);

        if (path.isEmpty()) {
            return this;
        }

        const key           = path.head();
        const remainingPath = path.tail();
        const nextLevel     = this.children.get(key);

        if (remainingPath.isEmpty()) {
            return nextLevel;
        } else if (nextLevel instanceof GumpMap) {
            return nextLevel.get(remainingPath);
        } else {
            return undefined;
        }
    }

    /**
     * Tests if the given value can be found under the given path. If no value
     * is specified the method just tests if the path leads somewhere.
     *
     * @param {*} path
     * Where to look for the value. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     *
     * @param {*} [value]
     * The value to test.
     */
    has(path, value = EMPTY) {
        path = GumpPath.toGumpPath(path);

        const finalLevel = this.get(path);
        if (value === EMPTY) {
            return finalLevel !== undefined;
        } else if (finalLevel instanceof GumpSet) {
            return finalLevel.has(value);
        } else {
            return false;
        }
    }

    /**
     * Yields all [path, value] entries of this GumpMap. The parameters control
     * what is considered a value.
     *
     * @param {Object} conf
     * The configuration object.
     *
     * @param {Boolean} [conf.resolveMaps=true]
     * If this parameter is true, nested GumpMaps are also traversed. Otherwise
     * they are regarded as basic values.
     *
     * @param {Boolean} [conf.resolveSets=true]
     * If this parameter is true, GumpSets are split into the values they
     * contain. Otherwise they are viewed as basic values.
     */
    * entries({resolveMaps = true, resolveSets = true} = {}) {
        for (let [k, v] of this.children.entries()) {
            if (resolveMaps && v instanceof GumpMap) {
                yield* this.entriesResolveMap(k, v, {resolveMaps, resolveSets});
            } else if (resolveSets && v instanceof GumpSet) {
                yield* this.entriesResolveSet(k, v);
            } else {
                yield [GumpPath.toGumpPath(k), v];
            }
        }
    }

    /**
     * Yields all entries of the given map. They paths are prepended by the
     * given key so they are relative to this map.
     *
     * @param {*} key
     * The key of the GumpMap.
     *
     * @param {GumpMap} map
     * The GumpMap to traverse.
     *
     * @param {Object} conf
     * The configuration object.
     *
     * @private
     */
    * entriesResolveMap(key, map, conf) {
        for (let [tail, primitive] of map.entries(conf)) {
            yield [tail.prepend(key), primitive];
        }
    }

    /**
     * Loops over all values of the given set and returns [key, value] entries.
     *
     * @param {*} key
     * The key of the given GumpSet.
     *
     * @param {GumpSet} set
     * The GumpSet to resolve.
     *
     * @private
     */
    * entriesResolveSet(key, set) {
        for (let primitive of set.values()) {
            yield [GumpPath.toGumpPath(key), primitive];
        }
    }

    /**
     * Yields all keys of the top-level map.
     */
    keys() {
        return this.children.keys();
    }

    /**
     * Yields all paths of this map.
     *
     * @param {Boolean} [resolveMaps=true]
     * If this parameter is true, nested GumpMaps are also traversed and this
     * method yields the paths to the basic values. Otherwise only one level is
     * resolved and this method acts more like the keys method on normal maps.
     */
    * paths(resolveMaps = true) {
        for (let [k, v] of this.children.entries()) {
            if (resolveMaps && v instanceof GumpMap) {
                yield* this.pathsResolveMap(k, v);
            } else {
                yield GumpPath.toGumpPath(k);
            }
        }
    }

    /**
     * Yields all paths to values of the given map. The given key is prepended
     * to each one so they are relative to this GumpMap.
     *
     * @param {*} key
     * The key of the given GumpMap.
     *
     * @param {GumpMap} map
     * The GumpMap to resolve.
     *
     * @private
     */
    * pathsResolveMap(key, map) {
        for (let tail of map.paths(true)) {
            yield tail.prepend(key);
        }
    }

    /**
     * Yields all values of this map. The parameters configure what is
     * considered a value.
     *
     * @param {Object} [conf={}]
     * The configuration object.
     *
     * @param {Boolean} [conf.resolveMaps=true]
     * If this parameter is true, the values method of nested GumpMaps is used
     * to retrieve their values. Otherwise they are regarded as basic values.
     *
     * @param {Boolean} [conf.resolveSets=true]
     * If this parameter is true, the values method of nested GumpSets is used
     * to retrieve their values. Otherwise they are regarded as basic values.
     */
    * values({resolveMaps = true, resolveSets = true} = {}) {
        for (let v of this.children.values()) {
            if (resolveMaps && v instanceof GumpMap) {
                yield* v.values({resolveMaps, resolveSets});
            } else if (resolveSets && v instanceof GumpSet) {
                yield* v.values();
            } else {
                yield v;
            }
        }
    }

    /**
     * Yields all path-value-pairs in the map. Nested GumpMaps and GumpSets are
     * resolved.
     */
    [Symbol.iterator]() {
        return this.entries();
    }

    /**
     * Replaces the given oldValue with the newValue. This change occurs at the
     * position specified by path.
     *
     * @param {*} newValue
     * The new value.
     *
     * @param {*} path
     * The location of the value. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     *
     * @param {*} [oldValue]
     * The old value.
     *
     * @return {GumpMap}
     * This map to make the method chainable.
     */
    updateWithLiteral(newValue, path, oldValue = EMPTY) {
        path = GumpPath.toGumpPath(path);

        if (this.delete(path, oldValue)) {
            this.add(path, newValue);
        }

        return this;
    }

    /**
     * Replaces the given value with the result of calling f on that value.
     * This change occurs at the position specified by path.
     *
     * @param {Function} f
     * The update function.
     *
     * @param {*} path
     * The location of the value. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     *
     * @param {*} value
     * The value to update.
     *
     * @return {GumpMap}
     * This map to make the method chainable.
     */
    updateWithFunction(f, path, value) {
        path = GumpPath.toGumpPath(path);

        return this.updateWithLiteral(f(value), path, value);
    }

    /**
     * Sets the value at the given location. If the entry exists already it is
     * replaced, otherwise a new entry is created.
     *
     * @param {*} path
     * Where to place the value. It must be understood by the
     * {@link GumpPath.toGumpPath} method.
     *
     * @param {*} value
     * The value of the new entry.
     *
     * @return {GumpMap}
     * This map to make the method chainable.
     */
    set(path, value) {
        path = GumpPath.toGumpPath(path);

        this.delete(path);
        this.add(path, value);

        return this;
    }

    /**
     * Adds listeners to the given object.
     *
     * @param {Observable} obj
     * The object to add the listeners to.
     *
     * @private
     */
    setupListeners(obj) {
        obj.addListener(this.bubbleAddEvent, "add");
        obj.addListener(this.bubbleClearEvent, "clear");
        obj.addListener(this.bubbleDeleteEvent, "delete");
    }

    /**
     * Removes listeners from the given object.
     *
     * @param {Observable} obj
     * The object to remove the listeners from.
     *
     * @private
     */
    takeDownListeners(obj) {
        obj.removeListener(this.bubbleAddEvent);
        obj.removeListener(this.bubbleClearEvent);
        obj.removeListener(this.bubbleDeleteEvent);
    }

    /**
     * The function used to handle events emitted by children of this map.
     *
     * @type {Function}
     * @private
     */
    bubbleEvent(e, data) {
        const key  = this.childToKey.get(e.source);
        const path = e.data.path ? e.data.path.prepend(key) : GumpPath.toGumpPath(key);
        this.fireEvent(EventManager.makeEvent({
            source: this,
            type:   e.type,
            data:   { path, ...data}
        }));
    };
}

// Make GumpMap observable
Object.assign(GumpMap.prototype, observableExtendedMixin);
