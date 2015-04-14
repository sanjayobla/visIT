'use strict';

angular.module('zyngaScroller', [])
			.directive('infiniteCanvas', function($window){
				return {
					restrict: 'EA',
					link: function(scope, el, attrs){
						window.contentWidth = 2000
						window.contentHeight = 2000

						var container = el[0];
						// console.log($(el[0]).find('#content'));
						var content = $(el[0]).find('#content')[0];
						// console.log(content[0].style);
						content.style.width = contentWidth + 'px';
						content.style.height = contentHeight + 'px';
						var clientWidth = 0;
						var clientHeight = 0;

						// Initialize Scroller
						$window.scroller = new Scroller(render, {
							zooming: true
						});
						var rect = container.getBoundingClientRect();
						scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);


						// Reflow handling
						var reflow = function() {
							clientWidth = container.clientWidth;
							clientHeight = container.clientHeight;
							scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
						};

						window.addEventListener("resize", reflow, false);
						reflow();

						if ('ontouchstart' in $window) {

							container.addEventListener("touchstart", function(e) {
								// Don't react if initial down happens on a form element
								if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
									return;
								}

								scroller.doTouchStart(e.touches, e.timeStamp);
								e.preventDefault();
							}, false);

							document.addEventListener("touchmove", function(e) {
								scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
							}, false);

							document.addEventListener("touchend", function(e) {
								scroller.doTouchEnd(e.timeStamp);
							}, false);

							document.addEventListener("touchcancel", function(e) {
								scroller.doTouchEnd(e.timeStamp);
							}, false);

						} else {

							var mousedown = false;

							container.addEventListener("mousedown", function(e) {
								if (e.target.tagName.match(/input|textarea|select/i)) {
									return;
								}
								// console.log(angular.element(e.target));
								if(angular.element(e.target).hasClass('panel-heading') 
									|| angular.element(e.target).hasClass('entity')
									|| angular.element(e.target).hasClass('label')) return;

								scroller.doTouchStart([{
									pageX: e.pageX,
									pageY: e.pageY
								}], e.timeStamp);

								mousedown = true;
							}, false);

							document.addEventListener("mousemove", function(e) {
								if (!mousedown) {
									return;
								}
								
								scroller.doTouchMove([{
									pageX: e.pageX,
									pageY: e.pageY
								}], e.timeStamp);

								mousedown = true;
							}, false);

							document.addEventListener("mouseup", function(e) {
								if (!mousedown) {
									return;
								}
								
								scroller.doTouchEnd(e.timeStamp);

								mousedown = false;
							}, false);

							/*container.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" :  "mousewheel", function(e) {
								if(e.target.className === 'hypotheses-item' || e.target.className === 'popUp') return;
								scroller.doMouseZoom(e.detail ? (e.detail * -120) : e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
							}, false);*/
						}
					}
				}
			})