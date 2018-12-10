"use strict";
//version 1.3
var mpldLookup = ( function(){
		var dictionary = [];
		var defaultClass = "eyes";
		var dictionarySpec;
		var rootSDKPath = "/docs/api/eyes-sdk/"
		var mainIndexPath = rootSDKPath + "index-gen/classindex-";
		var me = {
        
			};
	

			function platformLangToId(platform, lang_id) {
				return platform + "-" + lang_id;
			}

		function getDictionary(platform, lang_id) {
			var promise;
			var id = platformLangToId(platform, lang_id);
			if (!dictionary.hasOwnProperty(id)) {
				//dictionary[id] = new Object(); //rm ?
				promise = getDictionaryJson(id);
				promise.then(function(){
						dictionarySpec = dictionary[id];
					});
			} else {
				dictionarySpec = dictionary[id];
			}
			return promise;
		} // getDictionary
	


		function getDictionaryJson(id) {
			try {
				var path = rootSDKPath + "dictionary-gen/dictionary-" + id + ".json";
				//console.log("DEBUG: getting dictionary "+ path);
				var jqxhr = $.getJSON(path, function(data) {
						dictionary[id] = data;
						//console.log( "getDictionaryJson for " + path + " succeeded");
					})
					.done(function(data) {
						//	console.log( "getDictionaryJson for " + path + " ok");
					})
					.fail(function(jqxhr, textStatus, error) {
						console.log("getDictionaryJson for " + path + " FAILED: " + textStatus + " Error: " + error);
					})
					.always(function() {
						/* do what you want */
					});
			} catch(err) {
				console.log("Error getting dictionary " + path + " Err: " + err);
			}
			return jqxhr;
		}

		/*
		<span data-mpld-lookup="open">open</span>
		*/
		function getKeyValue(ele, atrib) {
			var value;
			var key = ele.getAttribute(atrib).toLowerCase();
			var parts = key.split("$");
			var query = "";
			if (parts.length > 2) {
				key = parts[0] + "$" + parts[1]
				query = parts[2];
			}
			if (dictionarySpec.symbols.hasOwnProperty(key)) {
				value = dictionarySpec.symbols[key];
			} else if (!key.match(/\$/)) {
				key = defaultClass + "$" + key;
				if (dictionarySpec.symbols.hasOwnProperty(key)) {
					value = dictionarySpec.symbols[key];
				} 
			}
			if (value && query.toLowerCase() == "morp") {
				if (value.isprop) {
					value.name += " property";
				} else {
					value.name += " method";
				}
			} 
					
			if (!value) {
				console.log("dictionary lookup on " + atrib + "=" + key + " failed");
				value = "u('" + key + "')";	
			}
			return value;
		}
		function updatePageFromDictionary()  {
			var value;
			var list1 = $("[data-mpld-lookup]").get();
			list1.forEach(function(ele) {
					value = getKeyValue(ele, "data-mpld-lookup");
					if (!(typeof value == "string")) {
						if (value.name) {
							ele.innerText = value.name;
						} else {
							ele.innerText = value;
						}
						if (ele.parentNode.tagName == "A") {
							var head = window.document.URL.replace(/^(.*\/docs\/).*$/, "$1");
							if (value.url && value.url.match(/.htm$/)) {
								var tail = value.url.replace(/^\/Content\//,head) + "l";
								if (tail) {
									ele.parentNode.setAttribute("href", tail);
									//console.log("DBG: set href to " + tail);
								}
							}
						}
					} else {
						ele.innerText = value;
					}

				})
			var list2 = $("[data-mpld-lookup-methodOrProp]").get();
			list2.forEach(function(ele) {
					var text;
					value = getKeyValue(ele, "data-mpld-lookup-methodOrProp");
					if (value.isprop) {
						text = "property";
					} else {
						text = "method";
					}
					ele.innerText = text;
				})			
		}
            
		me.getMainIndex = function (platform, lang_id) {
				return mainIndexPath + platformLangToId(platform, lang_id) + ".html"
			}
        
		me.setDictionary = function(platform, lang_id) {
				var id = platformLangToId(platform, lang_id);
				var promise;
				if (dictionary.hasOwnProperty(id)) {
					dictionarySpec = dictionary[id];
					updatePageFromDictionary();
				} else {
					promise = getDictionary(platform, lang_id);
					if (promise) {
						promise.then(
							function() {
								updatePageFromDictionary();
							}
							)
					} else {
						updatePageFromDictionary();	
					}
				}
				return promise;
			}
    	
		function languageChangeHandler(platform_id, lang_id) {
			me.setDictionary(platform_id, lang_id)
		}
		me.setPagePlatFormLanguage = function(platform, language) {
			me.curPlatform = platform;
			me.curLang = language;
		}
		me.setup = function(mpld) {
				if (!me.curPlatform) {
					me.curPlatform = mpld.getCurrentPlatform();
				} 
				if (!me.curLang) {
					me.curLang = mpld.getCurrentLanguage();
				}
				mpld.setLanguageChangeHandler(languageChangeHandler);
				$(document).ready(function(){
						me.setDictionary(me.curPlatform, me.curLang);
					})
			}
		return me;
		})();