## 1.0.0 - First Release
:tada:
* NEW: Shortcut for toggling between JavaScript and Handlebars templates
* NEW: Shortcut for toggling between controllers and routes
* NEW: Shortcut for entering a component's template from another component / route template

## 1.1.0 - Addon Support
:tada:
* NEW: It is now possible to use the shortcuts inside an Ember addon project!

:bug:
* BUGFIX: Opening components that are deeper than one level inside the file hierarchy is now working

## 1.1.1 - Additional Behavior
:tada:
* NEW: Adds a new behavior to the <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd> hotkey in order
for it to open the route from the template

## 1.1.2 - Contextual Components
:tada:
* NEW: The shortcut for entering a component's template is now usable for entering contextual
components via either the opening or closing declaration

## 1.2.0 - Generated Test Support
:tada:
* NEW: Shortcut for entering the generated test of the current Ember file

## 1.2.1 - Complex Components
:wrench:
* TWEAK: Components that are placed in custom folders within the `app/components` directory can now be navigated to using the <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>ENTER</kbd> hotkey.

## 2.0.0 - Intentions
:tada:
* NEW: It is now possible to use [intentions](https://github.com/steelbrain/intentions) in order to
navigate within your Ember application.

## 2.0.2 - Quality of Life
:wrench:
* TWEAK: The unit tested navigation will now be applied more broadly -- it'll look for a unit test whenever you're invoking intentions if you're located within the `app` or `addon` directory of an Ember project.

:bug:
* BUGFIX: Components that have numeric values in their names should now properly be recognized.
