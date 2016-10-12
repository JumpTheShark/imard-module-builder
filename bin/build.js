#! /usr/bin/env node

"use strict";

const builder = require("../index");

const argnums = {
        SOURCE_DIR: 2,
        DIST_DIR: 3
    },
    path = new Proxy({
        src: process.argv[argnums.SOURCE_DIR],
        dist: process.argv[argnums.DIST_DIR]
    }, { get: (target, name) => target[name].replace(/^\./g, process.cwd()) });


builder(path.src, path.dist);