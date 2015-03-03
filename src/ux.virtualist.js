/*
 * To use: <div virtualist="optionsArray" virtualist-itemheight="integer"></div>
 *
 * TODO: list is not updated on option model change (to check- hypothetically should be, at least on scroll)
 * TODO: No resize detection in terms of virtualisation area
 */
(function(angular) {
    'use strict';
    angular.module('virtualist', [])
        .directive('virtualist', function() {
            return {
                restrict: 'A',
                replace: false,
                scope: {
                    virtualist: '='
                },
                link: function(scope, el, attrs) {
                    var itemTpl = el[0],
                        container = itemTpl.parentNode,
                        h = container.offsetHeight,
                        itemH = parseInt(attrs.virtualistItemheight, 0) || 25, //itemTpl.offsetHeight,
                        virtualEl = document.createElement("div"),
                        virtualElH = 0,
                        viewableItems = Math.ceil(h / itemH),
                        holdingEl = document.createElement(container.tagName),
                        chunk = scope.virtualist.slice(0, viewableItems),
                        bound = [],
                        lowTide = 0,
                        highTide = 0,
                        tplEl = document.createElement("div"),
                        tplHtml = "",
                        rExpP = new RegExp("{{::", "g"),
                        complexity = el[0].hasAttribute('virtualist-complex');

                    tplEl.appendChild(itemTpl);
                    tplEl.children[0].removeAttribute('virtualist');
                    tplEl.children[0].removeAttribute('virtualist-itemheight');
                    tplEl.children[0].removeAttribute('virtualist-complex');
                    angular.element(tplEl.children[0]).removeClass('ng-scope ng-binding ng-isolate-scope');
                    // removes blank class designations e.g class=""
                    if (!tplEl.children[0].getAttribute("class")) tplEl.children[0].removeAttribute("class");
                    tplHtml = tplEl.innerHTML;
                    tplHtml = tplHtml.replace(rExpP, "{{");
                    var bindings = tplHtml.split("{{");


                    for (var b = bindings.length; b--;) {
                        if (bindings[b].indexOf("}}") > -1) bound.push(bindings[b].substr(0, bindings[b].indexOf("}}")));
                    }
                    angular.element(holdingEl).css({
                        position: 'absolute',
                        top: 0,
                        width: "100%"
                    });
                    scope.$watch('virtualist', function() {
                        chunkItems();
                    }, complexity);
                    container.appendChild(virtualEl);
                    virtualEl.appendChild(holdingEl);

                    function drawItems() {
                        var htmlStr = "",
                            thisHtml = "";
                        if (itemH * scope.virtualist.length !== virtualElH) {
                            virtualElH = itemH * scope.virtualist.length;
                            angular.element(virtualEl).css({
                                height: virtualElH + 'px',
                                width: "100%"
                            });
                        }
                        var cl=chunk.length;
                        for (var i = 0;i<cl; i++) {
                            thisHtml = tplHtml;
                            for (var s = bound.length; s--;) {
                                thisHtml = thisHtml.replace("{{" + bound[s] + "}}", chunk[i][bound[s]]);
                            }
                            htmlStr += thisHtml;
                        }
                        holdingEl.innerHTML = htmlStr;
                    }
                    fetchItems();

                    function chunkItems() {
                        if(scope.virtualist) {
                            chunk = scope.virtualist.slice(lowTide, highTide);
                        }
                        drawItems();
                    }

                    function fetchItems() {
                        lowTide = Math.floor(container.scrollTop / itemH);
                        highTide = lowTide + viewableItems;
                        chunkItems();
                    }
                    angular.element(container).on('scroll', function() {
                        fetchItems();
                        angular.element(holdingEl).css({
                            top: container.scrollTop + 'px'
                        });
                    });
                }
            };
        });
})(angular);
