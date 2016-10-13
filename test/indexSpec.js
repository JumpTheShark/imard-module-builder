"use strict";

/* eslint no-undef: 0,
 object-curly-newline: 0,
 handle-callback-err: 0,
 no-unused-vars: 0 */

const builder = require("../index"),
    expect = require("chai").expect;

describe("Main builder", () => {
    const source = `${__dirname}/lib/fixtures`,
        wrongSource = `${__dirname}/lib`,
        dist = `${__dirname}/temp/`,
        expected = {
            content: "<h2>This is a fixture MODULE</h2>\n<p>With a simple paragraph</p>\n",
            readme: "<h2>This is a fixture README</h2>\n<p>With a simple paragraph</p>\n",
            meta: {}
        };

    it("should load as an NPM module", () => {
        expect(builder).not.to.be.an("undefined");
    });

    it("should return parsed contents", (done) => {
        builder(source, null)
            .then((result) => {
                expect(result.content).to.be.equal(expected.content);
                done();
            })
            .catch((err) => done(err));
    });

    it("should return parsed readme", (done) => {
        builder(source, null)
            .then((result) => {
                expect(result.readme).to.be.equal(expected.readme);
                done();
            })
            .catch((err) => done(err));
    });

    it("should reject with error when given invalid source path argument", (done) => {
        builder(null, null)
            .then((result) => done(result))
            .catch((err) => done());
    });

    it("should reject with error when given source path doesn't contain any module files", (done) => {
        builder(wrongSource, null)
            .then((result) => done(result))
            .catch((err) => done());
    });
});