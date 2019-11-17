# Arc

## Description

This file contains a guide for contributors to follow when opening pull requests.

## Guidelines

This `CONTRIBUTING.md` file will contain a collection of details that help define the project root structure and its requirements.

For details on creating a new package, please review the `README.md` file located in [template package](package/template) directory.

### Common Structure

- **Description** - Contains a brief description of the package.
- **Installation** - Contains installation steps for this package.
- **requirements** - Contains the requirements for using this package.
- **Usage** - Contains usage guides for this package.

### Folder Structure

The following folder structure is required for each plugin to create persistent script handling.

- `config/` - Contains general project configuration files.
- `packages/` - Contains consumable build files.
  - `{package}` - Contains a package and its files and folders.
- `scripts/` - Contains a collection of pure JS scripts to be executed by `npm`.
  - `commands/` - Contains all commands listed in the `package.json` file.
  - `utils/` - Contains general utilities for scripts.
  - `index.js` - Contains the entry file for scripts.

### Package File

The local `package.json` file should include a minimum of what is mentioned in the template structure below. Note that the `scripts` object `key:value` pairs can be extended to utilize other sub-scripts within each script, such as `{script}:{sub-script}`.

The local `package.json` file should contain the following template structure:

```json
{
  "name": "{repository}",
  "version": "{semantic-version}",
  "description": "{short-repository-description}",
  "license": "{license}",
  "homepage": "https://github.com/{user|org}/{repository}/#readme",
  "repository": "https://github.com/{user|org}/{repository}",
  "bugs": "https://github.com/{user|org}/{repository}/issues",
  "contributors": [
    "{contributor}"
  ],
  "packages": {
    "{package}": "./packages/{package}/"
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
