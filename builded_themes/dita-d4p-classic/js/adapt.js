(function(n,l,e,f){if(!e){return}var a,h,c;var o=e.callback||function(){};var p=e.path?e.path:"";var i=e.range;var b=i.length;var j=l.createElement("link");j.rel="stylesheet";j.media="screen";function m(d,q){j.href=a;h=a;o(d,q)}function k(){clearTimeout(c);var d=l.documentElement?l.documentElement.clientWidth:0;var u,t,w,v,q,r;var s=b;var x=b-1;a="";while(s--){u=i[s].split("=");t=u[0];r=u[1]?u[1].replace(/\s/g,""):f;q=t.match("to");w=q?parseInt(t.split("to")[0],10):parseInt(t,10);v=q?parseInt(t.split("to")[1],10):f;if((!v&&s===x&&d>w)||(d>w&&d<=v)){r&&(a=p+r);break}}if(!h){m(s,d);p&&(l.head||l.getElementsByTagName("head")[0]).appendChild(j)}else{if(h!==a){m(s,d)}}}k();function g(){clearTimeout(c);c=setTimeout(k,16)}if(e.dynamic){if(n.addEventListener){n.addEventListener("resize",g,false)}else{if(n.attachEvent){n.attachEvent("onresize",g)}else{n.onresize=g}}}})(this,this.document,ADAPT_CONFIG);