/*
 * To use: <div ux-virtualist="optionsArray" ux-virtualist-itemheight="integer"></div>
 */
(function (angular){
    'use strict';
    angular.module('ux.virtualist', [])
        .directive('uxVirtualist', function() {
            return {
                restrict: 'A',
                replace:false,
                scope:{
                    uxVirtualist:'='
                },
                link: function (scope, el, attrs, ctrl) {
                    var itemTpl=el[0],
                        container=itemTpl.parentNode,
                        h=container.offsetHeight,
                        itemH = attrs.uxVirtualistItemheight || 25,//itemTpl.offsetHeight,
                        items=scope.uxVirtualist,
                        rows=items.length,
                        virtualEl=document.createElement("div"),
                        viewableItems=Math.ceil(h / itemH),
                        lowTide= 0,
                        highTide=rows,
                        holdingEl=document.createElement("div"),
                        chunk=scope.uxVirtualist.slice(0, viewableItems),
                        tplHtml=itemTpl.innerHTML.replace("::", ""),
                        bindings =  tplHtml.split("{{"),
                        bound=[];
                    for(var b=0;b<bindings.length;b++){
                        if(bindings[b].indexOf("}}")>-1) bound.push(bindings[b].substr(0,bindings[b].indexOf("}}")));
                    }
                    container.removeChild(itemTpl);
                    angular.element(virtualEl).css({
                        height:(itemH*rows)+'px'
                    });
                    angular.element(holdingEl).css({
                        position:'absolute',
                        top:0
                    });
                    container.appendChild(virtualEl);
                    virtualEl.appendChild(holdingEl);
                    function genItems(){
                        var htmlStr="", thisHtml="";
                        for(var i=0;i<chunk.length;i++){
                            thisHtml=tplHtml;
                            for(var s=0;s<bound.length;s++){
                                console.log(scope.uxVirtualist[i]);
                                thisHtml=thisHtml.replace("{{"+bound[s]+"}}", chunk[i][bound[s]]);
                            }
                            htmlStr+="<div>"+thisHtml+"</div>";
                        }
                        holdingEl.innerHTML=htmlStr;
                    }
                    genItems();
                    angular.element(container).on('scroll', function(){
                        lowTide=Math.floor(container.scrollTop / itemH);
                        highTide=lowTide+viewableItems;
                        chunk = scope.uxVirtualist.slice(lowTide, highTide);
                        angular.element(holdingEl).css({
                            top:container.scrollTop+'px'
                        });
                        genItems();
                    });
                }
            };
        });
})(angular);

