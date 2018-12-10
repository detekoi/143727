"use strict";
var mpld = (function(){

		// classes used by mpld
		var activeClassName = "active";
		var codeSnippetContainerTabClassName = "code-snippet-container-tab";
		var codeSnippetContainerTabsClassName = "code-snippet-container-tabs";
		var codeSnippetContainerClassName = "code-snippet-container";
		var codeSnippetContainerCodeContainerClassName = "code-snippet-container-code-container";
		var codeSnippetContainerCodeClassName = "code-snippet-container-code";
		var codeSnippetToolBarClassName = "code-snippet-toolbar";
		var mpldSectionClassName = "mpld-section";
		var codeSnippetToolBarTextClassName = "code-snippet-toolbar-text";

		var myFile; 
		var codeAreas = [];
		var codeSections = [];
		var sections = [];
		var buttons = [];
		var file_content = [];
		var example_base = "/docs/example-code";
		var curLang;
		var curPlatform;
		var section_text_cache = [];
		var defaultLang = "java";
		var langToName = {
			java: "Java",
			javascript: "JavaScript",
			python: "Python",
			ruby: "Ruby",
			csharp: "C#",
			php: "PHP",
			ruby: "Ruby",
			objectivec: "Objective-C",
			swift: "Swift",
			vb: "VB"
    
			}
		var platformToName = {
			selenium: "Selenium",
			selenium4: "Selenium&nbsp4",
			appium: "Appium",
			watir: "Watir",
			xcui: "XCUI"
			}


		var platforms = {
			selenium: {
			languages: ["java","javascript","csharp"/*,"php","python"*/]
			},
			selenium4: {
			languages: ["javascript"]
			}
			/*
			appium: {
			languages: ["java","javascript","csharp","php","python","ruby"]
			}
			*/
			}


		var defaultPlatform = "selenium";
		var me = {};

			// dir is the root that consists of all the source code
			// file is both the name of a directory that has one sub directory per language
			// by default it is also the name of the example file itself, but this can be over ridden for a paricular section
			me.setDefaultFile = function(dir, file) {
				myFile = file;
				example_base = dir;
			}

		function storageAvailable(type) {
			try {
				var storage = window[type],
					x = '__storage_test__';
				storage.setItem(x, x);
				storage.removeItem(x);
				return true;
			}
			catch(e) {
				return e instanceof DOMException && (
					// everything except Firefox
					e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
					// acknowledge QuotaExceededError only if there's something already stored
					storage.length !== 0;
			}
		}


		me.getLanguageName = function(langId) {
			return langToName[langId];
		}
		function getLanguageId(langName) {
			for (var id in langToName) {
				if (langToName[id] == langName) {
					return id;
				}
			}
			return "UNDEFINED";
		}
		me.getPlatformName = function(platformId) {
			return platformToName[platformId];
		}

		me.getCurrentPlatform = function () {
				if (!curPlatform) {
					setStartupPlatform();
				}
				return curPlatform;
			}

		function setStartupPlatform() {			
			if (!curPlatform)   {
				if (storageAvailable('localStorage')) {
					if (!window.localStorage.mpldPlatform) {
						curPlatform = defaultPlatform;
						window.localStorage.mpldPlatform = curPlatform;
					} else {
						curPlatform = window.localStorage.mpldPlatform;
					}
				}
			}
		}
		/* TBD this is not called at the moment - do we need it */
		function changePlatform(platformId) {
			curPlatform = platformId;
			if (storageAvailable('localStorage')) {
				window.localStorage.mpldPlatform = curPlatform;
			}
		}


		function setStartupLanguage() {
			//TBD make sure language is compatible with platform
			if (curLang) return;
			curLang = defaultLang;
			var prevLang;

			if (storageAvailable('localStorage')) {
				if (window.localStorage.mpldLang) {
					prevLang = window.localStorage.mpldLang;
				} 
				if (languages.length > 0) {
					if (prevLang && languageIncluded(prevLang)) {
						curLang = prevLang;
					} else if (!languageIncluded(defaultLang)) {
						curLang =  languages[0].id;
					}
				}
			} else {
				if ((languages.length > 0)
					 && !languageIncluded(defaultLang)) {
						curLang = languages[0].id;
				} 
			}
		}


		function changeLanguage(langId) {
			curLang = langId;
			if (storageAvailable('localStorage')) {
				window.localStorage.mpldLang = curLang;
			}
		}
				


		/* object that stores information about a language */

		function Language (_id, _butname, _dir, _suffix) {
			this.id = _id;
			this.butname = _butname;
			this.dir = _dir;
			this.suffix = _suffix;
		}
		/* The set of languages supported on the current page */
		var languages = [];

        function languageIncluded(lang_id) {
            var lang = languages.find(function(ele) {
                return ele.id == lang_id
            })
            return lang;
        }

		function getLang(lang_ld) { //todo replace with find
			var langItem;
			if (languages.length > 0) {
				languages.forEach(function(l) {
					if (l.id == lang_ld) langItem = l;
				})
			} else if (curLang) {
				langItem = curLang;
			}

			return langItem;
		}
		/*on a page you can either call setDefaultLanguages or a set of addLanguage */
		me.addLanguage = function addLanguage(_id,_butname,_dir,_suffix) {
				languages.push(new Language(_id, _butname, _dir, _suffix));
			}
		me.setDefaultLanguages = function (lang) {
				if (lang && !lang.isArray) {
					lang = lang.split(",")
				}
			if (!lang || lang.includes("java"))
				mpld.addLanguage("java", "Java", "java/src/main/java/com/applitools/ekb", "	.java");
			if (!lang || lang.includes("javascript"))	
				mpld.addLanguage("javascript", "Javascript", "javascript", ".js");
			if (!lang || lang.includes("ruby"))
				mpld.addLanguage("ruby", "Ruby", "ruby", ".rb");
			if (!lang || lang.includes("python"))
				mpld.addLanguage("python", "Python", "python", ".py");
			if (!lang || lang.includes("csharp"))
				mpld.addLanguage("csharp", "C#", "csharp", ".cs");
			if (!lang || lang.includes("php"))
				mpld.addLanguage("php", "PHP", "PHP", ".php");
			}

		me.getCurrentLanguage = function () {
				if (!curLang) {
					setStartupLanguage()
				}
				return curLang;
			}


		var firstTime = true;
		var languageChangeHandlers = [];

		me.setLanguageChangeHandler = function(h) {
			languageChangeHandlers.push(h);
		}

		function mpldClicked(e) {
			var buttonLang = e.target.getAttribute("data-mpld-lang-trig");
			//console.log("Click on " + buttonLang);

			changeLanguage(buttonLang);
			buttons.forEach(function(ee) {
					var ee_lang = ee.attr("data-mpld-lang-trig");
					var id = ee.attr("data-mpld-tabid");
					var $id = $("#" + id);
					if (ee_lang == buttonLang) {
						$id.addClass(activeClassName);
					} else {
						$id.removeClass(activeClassName);
					}
				});
   
			paintAreas();
			languageChangeHandlers.forEach(function(ele) {
				ele(curPlatform, curLang)
			});
			firstTime = false;
		}

		function mpldCopyClicked(e) {
			var section = e.target.getAttribute("data-mpld-sectionid");
			var all_text = section_text_cache[sectionID(section, curLang)];
	
			var copyText = $("<textarea>");
	
			$('body').append(copyText);
			copyText.val(all_text);
			copyText.select();
			document.execCommand("Copy");	
			copyText.remove();
		}


		function appendDiv(parent, classStr) {
			var d = $("<div>");
			if (classStr)
				d.addClass(classStr);
			parent.append(d);
			return d;
		}
		function simulateFirstPress() {
			for (var i = 0; i < buttons.length; i++) {
				var b = buttons[i];
				var lang = b.attr('data-mpld-lang-trig');
				if (lang == curLang) {
					b.click();
					break;
				}
			}
		}
		function buildButtons(parentDiv) {
			var $parentDiv = $(parentDiv);
			var $contTabs_d1 = $("<div>");
			$contTabs_d1.addClass(codeSnippetContainerClassName);
			var $divSnippetCont_d11 = appendDiv($contTabs_d1, codeSnippetContainerTabsClassName);
	
			languages.forEach(function(lang) {
					var $bdiv;
					$bdiv = appendDiv($divSnippetCont_d11, codeSnippetContainerTabClassName);
					if (lang.id == curLang) {
						$bdiv.addClass(activeClassName);
					}
					var bdivid = parentDiv.id + "-" + lang.id;
					$bdiv.attr('id', bdivid);
					var b = $("<button>",
					{ text: lang.butname
					});
					b.attr('data-mpld-lang-trig', lang.id);
					b.attr('data-mpld-sectionid', $contTabs_d1[0].id);
					b.attr('data-mpld-tabid', bdivid);
					b.on("click", mpldClicked);
					buttons.push(b);
					$bdiv.append(b);
					});
	
			var $divCodeCont_d12 = appendDiv($contTabs_d1, codeSnippetContainerCodeContainerClassName);
			var $divToolbar_d121 = appendDiv($divCodeCont_d12, codeSnippetToolBarClassName);
			var $divToolbarText_d1211 = appendDiv($divToolbar_d121, codeSnippetToolBarTextClassName);

			var $copy = $("<button>",
			{ title: "Copy to clipboard",
			class: "btn btn-copy fa fa-copy",
			name: "CodeSnippetCopyLink",
				});
			$copy.attr('data-mpld-lang-trig', curLang);
			$copy.attr('data-mpld-sectionid', parentDiv.id);
			$copy.attr('href', "javascript:");
			$copy.on("click", mpldCopyClicked);
			$divToolbarText_d1211.append($copy);
			/*
			append this
			<a name="CodeSnippetCopyLink" style="display: none;" title="Copy to clipboard." href="javascript:if (window.epx.codeSnippet)window.epx.codeSnippet.copyCode(&#39;CodeSnippetContainerCode_286834a1-9548-40ca-924f-2dca41f2a3c1&#39;);" ms.cmptyp="CodeSnippet">Copy</a
			*/
			var $divToolbar_d122 = appendDiv($divCodeCont_d12, codeSnippetContainerCodeClassName);
			var $divToolbar_d1221 = appendDiv($divToolbar_d122);
	
			/* style="color:Black;" */
			$parentDiv.after($contTabs_d1);
			$parentDiv.detach();
			$divToolbar_d1221.append($parentDiv);
	
			/*
			d1 <div id="code-snippet-1" class=codeSnippetContainerClassName xmlns="" class="mpld-section" data-mpld-section="eyes-setup">
			d11 <div class=codeSnippetContainerTabsClassName>
			d111 <div class=codeSnippetContainerTabActiveClassName dir="ltr"><a>C#</a></div>
			d112 <div class=codeSnippetContainerTabClassName dir="ltr">Java</div>
			d113 <div class=codeSnippetContainerTabClassName dir="ltr">Csharp</div>
			d114 <div class=codeSnippetContainerTabClassName dir="ltr">PHP</div>
			</div>
			d12 <div class="codeSnippetContainerCodeContainer">
			d121 <div class="codeSnippetToolBar">
			d1211 <div class="codeSnippetToolBarText">
			<a name="CodeSnippetCopyLink" style="display: none;" title="Copy to clipboard." href="javascript:if (window.epx.codeSnippet)window.epx.codeSnippet.copyCode(&#39;CodeSnippetContainerCode_286834a1-9548-40ca-924f-2dca41f2a3c1&#39;);" ms.cmptyp="CodeSnippet">Copy</a>
			</div>
			</div>
			d122 <div id="CodeSnippetContainerCode_286834a1-9548-40ca-924f-2dca41f2a3c1" class="codeSnippetContainerCode" dir="ltr">
			d1221 <div style="color:Black;">
			<pre> ....</pre>
			</div>
			</div>
			</div>
			</div>
			*/
	
	
		}
			function createCodeNode() {
				/*
				<pre><code class="hljs" data-mpld-lang="java">
				//This is Java code line 1
				</code></pre>
				*/
			}
			var re_include = /%%%%[ \t]*include/;
			var re_exclude = /%%%%[ \t]*exclude/;

			/*
			if matches re_exclude returned undefined
			else if matches re_include returns the line without the include\
			else returns the string as is
			*/
			function check_include_exclude(t, section) {
				if (re_include.test(t) && t.match(section)) {
					var clean_t = t.replace(/[^ \t]*[ \t]*%%%%[ \t]*include.*/, "");
					return clean_t;
				} else if(re_exclude.test(t) && t.match(section)) {
					return undefined;
				} else {
					return "";
				}
			}
			function check_include_exclude_cleanup(t, section) {
				if (re_include.test(t)) {
					var clean_t = t.replace(/[^ \t]*[ \t]*%%%%[ \t]*include.*/, "");
					//console.log("DEBUG before '"+t+"' after '"+clean_t+"'");
					return clean_t;
				} else if(re_exclude.test(t) && t.match(section)) {
					return undefined;
				} else {
					return "";
				}
			}
			function extractSection(text, section) {
				var extractText = [];

				var index = 0;
	
				while (index < text.length) {
					var re = new RegExp("%%%%[ \t]*start[ \t]*" + section + "\\b");
					var found = false;
					var res;
					do {
			
						var t = text[index]; index++;
						found = re.test(t);
						if (!found) {
							res = check_include_exclude(t, section);
							if (res ) {
								extractText.push(res);
							} 		
						}
					} while (!found && index < text.length);
					if (found) {
						re = new RegExp("%%%%[ \t]*stop[ \t]*" + section + "\\b");	
						if (index < text.length)  {
							t = text[index]; index++;
						}
						do {
							res = check_include_exclude_cleanup(t, section);
							if (res !== undefined) {
							if (res !== "") { //was include
							extractText.push(res);
						} else if (t.match(/%%%%/) == null) {
							extractText.push(t);
						}
					}
					t = text[index]; index++;
					found = re.test(t);
					} while (!found && index <= text.length);
						}
						}
				return extractText;
			}
			function errorText(area, lang_id) {
				area.innerHTML = "<code>example for " + lang_id + " not currently available</code>";
			}
			function processText(data, area, lang_id, section) {
				data = data.replace("<", "&lt;");
				data = data.replace(">", "&gt;");
				var text_lines = data.split("\n");
				//console.log("num lines = " + text_lines.length);
				loadTextFromFileCont(area, text_lines, section, lang_id);	
			}
			function loadTextFromFile(area, dir, file, lang_id, section){
				//read the file from root/file/lang_id
				var langItem = getLang(lang_id);

				if (!langItem) {
					console.log("language not supported: " + lang_id);
					return;
				} 	
	
				var url;
				if (dir == undefined) {
					url = file;
				} else {
					url = example_base + "/" + dir + "/" + langItem.dir + "/" + file + langItem.suffix;
				}
				var found_url = file_content.find(function(e){return e.url === url});
				if (found_url == undefined) {
					//console.log("loading url START: " + url);
					$.ajax({
						url: url,
						data: "",
						success: function (data, textStatus, jqXHR) {
							//console.log("loading url: " + url);
							//extract all the line from %%% section start %%% to %%% section end %%%
							file_content.push({url: url, data: data});
							processText(data, area, lang_id, section);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							errorText(area, lang_id);
						},
						dataType: "text"
						});
			
				} else {
					//console.log("reuse url: " + url);
					processText(found_url.data, area, lang_id, section)
				}
			}
			function sectionID(section, lang_id) {
				return section + "-" + lang_id;
			}

			function storeInlineText(node, section) {
				var lang_id = node.getAttribute("data-mpld-lang");
				if (lang_id) {
					var index = sectionID(section, lang_id);
					section_text_cache[index];
				}
			}


			function loadTextFromInline(parent, section, lang_id) {
				var text = section_text_cache[sectionID(section, lang_id)];
				if (text) {
					parent.innerHTML = text;
				}
			}

			function loadTextFromFileCont(area, text_lines, section, lang_id) {
				var section_text = extractSection(text_lines, section);
				var min = undefined;
				var minstr;
				section_text.forEach(function(line) {
						var data = line.match(/^([\u0009\u000D\u0020]*)[^\u0009\u000D\u0020]/); //lines that contain at least one non space charachter
		
						var length;
						if (data != null) { //ignore empty lines
							length = data[1].length;

							if (min == undefined) {
								min = length;
								minstr = data[1];
							} else if (length < min) {
								min = length;
								minstr = data[1];
							}
						} 
					})
				if (min > 0) {
					//var re = new RegExp("^"+minstr).compile;
					for (var i = 0; i < section_text.length; i++) {
						section_text[i] = section_text[i].replace(minstr, "");
					}
				}
			
				//console.log("loading section:" + section + " text lines = " + section_text.length);
				if (section_text.length > 0) {
					var all_text = section_text.join("\n");
					area.innerHTML = "<code class='hljs' data-mpld-lang='" + lang_id + "'>" + all_text; +"</code>";
					if (hljs) {
						hljs.highlightBlock(area);
					}
					section_text_cache[sectionID(section, lang_id)] = all_text;
				} else {
					errorText(area, lang_id);
				}
			}

			var callback_proc;
			me.setContentCallback = function(callback) {
					callback_proc = callback;
				}
			var globatPaths = [];

			function paintAreas() {
				if (callback_proc) {
					callback_proc(curLang);
				}
				codeSections.forEach(function(area) {
						var section = area.getAttribute("data-mpld-section"); //which section is this
						//$("[data-mpld-path]").get.forEach(function(ele) {
						//     var path = ele.getAttribute("data-mpld-path");
						//TBD - to continue
						//})
						var inline = area.getAttribute("data-mpld-inline");
						if (inline) { //check if it is an inline section
							// get all the code sections in the pre 
							loadTextFromInline(area, section, curLang);
						} else if (section && section != "none")	{
							var file = area.getAttribute("data-mpld-file");
							if (file == undefined) {
								file = myFile;
							}
							var dir = area.getAttribute("data-mpld-dir");
							if (dir == undefined){
								dir = myFile;
							}
							if (section != undefined && section != "") {
								loadTextFromFile(area, dir, file, curLang, section);
							}
						}
					});	
				/* hide or display elements with the data-mpld-lang attribute depending on if they match the language */

				var MpldAreaShowClassName = "mpld-area-show";
				var MpldAreaHideClassName = "mpld-area-hide";

				$("[data-mpld-lang]").get().forEach(function(ele) {
						var areaLang = ele.getAttribute("data-mpld-lang").split(/[ \t,]/);			
						if (areaLang.includes(curLang) 
                            || areaLang.includes(curPlatform) 
                            || areaLang.includes(curPlatform+"-"+curLang)
                        ) {
							ele.classList.add(MpldAreaShowClassName);
							ele.classList.remove(MpldAreaHideClassName);
							//console.log("show " + areaLang + " class: " + ele.classList);
						} else {
							ele.classList.add(MpldAreaHideClassName);
							ele.classList.remove(MpldAreaShowClassName);
							//console.log("hide " + areaLang + " class: " + ele.classList);
						}
					});
				if (typeof hljs !== 'undefined') {
					$('pre code').each(function(i, block) {
						hljs.highlightBlock(block); 
					});
			}
			} // paintAreas
	
	
		var autoDoSetupLanguage = true;
		me.dontSetupLanguage = function() {
				autoDoSetupLanguage = false;
			}
		me.updateLanguage = function() {
            if (buttons.length > 0 ) {
				simulateFirstPress();
            } else {
                paintAreas();
            }
		}
		function selectPlatformLangClickHandler(element) {
			console.log("clicked select platform");
			var key = element.currentTarget.getAttribute("data-mpld-select-platform-lang").split("-");
			var platform = key[0];
			var language = key[1];
			var href = window.location.href;

			var $platform = $(".ekb-select-platform");
			var pname = me.getPlatformName(platform);
			$platform.html(pname);

			var $language = $(".ekb-select-language");  
			var lname = me.getLanguageName(language);
			$language.html(lname);
			var hreftail = href.replace(/^.*\//,"");
				var hreflist = hreftail.split("-");
			//get the language but get rid of the .html at the end
			var current_language = hreflist[4].replace(/\..*$/, "");
			//var method =  hreflist[3]; // in case we need it in the future
			var current_platform = hreflist[2];
			href = href.replace(current_language, language);
			href = href.replace(current_platform, platform);
			console.log("dbg  reset window to " + href);
			//TBD - how do we know we have a page like that....

			var request = new XMLHttpRequest();  
			request.open('GET', href, true);
			request.onreadystatechange = function(){
					if (request.readyState === 4){
						if (request.status === 404) {  
							alert("Sorry, this page is not available!");
							// TBD 
							return;
						} else {
							//TBD check other status
							window.location.href = href;
						}
					} else {
						//TBD cother states of interest ?
					}
				};
			request.send();
		
		}
		var $changeLanguageMenu;
		function menuItemClick(ele) {
			var t = ele.target;
			var langName = t.innerHTML;

/*rm
			var href = window.location.href;
			var filename = href.replace(/^.*\//,"");
			var parts = filename.split("-");
			//var platform = parts[2];
			//var method = parts[3];
			var language = parts[parts.length-1].replace(/\..*$/, "");
			var targetLanguage = getLanguageId(langName);
			var targetPlatform = getPlatformId(platName)
			href = href.replace(language, targetLanguage);
			*/
			var href = ele.target.href;
			ele.target.href = "#"; //prevent from auto jumping to the page
			console.log("switch to " + href);
        
			var request = new XMLHttpRequest();  
			request.open('GET', href, true);
			request.onreadystatechange = function(){
					if (request.readyState === 4){
						if (request.status === 404) {  
                            let onConfirmHandler = function() {};
                            let onCancelHandler = function() {};
                            let msg = "<p>This method doesn't exist in " + langName + ".</p>"
                            + "<p> If you want to see the available methods in "
                            + langName + " for this class, "
                            + "Click and select the language you want."
							ApplitoolsModal.show({ 
								title: "Sorry, can't change the language", 
								message: msg,
                                confirmText : "OK",
                                cancelText : "Cancel",
                                onConfirm  : onConfirmHandler,
                                onCancel : onCancelHandler,
                                hideConfirmButton : false,
                                hideCancelButton : true
								});
							//alert("Sorry, this page is not available!");
							// TBD 
							return;
						} else {
							//TBD check other status
							window.location.href = href;
						}
					} else {
						//TBD cother states of interest ?
					}
				};
			request.send();
			//$changeLanguageMenu.hide();

			//TBD window.location.href = href;
		}
		function getMenuItem(platName, langName,link) {
			var a_item = $("<a>",{
			html: platName + "&nbsp" + langName,
			href: link
			});
			a_item.addClass("link");
			a_item.addClass("mpld-menu-entry");
			a_item.on("click", menuItemClick);
			return a_item;
			}

 		function getLine(thisPage,platId,langId) {

 		}
		function setupPlatformSelection() {
			//TBD 
			var $b = $(".mpld-select-language"); //for pages with a static language change menu
			if ($b.length > 0) {
				//$b.addClass("link");
				if (!$changeLanguageMenu) {
					var href = window.location.href;
					var filename = href.replace(/^.*\//,"");
					var parts = filename.split("-");
					var len = parts.length-1;
					var platform = parts[len-1];
					var language = parts[len].replace(/\..*$/, "");//remove .html


					/*
			var href = window.location.href;
			var filename = href.replace(/^.*\//,"");
			var parts = filename.split("-");
			//var platform = parts[2];
			//var method = parts[3];
			var language = parts[parts.length-1].replace(/\..*$/, "");
			var targetLanguage = getLanguageId(langName);
			var targetPlatform = getPlatformId(platName)
			href = href.replace(language, targetLanguage);
					*/
					$changeLanguageMenu = $("#change-language-menu");
					for (let platId in platforms) {
						for (let langId of platforms[platId].languages) {
							let link = href.replace(language,langId);
							link = link.replace(platform, platId);
							$changeLanguageMenu.append(
								getMenuItem(
									me.getPlatformName(platId),
									me.getLanguageName(langId),
									link
								)
							);
						}
					}
					/*
					platforms[platform].languages.forEach(function (langId) {
						$changeLanguageMenu.append(getMenuItem(me.getLanguageName(langId)));
					});
					*/
				}
			}
		}

me.setPagePlatFormLanguage = function(_platform,_language) {
		curLang = _language;
		curPlatform = _platform;
		me.setDefaultLanguages(curLang);
}
		me.start = function(){
				setStartupPlatform();
				setStartupLanguage();
				$(document).ready(function(){

						setupPlatformSelection();
						var section;
						codeSections = $("." + mpldSectionClassName).get();
						for (var i = 0; i < codeSections.length; i++){
							var s = codeSections[i];
							var id = s.getAttribute('id');
							section = s.getAttribute('data-mpld-section');
							if (!id) {
								if (section) {
									s.setAttribute('id', section);
								}
							}
							buildButtons(s);
					
							var isInline = s.getAttribute("data-mpld-inline");
							if (isInline){
								for (var c = 0; c < s.children.length; c++) {
									var child = s.children[c];
									storeInlineText(child, section);
									//child.style.display = "none";
								}
							}
					
						}
						var cur_button;

						// click on the 1st button with the current language
						if (autoDoSetupLanguage) {
							me.updateLanguage();
						}
					})
			}

		return me;
		})();

//if (module) module.exports = mpld;