export default function appendCachedRange(element, elementList) {
  const currentActiveElement = document.activeElement;
  const lastElement = element.lastChild || element.lastNode;
  const parent = lastElement ? lastElement.parentNode : element;

  for (let i = 0; i < elementList.length; i++) {
    parent.insertBefore(elementList[i], lastElement);
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
