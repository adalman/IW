// This helps avoid conflicts in case we inject 
// this script on the same page multiple times
// without reloading.
//alert(JSON.stringify(bgColor1));
var nodes = document.querySelectorAll('*');
console.log(nodes);

//Loop through all the nodes
for (i = 0; i < nodes.length; i++) {
// The current node
node = nodes[i];
// The computed background-color value
color = window.getComputedStyle(node)['background-color'];
color = color.replace(/ /g, '');
bgColor1 = bgColor1.replace(/\s/g, '');
if (
    !(bgColor1.indexOf('rgba') === 0 && bgColor1.substr(-3) === ',0)')
  ) {
console.log(color + " versus " + bgColor1);

  }
if (color == bgColor1) {
    console.log("HIT");
    node.style.backgroundColor = bgColor2;
}
// Strip spaces from the color for succinctness
// If the color is not white or fully transparent...
}
// var injected = injected || (function(bgColor){
//     alert(JSON.stringify(bgColor));

    // An object that will contain the "methods"
    // we can use from our event script.
    //var methods = {};
  
    // Return all of the background-color values
//   methods.getElements = function(){
//     alert(JSON.stringify(bgColor));
//       // Stores the colors and the number of occurrences
//       var colors = {};
//       // Get all the nodes on a page
//       var nodes = document.querySelectorAll('*');
//       // Instantiate variables we'll use later
//       var node, nodeArea, bgColor, i;
    
//       // Loop through all the nodes
//       for (i = 0; i < nodes.length; i++) {
//         // The current node
//         node = nodes[i];
//         // The area in pixels occupied by the element
//         nodeArea = node.clientWidth * node.clientHeight;
//         // The computed background-color value
//         bgColor = window.getComputedStyle(node)['background-color'];
//         // Strip spaces from the color for succinctness
//         bgColor = bgColor.replace(/ /g, '');
//         // If the color is not white or fully transparent...
//         if (
//           bgColor != 'rgb(255,255,255)' &&
//           !(bgColor.indexOf('rgba') === 0 && bgColor.substr(-3) === ',0)')
//         ) {
//           // ...set or override it in the colors object,
//           // adding the current element area to the
//           // existing value.
//           colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;
//         }
//       }
//        // Sort and return the colors by
//     // total area descending
//     return Object.getOwnPropertyNames(colors).sort(function (a, b) {
//       return colors[b] - colors[a];
//     });
//   }
  
//     // This tells the script to listen for
//     // messages from our extension.
//     chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//       var data = {};
//       // If the method the extension has requested
//       // exists, call it and assign its response
//       // to data.
//       if (methods.hasOwnProperty(request.method))
//         data = methods[request.method]();
//       // Send the response back to our extension.
//       sendResponse({ data: data });
//       return true;
//     });
  
//     return true;
//   })();