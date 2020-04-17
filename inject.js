/* 
Injected content script that scrapes all of the background colors from the page,
sorting them based on area size.
Created with help from this tutorial: https://css-tricks.com/colorpeek-part-2-building-first-chrome-extension/
*/
var injected =
  injected ||
  (function () {
    // An object that will contain the "methods"
    // we can use from our event script.
    var methods = {};

    methods.getBgColors = function () {
      var colors = {};
      // Get all the nodes on a page
      var nodes = document.querySelectorAll("*");
      var node, nodeArea, bgColor, i;

      // Loop through all the nodes
      for (i = 0; i < nodes.length; i++) {
        node = nodes[i];
        // The area in pixels occupied by the element
        nodeArea = node.clientWidth * node.clientHeight;
        // The computed background-color value
        bgColor = window.getComputedStyle(node)["background-color"];
        // Strip spaces from the color for succinctness
        bgColor = bgColor.replace(/ /g, "");
        // If the color is not fully transparent
        if (!(bgColor.indexOf("rgba") === 0 && bgColor.substr(-3) === ",0)")) {
          colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;
        }
      }
      // Sort and return the colors by
      // total area descending
      return Object.getOwnPropertyNames(colors).sort(function (a, b) {
        return colors[b] - colors[a];
      });
    };

    // This tells the script to listen for
    // messages from our extension.
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      var data = {};
      if (methods.hasOwnProperty(request.method))
        data = methods[request.method]();
      // Send the response back to our extension.
      sendResponse({ data: data });
      return true;
    });

    return true;
  })();
