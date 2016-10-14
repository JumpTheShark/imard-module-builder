# IMARD module builder
> A pluggable and easy to use utility for building IMARD modules

**This is still a work-in-progress**
Funcitonality to implement:
- [x] Read source files from the provided directory
- [x] Compile markdown to an HTML
- [x] Compile templates
- [x] Write resulting files to the destination folder
- [x] Error handling
- [ ] Test coverage

This tool works with file structure like one generated with [IMARD module generator](https://github.com/JumpTheShark/generator-imard-module), i.e. you module should contain:

- `README.md` - a readme file written in [GFM](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)
- `content.md` - a body of a module written in IMARD-extended markdown *(full description of syntax is coming relatively soon)*
- `module.json` - a valid JSON file containing module's meta information.

### Using from command line
You can launch the tool from bash using a simple command:
```bash
imard-build <path to module files> <destination parth>
```

Upon a successeful completion of the building process the application will output the list of created files in `stdout`, it will output an error otherwise.

### Using as an importable module
You can import the builder function and use it as a module in your own application:
```javascript
const builder = require("imard-module-builder"),
    source = path.join(__dirname, "module"),
    dest = path.join(__dirname, "dest");

builder(source, dest)
    .then( (createdFilesList) => console.log(createdFilesList) ) // ["${dest}/index.html", "${dest}/module/module-readme.html", "${dest}/module/module-${id}.html"]
    .catch( (error) => console.log(error) );
```

The builder function returns a promise that resolves with a list of newly-created files and rejects with an error.
