"use strict";

const markdown = require("markdown-it"),
    config = require("./mdcfg"),
    fs = require("fs-promise");

const md = markdown(config),

    compileMd = (content) => md.render(content),

    getMarkdown = (pathToMD) => new Promise( (resolve, reject) => {
        fs.readFile(pathToMD, "utf8")
            .then( (content) => resolve( compileMd(content) ) )
            .catch( (err) => reject(err) );
    } );

module.exports = getMarkdown;