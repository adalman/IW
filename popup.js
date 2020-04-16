
console.log("popup!");
var colors = {};
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

        $(btn).spectrum({
          preferredFormat: "hex",
          change: function (color) {
            var ind = parseInt(this.id.substring(3, 4));
            var idi = "#cpi" + ind;
            var ido = "#cpo" + ind;
            var temp = "rgb(" + Math.round(color._r) + ", " + Math.round(color._g) + ", " + Math.round(color._b) + ")";
            console.log(temp);
            color = color.toString().toUpperCase();
            $(ido).val(color);
            var params = {}; // use params to update the background color of this button, cache original values
            //var colors = {}; // key is what it was, value is what it is changed to
            var bgColor1 = btn.style.backgroundColor;
            var bgColor2 = temp;
            colors[temp] = btn.style.backgroundColor;
            btn.style.backgroundColor = color;
            //params[parseHEX($(idi).val())] = parseHEX(color);
            console.log(color); 

            // send color back
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

              var query = { active: true, currentWindow: true };
              chrome.tabs.query(query, callback1);

              function callback1(tabs) {
                  var currentTab = tabs[0]; // there will be only one in this array
                  console.log(currentTab); // also has properties like currentTab.id
                  chrome.runtime.sendMessage({tab: currentTab, from: 'popup', subject: 'Elements', bgColor1: bgColor1, bgColor2: bgColor2}, function(response) {
                    console.log(response);
                  });
                }
            });

          }
        });
      
        let changeBackgroundDiv = document.getElementById('changeBackground');
        changeBackgroundDiv.appendChild(btn);
      });

      for (let backgroundButton of backgroundButtons) {
        backgroundButton.addEventListener('click', (element) => {
          // let bgColor = element.target.style.backgroundColor;
          //console.log(backgroundButton.style.backgroundColor);
          //let bgColor1 = element.target.style.backgroundColor;
          //let bgColor2 = colors[element.target.style.backgroundColor];
          //console.log("Color 1 = " + bgColor1 + " Color 2 = " + bgColor2);
          /***Used to run a one line query on webpage***/
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            function modifyDOM() {
              var query = { active: true, currentWindow: true };
              chrome.tabs.query(query, callback1);

              function callback1(tabs) {
                  var currentTab = tabs[0]; // there will be only one in this array
                  console.log(currentTab); // also has properties like currentTab.id
                  chrome.runtime.sendMessage({tab: currentTab, from: 'popup', subject: 'Elements', bgColor: bgColor}, function(response) {
                    console.log(response);
                  });
                }
              // chrome.runtime.sendMessage({subject:'Elements'}, function(response) {
              //   console.log(response);
              // })

              // chrome.tabs.getSelected(null, function(tab) {
              //   // Send a request to the content script.
              //   chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
              //     console.log(response.dom);
              //   });
              // });
                //You can play with your DOM here or check URL against your regex
                //console.log('Tab script:');
                // console.log(document.body.innerHTML);
                //return document.body.querySelectorAll('*'); // NEED TO DO THIS IN A NEW CONTENT SCRIPT https://stackoverflow.com/questions/1964225/accessing-current-tab-dom-object-from-popup-html
            }

            function getColor(bgColor) {
              console.log("here");
              var nodes = document.getElementsByTageName('*');
              var bgs = [];
              for (var node of nodes) {
                  bgs.push(node.style.backgroundColor);
                  if (node.style.backgroundColor == bgColor) {
                      node.style.backgroundColor = rgb(0,0,0);
                  }
              }
              return bgs;

            }
            modifyDOM();
            // chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
            //   chrome.tabs.sendMessage(tab.id, { method: method }, callback);
            // });

           /* chrome.tabs.executeScript(tabs[0].id, {
              //code: '(' + modifyDOM + ')();'
              // changes background color to black of selected elements
              // code: `var nodes = document.getElementsByTagName('*');
              // var bgs = [];
              // for (var node of nodes) {
              //     bgs.push(node.style.backgroundColor);
              //     if (node.style.backgroundColor == '${bgColor}') {
              //         node.style.backgroundColor = 'rgb(0,0,0)';
              //     }
              // }
              // return bgs;
              //  `
              code: '(' + getColor + ')('+bgColor+');'
            //   `document.body.style.setProperty('background-color','${bgColor}','important');
            //   var divs = document.getElementsByTagName('div');
            //   var canvases = document.getElementsByTagName('canvas');
            //   var tables = document.getElementsByTagName('table');
            //   for (let div of divs) {
            //     div.style.setProperty('background-color','transparent','important');
            //   }
            //   if(canvases){
            //     for (let canvas of canvases) {
            //       canvas.style.setProperty('background-color','transparent','important');
            //     }
            //   }
            //   if(tables){
            //     for (let table of tables) {
            //       table.style.setProperty('background-color','transparent','important');
            //     }
            //   }`
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
              
            }, function(results){
                console.log('Popup script:')
                console.log(results);
                // chrome.tabs.executeScript(tabs[0].id, {
                //     code: `var dom = '${results[0]}';
                //     `
                // })
                //console.log(results[0]);

        });*/
            // chrome.tabs.executeScript(tabs[0].id, {
            //     code: '(' + modifyDOM + ')();'}, 
            //     function(results){
            //         console.log('Popup script:')
            //         console.log(results[0]);
            //     });

          });
        });
      };
});


