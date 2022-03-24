/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-imports */
import { assert } from '@ember/debug';
import Evented from '@ember/object/evented';
import { debounce } from '@ember/runloop';
import Service from '@ember/service';
import { cached, tracked } from '@glimmer/tracking';

import window from 'ember-window-mock';

import monitor from '../../lib/monitor';

const FRAME_RATE = 16;
const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 1000;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// TODO deprecate evented API
export default class extends Service.extend(Evented) {
  breakpoints = null;

  // TODO set these from config if in fastboot
  // else set from window
  @tracked height = DEFAULT_HEIGHT;
  @tracked width = DEFAULT_WIDTH;

  monitor = monitor;
  window = window;
  _resizeHandler = null;

  @cached
  get orientation() {
    return this.width >= this.height ? 'landscape' : 'portrait';
  }

  @cached
  get orientationIsLandscape() {
    return this.orientation === 'landscape';
  }
  @cached
  get orientationIsPortrait() {
    return this.orientation === 'portrait';
  }

  configure(config) {
    this.breakpoints = config.breakpoints;
    this.setupBreakpoints();

    if (typeof window === 'object' && typeof document === 'object') {
      this.setupResize();
      this.updateResolution();
    }
  }

  willDestroy(...args) {
    super.willDestroy(...args);

    if (typeof window === 'object' && typeof document === 'object') {
      window.removeEventListener('resize', this._resizeHandler, true);
    }
    this.window = null;
  }

  setupBreakpoints() {
    assert(
      'You must configure some breakpoints',
      Array.isArray(this.breakpoints) && this.breakpoints.length > 0
    );

    // sort breakpoints largest to smallest
    // TODO do this at build time
    this.breakpoints = this.breakpoints.sort(function (a, b) {
      return a.begin > b.begin ? -1 : 1;
    });

    // sort smallest to largest
    const bps = deepCopy(this.breakpoints, true);
    bps.reverse();

    bps.forEach((bp, i) => {
      const capitalized = capitalize(bp.name);
      const prop1 = `is${capitalized}`;
      const desc1 = {
        get() {
          const { width } = this;
          const next = bps[i + 1];

          if (next) {
            return width >= bp.begin && width < next.begin;
          }
          return width >= bp.begin;
        },
      };
      cached(this, prop1, desc1);
      Object.defineProperty(this, prop1, desc1);

      const prop2 = `isAtLeast${capitalized}`;
      const desc2 = {
        get() {
          const { width } = this;

          return width >= bp.begin;
        },
      };
      cached(this, prop2, desc2);
      Object.defineProperty(this, prop2, desc2);
    });
  }

  setupResize() {
    this._resizeHandler = () => {
      debounce(this, this.updateResolution, FRAME_RATE);
    };
    window.addEventListener('resize', this._resizeHandler, true);
  }

  /**
   * Runs when resized and fires off events
   */
  updateResolution() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const oldWidth = this.width;
    const oldHeight = this.height;
    const width = this._currentWidth();
    const height = this._currentHeight();

    this.width = width;
    this.height = height;

    if (oldWidth !== width) {
      this.trigger('width-change');
    }

    if (oldHeight !== height) {
      this.trigger('height-change');
    }

    if (oldWidth !== width || oldHeight !== height) {
      this.trigger('resize');
    }
  }

  _currentWidth() {
    const widths = [
      this.window.document.documentElement.clientWidth,
      this.window.innerWidth,
      this.window.screen.width, // for mobile iOS
    ];
    return Math.min(...widths.filter(Boolean));
  }

  _currentHeight() {
    const heights = [
      this.window.document.documentElement.clientHeight,
      this.window.innerHeight,
      this.window.screen.height, // for mobile iOS
    ];
    return Math.min(...heights.filter(Boolean));
  }
}
