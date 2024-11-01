/* eslint-disable ember/no-legacy-test-waiters */
import { isTesting, macroCondition } from '@embroider/macros';

import { assert } from '@ember/debug';
import { registerWaiter, unregisterWaiter } from '@ember/test';

export class ResizeMonitor {
  constructor() {
    this.elements = new Map();
    this.isPolling = false;
  }

  addElementHandler(element, handler) {
    assert(`element already has a handler`, !this.elements.has(element));

    this.elements.set(element, { width: 0, height: 0, handler });

    if (!this.isPolling) {
      this.poll();
    }
  }

  removeElementHandler(element) {
    assert(`element already has no handler`, this.elements.has(element));

    this.elements.delete(element);
  }

  poll() {
    this.isPolling = true;
    let hasFlushed = false;

    if (macroCondition(isTesting())) {
      this._waiter = () => {
        return hasFlushed;
      };
      registerWaiter(this._waiter);
    }

    requestAnimationFrame(() => {
      this.elements.forEach((info, element) => {
        const currentWidth = element.clientWidth;
        const currentHeight = element.clientHeight;
        const widthChanged = currentWidth !== info.width && info.width !== 0;
        const heightChanged = currentHeight !== info.height && info.height !== 0;

        info.width = currentWidth;
        info.height = currentHeight;

        if (widthChanged || heightChanged) {
          info.handler.call(null, info);
        }
      });

      hasFlushed = true;
      if (macroCondition(isTesting())) {
        unregisterWaiter(this._waiter);
        this._waiter = null;
      }

      setTimeout(() => {
        this.isPolling = this.elements.size > 0;
        if (this.isPolling) {
          this.poll();
        }
      }, 0);
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
