"use strict";

const pug = require("pug"),
    getMarkdown = require("./lib/getMarkdown"),
    path = require("path");

const build = function (src, dist) {
    let paths = {},
        readmePromise = null,
        contentPromise = null;

    return new Promise( (resolve, reject) => {
        try {
            paths = {
                src: {
                    root: src,
                    readme: path.join(src, "/README.md"),
                    meta: path.join(src, "/module.json"),
                    content: path.join(src, "/module.md")
                },
                dist: {
                    root: dist,
                    index: path.join(dist, "/index.html"),
                    readme: path.join(dist, "/module/module-readme.html"),

                    module: (id) => path.join(dist, `/module/module-${id}.html`)
                }
            };
        } catch (err) {
            reject(err);
        }

        readmePromise = getMarkdown(paths.src.readme);
        contentPromise = getMarkdown(paths.src.content);

        Promise.all( [readmePromise, contentPromise] )
            .then(( [readme, content] ) => {
                resolve({
                    readme: readme,
                    content: content
                });
            })
            .catch( (err) => reject(err) );
    } );

};

module.exports = build;