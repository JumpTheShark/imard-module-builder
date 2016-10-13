#! /usr/bin/env node
/* eslint object-curly-newline: 0 */

"use strict";

const builder = require("../index"),
    path = require("path");

const argnums = {
        SOURCE_DIR: 2,
        DIST_DIR: 3
    },
    paths = new Proxy({
        src: process.argv[argnums.SOURCE_DIR],
        dist: process.argv[argnums.DIST_DIR]
    }, {
        get: (target, name) => {
            try {
                let dir = path.normalize(target[name]);

                // if (!path.isAbsolute(dir)) {
                //     dir = path.join("../", dir);
                // }

                return dir;
            } catch (err) {
                throw new Error("Please, specify valid paths");
            }
        }
    });

builder(paths.src, paths.dist)
    .then( (data) => console.log(data) )
    .catch( (error) => console.log(error) );