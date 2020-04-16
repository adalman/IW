console.log("popup!");
var colors = {};
var original = {}; 
var query = { active: true, currentWindow: true };
chrome.tabs.query(query, callback);

function callback(tabs) {
  var currentTab = tabs[0]; // there will be only one in this array
  console.log(currentTab); // also has properties like currentTab.id
  chrome.runtime.sendMessage({
    tab: currentTab,
    from: "popup",
    subject: "DOMInfo",
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  document.getElementById("changeBackground").innerHTML = "";
  console.log(request.data.content); // these are the color codes!!!

  // build the html
  const backgroundButtons = document.getElementsByClassName("backgroundButton");
  const bgbuttonArr = request.data.content;

  bgbuttonArr.forEach((color, i) => {
    let btn = document.createElement("button");
    btn.className = "backgroundButton";
    btn.id = `backgroundButton_${i}`;
    btn.style.backgroundColor = color;
    original[color] = color; // save initial color
    console.log("color " + color);

    $(btn).spectrum({
      preferredFormat: "hex",
      change: function (color) {
        // reset  height
        document.body.style.height = (document.body.style.height - 200) + "px";
        // chrome.storage.sync.get("height", function (obj) {
        //   console.log(obj);
        //   // document.body.style.height = obj + "px";
        //   document.body.style.height = 0 + "px";
        // })
        var ind = parseInt(this.id.substring(3, 4));
        var idi = "#cpi" + ind;
        var ido = "#cpo" + ind;
        var temp =
          "rgb(" +
          Math.round(color._r) +
          ", " +
          Math.round(color._g) +
          ", " +
          Math.round(color._b) +
          ")";
        console.log(temp);
        color = color.toString().toUpperCase();
        $(ido).val(color);
        // var params = {}; // use params to update the background color of this button, cache original values
        //var colors = {}; // key is what it was, value is what it is changed to
        
        
        var bgColor1 = btn.style.backgroundColor; 
        var bgColor2 = temp; 
        colors[temp] = btn.style.backgroundColor;
        btn.style.backgroundColor = color;

        // update original color array
        // console.log('bgColor1 ' + bgColor1);
        var orig = original[bgColor1.replace(/\s/g, '')];
        original[bgColor2.replace(/\s/g, '')] = orig;
        //console.log(orig);
        
        //params[parseHEX($(idi).val())] = parseHEX(color);
        // console.log(color);

        // send color back
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          var query = { active: true, currentWindow: true };
          chrome.tabs.query(query, callback1);

          function callback1(tabs) {
            var currentTab = tabs[0]; // there will be only one in this array
            // console.log(currentTab); // also has properties like currentTab.id
            chrome.runtime.sendMessage(
              {
                tab: currentTab,
                from: "popup",
                subject: "Elements",
                bgColor1: bgColor1,
                bgColor2: bgColor2,
              },
              function (response) {}
            );
          }
        });
      },
    });

    let changeBackgroundDiv = document.getElementById("changeBackground");
    changeBackgroundDiv.appendChild(btn);
  });

  //let reset = document.createElement

  for (let backgroundButton of backgroundButtons) {
    backgroundButton.addEventListener("click", (element) => {
      chrome.storage.sync.set({"height": document.body.style.height}); // save original height
      var orig = document.body.style.height;
      console.log(orig);
      orig = orig + 200;
      
      document.body.style.height = orig + "px"; // make it bigger
      console.log(document.body.style.height);
    });
  }

  const resetButton = document.getElementsByClassName("reset");
  console.log(resetButton);
  resetButton[0].addEventListener("click", (element) => {
    console.log("clicked");
    // send original color back
    chrome.tabs.query({ active: true, currentWindow: true }, function (
      tabs
    ) {
      var query = { active: true, currentWindow: true };
      chrome.tabs.query(query, callback1);

      function callback1(tabs) {
        var currentTab = tabs[0]; // there will be only one in this array
        // console.log(currentTab); // also has properties like currentTab.id

        console.log(original);
        chrome.runtime.sendMessage(
          {
            tab: currentTab,
            from: "popup",
            subject: "Reset",
            colors: original
          },
          function (response) {}
        );
      }
    });

  })
});
