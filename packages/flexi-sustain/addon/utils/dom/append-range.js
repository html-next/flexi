export default function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = document.activeElement;
  const lastElement = element.lastChild || element.lastNode;
  const parent = lastElement ? lastElement.parentNode : element;
  let nextNode;

  while (firstNode) {
    nextNode = firstNode.nextSibling;
    lastElement.before(firstNode);
    firstNode = firstNode !== lastNode ? nextNode : null;
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
