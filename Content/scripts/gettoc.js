"use strict";

var savetoc = ( function(){
    var me = {};
    
    function save( data, filename) {
        var blob = new Blob([data], {type: 'text/csv'});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
            window.URL.revokeObjectURL(elem.href);
        }
    }
    
    function formatToc(toc) {
        var str = "<sitemap>\n";
        var prefix = "https://www.applitools.com/docs";
        toc.forEach( function(ele){
            str += "   <loc>" + prefix+ele.path + "</loc>\n";
        })
        str += "</sitemap>\n";
        return str;
    }

     function getToc(filename) {
         /*
        require(['../Data/Tocs/Online_Output_sdk.js'], 
            function(tocData) {
                function traverseNodes(prefix, n, topNode) {
                $.each(n, function(key, value) {
                  if (typeof value.n !== "undefined") {
                    traverseNodes(prefix, value.n);
                  }
                });
              }
          traverseNodes(tocData.prefix, tocData.tree.n);
          */
             var toc = [];
             var definedData = require.s.contexts._.defined;
             console.log("dbg: starting");
             for (var s in definedData) {
              console.log("dbg: trying " + s);
                   if (definedData.hasOwnProperty(s) && s.match(/\/Tocs\//)) {
                       if (!s.match(/Chunk/)) {
                           // got a root
                           console.log("found toc head", s);
                           var root = definedData[s];
                           for (var i=0; i<root.numchunks; i++ ) {
                               var name = root.chunks[i].path;
                               var f = definedData[name];
                               for (var p in f) {
                                   if (f.hasOwnProperty(p)) {
                                       var name = f[p].t.toString();
                                       toc.push({path: p, label: name})
                                       //console.log('path = '+p+ 'name = ' + name )
                                   }
                               }
                           }
                       }
                   }
             }
             if (toc.length > 0 ) {
                var formatedData = formatToc(toc, filename);
                save(formatedData, filename);
             } else {
                 console.log("NO ToC data !!!");
             }
       // })
     }
     
     me.getAndSave = function() {
         var filename = "sitemap.xml";
         var toc = getToc(filename);
     }
     return me;
})();

     