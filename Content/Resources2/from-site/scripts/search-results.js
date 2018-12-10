document.addEventListener("DOMContentLoaded", function () {
  var searchPaneElem = document.querySelector("#searchPane");

  // NOTE: This code is intended for the search results page in the docs.
  // When the page loads it takes time until MadCap scripts adds the "loading" class to the search pane.
  // Until the class is added it shows "Showing results..." text.
  // This code prevents this text to be shown before the spinner.
  if (searchPaneElem && window.location.search.match(/q=.+/)) {
    if (!document.querySelector("#resultList")) {
      searchPaneElem.classList.add("loading");
    }
  }
});