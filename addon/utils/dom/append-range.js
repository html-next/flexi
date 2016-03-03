export default function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = document.activeElement;
  let parent = element.parentNode;

  while (firstNode) {
    parent.insertBefore(firstNode, element);
    firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
