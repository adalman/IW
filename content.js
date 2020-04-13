// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
    chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
      chrome.tabs.sendMessage(tab.id, { method: method }, callback);
    });
  }
  
  // Get background-color values from the current tab
// and open them in Colorpeek.
function getBgColors (tab) {
    injectedMethod(tab, 'getBgColors', function (response) {
      var colors = response.data;
      if (colors && colors.length) {
        alert('Colors on page: ' + colors);

        return colors; 
      } else {
        alert('No background colors were found! :(');

        return null;
      }

    })
  }
  
  // When the browser action is clicked, call the
  // getBgColors function.
  //chrome.browserAction.onClicked.addListener(getBgColors);
  chrome.runtime.onMessage.addListener((msg, sender,response) => {
      if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
            response(getBgColors);
      }
  });