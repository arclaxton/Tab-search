// ==UserScript==
// @name         Google - tab to results
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enable keyboard selection for google's search results.
// @author       arclaxton
// @match         *://www.google.com/search*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
	document.onkeydown=function(event) {
        $(".gb_Qc gb_Rc gb_ec").blur();
		if(event.keyCode == 9) {
			if(document.selectedResultId === undefined) {
				document.selectedResultId=0;
				document.onkeydown=function(event){
					if(event.keyCode==38 || (event.shiftKey && event.keyCode == 9)) {
						$(".gsfi").blur();
						selectResult(document.selectedResultId-1);
						event.preventDefault();
					}
					else if(event.keyCode==40 || event.keyCode==9)
					{
						$("gsfi").blur();
						selectResult(document.selectedResultId+1);
						event.preventDefault();
					}
					if(event.keyCode==13){
						var el = document.querySelectorAll("h3.r")[document.selectedResultId];
						var lnk = el.querySelector("a");
						var url = lnk.href;
						if(event.ctrlKey){
							var win = window.open(url,"_blank");
							win.blur();
							window.open().close();
						}
						else{
							document.location = url;
						}
					}
					if(event.keyCode == 220 && event.ctrlKey) {
						$(".gsfi").focus();
					}
				};
				selectResult(0);
			}
			event.preventDefault();
		}
		if(event.keyCode == 220 && event.ctrlKey) {
			$(".gsfi").focus();
		}
	};
	function selectResult(newId){
		var els = [].slice.call(document.querySelectorAll("h3.r"));
		newId = newId%els.length;
		var oldElsLength = els.length;
		var badEntries = document.querySelector("#irq") == null ? [] : document.querySelector("#irq").querySelectorAll("h3.r");
					badEntries = [].slice.call(badEntries); // these ones are the results inside the 'people also search for' box
					var firstmatch = true;
					for(var i = badEntries.length - 1; i>=0; i--) {
						for (var j = els.length - 1; j >= 0; j--) {
							if(els[j].innerHTML == badEntries[i].innerHTML) {
								//els.splice(j,1); // we don't want to bother with them
								if(j == newId) { // Also need to correct the id we're selecting to account for spliced results
									console.log(j);
								if(firstmatch) newId -= badEntries.length;
								else newId += badEntries.length;
								console.log(newId);
							}
							firstmatch = false;
						}
					}
				}
				while(newId<0) newId+=els.length;
				console.log("new id = "+newId);
				var rp = document.getElementById("result-pointer");
				if(rp != null){
					rp.remove();
				}
				document.selectedResultId=newId;
				var el = els[newId];
				var lnk = el.firstElementChild;
				el.innerHTML = "<div id=\"result-pointer\" style=\"position:absolute;left:-15px;\">&gt;</div>" + el.innerHTML;
				lnk.focus();
					// now for some scrolling
					if(newId == els.length-1)
						el.scrollIntoView({behavior: "smooth"});
					else
						els[newId+1].scrollIntoView({behavior: "smooth", block:"end"});
				}
			})();