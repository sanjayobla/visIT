angular.module("inspinia").run(["$templateCache", function($templateCache) {$templateCache.put("app/main/main.html","<div class=\"wrapper wrapper-content animated fadeInRight\"><div class=\"row\"><div class=\"col-xs-6 col-md-3 col-lg-4\"><div ng-include=\"\'components/side_panel/side_panel.html\'\"></div></div><div class=\"col-xs-12 col-md-9 col-lg-8\"><div ng-include=\"\'components/main_panel/main_panel.html\'\"></div></div></div><div class=\"row\"><document-component></document-component></div></div>");
$templateCache.put("app/minor/minor.html","<div class=\"wrapper wrapper-content animated fadeInRight\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"text-center m-t-lg\"><h1>Simple example of second view</h1><small>Configure in app.js as index.minor state.</small></div></div></div></div>");
$templateCache.put("components/common/content.html","<div id=\"wrapper\" class=\"top-navigation\"><div id=\"page-wrapper\" class=\"gray-bg {{$state.current.name}}\"><div ng-include=\"\'components/common/top_navbar_fixed.html\'\"></div><div ui-view=\"\"></div></div></div>");
$templateCache.put("components/common/footer.html","<div class=\"footer\"><div class=\"pull-right\">10GB of <strong>250GB</strong> Free.</div><div><strong>Copyright</strong> Example Company &copy; 2014-2015</div></div>");
$templateCache.put("components/common/ibox_tools.html","<div class=\"ibox-tools dropdown\" dropdown=\"\"><a ng-click=\"showhide()\"><i class=\"fa fa-chevron-up\"></i></a> <a class=\"dropdown-toggle\" href=\"\" dropdown-toggle=\"\"><i class=\"fa fa-wrench\"></i></a><ul class=\"dropdown-menu dropdown-user\"><li><a href=\"\">Config option 1</a></li><li><a href=\"\">Config option 2</a></li></ul><a ng-click=\"closebox()\"><i class=\"fa fa-times\"></i></a></div>");
$templateCache.put("components/common/navigation.html","<nav class=\"navbar-default navbar-static-side\" role=\"navigation\"><div class=\"sidebar-collapse\"><ul side-navigation=\"\" class=\"nav\" id=\"side-menu\"><li class=\"nav-header\"><div class=\"dropdown profile-element\" dropdown=\"\"><a class=\"dropdown-toggle\" dropdown-toggle=\"\" href=\"\"><span class=\"clear\"><span class=\"block m-t-xs\"><strong class=\"font-bold\">{{main.userName}}</strong></span> <span class=\"text-muted text-xs block\">Example menu<b class=\"caret\"></b></span></span></a><ul class=\"dropdown-menu animated fadeInRight m-t-xs\"><li><a href=\"\">Logout</a></li></ul></div><div class=\"logo-element\">IN+</div></li><li ui-sref-active=\"active\"><a ui-sref=\"index.main\"><i class=\"fa fa-laptop\"></i> <span class=\"nav-label\">Main page</span></a></li><li ui-sref-active=\"active\"><a ui-sref=\"index.minor\"><i class=\"fa fa-desktop\"></i> <span class=\"nav-label\">Minor page</span></a></li></ul></div></nav>");
$templateCache.put("components/common/top_navbar_fixed.html","<div class=\"row border-bottom white-bg ng-scope\"><nav class=\"navbar navbar-static-top\" role=\"navigation\"><div class=\"navbar-header\"><button aria-controls=\"navbar\" aria-expanded=\"false\" data-target=\"#navbar\" data-toggle=\"collapse\" class=\"navbar-toggle collapsed\" type=\"button\"><i class=\"fa fa-reorder\"></i></button> <a href=\"#\" class=\"navbar-brand\"><span style=\"font-weight:bold;\">VIZ</span>IT</a></div><div class=\"navbar-collapse collapse\" id=\"navbar\"><ul class=\"nav navbar-nav\"><li class=\"dropdown\" dropdown=\"\"><a class=\"dropdown-toggle\" href=\"\" dropdown-toggle=\"\" aria-haspopup=\"true\" aria-expanded=\"false\">Menu item <span class=\"caret\"></span></a><ul role=\"menu\" class=\"dropdown-menu\"><li><a href=\"#\">Menu item</a></li><li><a href=\"#\">Menu item</a></li><li><a href=\"#\">Menu item</a></li><li><a href=\"#\">Menu item</a></li></ul></li><form role=\"search\" class=\"navbar-form-custom\" method=\"post\" action=\"\"><div class=\"form-group\" ng-include=\"\'components/search/search.html\'\" ng-controller=\"searchCtrl\"></div></form></ul><ul class=\"nav navbar-top-links navbar-right\"><li class=\"dropdown\" dropdown=\"\"><a class=\"dropdown-toggle count-info\" href=\"\" dropdown-toggle=\"\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"fa fa-bell\"></i> <span class=\"label label-primary\">8</span></a><ul class=\"dropdown-menu dropdown-alerts\"><li><a ui-sref=\"inbox\"><div><i class=\"fa fa-envelope fa-fw\"></i> You have 16 messages <span class=\"pull-right text-muted small\">4 minutes ago</span></div></a></li><li class=\"divider\"></li><li><a ui-sref=\"profile\"><div><i class=\"fa fa-twitter fa-fw\"></i> 3 New Followers <span class=\"pull-right text-muted small\">12 minutes ago</span></div></a></li><li class=\"divider\"></li><li><a ui-sref=\"grid_options\" href=\"/grid_options\"><div><i class=\"fa fa-upload fa-fw\"></i> Server Rebooted <span class=\"pull-right text-muted small\">4 minutes ago</span></div></a></li><li class=\"divider\"></li><li><div class=\"text-center link-block\"><a ui-sref=\"notifications_tooltips\"><strong>See All Alerts</strong> <i class=\"fa fa-angle-right\"></i></a></div></li></ul></li><li><a href=\"login.html\"><i class=\"fa fa-sign-out\"></i> Log out</a></li></ul></div></nav></div>");
$templateCache.put("components/common/topnavbar.html","<div class=\"row border-bottom\"><nav class=\"navbar navbar-static-top white-bg\" role=\"navigation\" style=\"margin-bottom: 0\"><div class=\"navbar-header\"><form role=\"search\" class=\"navbar-form-custom\" method=\"post\" action=\"\"><div class=\"form-group\"><input type=\"text\" placeholder=\"Search for something...\" class=\"form-control\" name=\"top-search\" id=\"top-search\"></div></form></div><ul class=\"nav navbar-top-links navbar-right\"><li><a href=\"\"><i class=\"fa fa-sign-out\"></i> Log out</a></li></ul></nav></div>");
$templateCache.put("components/doc_panel/doc-component.html","<div class=\"row\" ng-controller=\"DocController\"><div class=\"col-sm-12\"><div class=\"doc-panel\"><div class=\"row\"><div class=\"col-sm-4 padding-right-2\"><div class=\"panel panel-default margin-bottom-0\"><div class=\"panel-heading doc-panel-heading\"><div class=\"row\"><div class=\"col-xs-6 col-xs-offset-5 padding-top-5 padding-left-25\"><div class=\"btn-group\"><button type=\"button\" class=\"btn btn-default btn-xs js-tooltip js-sort-alphabetically\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Sort list alphabetically\" ng-click=\"orderByPredicate=\'name\';\" ng-class=\"{true:\'active\', false:\'\'}[orderByPredicate==\'name\']\"><span class=\"glyphicon glyphicon-sort-by-alphabet\"></span></button> <button type=\"button\" class=\"btn btn-default btn-xs js-tooltip js-sort-by-date\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Sort list by date\" ng-click=\"orderByPredicate=\'-date\';\" ng-class=\"{true:\'active\', false:\'\'}[orderByPredicate==\'-date\']\"><span class=\"glyphicon glyphicon-calendar\"></span></button> <button type=\"button\" class=\"btn btn-default btn-xs js-tooltip js-sort-by-view-count\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Sort list by view count\" ng-click=\"orderByPredicate=\'-count\';\" ng-class=\"{true:\'active\', false:\'\'}[orderByPredicate==\'-count\']\"><span class=\"glyphicon glyphicon-eye-open\"></span></button></div></div></div></div><div class=\"panel-body padding-3\"><div class=\"scroll-list-container\" style=\"height: 250px;\"><div class=\"scroller\" id=\"docScrollParent\" style=\"height: 250px;\"><div class=\"js-items-list viewport real restrict\" style=\"overflow-x: hidden; overflow-y: auto; max-height: 250px;\"><ul class=\"doc-list\"><li class=\"row\" sf-virtual-repeat=\"doc in documentList | orderBy:orderByPredicate\" ng-click=\"loadDocument(doc.name)\" ng-style=\"{\'background-color\': doc.color};\"><div class=\"col-xs-2\" title=\"{{doc.count}}\">{{doc.count}}</div><div class=\"col-xs-10 padding-right-25 ellipsize\">{{doc.name}}</div></li></ul></div></div></div></div></div></div><div class=\"col-sm-8 padding-left-0\"><div class=\"panel panel-default margin-bottom-0\"><div class=\"documentContainer\" style=\"height: 295px;\"><div class=\"entity-editor\"><div class=\"row\"><div class=\"col-sm-6 padding-top-2 padding-left-35\"><form class=\"form-inline\"><div class=\"form-group\"><select class=\"form-control\" id=\"entitySelector\" ng-options=\"obj as obj for obj in entityTypes\" ng-model=\"selectedEntity\"></select></div><input type=\"text\" class=\"hidden\" ng-model=\"selectedText\" id=\"selectedText\"> <button type=\"submit\" class=\"btn btn-default\" ng-click=\"addEntity()\">Add</button></form></div><div class=\"col-sm-6 padding-top-2 padding-left-0\"><form class=\"form-inline\"><div class=\"form-group\"><input type=\"text\" class=\"form-control\" ng-model=\"entityName\" id=\"entityName\" placeholder=\"New Entity Type\"></div><button type=\"submit\" class=\"btn btn-default\" ng-click=\"createEntity()\">Create</button></form></div></div></div><div style=\"overflow-x: hidden; overflow-y: auto; height: 255px; max-height: 295px;\"><div class=\"bs-summary\"><div class=\"row\"><div class=\"col-md-12 padding-top-45\"><p ng-repeat=\"line_summary in summary\">{{line_summary}}</p></div></div></div><div class=\"bs-content divide padding-top-45\" id=\"textContent\"><p ng-repeat=\"line in content\" ng-bind-html=\"line\"></p></div><div class=\"bs-entities divide\"><ul class=\"list-group\"><li class=\"list-group-item\"><ul class=\"list-unstyled\"><li ng-repeat=\"column in entity_columns\"><div class=\"row\" ng-if=\"entities[column]\"><div class=\"col-md-3\"><h5><span class=\"label {{column}}\">{{column}}</span></h5></div><div class=\"col-md-9\"><p style=\"margin-top: 10px\" ng-bind=\"entities[column].join(\', \')\"></p></div></div></li></ul></li></ul></div></div></div></div></div></div></div></div></div><script type=\"text/javascript\">\n	$(function(){\n		$(\'#textContent\').on(\"mouseup\", function(){\n			var selection = $(\'#textContent\').selection();\n			if(selection.end != selection.start){\n				var text = $(\'#textContent\').text().substring(selection.start, selection.end).trim();\n				$(\'#selectedText\').val(text).trigger(\'input\');\n			}\n		});\n	});\n</script>");
$templateCache.put("components/main_panel/evidence_browser.html","<div class=\"row entity\"><div class=\"col-lg-4\"><div class=\"ibox float-e-margins panel panel-info\"><div class=\"ibox-title panel-heading\"><h5>Evidence 1 (11101029.txt)</h5><div ibox-tools=\"\"></div></div><div class=\"ibox-content\"><div class=\"panel-body\"><div class=\"panel-group\"><label class=\"checkbox\"><input type=\"checkbox\" ng-model=\"oneAtATime\"> Open only one at a time</label><accordion close-others=\"oneAtATime\"><accordion-group heading=\"Static Header, initially expanded\" is-open=\"status.isFirstOpen\" is-disabled=\"status.isFirstDisabled\">This content is straight in the template.</accordion-group><accordion-group heading=\"{{group.title}}\" ng-repeat=\"group in main.groups\">{{group.content}}</accordion-group><accordion-group heading=\"Dynamic Body Content\"><p>The body of the accordion group grows to fit the contents</p></accordion-group><accordion-group is-open=\"status.open\"><accordion-heading>I can have markup, too! <i class=\"pull-right glyphicon\" ng-class=\"{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}\"></i></accordion-heading>This is just some content to illustrate fancy headings.</accordion-group></accordion></div></div></div></div></div></div>");
$templateCache.put("components/main_panel/main_panel.html","<div class=\"panel panel-default main-panel\"><div class=\"panel-body\"><div class=\"panel blank-panel ui-tab\"><div class=\"panel-body\"><tabset><tab heading=\"Entity Browser\"><div ng-include=\"\'components/main_panel/evidence_browser.html\'\"></div></tab><tab heading=\"Provenance Timeline\" ng-controller=\"timelineCtrl\"><angularchart dataset=\"dataset\" schema=\"schema\" options=\"options\"></angularchart></tab><tab heading=\"Story Teller\"><strong>Donec quam felis</strong><p>Thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath</p><p>I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet.</p></tab></tabset></div></div></div></div>");
$templateCache.put("components/search/search.html","<i style=\"padding-right: 1em;\" class=\"fa fa-search\"></i><isteven-multi-select input-model=\"modernBrowsers\" output-model=\"outputBrowsers\" button-label=\"name\" item-label=\"name type\" tick-property=\"ticked\"></isteven-multi-select>");
$templateCache.put("components/side_panel/main_tabs.html","<div class=\"panel blank-panel ui-tab\"><div class=\"panel-body\"><tabset><tab heading=\"Entity\" ng-controller=\"entityViewerCtrl\"><div class=\"row text-center\"><div class=\"btn-group\"><label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"\'Selected\'\">Selected</label> <label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"\'All\'\">All</label></div></div><br><div class=\"row\" ng-include=\"\'components/side_panel/entity/information.html\'\"></div><div class=\"row\" ng-include=\"\'components/side_panel/entity/connections.html\'\"></div><div class=\"row\" ng-include=\"\'components/side_panel/entity/groups.html\'\"></div></tab><tab heading=\"Evidence\"><div ng-controller=\"evidenceBrowserCtrl\"><div class=\"row\"><div class=\"ibox\"><div class=\"ibox-content\"><div ui-tree=\"\" id=\"tree-root\"><ol ui-tree-nodes=\"\" ng-model=\"data\"><li ng-repeat=\"node in data\" ui-tree-node=\"\" ng-include=\"\'nodes_renderer.html\'\"></li></ol></div></div></div></div></div></tab><tab heading=\"Hypotheses\"><div ng-controller=\"hypothesesBrowserCtrl\"><div class=\"row\"><div class=\"ibox\"><div class=\"ibox-content\"><div ui-tree=\"\" id=\"tree-root\"><ol ui-tree-nodes=\"\" ng-model=\"data\"><li ng-repeat=\"node in data\" ui-tree-node=\"\" ng-include=\"\'nodes_renderer.html\'\"></li></ol></div></div></div></div></div></tab></tabset></div></div><script type=\"text/ng-template\" id=\"nodes_renderer.html\"><div data-nodrag class=\"tree-node tree-node-content\"> <a class=\"btn btn-primary btn-xs\" data-nodrag ng-click=\"toggle(this)\"><span class=\"fa\" ng-class=\"{\'fa-angle-down\': collapsed, \'fa-angle-right\': !collapsed}\"></span></a> {{node.title}} </div> <ol ui-tree-nodes=\"\" ng-model=\"node.nodes\" ng-class=\"{hidden: collapsed}\"> <li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"\'nodes_renderer.html\'\"> </li> </ol></script><style>\n    .angular-ui-tree-handle {\n        background: none repeat scroll 0 0 #f3f3f4;\n        border: 1px dashed #e7eaec;\n        color: inherit;\n        padding: 10px;\n        font-weight: normal;\n    }\n    .angular-ui-tree-handle:hover {\n        font-weight: bold;\n        cursor: pointer;\n    }\n    .angular-ui-tree-placeholder {\n        background: #f0f9ff;\n        border: 1px dashed #bed2db;\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n    }\n    .group-title {\n        background-color: #687074 !important;\n        color: #FFF !important;\n    }\n    .tree-node {\n        background: none repeat scroll 0 0 #f3f3f4;\n        border: 1px dashed #e7eaec;\n        color: inherit;\n        padding: 10px;\n        border-radius: 3px;\n    }\n\n    .tree-node .btn {\n        min-width: 22px;\n        margin-right: 4px;\n    }\n\n    .tree-node-content {\n        margin: 5px 5px 5px 0;\n    }\n\n    .tree-handle {\n        background: none repeat scroll 0 0 #f3f3f4;\n        border: 1px dashed #e7eaec;\n        color: inherit;\n        padding: 10px;\n    }\n\n    .angular-ui-tree-handle:hover {\n    }\n\n    .angular-ui-tree-placeholder {\n        background: #f0f9ff;\n        border: 1px dashed #bed2db;\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n    }\n</style>");
$templateCache.put("components/side_panel/side_panel.html","<div class=\"panel panel-default\"><div class=\"panel-body\"><div ng-include=\"\'components/side_panel/main_tabs.html\'\"></div></div></div>");
$templateCache.put("components/side_panel/entity/connections.html","<div class=\"panel panel-default\"><div class=\"panel-heading\">Connections</div><div class=\"panel-body\"></div></div>");
$templateCache.put("components/side_panel/entity/groups.html","<div class=\"panel panel-default\"><div class=\"panel-heading\">Entities In The Same Group</div><div class=\"panel-body\"><ul ng-repeat=\"group in groups track by $index\"><li>{{group}}</li></ul></div></div>");
$templateCache.put("components/side_panel/entity/information.html","<div class=\"panel panel-default\"><div class=\"panel-heading\">Information</div><div class=\"panel-body\"><ul ng-repeat=\"info in information track by $index\"><li>{{info}}</li></ul></div></div>");}]);