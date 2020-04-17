
/*
Content script that changes all page elements of color 1 to color 2.
*/
//alert(JSON.stringify(bgColor1));
var nodes = document.querySelectorAll("*");

//Loop through all the nodes
for (i = 0; i < nodes.length; i++) {
  // The current node
  node = nodes[i];
  // The computed background-color value
  color = window.getComputedStyle(node)["background-color"];
  color = color.replace(/ /g, "");
  bgColor1 = bgColor1.replace(/\s/g, "");
  if (color == bgColor1) {
    //console.log("HIT");
    node.style.backgroundColor = bgColor2;
  }
}
