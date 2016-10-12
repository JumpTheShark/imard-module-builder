"use strict";

/* eslint no-undef: 0
 object-curly-newline: 0 */

const builder = require("../index"),
    expect = require("chai").expect;

describe("Main builder tests", () => {
    it("should load as an NPM module", () => {
        expect(builder).not.to.be.an("undefined");
    });
});