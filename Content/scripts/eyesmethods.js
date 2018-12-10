"use strict";
var eyesMethods = ( function(){
	var curMethods;		//for current language
	var masterMethods; //the master file for shared data
	var methods = [];	//indexed by language
	var me = {};

	function loadJsonFile(path, handleData) {
		try {
			//console.log("DEBUG: getting methods "+ path);
			var jqxhr = $.getJSON(path, function(data) {

				console.log( "loadJsonFile: for " + path + " succeeded");
			})
			  .done(function(data) {
			  	handleData(data);
				console.log( "loadJsonFile for " + path + " done");
			  })
			  .fail(function(jqxhr, textStatus, error) {
				console.log( "loadJsonFile: for " + path + " FAILED: " + textStatus + " Error: " + error);	
			  })
			  .always(function() {
				/* do what you want */
			  });
			} catch(err) {
				console.log("loadJsonFile: Error getting methods " + path + " Err: " + err);
			}
		 return jqxhr;
	}
	var path = "/docs/apispec/"
	function processFile(data) {
		data.methods.forEach(function(ele) {
            if (!ele.descr) {
                ele.descr = "";
            } else if (ele.descr instanceof Array) {
				ele.descr = ele.descr.join("/n");
			}
			if (!ele.params) {
				ele.params = [];
			}
			for (var i=0; i<ele.params.length; i++) {
                if (!ele.params[i].pdescr) {
                    ele.params[i].pdescr = "";
                } else if (ele.params[i].pdescr instanceof Array) {
                    ele.params[i].pdescr = ele.params[i].pdescr.join("/n");
                }	
			}
		})
	return data;
	}
	function getMethodsFileName(langId,platform) {
		var file;
		if (platform) {
		   file = "api-eyes-methods-"+platform+"-"+langId+".json";
		} else {
			file = "api-eyes-methods-"+langId+".json";
		}
		var fullpath = path+file;
		return fullpath;
	}
	function copyToMaster(data) {
		masterMethods = processFile(data);
	}
	function copyToLang(data) {
		curMethods = processFile(data);
	}
	function getJsonData(langId,platform) {

		var fullpath1 = getMethodsFileName("master");
		masterMethods= new Object();
		var jqxhr1 = loadJsonFile(fullpath1, copyToMaster);
		
		var fullpath2 = getMethodsFileName(langId, platform);
		curMethods = new Object();
		var jqxhr2 = loadJsonFile(fullpath2, copyToLang);			
		var jqxhr3 = Promise.all([jqxhr1, jqxhr2])
		.then(function (){
			console.log("file " + masterMethods.language + " entries = " + masterMethods.methods.length );
			console.log("file " + curMethods.language + " entries = " + curMethods.methods.length);
		});
		return jqxhr3;
	}
	function hasTBD(ele) {
			var isTBD = false;
		if (ele.group) {
			if (ele.group.match(/tbd/i) || ele.group.match(/deprecated/i)) {
				isTBD = true;
			}
		}

        if (ele.status && ele.status == "tbd"){
            isTBD = true;
        }
		if (ele.descr && ele.descr.match(/tbd/i)) {
			 isTBD = true;
		}

		if (ele.params) {
			for (var i=0; i<ele.params.length; i++) {
				if (ele.params[i].pdescr && ele.params[i].pdescr.match(/tbd/i)) {
					isTBD = true;
				}
			}
		}
		if (isTBD) {
			console.log(ele.methodId + " TBD or deprecated method skipped ");
		}
		return isTBD;
	}
	me.getLanguageMethods = function(sortKey1, sortKey2) {
		var list;
		if (curMethods && curMethods.methods) {
			 list = curMethods.methods.filter(function(ele) {
			 	return ! hasTBD(ele)
				 });
			 if (sortKey1 && sortKey2) {
				 list.sort(function(e1, e2) {
					 if (e1[sortKey1] < e2[sortKey1]) {
						 return -1;
					 } else if (e1[sortKey1] > e2[sortKey1]) {
						 return 1;
					 } else {
						 if (e1[sortKey2] < e2[sortKey2]) {
							 return -1;
						 } else if (e1[sortKey2] > e2[sortKey2]) {
							 return 1;
						 } else {
							return 0;
						 }
					 }
				 });
			 } else if (sortKey1) {
				 list.sort(function(e1, e2) {
					 if (e1[sortKey1] < e2[sortKey1]) {
						 return -1;
					 } else if (e1[sortKey1] > e2[sortKey1]) {
						 return 1;
					 } else {
						 return 0;
					 }
				 });
			 }
		} else {
			console.log("WARNING : getMethods() - no data available")
		}
		return list;
	}

 function findParamID(data,id) {
	return data.find(function(ele) {
		if (ele.paramID instanceof Array) {
			return ele.paramID.find(function(paramid) {return paramid == id});
		} else {
			return ele.paramID == id;
		}
	});
 }

 
function mergeLangAndMaster(masterMethod, langMethod, langId) {
	var methodId = masterMethod.methodId;
	if (masterMethod.group =="deprecated") return undefined;
	if (masterMethod.isTBD) return undefined;
	
    //deep copy the information from the master
    var updateMethod = JSON.parse(JSON.stringify(masterMethod));
    
    //adapt for language dependency
    var descr = masterMethod.descr;
    if (masterMethod.hasOwnProperty("descrlang") &&   masterMethod.descrlang[langId]) {
        descr += "\n" + masterMethod.descrlang[langId];
    }
    updateMethod.descr = descr;
    
    if (masterMethod.hasOwnProperty("relatedlang") && masterMethod.relatedlang[langId]) {
       updateMethod.related = masterMethod.related.concat(masterMethod.relatedlang[langId]);
    }
   
    //copy the stuff from the language method info
    updateMethod.langId = langId; 
    updateMethod.methodName = langMethod.methodName;
    updateMethod.returnType = langMethod.returnType;
    updateMethod.callType = langMethod.callType;
    updateMethod.overloads = JSON.parse(JSON.stringify(langMethod.overloads));
 
    updateMethod.params = []; // it is language specific - so build it up based on language declarations
  
    if (langMethod.params.length > 0) {
        for (var i=0; i<langMethod.params.length; i++) {
            var param = {};
            param.paramID = langMethod.params[i].paramID;
            param.paramName = langMethod.params[i].paramName;
            param.paramType = langMethod.params[i].paramType;
            if (langMethod.params[i].defaultVal) {
                param.defaultVal = langMethod.params[i].defaultVal;
            } else {
                param.defaultVal = "";
            }

            var masterParam = findParamID(masterMethod.params, langMethod.params[i].paramID);
			if (!masterParam) {
				if (methodId.match(/^get/) && updateMethod.callType == "setget" && langMethod.params.length == 1) {
				//for languages with setget the parameter is for the set and not for the get, so ignore it
				} else {
					console.log("ERR: missing master paramid " + langMethod.params[i].paramID
					+ " for langMethod " + masterMethod.methodId
					+ " in " + langId);
				}
			} else {
				param.pdescr = masterParam.pdescr;
				if (masterMethod.hasOwnProperty("pdescrlang") && masterParam.pdescrlang[langId]) {
					param.pdescr += "\n" + masterParam.pdescrlang[langId];
				}
				updateMethod.params.push(param);
			}
		}
    }
    return updateMethod;
}

	me.getMethodData = function(methodId) {
/* the methodId is assumed to be the language method id (without the setget) but can also be the master id */

		var methodData = undefined;

        
		var masterMethod = masterMethods.methods.find(function(ele){return ele.methodId === methodId});
        if (!masterMethod) {
            var fullMethodId = "set"+methodId;
            masterMethod = masterMethods.methods.find(function(ele){return ele.methodId === fullMethodId});
            if (!masterMethod) {
                fullMethodId = "get"+methodId;
                masterMethod = masterMethods.methods.find(function(ele){return ele.methodId === fullMethodId});
            }
        }
        
		
        var langMethod = curMethods.methods.find(function(ele){return ele.methodId === methodId});
		if (!langMethod && methodId.match(/^[sg]et/)) {
            var shortMethodId = methodId.replace(/^[sg]et/,"");
			langMethod = curMethods.methods.find(function(ele){return ele.methodId === shortMethodId});
		}
        
        if (masterMethod && langMethod) {   
            methodData = mergeLangAndMaster(masterMethod, langMethod, langMethod.language);
        }

		return methodData;
	}

	me.getMethodDataPrev = function(methodId, langId) {
		if (!langId) {
			langId = mpld.getCurrentLanguage();
		}
		if (!curMethods) {
			me.prepareData(langId);
		}
		var method = curMethods.methods.find(function(ele){return ele.methodId === methodId});
		if (!method && methodId.match(/^[sg]et/)) {
			method = curMethods.methods.find(function(ele){return ele.methodId === methodId.replace(/^[sg]et/,"")});
			if (!method) {
				return undefined;
			}
		}
		var masterMethod = masterMethods.methods.find(function(ele){return ele.methodId === methodId});
		if (!masterMethod) {
			var fullMethodId;
			if (method.callType == "setget" || method.callType == "set") {
				fullMethodId = "set"+methodId;
			} else if (method.callType == "get" || method.callType == "call") {
				fullMethodId = "get"+methodId;
			} else {
				console.log("ERROR can't find setget method in master : " + methodId);
			}
			if (fullMethodId) {
				masterMethod = masterMethods.methods.find(function(ele){return ele.methodId === fullMethodId});
			}
		}
		if (masterMethod) {
			//merge the data in the master and the languge
			if (method.descr === undefined) {
				method.descr = "";
			}
			if (masterMethod.descr) {
				method.descr = masterMethod.descr + " " + method.descr;
			}
			if (!method.descr) {
				console.log("WARNING: no descr for " + method.methodId);
			}
			if (masterMethod.group) {
				method.group = masterMethod.group;
			} else {
                console.log("WARNING: no group for " + masterMethod.methodId);
            }
			if (method.params.length > 0) {
				var i;
				for (i=0; i<method.params.length; i++) {
					if (method.params[i].pdescr && (method.params[i].pdescr instanceof Array)) {
						method.params[i].pdescr = method.params[i].pdescr.join("\n");
					}
					if (masterMethod.params) {
						var p = masterMethod.params.find(function(ele){return ele.paramID == method.params[i].paramID})
						if (p && p.pdescr) {
							method.params[i].pdescr = p.pdescr + method.params[i].pdescr;
						}
					} else {
						console.log("missing master param " + method.params[i].paramID + " for method " + method.methodId)
					}
				}
			}
		} else {
			console.log("WARNING: missing method "+ method.methodId + " in master - found in " + langId);
		}

		return method;
	}

	me.prepareData = function(langId, platform) {
		if (!langId) {
			langId = mpld.getCurrentLanguage();
		}
		var promise = getJsonData(langId, platform).catch(function(e) {
            console.log("promise error " + e);
        });
		return promise;
	}
	return me;
})();
//tbd does notwork in browser if (module) module.exports = eyesMethods;
