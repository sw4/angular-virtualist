# virtualist
Lightweight angular virtual scrolling / list virtualisation

Draft. Deprecated.

- Reduces $watch count
- Reduces $digest clutter
- Reduces DOM complexity
- Minimizes reflow/repaint
- Performant with one billion (1,000,000) angular bound list items in IE 9+

Only renders the currently visible items in the viewport, to use- where you would normally have a repeating list of items (e.g. ng-repeat) replace:


`<div ng-repeat="option in optionsArray">Name: {{::name}} Value: {{value}}</div>`

With:

`<div ux-virtualist="optionsArray" virtualist-itemheight="integer">Name: {{::name}} Value: {{value}}</div>`


Where `virtualist-itemheight` is the height in pixels of a single item.
