// This helps avoid conflicts in case we inject
// this script on the same page multiple times
// without reloading.
//alert(JSON.stringify(bgColor1));
var nodes = document.querySelectorAll("*");
console.log(nodes);

//Loop through all the nodes
for (i = 0; i < nodes.length; i++) {
  // The current node
  node = nodes[i];
  // The computed background-color value
  color = window.getComputedStyle(node)["background-color"];
  color = color.replace(/ /g, "");
  bgColor1 = bgColor1.replace(/\s/g, "");
  if (!(bgColor1.indexOf("rgba") === 0 && bgColor1.substr(-3) === ",0)")) {
    console.log(color + " versus " + bgColor1);
  }
  if (color == bgColor1) {
    console.log("HIT");
    node.style.backgroundColor = bgColor2;
  }
}
