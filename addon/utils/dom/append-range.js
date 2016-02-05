export default function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = document.activeElement;

  while (firstNode) {
    element.insertBefore(firstNode, null);
    firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
