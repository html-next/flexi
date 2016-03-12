export default function appendCachedRange(element, elementList) {
  const currentActiveElement = document.activeElement;
  let lastElement = element.lastChild || element.lastNode;
  let parent = lastElement ? lastElement.parentNode : element;

  console.log('---- PARENT ----');
  console.dir(parent);
  console.log('---- LOCATION ----');
  console.dir(lastElement);
  console.log('---- APPENDING ----');

  for (let i = 0; i < elementList.length; i++) {
    console.dir(elementList[i]);
    parent.insertBefore(elementList[i], lastElement);
  }

  console.log('____ FIN ____');

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}
