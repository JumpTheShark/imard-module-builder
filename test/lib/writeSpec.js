"use strict";

/* eslint no-undef: 0,
 object-curly-newline: 0,
 handle-callback-err: 0,
 no-unused-vars: 0
 no-unused-expressions: 0 */

const chai = require("chai"),
    chaiFs = require("chai-fs"),
    fs = require("fs-promise"),
    path = require("path"),
    writeGen = require("../../lib/write");

const expect = chai.expect;

chai.use(chaiFs);

describe("File writer", () => {
    const dist = {
        root: `${__dirname}/temp/writertest/`,
        index: `${__dirname}/temp/writertest/index.html`,
        readme: `${__dirname}/temp/writertest/module/module-readme.html`,

        body: (id) => `${__dirname}/temp/writertest/module/module-${id}.html`
    };
    let writeAll = null;

    before( () => {
        writeAll = writeGen(dist);
    } );

    it("should load as a module", () => {
        expect(writeGen).not.to.be.an("undefined");
    });
    it("should return an executable writer when given dist configuration", () => {
        expect(typeof writeAll).to.be.equal("function");
    });

    describe("when writing files in dist", () => {
        const files = {
                index: "<h1>INDEX TEST</h1>",
                readme: "<h1>README TEST</h1>",
                module: "<h1>MODULE TEST</h1>"
            },
            TEST_ID = "13375P34K",
            IDX_INDEX = 0,
            IDX_README = 1,
            IDX_BODY = 2;

        let output = null;

        // Clear temp and write new files
        before( (done) => {
            const clearTemp = () => new Promise( (resolve, reject) => {
                    fs.emptyDir(dist.root)
                        .then( () => resolve() )
                        .catch( (err) => reject(err) );
                } ),

                writeFiles = () => new Promise( (resolve, reject) => {
                    writeAll([
                        files.index,
                        files.readme,
                        files.module,
                        TEST_ID
                    ])
                        .then( (data) => resolve(data) )
                        .catch( (err) => reject(err) );
                } );

            clearTemp()
                .then(writeFiles)
                .then( (data) => {
                    output = data;
                    done();
                } )
                .catch( (err) => done(err) );
        } );

        it("should create dist folder", () => {
            expect(dist.root).to.be.a.path();
        });

        it("should create module folder within dist folder", () => {
            expect(path.join(dist.root, "/module")).to.be.a.path();
        });

        it("should create 'index.html' with proper content inside dist root", () => {
            expect(dist.root).not.to.be.empty;
            expect(dist.index).to.be.a.file().and.not.to.be.empty;
            expect(dist.index).to.have.a.content(files.index);
        });

        it("should create 'module-readme.html' with proper content inside dist/module", () => {
            expect(path.join(dist.root, "/module")).not.to.be.empty;
            expect(dist.readme).to.be.a.file().and.not.to.be.empty;
            expect(dist.readme).to.have.a.content(files.readme);
        });

        it("should create 'module-ID.html' with proper content and a proper name inside dist/module", () => {
            expect(dist.body(TEST_ID)).to.be.a.file().and.not.to.be.empty;
            expect(dist.body(TEST_ID)).to.have.a.content(files.module);
        });

        it("should resolve the array of correct paths", () => {
            expect(output).to.be.an("array");
            expect(output[IDX_INDEX]).to.be.equal(dist.index);
            expect(output[IDX_README]).to.be.equal(dist.readme);
            expect(output[IDX_BODY]).to.be.equal(dist.body(TEST_ID));
        });
    });

    describe("when handling errors", () => {
        const wrongdist = {
                root: null,
                index: null,
                readme: null,

                body: (id) => `${__dirname}/temp/writertest/module/module-${id}.html`
            },
            files = {
                index: "<h1>INDEX TEST</h1>",
                readme: "<h1>README TEST</h1>",
                module: "<h1>MODULE TEST</h1>"
            },
            TEST_ID = "13375P34K";

        let writeWrong = null;

        before( (done) => {
            fs.emptyDir(dist.root)
                .then( () => {
                    writeWrong = writeGen(wrongdist);
                    done();
                } )
                .catch( (err) => done(err) );
        } );

        it("should reject with an error when given flawed paths", (done) => {
            writeWrong([
                files.index,
                files.readme,
                files.module,
                TEST_ID
            ])
                .then( (data) => done(data) )
                .catch( (err) => {
                    expect(err).not.to.be.an("undefined");
                    done();
                } );
        });
    });
});