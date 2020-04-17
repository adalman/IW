/* 
Injected content script that reverts page elements to their original colors.
*/
var nodes = document.querySelectorAll("*");

//Loop through all the nodes
for (i = 0; i < nodes.length; i++) {
  // The current node
  node = nodes[i];
  // The computed background-color value
  color = window.getComputedStyle(node)["background-color"];
  color = color.replace(/ /g, ""); // remove spaces for key compatability
  var orig = colors[color];

  node.style.backgroundColor = orig;
}
