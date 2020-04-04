// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
    chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
      chrome.tabs.sendMessage(tab.id, { method: method }, callback);
    });
  }
  
//   function getBgColors (tab) {
//     // When we get a result back from the getBgColors
//     // method, alert the data
//     injectedMethod(tab, 'getBgColors', function (response) {
//       alert('Elements in tab: ' + response.data);
//       return true;
//     });
//   }

  // Get background-color values from the current tab
// and open them in Colorpeek.
function getBgColors (tab) {
    injectedMethod(tab, 'getBgColors', function (response) {
      var colors = response.data;
      if (colors && colors.length) {
        alert('Colors on page: ' + colors);
      } else {
        alert('No background colors were found! :(');
      }
      return true;
    })
  }
  
  // When the browser action is clicked, call the
  // getBgColors function.
  chrome.browserAction.onClicked.addListener(getBgColors);