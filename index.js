"use strict";

const pug = require("pug"),
    getMarkdown = require("./lib/getMarkdown");

const build = function (src, dist) {
    const paths = {
        src: {
            root: src,
            readme: `${src}/README.md`,
            meta: `${src}/module.json`,
            content: `${src}/module.md`
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