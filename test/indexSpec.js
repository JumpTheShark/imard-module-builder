"use strict";

/* eslint no-undef: 0,
 object-curly-newline: 0,
 handle-callback-err: 0,
 no-unused-vars: 0 */

const builder = require("../index"),
    expect = require("chai").expect;

describe("Main builder", () => {
    it("should load as an NPM module", () => {
        expect(builder).not.to.be.an("undefined");
    });

    // Deprecated behaviour
    describe.skip("when loading files", () => {
        let gotData = null;
        const source = `${__dirname}/lib/fixtures`,
            dist = `${__dirname}/temp`,
            expected = {
                content: "<h2>This is a fixture MODULE</h2>\n<p>With a simple paragraph</p>\n",
                readme: "<h2>This is a fixture README</h2>\n<p>With a simple paragraph</p>\n",
                meta: {
                    id: "1475772578223",
                    language: "en",
                    title: "Sample module",
                    description: "Sample learning module created to demonstrate the very basic model functionality",
                    created: "Thu Oct 06 2016",
                    revised: "Thu Oct 06 2016",
                    contributors: ["IMARD system"],
                    keywords: ["IMARD", "sample"],
                    disciplines: ["IMARD system", "computer science"],
                    studyObjectives: ["Learn the ways of adaptive learning", "Embrace the power of static generators"],
                    elements: [
                        "https://cdn.rawgit.com/download/polymer-cdn/1.5.0/lib/paper-button/paper-button.html"
                    ]
                }
            };

        before( (done) => {
            builder(source, dist)
                .then( (result) => {
                    gotData = result;
                    done();
                } )
                .catch( (err) => done(err) );
        } );

        it("should return parsed contents", () => {
            expect(gotData.content).to.be.equal(expected.content);
        });

        it("should return parsed readme", () => {
            expect(gotData.readme).to.be.equal(expected.readme);
        });

        it("should return proper meta", () => {
            const actualJSON = JSON.stringify(gotData.meta),
                expectedJSON = JSON.stringify(expected.meta);

            expect(actualJSON).to.be.equal(expectedJSON);
        });
    });

    describe("when handling flawed inputs", () => {
        const wrongSource = `${__dirname}/lib`,
            dist = `${__dirname}/temp`;

        it("should reject with an error when given invalid source path argument", (done) => {
            builder(null, null)
                .then((result) => done(result))
                .catch((err) => done());
        });

        it("should reject with an error when given source path doesn't contain any module files", (done) => {
            builder(wrongSource, dist)
                .then((result) => done(result))
                .catch((err) => done());
        });
    });
});