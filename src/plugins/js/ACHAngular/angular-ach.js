'use strict';

angular.module('achAngular', [])
			.directive('hypothesisBox', function(){
				return {
					restrict: 'EA',
					priority: 0,
					// scope: {
					// 	data: "=",
					// 	// callback: "&"
					// },
					link: function(scope, el, attrs){
						var hBox = d3Components.hypothesisBox()
													.number(+attrs.hypothesisBox)
													.title(scope.hypothesis.title)
													.onSlide(scope.onSlide)
													.removeEvidenceCb(scope.removeEvidence);
						// console.log(d3.selectAll(el));
						scope.$watch('hypothesis', function(o, n){
							// console.log(o, n);
							var box = d3.selectAll(el).data([scope.hypothesis]).call(hBox);
						}, true);
					}
				}
			})
			.directive('evidenceBox', function(){
				return {
					restrict: 'EA',
					link: function(scope, el, attrs){
						var eBox = d3Components.evidenceBox()
												.number(+attrs.evidenceBox)
												.evidences(scope.evidence.data)
												.title(scope.evidence.title)
												.addToHypothesisCb(scope.addToHypothesis);

						// var box = d3.selectAll(el).call(eBox);
						scope.$watch('evidence', function(o, n){
							// console.log(o, n);
							var box = d3.selectAll(el).data([scope.evidence]).call(eBox);
						}, true);

						function dragMoveListener (event) {
					    var target = event.target,
					        // keep the dragged position in the data-x/data-y attributes
					        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
					        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

					    // translate the element
					    target.style.webkitTransform =
					    target.style.transform =
					      'translate(' + x + 'px, ' + y + 'px)';

					    // update the posiion attributes
					    target.setAttribute('data-x', x);
					    target.setAttribute('data-y', y);
					  }
						var entityDrag = interact('.entity > .label')
														  .draggable({
														    // enable inertial throwing
														    inertia: true,
														    context: el,
														    // keep the element within the area of it's parent
														    restrict: {
														      restriction: '.panel-body',
														      endOnly: true,
														      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
														    },

														    // call this function on every dragmove event
														    onmove: dragMoveListener,
														    // call this function on every dragend event
														    onend: function (event) {
														      var textEl = event.target.querySelector('p');

														      textEl && (textEl.textContent =
														        'moved a distance of '
														        + (Math.sqrt(event.dx * event.dx +
														                     event.dy * event.dy)|0) + 'px');
														    }
														  });
					}
				}
			})
			.directive('interact', function(){
				return {
					restrict: 'A',
					priority: 10,
					link: function(scope, el, attrs){
						// if(attrs.id !== 'yes-drop'){
						var drag = interact(el[0]).draggable({
						    inertia: true,
						    restrict: {
						      restriction: 'parent',
						      endOnly: true,
						      elementRect: {
						        top: 0,
						        left: 0,
						        bottom: 1,
						        right: 1
						      }
						    },
						    onmove: function(event) {
						      var target, translateFactor, x, y;
						      target = event.target;
						      translateFactor = 1;
						      if (scroller && scroller.__zoomLevel < 1) {
						        translateFactor = 1.5;
						      }
						      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx * translateFactor;
						      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy * translateFactor;
						      target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
						      target.setAttribute('data-x', x);
						      target.setAttribute('data-y', y);
						    },
						    onend: function(event) {
						      var textEl;
						      textEl = event.target.querySelector('p');
						      return textEl && (textEl.textContent = 'moved a distance of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + 'px');
						    }
						  });
					// }
					// console.log(el.hasClass('entity'));
						if(!el.hasClass('entity')){
							drag.allowFrom('.panel-heading').on('dragstart', function(event) {
						    var base, base1;
						    // console.log(event);
						    event.target.style.zIndex = 999;
						    (base = event.target).originalPosX || (base.originalPosX = event.pageX);
						    return (base1 = event.target).originalPosY || (base1.originalPosY = event.pageY);
						  });
						}
						else {
							drag.on('dragstart', function(event) {
						    var base, base1;
						    // console.log(event);
						    event.target.style.zIndex = 999;
						    (base = event.target).originalPosX || (base.originalPosX = event.pageX);
						    return (base1 = event.target).originalPosY || (base1.originalPosY = event.pageY);
						  });
						}
						drag.on('dragend', function(event){event.target.style.zIndex--;})

						if(attrs.hypothesisBox){
							console.log(scope);
							interact("[data-box-type='pnn']").dropzone({
							    accept: '[data-box-type="evidence"]',
							    overlap: 'pointer',
							    context: el,
							    ondropactivate: function(event) {
							      return event.target.classList.add('drop-active');
							    },
							    ondragenter: function(event) {
							      var draggableElement, dropzoneElement;
							      draggableElement = event.relatedTarget;
							      dropzoneElement = event.target;
							      dropzoneElement.classList.add('drop-target');
							      return draggableElement.classList.add('can-drop');
							    },
							    ondragleave: function(event) {
							      // console.log('left');
							      event.target.classList.remove('drop-target');
							      return event.relatedTarget.classList.remove('can-drop');
							    },
							    ondrop: function(event) {
							      var box, data, x, y, zoom;
							      // event.target.classList.add(event.relatedTarget.getAttribute('entity-name'));
							      // event.relatedTarget.classList.add('Dropped');
							      // box = d3.select(event.target).selectAll('div.evidence');
							      // data = box.data();
							      // data.push('Evidence 20');
							      // console.log(box, data);
							      // console.log(event.interaction);
							      x = event.interaction.startCoords.client.x - event.relatedTarget.originalPosX;
							      y = event.interaction.startCoords.client.y - event.relatedTarget.originalPosY;
							      zoom = scroller.getValues().zoom;
							      scroller.zoomTo(1);
							      event.relatedTarget.style.webkitTransform = event.relatedTarget.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
							      scroller.zoomTo(zoom);
							      event.relatedTarget.setAttribute('data-x', x);
							      event.relatedTarget.setAttribute('data-y', y);
							      var eviScope = angular.element(event.relatedTarget).scope();
							      // console.log(eviScope);
							      scope.addEvidence(eviScope.evidence, event.target.getAttribute('data-box-category').toLowerCase());
							      // console.log(scope);
							      // return alert("Dropped " + (event.relatedTarget.getAttribute('data-box-type')) + " in " + (event.target.getAttribute('data-box-category')) + " under Hypothesis" + (event.target.getAttribute('data-parent-box')));
							    },
							    ondropdeactivate: function(event) {
							      event.target.classList.remove('drop-active');
							      return event.target.classList.remove('drop-target');
							    }
							  });
							}
							if(attrs.evidenceBox){
								// console.log(attrs.evidenceBox)
								interact(el[0]).dropzone({
								    accept: '.entity.outside',
								    overlap: 'pointer',
								    ondropactivate: function(event) {
								      return event.target.classList.add('drop-active');
								    },
								    ondragenter: function(event) {
								      var draggableElement, dropzoneElement;
								      draggableElement = event.relatedTarget;
								      dropzoneElement = event.target;
								      dropzoneElement.classList.add('drop-target');
								      return draggableElement.classList.add('can-drop');
								    },
								    ondragleave: function(event) {
								      // console.log('left');
								      event.target.classList.remove('drop-target');
								      return event.relatedTarget.classList.remove('can-drop');
								    },
								    ondrop: function(event) {
								      var x, y;
								      // event.target.classList.add(event.relatedTarget.getAttribute('entity-name'));
								      // event.relatedTarget.classList.add('Dropped');
								      x = event.interaction.startCoords.client.x - event.relatedTarget.originalPosX;
								      y = event.interaction.startCoords.client.y - event.relatedTarget.originalPosY;
								      // console.log(event.interaction.startCoords)
								      event.relatedTarget.style.webkitTransform = event.relatedTarget.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
								      event.relatedTarget.setAttribute('data-x', x);
								      event.relatedTarget.setAttribute('data-y', y);
								      var entityScope = angular.element(event.relatedTarget).scope();
								      // console.log('entity scope', entityScope);
								      scope.addEntity(entityScope.entity);
								      // alert("added " + (event.relatedTarget.getAttribute('entity-name')));
								      // return console.log(event);
								    },
								    ondropdeactivate: function(event) {
								      event.target.classList.remove('drop-active');
								      return event.target.classList.remove('drop-target');
								    }
								  });
							}
					}
				}
			});