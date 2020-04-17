/*
Main background script that listens for messages from the popup and executes
content scripts upon message received.
*/
// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod(tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: "inject.js" }, function () {
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function injectedMethod2(tab, bgColor1, bgColor2, method, callback) {
  console.log(bgColor1 + " " + bgColor2);
  chrome.tabs.executeScript(
    tab.id,
    {
      code:
        "var bgColor1 = " +
        JSON.stringify(bgColor1) +
        ";" +
        "var bgColor2 = " +
        JSON.stringify(bgColor2) +
        ";",
    },
    function () {
      chrome.tabs.executeScript(tab.id, { file: "elements.js" }, function () {
        chrome.tabs.sendMessage(tab.id, { method: method }, callback);
      });
    }
  );
}

function injectedMethod3(tab, colors, method, callback) {
  console.log(JSON.stringify(colors));
  chrome.tabs.executeScript(
    tab.id,
    {
      code:
        "var colors = " +
        JSON.stringify(colors) +
        ";"
    },
    function () {
      chrome.tabs.executeScript(tab.id, { file: "reset.js" }, function () {
        chrome.tabs.sendMessage(tab.id, { method: method }, callback);
      });
    }
  );
  getBgColors(tab);
}

// Get background-color values from the current tab
// and open them in Colorpeek.
function getBgColors(tab) {
  injectedMethod(tab, "getBgColors", function (response) {
    var colors = response.data;
    if (colors && colors.length) {
      //alert('Colors on page: ' + colors);
      console.log(colors);
      //return colors;
      chrome.runtime.sendMessage({
        msg: "completed",
        data: {
          subject: "colors",
          content: colors,
        },
      });
      //sendResponse({colors: colors});
    } else {
      alert("No background colors were found! :(");
    }
    //eturn true;
  });
}

function getDomElements(tab, bgColor1, bgColor2) {
  //console.log(document.getElementsByTagName('*'));
  injectedMethod2(tab, bgColor1, bgColor2, "getElements", function (response) {
    console.log(response);
    //eturn true;
  });
}

function resetElements(tab, colors) {
  console.log(colors);
  //console.log(document.getElementsByTagName('*'));
  injectedMethod3(tab, colors, "resetElements", function (response) {
    // console.log(response);
    //eturn true;
  });
}

// When the browser action is clicked, call the
// getBgColors function.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.from === "popup" && request.subject === "DOMInfo") {
    getBgColors(request.tab);
    //sendResponse({colors: getBgColors(request.tab)});
  }
  if (request.from === "popup" && request.subject === "Elements") {
    console.log("here");
    getDomElements(request.tab, request.bgColor1, request.bgColor2);
  }

  if (request.from === "popup" && request.subject === "Reset") {
    console.log("here");
    resetElements(request.tab, request.colors);
  }
});

