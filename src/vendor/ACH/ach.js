(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ACHBar;

ACHBar = function() {
  var chart, color, height, width;
  width = null;
  height = 30;
  color = d3.scale.linear().domain([0, 1, 2]).range(["green", "red", "yellow"]);
  chart = function(selection) {
    return selection.each(function(data) {
      var barCount, bars, div;
      div = d3.select(this);
      div.style({
        height: height + 'px',
        width: width || div.style('width')
      });
      bars = div.selectAll('div.bar').data(data);
      bars.enter().append('div');
      bars.attr('class', 'bar').style({
        width: function(d) {
          return ((d / d3.sum(data)) * 100) + "%";
        },
        display: function(d) {
          if (d === 0) {
            return 'none';
          } else {
            return 'inline-block';
          }
        },
        visibility: function(d) {
          if (d === 0) {
            return 'hidden';
          } else {
            return 'visible';
          }
        },
        'line-height': '30px',
        margin: 0,
        height: height + 'px',
        'background-color': function(d, i) {
          return color(i);
        }
      });
      return barCount = bars.text(function(d) {
        return d;
      }).style('text-align', 'center').style('color', 'black');
    });
  };
  return chart;
};

module.exports = ACHBar;

},{}],2:[function(require,module,exports){
var ACHBar, pnnBox, sliderControl;

pnnBox = require('./pnnBox');

ACHBar = require('./ACHBar');

sliderControl = require('./sliderControl');

window.d3Components || (window.d3Components = {});

d3Components.hypothesisBox = function() {
  var chart, headingButtons, height, hideBody, hideDivStyle, hypothesis, label, number, onSlide, removeEvidenceCb, showDivStyle, title, width;
  width = 400;
  height = 400;
  number = 0;
  title = 'Anand Framed Roger Rabbit';
  hypothesis = null;
  onSlide = function(selection) {};
  hideDivStyle = {
    display: 'none',
    visibility: 'hidden'
  };
  showDivStyle = {
    display: 'block',
    visibility: 'visible'
  };
  headingButtons = {
    chevron: null,
    label: null,
    settings: null,
    lineChart: null
  };
  label = 5;
  hideBody = false;
  removeEvidenceCb = function() {};
  chart = function(selection) {
    return selection.each(function(data) {
      var mainDiv;
      mainDiv = d3.select(this).attr({
        'class': 'panel panel-dark draggable hypothesis',
        'data-box-type': 'hypothesis',
        'data-box-number': number
      }).style({
        width: width + 'px',
        position: 'absolute',
        border: '1px solid black',
        'border-radius': '4px'
      });
      mainDiv.data([data]);
      mainDiv.call(chart.initHeading);
      mainDiv.call(chart.initBody);
      return mainDiv.call(chart.initBottomBar);
    });
  };
  chart.initHeading = function(selection) {
    return selection.each(function(data) {
      var gSliderThreshold, heading, headingTitle, sliderDiv, sliderThreshold;
      heading = selection.select('.panel-heading');
      if (heading.empty()) {
        heading = selection.append('div').attr('class', 'panel-heading').style({
          'background-color': 'black',
          'padding-bottom': 0,
          color: 'white',
          height: "30px"
        });
      }
      headingTitle = heading.selectAll('span.title');
      if (headingTitle.empty()) {
        headingTitle = heading.append('span');
      }
      headingTitle.attr('class', 'title').style({
        width: "200px",
        'white-space': 'nowrap',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        float: 'left'
      });
      headingTitle.text(title);
      heading.on('dblclick', function(d) {
        return console.log('double click', d);
      });
      if (!headingButtons.chevron) {
        headingButtons.chevron = heading.append('i').attr('class', 'fa fa-chevron-up pull-right').style({
          'margin-top': '0px'
        }).on('click', function(d) {
          if (!hideBody) {
            selection.select('.panel-body').style(hideDivStyle);
            d3.select(this).attr('class', 'fa fa-chevron-down pull-right');
            selection.select('.ach-bar').style(showDivStyle);
            return hideBody = true;
          } else {
            selection.select('.panel-body').style(showDivStyle);
            d3.select(this).attr('class', 'fa fa-chevron-up pull-right');
            selection.select('.ach-bar').style(hideDivStyle);
            return hideBody = false;
          }
        });
      }
      sliderDiv = selection.selectAll('svg.slider-div');
      if (sliderDiv.empty()) {
        console.log('empty slider');
        sliderDiv = selection.append('svg').attr('class', 'slider-div');
      }
      sliderDiv.style('height', '30px').style('width', width);
      sliderThreshold = sliderControl().domain([5, 30]).width(width).onSlide(onSlide);
      gSliderThreshold = sliderDiv.selectAll('g.slider-t').data([data.threshold]).enter().append('g').attr('class', 'slider-t');
      gSliderThreshold.attr({
        transform: function() {
          var dx, dy;
          dx = 15;
          dy = 16;
          return "translate(" + [dx, dy] + ")";
        }
      }).call(sliderThreshold);
      if (!headingButtons.label) {
        headingButtons.label = heading.append('span').attr('class', 'label label-danger pull-right').style({
          'margin': '-1px 5px'
        });
      }
      return headingButtons.label.text(function(d) {
        return d.count;
      });
    });
  };
  chart.initBody = function(selection) {
    var body;
    body = selection.select('.panel-body');
    if (body.empty()) {
      body = selection.append('div').attr('class', 'panel-body');
    }
    body.style('padding-top', 0);
    return body.call(chart.initPNNBoxes);
  };
  chart.initPNNBoxes = function(selection) {
    return selection.each(function(data) {
      var negativeBox, negativeDiv, neutralBox, neutralDiv, positiveBox, positiveDiv, sel;
      hypothesis = data.data;
      positiveBox = pnnBox().title('Positive').titleClass('panel-info').parentBox(number).removeEvidenceCb(removeEvidenceCb);
      negativeBox = pnnBox().title('Negative').titleClass('panel-danger').parentBox(number).removeEvidenceCb(removeEvidenceCb);
      neutralBox = pnnBox().title('Neutral').titleClass('panel-warning').parentBox(number).removeEvidenceCb(removeEvidenceCb);
      sel = d3.select(this);
      positiveDiv = sel.select('.pnn.panel-info');
      if (positiveDiv.empty()) {
        positiveDiv = sel.append('div');
      }
      positiveDiv.data([hypothesis.positive.data]).call(positiveBox);
      negativeDiv = sel.select('.pnn.panel-danger');
      if (negativeDiv.empty()) {
        negativeDiv = sel.append('div');
      }
      negativeDiv.data([hypothesis.negative.data]).call(negativeBox);
      neutralDiv = sel.select('.pnn.panel-warning');
      if (neutralDiv.empty()) {
        neutralDiv = sel.append('div');
      }
      return neutralDiv.data([hypothesis.neutral.data]).call(neutralBox);
    });
  };
  chart.initBottomBar = function(selection) {
    return selection.each(function(data) {
      var achBottomBar, bottomBar;
      achBottomBar = ACHBar();
      bottomBar = selection.select('.ach-bar');
      if (bottomBar.empty()) {
        bottomBar = selection.append('div');
      }
      return bottomBar.datum(data.overallWeights).attr('class', 'ach-bar').style(hideDivStyle).call(achBottomBar);
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.hypothesis = function(value) {
    if (!arguments.length) {
      return hypothesis;
    }
    hypothesis = value;
    return chart;
  };
  chart.label = function(value) {
    if (!arguments.length) {
      return label;
    }
    label = value;
    return chart;
  };
  chart.number = function(value) {
    if (!arguments.length) {
      return number;
    }
    number = value;
    return chart;
  };
  chart.removeEvidenceCb = function(accessorFunc) {
    if (!arguments.length) {
      return removeEvidenceCb;
    }
    removeEvidenceCb = accessorFunc;
    return chart;
  };
  chart.onSlide = function(onSliderFunction) {
    if (!arguments.length) {
      return onSlide;
    }
    onSlide = onSliderFunction;
    return chart;
  };
  return chart;
};

module.exports = d3Components.hypothesisBox;

},{"./ACHBar":1,"./pnnBox":3,"./sliderControl":4}],3:[function(require,module,exports){
var pnnBox;

pnnBox = function() {
  var appendPlusMinus, appendTrash, chart, headingButtons, height, label, parentBox, removeEvidenceCb, removeItems, title, titleClass, width;
  width = 200;
  height = 200;
  title = 'Positive';
  titleClass = 'panel-info';
  parentBox = -1;
  headingButtons = {
    chevron: null,
    label: null,
    settings: null,
    lineChart: null
  };
  label = 5;
  removeEvidenceCb = function() {};
  removeItems = function(d, i) {
    return removeEvidenceCb(d, i, title.toLowerCase());
  };
  appendPlusMinus = function(selection) {
    selection.append('i').attr('class', 'fa fa-minus pull-right').style({
      'margin-top': '4px',
      'margin-right': '1em'
    });
    return selection.append('i').attr('class', 'fa fa-plus pull-right').style({
      'margin-top': '4px',
      'margin-right': '2px'
    });
  };
  appendTrash = function(selection) {
    return selection.append('i').attr('class', 'fa fa-trash pull-right').style({
      'margin-top': '4px'
    }).on('click', removeItems);
  };
  chart = function(selection) {
    return selection.each(function(data) {
      var mainDiv;
      mainDiv = d3.select(this).attr({
        'class': function(d) {
          return "pnn panel " + titleClass;
        },
        'data-box-type': 'pnn',
        'data-parent-box': parentBox || 0,
        'data-box-category': title
      }).style({
        'min-width': 100 + '%'
      });
      mainDiv.data([data]);
      mainDiv.call(chart.initHeading);
      return mainDiv.call(chart.initBody);
    });
  };
  chart.initHeading = function(selection) {
    var heading;
    heading = selection.select('.panel-heading');
    if (heading.empty()) {
      heading = selection.append('div').attr('class', 'panel-heading').style({
        'padding-bottom': 0
      });
    }
    return heading.text(title);
  };
  chart.initBody = function(selection) {
    var body;
    body = selection.select('.panel-body');
    if (body.empty()) {
      body = selection.append('div').attr('class', 'panel-body');
    }
    return body.call(chart.initEvidences);
  };
  chart.initEvidences = function(selection) {
    return selection.each(function(data) {
      var evidence, evidenceDiv, evidenceText, trash;
      evidenceDiv = d3.select(this).selectAll('div.evidence').data(data);
      evidence = evidenceDiv.enter().append('div').attr('class', 'evidence').style({
        margin: '5px 0'
      });
      evidenceText = evidence.selectAll('span.evidence-text');
      if (evidenceText.empty()) {
        evidenceText = evidence.append('span').attr('class', 'evidence-text').style({
          width: width + "px",
          'white-space': 'nowrap',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          float: 'left',
          display: 'block'
        });
      }
      evidenceText.text(function(d) {
        return d;
      });
      trash = evidence.selectAll('i.fa-trash');
      if (trash.empty()) {
        trash = evidence.call(appendTrash);
      }
      return evidenceDiv.exit().remove();
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.parentBox = function(value) {
    if (!arguments.length) {
      return parentBox;
    }
    parentBox = value;
    return chart;
  };
  chart.label = function(value) {
    if (!arguments.length) {
      return label;
    }
    label = value;
    return chart;
  };
  chart.titleClass = function(value) {
    if (!arguments.length) {
      return titleClass;
    }
    titleClass = value;
    return chart;
  };
  chart.removeEvidenceCb = function(accessorFunc) {
    if (!arguments.length) {
      return removeEvidenceCb;
    }
    removeEvidenceCb = accessorFunc;
    return chart;
  };
  return chart;
};

module.exports = pnnBox;

},{}],4:[function(require,module,exports){
var sliderControl;

sliderControl = function() {
  var chart, domain, onSlide, width;
  width = 600;
  domain = [0, 100];
  onSlide = function(selection) {};
  chart = function(selection) {
    return selection.each(function(data) {
      var drag, group, handle, line, moveHandle, number, posScale;
      moveHandle = function(d) {
        var cx;
        cx = +d3.select(this).attr('cx') + d3.event.dx;
        number.text(Math.round(posScale.invert(cx)));
        if (0 < cx && cx < width - 100) {
          return d3.select(this).data([posScale.invert(cx)]).attr({
            cx: cx
          }).call(onSlide);
        }
      };
      group = d3.select(this);
      line = group.selectAll('line');
      if (line.empty()) {
        line = group.selectAll('line').data([data]).enter().append('line').call(chart.initLine);
      }
      handle = group.selectAll('circle');
      if (handle.empty()) {
        handle = group.selectAll('circle').data([data]).enter().append('circle').call(chart.initHandle);
      }
      posScale = d3.scale.linear().domain(domain).range([0, width - 100]);
      handle.attr({
        cx: function(d) {
          return posScale(d);
        },
        'class': 'threshold-handle'
      });
      number = group.selectAll('text.threshold-count');
      if (number.empty()) {
        number = group.selectAll('text.threshold-count').data([data]).enter().append('text').attr('class', 'threshold-count');
      }
      number.text(function(d) {
        return d;
      }).attr({
        transform: function() {
          var dx, dy;
          dx = width - 50;
          dy = 6;
          return "translate(" + [dx, dy] + ")";
        }
      });
      drag = d3.behavior.drag().on('drag', moveHandle);
      return handle.call(drag);
    });
  };
  chart.initLine = function(selection) {
    return selection.attr({
      x1: 2,
      x2: width - 4 - 100,
      stroke: '#777',
      'stroke-width': 4,
      'stroke-linecap': 'round'
    });
  };
  chart.initHandle = function(selection) {
    return selection.attr({
      cx: function(d) {
        return width / 2;
      },
      r: 6,
      fill: '#aaa',
      stroke: '#222',
      'stroke-width': 2
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.domain = function(value) {
    if (!arguments.length) {
      return domain;
    }
    domain = value;
    return chart;
  };
  chart.onSlide = function(onSliderFunction) {
    if (!arguments.length) {
      return onSlide;
    }
    onSlide = onSliderFunction;
    return chart;
  };
  return chart;
};

module.exports = sliderControl;

},{}]},{},[2]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.d3Components || (window.d3Components = {});

d3Components.evidenceBox = function() {
  var addPopoutHypothesisList, addToHypothesisCb, chart, evidences, headingButtons, height, hideBody, hideDivStyle, label, layers, number, showDivStyle, title, width;
  width = 250;
  height = 90;
  number = 0;
  title = 'Evidence 1 (110203766537899.txt)';
  layers = {
    mainDiv: null
  };
  hideDivStyle = {
    display: 'none',
    visibility: 'hidden'
  };
  showDivStyle = {
    display: 'block',
    visibility: 'visible'
  };
  evidences = [
    {
      name: 'Anand',
      type: 'label-success'
    }, {
      name: 'GT',
      type: 'label-info'
    }, {
      name: '2011',
      type: 'label-warning'
    }
  ];
  headingButtons = {
    chevron: null,
    label: null,
    add: null
  };
  label = 4;
  hideBody = false;
  addToHypothesisCb = function() {};
  chart = function(selection) {
    return selection.each(function(data) {
      layers.mainDiv = d3.select(this).attr({
        'class': 'panel panel-primary draggable',
        'data-box-type': 'evidence',
        'data-box-number': number
      }).style({
        width: width + 'px',
        position: 'absolute'
      });
      layers.mainDiv.data([data]);
      layers.mainDiv.call(chart.initHeading);
      layers.mainDiv.call(chart.initBody);
      return layers.mainDiv.call(addPopoutHypothesisList, true);
    });
  };
  addPopoutHypothesisList = function(selection, hideList) {
    return selection.each(function(data) {
      var hypotheses, popUp, sel, showHideObj, visibility;
      sel = d3.select(this);
      popUp = sel.select('div.popUp');
      if (popUp.empty()) {
        popUp = sel.append('div').attr('class', 'popUp').style(showDivStyle);
      }
      visibility = popUp.style('visibility');
      showHideObj = visibility === 'visible' ? hideDivStyle : showDivStyle;
      showHideObj = hideList ? hideDivStyle : showHideObj;
      popUp.style({
        position: 'absolute',
        width: '150px',
        height: '200px',
        left: (width + 10) + "px",
        'background-color': 'white',
        border: '1px solid black',
        'overflow-y': 'scroll',
        'border-radius': '4px',
        top: 0
      });
      hypotheses = popUp.selectAll('div.hypotheses-item').data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).enter().append('div').attr('class', 'hypotheses-item').style({
        padding: '5px 1em'
      }).text(function(d) {
        return "Hypothesis " + d;
      }).on('click', function(d, i) {
        return addToHypothesisCb(d, i);
      });
      return popUp.style(showHideObj);
    });
  };
  chart.initHeading = function(selection) {
    return selection.each(function(data) {
      var heading, headingTitle;
      heading = selection.select('.panel-heading');
      if (heading.empty()) {
        heading = selection.append('div').attr('class', 'panel-heading').style({
          'padding-bottom': 0,
          height: "30px"
        });
      }
      headingTitle = heading.selectAll('span.title');
      if (headingTitle.empty()) {
        headingTitle = heading.append('span');
      }
      headingTitle.attr('class', 'title').style({
        width: "150px",
        'white-space': 'nowrap',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        float: 'left'
      });
      headingTitle.text(title);
      if (!headingButtons.chevron) {
        headingButtons.chevron = heading.append('i').attr('class', 'fa fa-chevron-up pull-right').style({
          'margin-top': '0px'
        }).on('click', function(d) {
          if (!hideBody) {
            selection.select('.panel-body').style(hideDivStyle);
            d3.select(this).attr('class', 'fa fa-chevron-down pull-right');
            addPopoutHypothesisList(d3.select(this.parentNode.parentNode), true);
            return hideBody = true;
          } else {
            selection.select('.panel-body').style(showDivStyle);
            d3.select(this).attr('class', 'fa fa-chevron-up pull-right');
            return hideBody = false;
          }
        });
      }
      if (!headingButtons.add) {
        headingButtons.add = heading.append('i').attr('class', 'fa fa-plus pull-right').style({
          'margin-top': '0px'
        }).on('click', function(d) {
          return addPopoutHypothesisList(d3.select(this.parentNode.parentNode));
        });
      }
      if (!headingButtons.label) {
        headingButtons.label = heading.append('span').attr('class', 'label label-danger pull-right').style({
          'margin-top': '-1px'
        });
      }
      return headingButtons.label.text(function(d) {
        return d.count;
      });
    });
  };
  chart.initBody = function(selection) {
    var body;
    body = selection.select('.panel-body');
    if (body.empty()) {
      body = selection.append('div').attr('class', 'panel-body dropzone');
    }
    body.style({
      height: height + 'px',
      'overflow-y': 'scroll'
    });
    return body.call(chart.initEntities);
  };
  chart.initEntities = function(selection) {
    return selection.each(function(data) {
      var entities, entityDiv, entityLabel, sel;
      sel = d3.select(this);
      entities = sel.selectAll('div.entity').data(evidences);
      entityDiv = entities.enter().append('div').attr('class', 'entity inside').style({
        'margin': '5px 0'
      });
      entities.exit().remove();
      entityLabel = entityDiv.select('span.label');
      if (entityLabel.empty()) {
        entityLabel = entityDiv.append('span');
      }
      return entityLabel.attr('class', function(d, i) {
        return "label " + d.type;
      }).style({
        width: 'auto',
        display: 'inline-block'
      }).text(function(d) {
        return d.name;
      });
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.evidences = function(value) {
    if (!arguments.length) {
      return evidences;
    }
    evidences = value;
    return chart;
  };
  chart.label = function(value) {
    if (!arguments.length) {
      return label;
    }
    label = value;
    return chart;
  };
  chart.number = function(value) {
    if (!arguments.length) {
      return number;
    }
    number = value;
    return chart;
  };
  chart.addToHypothesisCb = function(accessorFunc) {
    if (!arguments.length) {
      return addToHypothesisCb;
    }
    addToHypothesisCb = accessorFunc;
    return chart;
  };
  return chart;
};

module.exports = d3Components.evidenceBox;

},{}]},{},[1]);
