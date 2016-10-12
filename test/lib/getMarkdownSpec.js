"use strict";

/* eslint no-undef: 0
 object-curly-newline: 0 */

const getMarkDown = require("../../lib/getMarkdown"),
    expect = require("chai").expect;

describe("Markdown Getter", () => {
    const fixtures = {
            README: `${__dirname}/fixtures/README.md`,
        },
        expected = {
            readme: "<h2>This is a fixture README</h2>\n<p>With a simple paragraph</p>\n",
        };

    it("should load", () => {
        expect(getMarkDown).not.to.be.an("undefined");
    });

    it("should load and convert markdown files to HTML", (done) => {
        getMarkDown(fixtures.README)
            .then((content) => {
                expect(content).to.be.equal(expected.readme);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});