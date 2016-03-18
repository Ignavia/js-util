import {expect} from "chai";

import {Iterable} from "../src/util.js";

describe("Iterable", function () {
    beforeEach(function () {
        this.s = Iterable("Hello, world");
    });

    describe("#head", function() {
        it ("should return the first value an iterable yields", function () {
            expect(this.s.head()).to.equal("H");
        });

        it("should allow multiple invocations", function () {
            expect(this.s.head()).to.equal("H");
            expect(this.s.head()).to.equal("H");
        });
    });

    describe("#drop", function () {

    });

    describe("#tail", function () {
        it("should drop the first value of an iterable", function () {

        });

        it("should allow multiple invocations", function () {

        });
    });

    after(function () {
        delete this.s;
    });
});
