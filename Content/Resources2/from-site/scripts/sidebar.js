document.addEventListener("DOMContentLoaded", function () {
  var sidebarElem = document.querySelector(".docs .sidebar .sticky-menu");
  var containerElem = document.querySelector(".docs .container");

  if (sidebarElem && containerElem) {
    window.addEventListener("scroll", onScroll, true);
    onScroll();
  }

  function onScroll(e) {
    var containerBottom = containerElem.clientHeight + containerElem.offsetTop;
    var containerRect = containerElem.getBoundingClientRect();
    var scrollTop =  document.documentElement.scrollTop;

    var pageBottom = scrollTop + document.documentElement.clientHeight;

    if (scrollTop < containerElem.offsetTop) {
      sidebarElem.style.top = (containerRect.top + 7) + "px";
    }
    else {
      sidebarElem.style.top = "70px";
    }

    if (pageBottom > containerBottom) {
      sidebarElem.style.bottom = (document.documentElement.clientHeight - containerRect.bottom) + "px";
    } else {
      sidebarElem.style.bottom = "0px";
    }

  }

});