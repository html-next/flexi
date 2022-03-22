import { defineProperty } from '@ember/object';
import { copy } from 'ember-copy';
import { computed } from '@ember/object';
import Evented from '@ember/object/evented';
import { run } from '@ember/runloop';
import Service from '@ember/service';
import capitalize from '../../utils/capitalize';
import monitor from '../../lib/monitor';
import window from 'ember-window-mock';

export default Service.extend(Evented, {
  breakpoints: null,
  height: 500,
  monitor,
  width: 1000,
  _resizeHandler: null,

  orientation: computed('width', 'height', function() {
    let resolution = this.getProperties('width', 'height');
    let isLandscape = resolution.width >= resolution.height;

    return isLandscape ? 'landscape' : 'portrait';
  }).readOnly(),

  orientationIsLandscape: computed.equal('orientation', 'landscape'),
  orientationIsPortrait: computed.not('orientationIsLandscape'),

  init() {
    this._super();

    this.setupBreakpoints();

    if (typeof window === 'object' && typeof document === 'object') {
      this.setupResize();
      this.updateResolution();
    }
  },

  willDestroy() {
    this._super(...arguments);

    if (typeof window === 'object' && typeof document === 'object') {
      window.removeEventListener('resize', this._resizeHandler, true);
    }
  },

  setupBreakpoints() {
    if (!this.breakpoints) {
      throw new Error('You must configure some breakpoints');
    }

    // sort breakpoints largest to smallest
    this.breakpoints = this.breakpoints.sort(function(a, b) {
      return a.begin > b.begin ? -1 : 1;
    });

    // sort smallest to largest
    let bps = copy(this.breakpoints, true).sort(function(a, b) {
      return a.begin > b.begin ? 1 : -1;
    });

    bps.forEach((bp, i) => {

      defineProperty(this, `is${capitalize(bp.name)}`, computed('width', function() {
        let width = this.get('width');
        let next = bps[i + 1];

        if (next) {
          return width >= bp.begin && width < next.begin;
        }
        return width >= bp.begin;
      }));

      defineProperty(this, `isAtLeast${capitalize(bp.name)}`, computed('width', function() {
        let width = this.get('width');

        return width >= bp.begin;
      }));

    });
  },

  setupResize() {
    this._resizeHandler = () => {
      run.debounce(this, this.updateResolution, 16);
    };
    window.addEventListener('resize', this._resizeHandler, true);
  },

  /**
   * Runs when resized and fires off events
   */
  updateResolution() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    let oldWidth = this.get('width');
    let oldHeight = this.get('height');
    let width = this._currentWidth();
    let height = this._currentHeight();

    this.setProperties({
      width,
      height
    });

    if (oldWidth !== width) {
      this.trigger('width-change');
    }

    if (oldHeight !== height) {
      this.trigger('height-change');
    }

    if ((oldWidth !== width) || (oldHeight !== height)) {
      this.trigger('resize');
    }
  },

  _currentWidth() {
    const widths = [
      window.document.documentElement.clientWidth,
      window.innerWidth,
      window.screen.width // for mobile iOS
    ]
    return Math.min(...widths.filter(width => width));
  },

  _currentHeight() {
    const heights = [
      window.document.documentElement.clientHeight,
      window.innerHeight,
      window.screen.height // for mobile iOS
    ]
    return Math.min(...heights.filter(height => height));
  }
});
