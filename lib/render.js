"use strict";

const pug = require("pug");

const templatePaths = {
        index: `${__dirname}/templates/index.pug`,
        readme: `${__dirname}/templates/module-readme.pug`,
        module: `${__dirname}/templates/module.pug`
    },

    compile = (data, template) => new Promise( (resolve, reject) => {
        try {
            resolve( pug.renderFile(templatePaths[template], data) );
        } catch (err) {
            reject(err);
        }
    } ),

    renderAll = ([readme, content, metaJSON]) => new Promise( (resolve, reject) => {
        const data = Object.assign(
            JSON.parse(metaJSON),
            {
                content: content,
                readme: readme
            }),
            compilers = [
                compile(data, "index"),
                compile(data, "readme"),
                compile(data, "module")
            ],

            moduleID = data.id;

        Promise.all(compilers)
            .then( ([indexMarkup, readmeMarkup, moduleMarkup]) =>
                resolve(
                    [indexMarkup,
                    readmeMarkup,
                    moduleMarkup,
                    moduleID]
                ) )
            .catch( (error) => reject(error) );
    } );

module.exports = renderAll;