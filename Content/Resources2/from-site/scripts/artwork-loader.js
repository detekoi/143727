document.addEventListener("DOMContentLoaded", function () {
  var artElems = document.querySelectorAll(".artwork");

  if (artElems) {
    for (var index = 0; index < artElems.length; index++) {
      processElement(artElems[index]);
    }
  }

  function processElement(currEl) {
    var computedStyle = window.getComputedStyle(currEl);
    var backgroundImageStyle = computedStyle.getPropertyValue("background-image");

    if (backgroundImageStyle) {
      var match = backgroundImageStyle.match(/url\("?(.+)"?\)/i);

      if (match && match[1]) {
        var url = match[1].replace(/"/g, "");
        var pseudoImage = new Image();

        pseudoImage.src = url;
        pseudoImage.addEventListener("load", function () {
          currEl.classList.add("loaded");
        });
      }
    }
  }
});