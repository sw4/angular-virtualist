# ux.virtualist
Lightweight angular virtual scrolling / list virtualisation

Only renders the currently visible items in the viewport, to use- where you would normally have a repeating list of items (e.g. ng-repeat) replace:


`<div ng-repeat="option in optionsArray">Name: {{::name}} Value: {{value}}</div>`

With:

`<div ux-virtualist="optionsArray" ux-virtualist-itemheight="integer">Name: {{::name}} Value: {{value}}</div>`


Where `ux-virtualist-itemheight` is the height in pixels of a single item.
