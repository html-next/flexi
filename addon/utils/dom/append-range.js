export default function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = document.activeElement;
  let lastElement = element.lastChild || element.lastNode;
  let parent = lastElement ? lastElement.parentNode : element;
  let nextNode;

  console.log('---- PARENT ----');
  console.dir(parent);
  console.log('---- LOCATION ----');
  console.dir(lastElement);
  console.log('---- APPENDING ----');

  while (firstNode) {
    console.dir(firstNode);
    nextNode = firstNode.nextSibling;
    parent.insertBefore(firstNode, lastElement);
    firstNode = firstNode !== lastNode ? nextNode : null;
  }

  console.log('____ FIN ____');

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
