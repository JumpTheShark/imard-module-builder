"use strict";

const fs = require("fs-promise");

const writerGen = (dist) =>

    ([index, readme, module, moduleID]) => new Promise( (resolve, reject) => {
        const files = [
            fs.outputFile(dist.index, index),
            fs.outputFile(dist.readme, readme),
            fs.outputFile(dist.body(moduleID), module)
        ];

        Promise.all(files)
            .then( () => resolve([
                dist.index,
                dist.readme,
                dist.body(moduleID)
            ]) )
            .catch( (err) => reject(err) );
    } );

module.exports = writerGen;