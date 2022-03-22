import { run } from '@ember/runloop';

const DEFAULT_ARRAY_SIZE = 10;

export class ResizeMonitor {
  constructor() {
    this.elements = Array.from({ length: DEFAULT_ARRAY_SIZE });
    this.maxLength = DEFAULT_ARRAY_SIZE;
    this.length = 0;
    this.handlers = Array.from({ length: DEFAULT_ARRAY_SIZE });
    this.isPolling = false;
  }

  addElementHandler(element, handler) {
    let index = this.elements.indexOf(element);

    if (index === -1) {
      index = this.length++;

      if (index === this.maxLength) {
        this.maxLength *= 2;
        this.elements.length = this.maxLength;
        this.handlers.length = this.maxLength;
      }

      this.elements[index] = element;
      this.handlers[index] = { width: 0, height: 0, handlers: [handler] };
    } else {
      const { handlers } = this.handlers[index];

      handlers.push(handler);
    }

    if (!this.isPolling) {
      this.poll();
    }
  }

  removeElementHandler(element, handler) {
    const elementIndex = this.elements.indexOf(element);

    if (elementIndex === -1) {
      return;
    }

    const elementCache = this.handlers[elementIndex];

    if (elementCache && elementCache.handlers) {
      const index = elementCache.handlers.indexOf(handler);

      if (index === -1) {
        throw new Error('Attempted to remove an unattached handler');
      }

      elementCache.handlers.splice(index, 1);

      // cleanup element entirely if needed
      if (elementCache.handlers.length === 0) {
        this.elements.splice(elementIndex, 1);
        this.handlers.splice(elementIndex, 1);
        this.length--;
        this.maxLength--;
      }
    } else {
      throw new Error('Attempted to remove an unattached handler');
    }
  }

  poll() {
    this.isPolling = true;

    requestAnimationFrame(() => {
      for (let i = 0; i < this.length; i++) {
        const element = this.elements[i];
        const info = this.handlers[i];
        const currentWidth = element.clientWidth;
        const currentHeight = element.clientHeight;
        const widthChanged = currentWidth !== info.width && info.width !== 0;
        const heightChanged =
          currentHeight !== info.height && info.height !== 0;

        info.width = currentWidth;
        info.height = currentHeight;

        if (widthChanged || heightChanged) {
          run.join(() => {
            for (let j = 0; j < info.handlers.length; j++) {
              info.handlers[j].call(null, info);
            }
          });
        }
      }

      this.isPolling = this.length > 0;
      if (this.isPolling) {
        this.poll();
      }
    });
  }
}

const instance = new ResizeMonitor();

export function addResizeHandler(element, handler) {
  instance.addElementHandler(element, handler);
}

export function removeResizeHandler(element, handler) {
  instance.removeElementHandler(element, handler);
}

export default instance;
