# Tymfony

A symfony-like `TypeScript` framework designed around `express` to make the
experience of creating `node` based back-end solutions easier.

## Proof of concept

The final idea would be that you install this package in your app and, along
with a global binary, you can create a minimalistic app that loads a
default controller and template. You could then go and install other
`tymfony` packages that add files to config and the `/types/config` (TBD) 
directory.

> The final aim of this project is that the`framework` directory would instead
> live inside `node_modules` and that you can have a small script `main.js` to
> start the server added by a `postinstall` script.

## How to add pages

You can add classes derived from the `AbstractController` class (or any
class for that matter) inside the `controllers` directory and `tymfony` will
automatically scan it and add them to the `express` route system allowing
you to work on a one-file-per-route basis and getting some tools of 
a symfony-like framework.

You can then add services inside the `services` dir, and entities in the
`entities` or `model` dir.

## Dependency Injection

There will be a container available globally with the different packages
installed on `tymfony` as we move to a better way of figuring out dependency
injection.

### Installing a hypothetical package

- You run `npm i` on some package named `@tymfony/package`.
- The package installs itself in `node_modules`
- There is a `postinstall` script that copies some config files to `config`
- The `postinstall` script also adds files to a `config_types` (TBD) dir and
modifies the general `config.d.ts` that allows new patterns in the 
configuration general file of `tymfony`.
- You start importing classes or using this package in your app as you create
controllers, services, entities and models.
