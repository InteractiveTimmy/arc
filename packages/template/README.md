# Template Package

## Guidelines

This `README.md` file will contain a collection of details that help define a package and its requirements.

### Common Structure

- **Description** - Contains a brief description of the package.
- **Installation** - Contains installation steps for this package.
- **requirements** - Contains the requirements for using this package.
- **Usage** - Contains usage guides for this package.

### Folder Structure

The following folder structure is required for each plugin to create persistent script handling.

- `build/` - Contains consumable build files.
- `dist/` - Contains consumable source files.
- `docs/` - Contains built documentation from source files.
  - `core/` - Contains core files and folders.
    - `{index}` - Contains imports/exports for folder.
  - `{plugin}/` - Contains grouped plugin files and folders.
    - `{index}` - Contains imports/exports for folder.
  - `{entry-file}` - Contains entry file for package.
- `samples/` - Contains a collection of sample files and folders.
- `src/` - Contains package source files.
- `test/` - Contains testing suite files and folders.

### Package File

The local `package.json` file should include a minimum of what is mentioned in the template structure below. Note that the `scripts` object `key:value` pairs can be extended to utilize other sub-scripts within each script, such as `{script}:{sub-script}`.

The local `package.json` file should contain the following template structure:

```json
{
  "name": "@{repository}/{package}",
  "version": "{semantic-version}",
  "description": "{short-package-description}",
  "main": "./build/{build-file}",
  "license": "{license}",
  "homepage": "https://github.com/{user|org}/{repository}/tree/master/packages/{package}/#readme",
  "repository": "https://github.com/{user|org}/{repository}/packages/{package}",
  "bugs": "https://github.com/{user|org}/{repository}/issues",
  "contributors": [
    "{contributor}"
  ],
  "entries": {
    "build": "./build/{file-path}",
    "dist": "./build/{file-path}",
    "src": "./src/{file-path}"
  },
  "scripts": {
    "test": "{test call}",
    "compile": "{compile call}",
    "transpile": "{transpile call}",
    "lint": "{lint call}",
    "docs": "{doc build call}",
    "samples": "{samples run call}"
  },
  "dependencies": {
    "{dependency}": "{dependency-version}"
  },
  "devDependencies": {
    "{dependency}": "{dependency-version}"
  },
  "{optional-config}": {
    "{key}": "{value}"
  }
}
```
