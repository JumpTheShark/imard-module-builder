"use strict";

/* eslint no-undef: 0,
 object-curly-newline: 0,
 handle-callback-err: 0,
 no-unused-vars: 0 */

const expect = require("chai").expect,
    renderAll = require("../../lib/render");

describe("Template renderer", () => {
    it("should load as a module", () => {
        expect(renderAll).not.to.be.an("undefined");
    });

    describe("when rendering files", () => {
        const validData = {
                readme: "<h1>An example README</h1>",
                module: "<h1>An example module</h1>",
                meta: {
                    id: "1337",
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
            },
            compiledData = {
                index: null,
                readme: null,
                module: null,
                ID: null
            };

        before( (done) => {
            renderAll([
                validData.readme,
                validData.module,
                JSON.stringify(validData.meta)
            ])
                .then( ([indexMarkup, readmeMarkup, moduleMarkup, moduleID]) => {
                    compiledData.index = indexMarkup;
                    compiledData.readme = readmeMarkup;
                    compiledData.module = moduleMarkup;
                    compiledData.ID = moduleID;

                    done();
                } )
                .catch( (err) => done(err) );
        } );

        it("shoud render HTMLs with proper data in them", () => {
            expect(compiledData.readme).to.contain(validData.readme);
            expect(compiledData.module).to.contain(validData.module);
        });

        it("should resolve correct module ID", () => {
            expect(compiledData.ID).to.be.equal(validData.meta.id);
        });
    });

    describe("when handling errors", () => {
        const invalidData = {
            readme: "<h1>An example README</h1>",
            module: "<h1>An example module</h1>",
            meta: {
                // id: "1337",
                language: "en",
                // title: "Sample module",
                description: "Sample learning module created to demonstrate the very basic model functionality",
                created: "Thu Oct 06 2016",
                revised: "Thu Oct 06 2016",
                contributors: ["IMARD system"],
                keywords: ["IMARD", "sample"],
                disciplines: ["IMARD system", "computer science"],
                studyObjectives: ["Learn the ways of adaptive learning", "Embrace the power of static generators"],
                // elements: [
                //     "https://cdn.rawgit.com/download/polymer-cdn/1.5.0/lib/paper-button/paper-button.html"
                // ]
            }
            };

        it("should reject with an error when given a set of invalid data", (done) => {
            renderAll([
                invalidData.readme,
                invalidData.module,
                JSON.stringify(invalidData.meta)
            ])
                .then( (data) => done(data) )
                .catch( (err) => {
                    expect(err).not.to.be.an("undefined");
                    done();
                } );
        });
    });
});