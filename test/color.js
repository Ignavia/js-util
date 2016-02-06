import {expect} from "chai";

import {Color, predefinedColors} from "@ignavia/util";

export default function() {

    /** @test {Color} */
    describe("Color", function () {

        /** @test {Color#fromRGBA} */
        describe("#fromRGBA", function () {
            it("should create a Color object for an RGBA color", function () {
                let r0 = Color.fromRGBA(0, 0, 0, 1); // black
                expect(r0.hex).to.equal(0);
                expect(r0.alpha).to.equal(1);

                let r1 = Color.fromRGBA(255, 0, 0, 1); // red
                expect(r1.hex).to.equal(255 << 16);
                expect(r1.alpha).to.equal(1);

                let r2 = Color.fromRGBA(0, 255, 0, 1); // green
                expect(r2.hex).to.equal(255 << 8);
                expect(r2.alpha).to.equal(1);

                let r3 = Color.fromRGBA(0, 0, 255, 1); // blue
                expect(r3.hex).to.equal(255);
                expect(r3.alpha).to.equal(1);

                let r4 = Color.fromRGBA(0, 0, 0, 0); // transparent
                expect(r4.hex).to.equal(0);
                expect(r4.alpha).to.equal(0);
            });
        });

        describe("#fromHSLA", function () {
            it("should create a Color object for an HSLA color", function () {
                let r0 = Color.fromHSLA(0, 0, 0, 1); // black
                expect(r0.hex).to.equal(0);
                expect(r0.alpha).to.equal(1);

                let r1 = Color.fromHSLA(0, 1, 0.5, 1); // red
                expect(r1.hex).to.equal(255 << 16);
                expect(r1.alpha).to.equal(1);

                let r2 = Color.fromHSLA(120, 1, 0.5, 1); // green
                expect(r2.hex).to.equal(255 << 8);
                expect(r2.alpha).to.equal(1);

                let r3 = Color.fromHSLA(240, 1, 0.5, 1); // blue
                expect(r3.hex).to.equal(255);
                expect(r3.alpha).to.equal(1);

                let r4 = Color.fromHSLA(0, 0, 0, 0); // transparent
                expect(r4.hex).to.equal(0);
                expect(r4.alpha).to.equal(0);
            });
        });

        describe("toRGBA", function () {
            it("should create an RGBA color from a Color object", function () {

                let r0 = predefinedColors.black.toRGBA(); // black
                expect(r0.r).to.equal(0);
                expect(r0.g).to.equal(0);
                expect(r0.b).to.equal(0);
                expect(r0.a).to.equal(1);

                let r1 = predefinedColors.red.toRGBA(); // red
                expect(r1.r).to.equal(255);
                expect(r1.g).to.equal(0);
                expect(r1.b).to.equal(0);
                expect(r1.a).to.equal(1);

                let r2 = predefinedColors.lime.toRGBA(); // green
                expect(r2.r).to.equal(0);
                expect(r2.g).to.equal(255);
                expect(r2.b).to.equal(0);
                expect(r2.a).to.equal(1);

                let r3 = predefinedColors.blue.toRGBA(); // blue
                expect(r3.r).to.equal(0);
                expect(r3.g).to.equal(0);
                expect(r3.b).to.equal(255);
                expect(r3.a).to.equal(1);

                let r4 = predefinedColors.transparent.toRGBA(); // transparent
                expect(r4.r).to.equal(0);
                expect(r4.g).to.equal(0);
                expect(r4.b).to.equal(0);
                expect(r4.a).to.equal(0);
            });
        });

        describe("toHSLA", function () {
            it("should create an HSLA color from a Color object", function () {

                let r0 = predefinedColors.black.toHSLA(); // black
                expect(r0.h).to.equal(0);
                expect(r0.s).to.equal(0);
                expect(r0.l).to.equal(0);
                expect(r0.a).to.equal(1);

                let r1 = predefinedColors.red.toHSLA(); // red
                expect(r1.h).to.equal(0);
                expect(r1.s).to.equal(1);
                expect(r1.l).to.equal(0.5);
                expect(r1.a).to.equal(1);

                let r2 = predefinedColors.lime.toHSLA(); // green
                expect(r2.h).to.equal(120);
                expect(r2.s).to.equal(1);
                expect(r2.l).to.equal(0.5);
                expect(r2.a).to.equal(1);

                let r3 = predefinedColors.blue.toHSLA(); // blue
                expect(r3.h).to.equal(240);
                expect(r3.s).to.equal(1);
                expect(r3.l).to.equal(0.5);
                expect(r3.a).to.equal(1);

                let r4 = predefinedColors.transparent.toHSLA(); // transparent
                expect(r4.h).to.equal(0);
                expect(r4.s).to.equal(0);
                expect(r4.l).to.equal(0);
                expect(r4.a).to.equal(0);
            });
        });
    });
}
