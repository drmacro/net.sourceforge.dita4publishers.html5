Array.prototype.clean=function(b){var a=0;for(var a=0;a<this.length;a++){if(this.hasOwnProperty(a)){if(this[a]==b){this.splice(a,1);a=a-1}}}return this};(function(a){var b={version:"0.3a",inited:false,loadInitialContent:true,hash:{current:"",previous:""},ext:".html",timeout:3000,outputSelector:"#d4h5-main-content",navigationSelector:"#local-navigation",externalContentElement:"section",loaderParentElement:"body",protocols:["http:","https:","file:","ftp:"],ids:{n:0,prefix:"d4p-page",prefixLink:"d4p-link"},transition:{speed:"slow",opacity:0.5},relativePath:"",mod:[],euriChange:[],scrollElem:{},scrollDuration:400,indexFilename:"index.html",edocReady:[],docIsReady:function(){var c={},d={};for(c in this.edocIsReady){if(this.edocIsReady.hasOwnProperty(c)){d=b.edocIsReady[c];d.call(this,this.uri,this.hash.current)}}},l:function(){var e=document.location.hash.substring(1),d=[],f={},c=false;if(e!==""){d=e.split("#");c=d[0].substring(0,1)==="/"?true:false;f={uri:d[0],hash:d[1]!==undefined?d[1]:"",id:d[0].replace(/\//g,"__"),virtual:c}}else{f={uri:"",hash:"",id:"",virtual:c}}return f},show:function(c){$("#"+c).show()},scrollableElement:function(){var d=0,g=arguments.length,e="",c=false,f={};for(d=0,g;d<g;d=d+1){if(arguments.hasOwnProperty(d)){e=arguments[d];f=$(e);if(f.scrollTop()>0){return e}else{f.scrollTop(1);c=f.scrollTop()>0;f.scrollTop(0);if(c){return e}}}}return[]},scrollToHash:function(c){var d={};if(c!==""&&c!==undefined&&c!==null&&c!=="#"){d=$(c).offset().top;$(b.scrollElem).animate({scrollTop:d},b.scrollDuration)}},setProps:function(d){var e={},c={},g={},f={};for(e in d){if(d.hasOwnProperty(e)){g=d[e];if(typeof g!=="object"){b[e]=g}else{for(c in g){f=g[c];b[e][c]=f}}}}},getIds:function(f){var g=f.attr("id");var c=f.attr("href");var e=c.substring(0,c.length-b.ext.length);var d={};if(g===""||g==undefined){g=b.ids.prefixLink+b.ids.n;b.ids.n++}return{linkID:g,hrefID:e}},live:function(c){},getInitialContent:function(){if($(b.outputSelector).length==1&&b.loadInitialContent){var c=b.l();if(c.uri!==""){b.uriChanged(c.uri,c.hash)}else{var d=$(b.navigationSelector+" a:first-child");if(d.attr("href")==undefined){return false}url=$(b.navigationSelector+" a:first-child").attr("href").replace(/^#/,"");document.location.hash=url}b.loadInitialContent=false}},uriChanged:function(e,f){var c=b.l();for(i in b.euriChange){if(b.euriChange.hasOwnProperty(i)){var d=b.euriChange[i];b[d.name][d.fn].call(b[d.name],c.uri,c.hash)}}b.hash.previous=f},init:function(d){var c=this.l(),e="",h=false,f={};if(this.inited){return false}this.setProps(d);if(b.relativePath!=""&&c.uri.indexOf(b.indexFilename)!=0){h=b.resolveRoot();document.location=h;return true}this.scrollElem=this.scrollableElement("html","body");for(e in this.mod){if(this.mod.hasOwnProperty(e)){f=this.mod[e];this[f].init.call(this[f])}}var g="hashchange";$(a).bind(g,function(j){b.uriChanged()});this.getInitialContent();this.inited=true;return true},filename:function(c){return c.substring(c.lastIndexOf("/")+1)},basename:function(c){return c.substring(0,c.length-this.filename(c).length)},resolveRoot:function(){var f=document.location.toString(),j=b.basename(f),h=j.split("/"),k=b.relativePath.match(/\.\./g),d=h.splice(0,h.length-1-k.length),g=d.join("/"),e=f.substring(g.length+1).replace(b.ext,"");return location.protocol=="file:"?d.join("/")+"/"+b.indexFilename+"#"+e:d.join("/")+"/#"+e}};a.d4p=b})(window);(function(a,b){b.module=function(c,e){var d=0;this.name=c;for(d in e){if(this[d]==undefined){this[d]=e[d]}}if(this.init!=undefined){b.mod.push(c)}b[c]=this};b.module.prototype.hash=function(){return document.location.hash.substring(1)};b.module.prototype.bind=function(c,d){b["e"+c].push({name:this.name,fn:d})}})(window,d4p);(function(a,b){b.ajaxLoader=function(c){this.outputSelector=b.outputSelector;this.title="";this.content="";this.externalContentElement=b.externalContentElement;this.timeout=b.timeout;this.modified=true;this._filter=[];this._before=[];this._ready=[];this._live=[];this._failed=[];this.collection=[],this.mode="replace";$.extend(true,this,c);this.setAriaAttr()};b.ajaxLoader.prototype.setOutputSelector=function(c){this.outputSelector=c},b.ajaxLoader.prototype.setTimeout=function(c){this.timeout=c};b.ajaxLoader.prototype.bind=function(c,d){this["_"+c].push(d)},b.ajaxLoader.prototype.addLoader=function(){var c=$("<div />").attr("id","d4p-loader");$(b.loaderParentElement).append(c)};b.ajaxLoader.prototype.setAriaAttr=function(){$(this.outputSelector).attr("role","main").attr("aria-atomic","true").attr("aria-live","polite").attr("aria-relevant","all")};b.ajaxLoader.prototype.contentIsLoading=function(){$("#d4p-loader").show();$(this.outputSelector).css("opacity",b.transition.opacity)};b.ajaxLoader.prototype.contentIsLoaded=function(){$("#d4p-loader").hide();$(this.outputSelector).css("opacity",1)};b.ajaxLoader.prototype.collectionSet=function(e,c,d){if(this.collection[e]==undefined){this.collection[e]={cache:false,uri:c,id:c.replace(/\//g,"__"),title:d}}};b.ajaxLoader.prototype.setCacheStatus=function(c){this.collection[c].cache=true};b.ajaxLoader.prototype.isCached=function(c){return this.collection[c]!=undefined?this.collection[c].cache:false};b.ajaxLoader.prototype.inCollection=function(c){return this.collection[c]};b.ajaxLoader.prototype.setTitle=function(){$("title").html(this.title);this.collection[this.id]["title"]=this.title},b.ajaxLoader.prototype.setMainContent=function(){var e=this.id.replace(/\//g,"__"),d=$("<div />").attr("id",e).attr("class","content-chunk").html(this.content),c={};for(i in this._live){if(this._live.hasOwnProperty(i)){c=this._live[i];this[c].call(this,b.content)}}if(this.mode=="append"){$(this.outputSelector).append(d);this.setCacheStatus(this.id)}else{$(this.outputSelector).html(d.html())}},b.ajaxLoader.prototype.rewriteAttrSrc=function(){var c=b.l();this.responseText=this.responseText.replace(/(src)\s*=\s*"([^<"]*)"/g,function(f,d,h){var g=h.split("/"),e="";if(b.protocols.indexOf(g[0])!==-1){e=h}else{e=c.uri.substring(0,c.uri.lastIndexOf("/"))+"/"+h}return d+'="'+e+'"'})},b.ajaxLoader.prototype.rewriteAttrHref=function(){var c=this;this.responseText=this.responseText.replace(/(href)\s*=\s*"([^<"]*)"/g,function(n,q,e){var h=b.l(),r="",p=e.split("/"),g=b.basename(h.uri),t=e.indexOf(h.uri),f=g.split("/"),m=0,k="",j=[],d=[],s=[],o="";f.clean("");if(e.substring(0,1)=="#"||b.protocols.indexOf(p[0])!=-1||e.substring(0,1)=="/"){r=e}else{e=e.replace(b.ext,"");if(t==0){r=e.substring(h.uri.length)}else{k=e.split("/");s=k;for(m=0,len=k.length;m<len;m=m+1){if(k[m]===".."||(k[m]==="")){s[m]="";f[f.length-1]=""}if(k[m]==="index"){s[m]="/home"}}s.clean("");f.clean("");d=g!=""?f.concat(s):j.concat(s);o=c.collection[h.uri].id;c.collectionSet(d.join("/"),o,c.title);r="#"+d.join("/")}}return q+'="'+r+'"'})},b.ajaxLoader.prototype.load=function(e,f){var d={},c=0;this.id=e.replace(b.ext,"");this.uri=e;this.hash=f;if(this.isCached(this.id)){return true}for(c in this._before){if(this._before.hasOwnProperty(c)){d=this._before[c];this[d].call(this,e,f)}}$(this.outputSelector).attr("aria-busy","true");$.ajax({type:"GET",context:this,cache:true,ifModified:this.modified,timeout:this.timeout,url:e,dataType:"html",data:{ajax:"true"},beforeSend:function(g){this.contentIsLoading()},complete:function(h,g,j){if(g==="error"||g==="timeout"){this.contentIsLoaded();document.location.hash=b.hash.previous;for(d in this._failed){if(this._failed.hasOwnProperty(d)){this._failed[d].call(this,g,j)}}return false}j=h.responseText;if(h.isResolved()){h.done(function(k){this.responseText=k});for(c in this._filter){if(this._filter.hasOwnProperty(c)){d=this._filter[c];this[d].call(this,this.responseText)}}this.html=$(this.responseText).not("script");this.content=this.html.find(this.externalContentElement);this.title=this.html.find("title").html();this.setMainContent();for(c in this._ready){if(this._ready.hasOwnProperty(c)){d=this._ready[c];this[d].call(this)}}this.contentIsLoaded();$(this.outputSelector).attr("aria-busy","false");if(f!=undefined){b.scrollToHash("#"+f)}}}})}})(window,d4p);(function(b,c){var a=new c.module("ajaxnav",{traverse:function(){$(c.navigationSelector+" a").each(function(e){var d=$(this).attr("href"),g=d.split("/"),f=c.getIds($(this));$(this).attr("id",f.linkID);if(d.substring(0,1)!="#"&&c.protocols.indexOf(g[0])==-1){c.ajax.collectionSet(f.hrefID,f.linkID,$(this).html());$(this).attr("href","#"+f.hrefID)}c.live($(this))});$(c.navigationSelector).find("li").each(function(e){var d="";if($(this).children("a").length===0){d=$(this).find("ul li a:first");if(d.length==1){$(this).children("span.navtitle").click(function(){c.ajax.load(d.attr("href").replace(/^#/,""))})}}})},load:function(){var d=c.l();if(c.ajax.inCollection(d.uri)!=undefined&&!d.virtual){c.ajax.load(d.uri+c.ext,d.hash)}},init:function(){c.ajax=new c.ajaxLoader();c.ajax.addLoader();c.ajax.bind("filter","rewriteAttrHref");c.ajax.bind("filter","rewriteAttrSrc");c.ajax.bind("ready","setTitle");this.bind("uriChange","load");this.traverse()}})})(window,d4p);(function(b){b.ajaxLoader.prototype.setErrorMsg=function(d,c){var e=c==="timeout"?"Sorry, the content could not be loaded":"Sorry, the server does not respond.";b.msg.alert(e,"error")};var a=new b.module("msg",{id:"d4p-message",timeout:3000,create:function(){var c=$("<div />").attr("id",this.id).attr("role","alertdialog").attr("aria-hidden","true").attr("aria-label","Message").addClass("rounded").hide(),d=c.append($("<div />"));$("body").append(c)},init:function(){this.create();b.ajax.bind("failed","setErrorMsg");$(document).mouseup(function(d){var c=$(this.id);if(c.has(d.target).length===0){c.hide()}})},show:function(){$("#"+this.id).show().attr("aria-hidden","false").delay(this.timeout).fadeOut().attr("aria-hidden","true")},alert:function(e,c){var d={};c=c==undefined?"":c;d=$("<p />").addClass(c).text(e);$("#"+this.id+" > div").html(d);this.show()}})})(d4p);(function(a){a.ajaxLoader.prototype.addWidgets=function(){$("*[class]").each(function(e){var g=$(this).attr("class").split(" ");for(var f=0,c=g.length;f<c;f++){var h=g[f];var b=h.indexOf(a.ui.prefix);var d=a.ui.prefix.length;if(b>=0){var j=h.substring(d);if(a.ui[j]==undefined){return true}if(a.ui[j]["init"]!=undefined){console.log(j);a.ui[j]["init"].call(a.ui[j],$(this))}}}})}})(d4p);(function(b){var a=new b.module("ui",{prefix:"d4p-ui-",dialogMinWidth:600,processed:[],init:function(){b.ajax.bind("ready","addWidgets")}})})(d4p);(function(a){a.ui.accordion={init:function(c){var b="";if(c.hasClass("concept")){b="> div.topic > h2"}else{b="> div.section > h2"}c.accordion({header:b,autoHeight:false,active:false,collapsible:true})}}})(d4p);(function(a){a.ajaxLoader.prototype.removeLinks=function(){var b=a.hash.current;this.content.find("a").each(function(c){$(this).replaceWith(this.childNodes)})};a.ui.dialog={ids:0,done:{},init:function(c){var b="",d="";if(c[0].tagName.toUpperCase()==="DFN"){c=c.parent()}b=c.attr("href").substring(1);d=this.getId();if(this.done[b]==undefined){this.done[b]=this.done["#dialog-"+d]={id:d,uri:b,done:false}}if(this.checkDialog(c,b)){this.dialog(c,b)}},getId:function(){this.ids++;return this.ids},checkDialog:function(c,b){if(this.done[b].done==true){if(b!=""){c.attr("href","#dialog-"+this.done[b].id);c.click(function(d){d.preventDefault();$("#dialog-"+this.done[b].id).dialog("open")})}return false}else{return true}},dialog:function(e,c){var d=new a.ajaxLoader(),f=this.done[c].id,b=$("<div />").attr("id","dialog-"+f);d.bind("ready","rewriteAttrSrc");d.bind("ready","removeLinks");$(a.ajax.loaderParentElement).append(b);d.setOutputSelector("#dialog-"+f);d.load(c);b.dialog({autoOpen:false,minWidth:a.ui.dialogMinWidth});b.dialog("close");e.attr("href","#/dialog-"+f);e.click(function(g){g.preventDefault();$("#dialog-"+f).dialog("open")});this.done[c].done=true;this.done["#dialog-"+f].done=true}}})(d4p);(function(b){b.ajaxLoader.prototype.rewritetoolBar=function(c){var d=this.html.find("#toolbar");$("#toolbar").html(d.html())};var a=new b.module("toolbar",{id:"toolbar",parent:"#main-content",showOnHomePage:false,add:function(){var c=$("<div />").attr("id",this.id).hide();$(this.parent).prepend(c)},hide:function(){$("#"+this.id).hide()},show:function(){var c=b.l();if(c.uri==""&&this.showOnHomePage){$("#"+this.id).show()}else{if(c.uri==""&&!this.showOnHomePage){this.hide()}else{if(c.uri=="/home"&&!this.showOnHomePage){this.hide()}else{if(c.uri!=""){$("#"+this.id).show()}}}}},init:function(){b.ajax.bind("ready","rewritetoolBar");this.add();this.bind("uriChange","show");this.show()}})})(d4p);(function(b){b.ajaxLoader.prototype.rewriteLangAttrHref=function(c){var d=this.html.find("#ch-lang-url").attr("href");$("#ch-lang-url").attr("href",d)};var a=new b.module("inav",{hideAll:function(c){$(".content-chunk").hide()},show:function(c){$("#"+c).show()},setAria:function(){$(".box-ico a").attr("aria-role","button")},load:function(){var d=this;this.hideAll();var c=b.l();$("#home").hide();if(c.uri!=""&&c.uri.substring(0,1)!="/"){this.show(c.id)}else{if(c.uri!=""&&c.uri.substring(0,1)=="/"){this.show(c.uri.substring(1))}else{if(c.uri==""){this.show("home")}}}},init:function(){b.ajax.mode="append";this.hideAll();this.setAria();this.bind("uriChange","load");b.ajax.bind("ready","rewriteLangAttrHref");this.load()}})})(d4p);