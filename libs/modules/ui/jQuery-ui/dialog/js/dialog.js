/**
 *  @file dialog
 *
 *  dialog adapter for jQuery UI
 *  As its own instance of the d4p.ajaxLoader
 *
 *  Copyright 2012 DITA For Publishers  
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */ (function (d4p) {

    // Remove links on dialogs
    d4p.ajaxLoader.prototype.removeLinks = function () {
        var uri = d4p.hash.current;
        //console.log(this.content.html());
        this.content.find("a").each(function(index) {
      		$(this).replaceWith(this.childNodes);
    	});
    	//console.log(this.content.html());
    };

    d4p.ui.dialog = {

        ids: 0,
        
        done: {},

        init: function (obj) {
        
        	var uri = '', id = '';

            if (obj[0].tagName.toUpperCase() === "DFN") {
                obj = obj.parent();
            }
	
            uri = obj.attr('href');
            uri = uri.substring(0, 1) === '#' ? uri.substring(1) : uri;
            
            id = this.getId();

            // keep track of every external dialog loaded
            if (this.done[uri] == undefined) {
                this.done[uri] = {
                    'id': id,
                    'uri': uri,
                    'done': false
                };
            }

            if (this.checkDialog(obj, uri)) {
                this.dialog(obj, uri);
            }



        },

        getId: function () {
            this.ids++;
            return this.ids;
        },

        checkDialog: function (obj, uri) {
			
			console.log("done %s", this.done[uri].done);
            // avoid processing url twice
            if (this.done[uri].done == true) {

                if (uri != "") {
                    obj.attr('href', "#");

                    // add click handler
                    obj.click(function (event) {
                     	event.preventDefault();
                        $("#dialog-" + d4p.ui.dialog.done[uri].id).dialog('open');
                    });
                }
                return false;
            } else {
                return true;
            }
        },

        dialog: function (obj, uri) {
            // add dialog
            var ajax = new d4p.ajaxLoader(),
            id = this.done[uri].id, 
			dialog = $("<div />").attr("id", "dialog-" + id);
			
            ajax.bind('ready', 'rewriteAttrSrc');
            ajax.bind('postFilter', 'removeLinks');

            $(d4p.ajax.loaderParentElement).append(dialog);

            ajax.setOutputSelector("#dialog-" + id);
            ajax.load(uri);

            dialog.dialog({
                autoOpen: false,
                minWidth: d4p.ui.dialogMinWidth
            });

            dialog.dialog('close');

            // remove href
            obj.attr('href', "#");

            // add click handler
            obj.click(function (event) {
            	event.preventDefault();
                $("#dialog-" + id).dialog('open');
            });

            this.done[uri].done = true;
        }
    };


})(d4p);