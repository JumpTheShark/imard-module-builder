"use strict";

const pug = require("pug"),
    getMarkdown = require("./lib/getMarkdown"),
    path = require("path");

const build = function (src, dist) {
    const paths = {
            src: {
                root: src,
                readme: path.join(src, "/README.md"),
                meta: path.join(src, "/module.json"),
                content: path.join(src, "/module.md")
            },
            dist: {
                root: dist,
                index: `${dist}/index.html`,
                readme: `${dist}/module/module-readme.html`,

                module: (id) => `${dist}/module/module-${id}.html`
            }
        };


};

module.exports = build;