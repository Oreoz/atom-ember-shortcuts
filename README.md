# Atom Ember Shortcuts

[![Version!](https://img.shields.io/apm/v/ember-shortcuts.svg?style=flat-square)](https://atom.io/packages/ember-shortcuts)

## Description
This Atom package is based on the [Ember CLI Helper](https://github.com/apprentus/atom-ember-cli-helper) Atom package,
which is sadly no longer maintained. I only used the shortcuts available in that package so I decided to create my
own and maintain the smaller feature set.

## Installation
If you have the Atom Package Manager installed, simply run `apm install ember-shortcuts`.

## Cheat Sheet
| Keybinding                                          | Action                                                                    |
| :--                                                 | :--                                                                       |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>E</kbd>     | Toggles between JavaScript and Handlebars files.                          |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd>     | Toggles between the controller and route.                                 |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>ENTER</kbd> | Jumps into the first component detected on the active row of your editor. |

## Detailed Behavior
| Current Location | Shortcut                                            | Destination        |
| :--              | :-:                                                 | :--                |
| my-component.js  | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>E</kbd>     | my-component.hbs   |
| my-component.hbs | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>E</kbd>     | my-component.js    |
| my-template.hbs  | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>E</kbd>     | my-controller.js   |
| my-controller.js | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>E</kbd>     | my-template.hbs    |
| my-template.hbs  | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd>     | my-route.js        |
| my-controller.js | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd>     | my-route.hbs       |
| my-route.js      | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd>     | my-controller.hbs  |
| my-template.hbs  | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>ENTER</kbd> | my-component.hbs * |
| my-component.hbs | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>ENTER</kbd> | my-component.hbs * |

_\* Your active editor row must be positioned on my-component's declaration._

## Contributions
Any contribution is more than welcomed. If you plan on introducing a new feature, please open an issue and share your
idea prior to implementing it, it could save you precious time!

## Troubleshooting
If something is not working as expected, simply open an issue and we'll discuss how we'll go about fixing it!
