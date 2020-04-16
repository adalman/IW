console.log("here");
console.log(colors);

var nodes = document.querySelectorAll("*");

//Loop through all the nodes
for (i = 0; i < nodes.length; i++) {
  // The current node
  node = nodes[i];
  // The computed background-color value
  color = window.getComputedStyle(node)["background-color"];
  color = color.replace(/ /g, "");
  var orig = colors[color];
  // bgColor1 = bgColor1.replace(/\s/g, "");

    node.style.backgroundColor = orig;
}
