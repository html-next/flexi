export default function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = document.activeElement;
  let lastElement = element.lastChild || element.lastNode;
  let parent = lastElement ? lastElement.parentNode : element;
  let nextNode;

  while (firstNode) {
    nextNode = firstNode.nextSibling;
    parent.insertBefore(firstNode, lastElement);
    firstNode = firstNode !== lastNode ? nextNode : null;
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
