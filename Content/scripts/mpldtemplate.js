"use strict";
var mpldTmplt = ( function(){

	var methodSpec; //the current method entry from the methds file
	var methodSpecLang = new Object; // array of methodSpec indexed ny the langId
	var dictionary = new Object;
	var dictionarySpec = new Object;
	var cur_lang;
	var curMethodId; // the current methodId
	var me = {};
	
	me.appendDictionary = function(lang_id, entries) {
		dictionary[lang_id] = dictionary[lang_id].concat(entries);
	}
	/* use this if you're building the data structre externaly - tbd remove this ? */
	me.setMethodLang = function(spec) {
		methodSpecLang = spec;
	}

				
	function setDictionary(lang_id) {
		dictionarySpec = dictionary[lang_id];
	
	}

	function setLanguage(lang_id,platform) {
		cur_lang = lang_id;
		var wait = [];
		var promise1 = getMethodSpec(lang_id, platform);
		if (promise1) wait.push(promise1);
		var promise2 = getDictionary(lang_id);
		if (promise2) wait.push(promise2);
		var promiseAll;
		
		if (wait.length > 0) {
			promiseAll = Promise.all(wait)
			.then(function() {
					if (methodSpec) {
						dictionarySpec[methodSpec.methodId] = methodSpec.methodName;
					} else {
						console.log("44: Undefined method spec");
					}			
				}
			)
		} else {
				if (methodSpec) {
					dictionarySpec[methodSpec.methodId] = methodSpec.methodName;
				} else {
					console.log("52: Undefined method spc");
				}
		}
		return promiseAll;		
	}
	/*
		<span class="mpld-tmplt">this is the {{open}} methed</span>
	*/
	function updateFromDictionary()  {
		var list = $("[data-mpld-lookup]").get();
		list.forEach(function(ele) {
			var key = ele.getAttribute("data-mpld-lookup");
			var value = dictionarySpec[key];
			if (!value) {
				console.log("dictionary look on " + key + " failed")
			}
			ele.innerText = value;
		})
	}
	//template_nameis either a function that supplies HTML or an ID of <script template> that can be read
	// if it is not passed then the source is added using the "add" method
	function Template(template_name) {
		var me2 = {};
		var source = "";
		var name = template_name; //for debug
		var template  = undefined;
		me2.add = function(str) {
			source += str;
		} 

		me2.compile = function() {
			if (source) {
				template = Handlebars.compile(source);
			} else {
				console.log("no source for template");
			}
		}
		me2.set = function(selector, data) {
			var info;
			if (typeof data == "function") {
				info = data();
			}else {
				info = data;
			}
			if (source & !template) {
				me2.compile();
			}
			if (template) {
				var html = template(info);
				var $parent = $("#"+selector);
				$parent.html(html);	
			}
		}
		me2.append = function(selector, data) {
			var info;
			if (typeof data == "function") {
				info = data();
			}else {
				info = data;
			}
			var html = template(info);
			var $parent = $("#"+selector);
			$parent.html( $parent.html() +  html);	
		}
		if (template_name) {
			if (typeof template_name == "function") {
				source = template_name();
			} else {
				source  = document.getElementById(template_name).innerHTML;
			}
		}
		if (source) {
			me2.compile();
		}
		return me2;				
	} // class Template
	
	me.createTemplate = function(template_name) {
		return new Template(template_name);
	}

	var addedTemplates = [];
	me.addTemplate = function(templateDef, body_id, getter) {
		if (typeof templateDef == "string") {
			var template = new Template(templateDef);
		} else {
			template = templateDef;
		}
		template.body_id = body_id;
		template.getter = getter;
		addedTemplates.push(template);
	}
	
	var defaultMethodData = {
		methodId : "undefined",
		methodName : "undefined",
		returnType : "undefined",
		callType : "undefined",
		descr : "undefined",
		params : [],
		overloads : [],
		status : "tbd"
	}
	function getMethodSpec(lang, platform) {
		var promise;
		if (!methodSpecLang[curMethodId]) {
			promise = eyesMethods.prepareData(lang, platform).then(
				function() {
					var methodData = eyesMethods.getMethodData(curMethodId);
					if (methodData) {
						methodSpecLang[lang] = methodData;
						methodSpec = methodSpecLang[lang];
					} else {
						methodSpec = defaultMethodData;
					}
				});
		} else {
			methodSpec = methodSpecLang[lang];
		}
		return promise;
	}
	
	function getDictionary(lang) {
		var promise;
		if (! dictionary[lang]) {
			dictionary[lang] = new Object();
			getDictionaryJson(lang)
			.then(function(){
				dictionarySpec = dictionary[lang];
			});
			} else {
				dictionarySpec = dictionary[lang];
			}
		return promise;
	} // getDictionary
	
	function update_templates() {
		$("#mpld-descr").html(methodSpec.descr);
		var method_template = new Template(methodTemplate);
		var return_template = new Template(returnTemplate);	
		//var parameters_template = new Template(parametersTemplate);
		method_template.set("method-syntax-template-body",methodSpec);
		return_template.set("return-template-body",methodSpec);
		//parameters_template.set("parameters-template-body", methodSpec);
		
		addedTemplates.forEach(function(ele){
			var getter;
			if (ele.getter == undefined) {
				getter = methodSpec;
			} else {
				getter = ele.getter;
			}
			ele.set(ele.body_id, getter);
		})
	}
	me.contentUpdate = function(lang_id) {
		var promise = setLanguage(lang_id);
		if (promise) {
			promise.then(function() {
				update_templates();
				updateFromDictionary();
			})					
		} else {
			update_templates();
			updateFromDictionary();
		}
		return promise;
	}
	function getParamName(data,id){
		if (!data)
			data = methodSpec;
		if (id == "" || !data.params || data.params.length === 0) {
			return " ";
		}
		for (var i= 0; i<data.params.length; i++) {
			if (data.params[i].paramID == id)return data.params[i].paramName;
		}
		return "ERROR - cant find " + id;
	}
	function getParamType(data,id){
		if (id == "" || !data.params || data.params.length === 0) {
			return " ";
		}
		for (var i= 0; i<data.params.length; i++) {
			if (data.params[i].paramID == id)return data.params[i].paramType;
		}
		return "ERROR - cant find " + id;
	}

	function commentChar(langId) {
		if (langId == "java" || langId == "csharp" || langId == "javascript" || langId == "php") {
			return "//" 
		} else if ( cur_lang == "ruby" || cur_lang == "python") 
		return "#";
	}

	function wrapCode(str) {
		return "<pre ><code class='hljs'>"+str+"</code></pre>";
	}

	function methodTemplateNamedParam(seperator) {
		var str = "";
			str += "{{#each overloads}}";
				str += "{{../methodName}}(";
				str += "{{#if oparams}}";
					str += "{{#each oparams}}";
						str += "{{#unless @first}}\n {{replaceWithSpace ../../this.methodName }}{{/unless}}";
						str += "{{getOparamName  ../this this}} " + seperator + " {{getOparamName  ../this this}}";
					str += "{{else}}"
					str += "{{/each}}";
				str += "{{/if}}";
				str += ")";
					str += "{{#unless @last}}\n{{/unless}}";
				str += "{{else}}"
				str += "{{/each}}";
		return wrapCode(str);		
	}

	function methodTemplateCommaSeparated(mspec) {
		var value = "value";
		var typeDeclBegin = "";
			if (mspec.language == "php" ) {
				value = "$"+ value;
			}
			else if (mspec.language == "java" ) {
				if (mspec.returnType) {
					typeDeclBegin = mspec.returnType;
				} else if (mspec.overloads && (mspec.overloads.length > 0 && mspec.overloads[0].returnType)) {
					typeDeclBegin = mspec.overloads[0].returnType;
				}
				if (typeDeclBegin)
					typeDeclBegin += " ";
					else {
						typeDeclBegin = "";
					}
			} else {
				typeDeclBegin = "";
			}
			 
		var str = "";
			str += "{{#each overloads}}";
			var assignment = "";
			if (mspec.returnType && (mspec.returnType != "void" || mspec.returnType === "")) { //TBD need to test this on all the languages
				assignment = typeDeclBegin + value + " = ";
			}
			str += assignment + "{{../methodName}}(";
				str += "{{#each oparams}}";
					str += "{{getOparamName  ../this this}}";
					str += "{{#unless @last}},{{/unless}}";
				str += "{{/each}}";	
				str += ")";
				str += "{{#unless @last}}\n{{/unless}}";
			str += "{{else}}"
				str += assignment + "{{methodName}}( )"
			str += "{{/each}}";
			str += "</code>	";	
			str += "</pre>";
		return wrapCode(str);
	}

		function methodTemplateSetterGetter(data) {
		var str = "";
		var object = "eyes";
		var value = "value";
		if (! data.overloads || data.overloads.length <= 1){
			var TypeDeclEnd = data.returnType;	
			if (cur_lang == "csharp") {
				str += TypeDeclEnd + " " + value + "; // give relevant inital value\n"
				str += object + "." + data.methodName + "  = "  + value +";\n"
				str += value + " = " +  object + "." + data.methodName;	
			} else {
				str += object + "." + data.methodName + "  = "  + value + " " + commentChar(cur_lang) + " type is " + TypeDeclEnd + "\n"
				str += value + " =" +  object + "." + data.methodName;					
			}				
		} else {
			str += "ERROR : only one settergetter overload implemented";
		}		
		return wrapCode(str);
	}
	function methodTemplateSetter(data) {
		var str = "";
		var object = "eyes";
		var value = "value";
		if (! data.overloads || data.overloads.length <= 1){
			var TypeDeclEnd = data.returnType;	
			if (cur_lang == "csharp") {
				str += TypeDeclEnd + " " + value + "; // give relevant inital value\n"
				str += object + "." + data.methodName + "  = "  + value +";\n"
			} else {
				str += object + "." + data.methodName + "  = "  + value + " " + commentChar(cur_lang) + " type is " + TypeDeclEnd + "\n"				
			}				
		} else {
			str += "ERROR : only one setter overload implemented";
		}		
		return wrapCode(str);
	}
	function methodTemplateGetter(data) {
		var str = "";
		var object = "eyes";
		var value = "value";
		if (! data.overloads || data.overloads.length <= 1){
			var TypeDeclEnd = data.returnType;	
			if (cur_lang == "csharp") {
				str += TypeDeclEnd + " " + value + "; // give relevant inital value\n"
				str += value + " =" +  object + "." + data.methodName;	
			} else {
				str += value + " =" +  object + "." + data.methodName + " " + commentChar(cur_lang) + " type is " + TypeDeclEnd + "\n";					
			}				
		} else {
			str += "ERROR : only one getter overload implemented";
		}		
		return wrapCode(str);
	}
	function methodTemplate(){
		if (!methodSpec) {
			return "Not availabe in this language";
		}
			if (!methodSpec.callType || methodSpec.callType == "call" || methodSpec.callType == "=call") {
				if (cur_lang == "ruby"){
					return methodTemplateNamedParam(":")
				} else if (cur_lang == "python"){
					return  methodTemplateNamedParam("=")
				} else {
					return methodTemplateCommaSeparated(methodSpec);
				}
			}else if (methodSpec.callType == "set") {
				return methodTemplateSetter(methodSpec);
			} else if (methodSpec.callType == "get") {
				return methodTemplateGetter(methodSpec);
			} else if (methodSpec.callType == "setget") {
				var s1 = methodTemplateSetterGetter(methodSpec);
				return s1;
			} 
			else {
				console.log("ERROR: methodTemplate() - unknown callType " + methodSpec.callType);
			}
	}

	function parametersTemplate() {	
	/*tbd handle no meothod case */
		var str = ""
			+ ""
			+ "{{#if params}}"
			+ 		"{{#each params}}"
			+  			"{{#paramdef paramID }}"
			+ 				"<p class='mpld-paramdef-descr'> {{pdescr}}"
			+ 				"</p>"
			+			"{{#if returnSnippet}}"
			+			"<MadCap:snippetBlock src='../param-snippets/param-{{paramID}}.flsnp' />"
			+			"{{/if}}"
			+ 			"{{/paramdef}}"
			+		"{{/each}}"
			+	"{{else}}"
			+ 		"{{paramdefNone }}"
			+ 	"{{/if}}"
			;
		return str;
	}
	function returnTemplate() {
		var str = ""
				+ "   <dl class='mpld-paramdef'>\n"
				+ "     <dt class='mpld-paramdef-type '> Type: {{getReturnType}} </dd>\n"
				// + "     <dd class='mpld-paramdef-descr'>" + {{getReturnDescr}} + "\n"
				+ "     </dd>\n"
				+ "   </dl>\n"
		return str;			
	}
	function getDictionaryJson(lang_id) {
		try {
		var path = "/docs/apispec/dictionary-"+lang_id+".json";
		console.log("DEBUG: getting dictionary "+ path);
		var jqxhr = $.getJSON(path, function(data) {
			dictionary[lang_id] = data;
			console.log( "getDictionary for " + path + " succeeded");
		})
		  .done(function(data) {
			  
			console.log( "getDictionary for " + path + " ok");
		  })
		  .fail(function(jqxhr, textStatus, error) {
			console.log( "getDictionary for " + path + " FAILED: " + textStatus + " Error: " + error);
			
		  })
		  .always(function() {
			/* do what you want */
		  });
		} catch(err) {
			console.log("Error getting dictionary " + path + " Err: " + err);
		}
		  return jqxhr;
	}
	function makeCode(str) {
		return "<span class ='code-label'>"+str+"</span>";
	}
	me.setup = function(methodId, language, platform) {
		curMethodId = methodId;
		Handlebars.registerHelper(
		{
			getParamName: function (data,id){
				if (id == "" || data.params.length === 0) {
					return " ";
				}
				for (var i= 0; i<data.params.length; i++) {
					if (data.params[i].paramID == id)
						return data.params[i].paramName;
				}
				return "ERROR - cant find " + id;
			},
			getParamType : function (data,id){
				if (id == "" || data.params.length === 0) {
					return " ";
				}
				for (var i= 0; i<data.params.length; i++) {
					if (data.params[i].paramID == id)return data.params[i].paramType;
				}
				return "ERROR - cant find " + id;
			},
			getOparamName: function (data,id){
				if (id == "" || data.oparams.length === 0) {
					return " ";
				}
				for (var i= 0; i<data.oparams.length; i++) {
					if (data.oparams[i] == id) {
						return getParamName(methodSpec, id);
					}
				}
				return "ERROR - cant find " + id;
			},
			getOparamType : function (data,id){
				if (id == "" || data.oparams.length === 0) {
					return " ";
				}
				for (var i= 0; i<data.oparams.length; i++) {
					if (data.oparams[i] == id) {
						return getParamType(methodSpec, id);
					}
				}
				return "ERROR - cant find " + id;
			},
			paramdef : function (context, options) {
				if (!options.data.root.params || options.data.root.params.length == 0) {
					ret = "<p>This method does not take any parameters</p>";
				} else {
				var ret = "";
				ret = "<dl class='mpld-paramdef-name'>"
					+ "<dt class='mpld-paramdef-name mpld-code'>" + getParamName(options.data.root, context) + "</dt>"
					+ "<dd class='mpld-paramdef-descr'> Type: " + getParamType(options.data.root, context) + "</dd>"
					+ "<dd class='mpld-paramdef-type'>"
					+ options.fn(this)
					+ "</dd>"
					+ "</dl>"
				}
				return new Handlebars.SafeString(ret);
			},
			paramdefNone : function ( ) {
				var ret = "";
				ret = "This method does not take any parameters";
				return new Handlebars.SafeString(ret);
			},
			ifoparam : function (context, options) {
				var oindex = options.data.index;
				if (oindex < options.data.root.overloads.length){
					var ret = options.data.root.overloads[oindex].oparams.indexOf(context) > -1;
					return ret;
				} else
					return false;
			},
			getReturnType : function(context) {
				var str = "";
				if (context.data.root && (context.data.root.methodId == "undefined")) {
					return "";
				}
				if (context.data.root && (context.data.root.returnType || (context.data.root.overloads && context.data.root.overloads[0].returnType))) {
					var type = context.data.root.returnType || context.data.root.overloads[0].returnType
					str +=   makeCode(type) ;
				} else {
					str +=  "This method does not return a value";
				}
				return new Handlebars.SafeString(str);
			},
			replaceWithSpace : function(context, options) {
				var str = context.replace(/./g," ");
				return new Handlebars.SafeString(str);
			},
			ClassMethodSpec : function (context, options, hash) {
				var ret = "";
				var str = "";

				var data = options.data.root.methods.find( function(ele) {
					if (ele.methodId == context) return true;});
				if (!data) {
					console.log("Can't find class method " + context);
					return "undefined";
				}
				var object = "result";
				var value = "value";
				var TypeDeclStart = "";
				var TypeDeclEnd = "";
				if (cur_lang == "php") {
					object = "$"+object;
					value = "$"+value;
					TypeDeclEnd = "/* " + data.returnType + " */"
				} else if (cur_lang == "java" || cur_lang == "csharp" ){
					TypeDeclStart = 	data.returnType + " ";
				} else if 	(cur_lang == "javascript" || cur_lang == "ruby" || cur_lang == "python") {
					TypeDeclEnd = "  #  " + data.returnType;
				}  	
				var callType = data.callType || "callget";
				if (callType == "callget") {
					str +=  TypeDeclStart + value + " = " + object + "." + data.methodName + "( );" + TypeDeclEnd;
				} else if (callType == "callset") {
					str += 'callset not yet implemented';
				}
				else if (callType == "get") {
					if (cur_lang == "ruby" || cur_lang == "python") {
						str += TypeDeclStart + value + " = " + object + "." + data.methodName  + TypeDeclEnd;
					} else {
						str += TypeDeclStart + value + " = " + object + "." + data.methodName  + TypeDeclEnd;
					} /* TBD ignore non type language with doesnt use # for a comment */
				} else if (callType == "set") {
					str = 'set not yet implemented';
				} else {
					console.log("undefined callType " + callType + " for " + JSON.stringify(context));
				}
				ret = 
					"<code class = 'mpld-code-inline hljs'>"
					+str
					+"</code><br>"
					+"<div class='mpld-class-method-desc'>"
					+options.fn(this);
				if (data.returnTypeEnum) {
					ret += "<dl>"
						+ "<dt>possible values are:</dt>"
						data.returnTypeEnum.forEach(function (ele) {
							ret += 
							 "<dd style='margin-left:" + "2em'>"
							+"<code class = 'code'>"
							+ele 
							+"</code></dd>";
						})
						+ "</dl>";
				}
				ret += "</div>";
				return new Handlebars.SafeString(ret);
			}

		});
		mpld.setContentCallback(me.contentUpdate);
		
		var promise = setLanguage(language ,platform);
		if (promise) {
			promise.then(
				function() {
					mpld.updateLanguage();
				}
			)
		} else {
			mpld.updateLanguage();
		}		
	}

	
	return me;
})();