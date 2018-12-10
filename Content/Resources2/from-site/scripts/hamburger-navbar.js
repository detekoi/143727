document.addEventListener("DOMContentLoaded", function() {
  var COLLAPSE_TRESHOLD_WIDTH = 990;

  var isVisible = false;
  var sideMenuElement = document.querySelector(".side-navbar-menu");
  var menuBtn = document.querySelector(".navbar .btn-dropdown-menu");
  var menuElem = document.querySelector(".navbar .navbar-menu");
  var pageElement = document.querySelector(".page");

  if (menuBtn && menuElem) {
    menuBtn.addEventListener("click", toggleMenu);
  }

  if (sideMenuElement && pageElement) {
    window.addEventListener("resize", onResize);
    setHiddenPosition();
    sideMenuElement.classList.remove("hidden");
  }

  function toggleMenu(e) {
    if (isVisible) {
      pageElement.classList.remove("slide-left");
      pageElement.style.left = "0";
      pageElement.style.right = "0";
      setHiddenPosition();
      pageElement.removeEventListener("click", onClickOutside);
    }
    else {
      pageElement.classList.add("slide-left");
      updatePageLocation();
      sideMenuElement.style.right = "0";
      pageElement.addEventListener("click", onClickOutside);
    }

    isVisible = !isVisible;
  }

  function onClickOutside(e) {
    toggleMenu(e);
  }


  function onResize(e) {
    if (isVisible) {
      if (pageElement.clientWidth > COLLAPSE_TRESHOLD_WIDTH) {
        toggleMenu(e);
      } else {
        updatePageLocation();
      }
    } else {
      setHiddenPosition();
    }
  }

  function updatePageLocation() {
    pageElement.style.left = "-" + (sideMenuElement.offsetWidth) + "px";
    pageElement.style.right = (sideMenuElement.offsetWidth) + "px";
  }

  function setHiddenPosition() {
    sideMenuElement.style.right = "-" + (sideMenuElement.offsetWidth) + "px";
  }

});