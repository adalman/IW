// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
// function injectedMethod (tab, method, callback) {
//     chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
//       chrome.tabs.sendMessage(tab.id, { method: method }, callback);
//     });
//   }
  
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
// function getBgColors (tab) {
//     injectedMethod(tab, 'getBgColors', function (response) {
//       var colors = response.data;
//       if (colors && colors.length) {
//         alert('Colors on page: ' + colors);

        // colors.forEach((color, i) => {
        //     let btn = document.createElement('button');
        //     btn.className = 'backgroundButton';
        //     btn.id = `backgroundButton_${i}`
        //     btn.style.backgroundColor = color;
        //     let changeBackgroundDiv = document.getElementById('changeBackground');
        //     changeBackgroundDiv.appendChild(btn);

        //     for (let backgroundButton of backgroundButtons) {
        //         backgroundButton.addEventListener('click', (element) => {
        //           let bgColor = element.target.style.backgroundColor;
        //           /***Used to run a one line query on webpage***/
        //           chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //             chrome.tabs.executeScript(tabs[0].id, {
        //               code: `document.body.style.setProperty('background-color','${bgColor}','important');
        //                       var divs = document.getElementsByTagName('div');
        //                       var canvases = document.getElementsByTagName('canvas');
        //                       var tables = document.getElementsByTagName('table');
        //                       for (let div of divs) {
        //                         div.style.setProperty('background-color','transparent','important');
        //                       }
        //                       if(canvases){
        //                         for (let canvas of canvases) {
        //                           canvas.style.setProperty('background-color','transparent','important');
        //                         }
        //                       }
        //                       if(tables){
        //                         for (let table of tables) {
        //                           table.style.setProperty('background-color','transparent','important');
        //                         }
        //                       }`
        //             });
        //           });
        //         });
        //     };

        // })
//       } else {
//         alert('No background colors were found! :(');
//       }
//       return true;
//     })
//   }

  // When the browser action is clicked, call the
  // getBgColors function.
 // chrome.browserAction.onClicked.addListener(getBgColors);

//  const setDomInfo = info => {

//  }
console.log("popup!");
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(request);
//         if (request.msg === "completed") {
//             //  To do something
//             console.log(request.data.subject)
//             console.log(request.data.content)
//         }
//     }
// );
var query = { active: true, currentWindow: true };
chrome.tabs.query(query, callback);
function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    console.log(currentTab); // also has properties like currentTab.id
    chrome.runtime.sendMessage({tab: currentTab, from: 'popup', subject: 'DOMInfo'});
  }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.data.content); // these are the color codes!!!

    // build the html
    const backgroundButtons = document.getElementsByClassName("backgroundButton");
    const bgbuttonArr = request.data.content;

    bgbuttonArr.forEach((color, i) => {
        let btn = document.createElement('button');
        btn.className = 'backgroundButton';
        btn.id = `backgroundButton_${i}`
        btn.style.backgroundColor = color;
      
        let changeBackgroundDiv = document.getElementById('changeBackground');
        changeBackgroundDiv.appendChild(btn);
      });

      for (let backgroundButton of backgroundButtons) {
        backgroundButton.addEventListener('click', (element) => {
          let bgColor = element.target.style.backgroundColor;
          /***Used to run a one line query on webpage***/
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
              code: `document.body.style.setProperty('background-color','${bgColor}','important');
              var divs = document.getElementsByTagName('div');
              var canvases = document.getElementsByTagName('canvas');
              var tables = document.getElementsByTagName('table');
              for (let div of divs) {
                div.style.setProperty('background-color','transparent','important');
              }
              if(canvases){
                for (let canvas of canvases) {
                  canvas.style.setProperty('background-color','transparent','important');
                }
              }
              if(tables){
                for (let table of tables) {
                  table.style.setProperty('background-color','transparent','important');
                }
              }`
            //   `var nodes = document.querySelectorAll('*');
            //         var node, nodeArea, bgColor, i;
                    
            //         for (i = 0; i < nodes.length; i++) {
            //             node = nodes[i];
                       
            //             bgColor = window.getComputedStyle(node)['background-color'];
                        
            //             bgColor = bgColor.replace(/ /g, '');
            //             if (bgColor == ${bgColor}) {
            //                 node.style.setProperty('background-color', 'rgb(0,0,0), 'important);
            //             }
            //         }`
              
            });
          });
          /***Used to run a one line query on webpage***/
        });
      }



});


