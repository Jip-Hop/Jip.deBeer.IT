(function () {
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    function detectIE() {
      var ua = window.navigator.userAgent;

      var msie = ua.indexOf("MSIE ");
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }

      var trident = ua.indexOf("Trident/");
      if (trident > 0) {
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }

      var edge = ua.indexOf("Edge/");
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
      }

      return false;
    }

    function filterNone() {
      return NodeFilter.FILTER_ACCEPT;
    }

    function uncommentWarning(rootElem) {
      var iterator = document.createNodeIterator(
        rootElem,
        NodeFilter.SHOW_COMMENT,
        filterNone,
        false
      );
      var curNode;
      while ((curNode = iterator.nextNode())) {
        if (curNode.textContent.indexOf("[if IE]>", 0) === 0) {
          var elem = document.createElement("div");
          elem.innerHTML = curNode.textContent
            .replace("[if IE]>", "")
            .replace("<![endif]", "")
            .trim();
          curNode.parentNode.replaceChild(elem.childNodes[0], curNode);
          break;
        }
      }
    }

    if (detectIE()) {
      uncommentWarning(document.body);
    }
  });
})();
