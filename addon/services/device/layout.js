import Ember from 'ember';
import capitalize from '../../utils/capitalize';
import monitor from '../../lib/monitor';

const {
  computed,
  copy,
  Service,
  run
  } = Ember;

export default Service.extend({

  width: 1000,
  height: 500,

  monitor,

  orientation: computed('width', 'height', function() {
    let resolution = this.getProperties('width', 'height');
    let isLandscape = resolution.width >= resolution.height;

    return isLandscape ? 'landscape' : 'portrait';
  }).readOnly(),

  // TODO: deprecate deviceIs in favor of orientationIs
  deviceIsLandscape: computed.equal('orientation', 'landscape'),
  deviceIsPortrait: computed.not('deviceIsLandscape'),

  orientationIsLandscape: computed.alias('deviceIsLandscape'),
  orientationIsPortrait: computed.alias('deviceIsPortrait'),

  breakpoints: null,
  _resizeHandler: null,

  willDestroy() {
    this._super(...arguments);

    if (typeof window === 'object' && typeof document === 'object') {
      window.removeEventListener('resize', this._resizeHandler, true);
    }
  },

  updateResolution() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.setProperties({
      width: w,
      height: h
    });
  },

  setupResize() {
    this._resizeHandler = () => {
      run.debounce(this, this.updateResolution, 16);
    };
    window.addEventListener('resize', this._resizeHandler, true);
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

      Ember.defineProperty(this, `is${capitalize(bp.name)}`, computed('width', function() {
        let width = this.get('width');
        let next = bps[i + 1];

        if (next) {
          return width >= bp.begin && width < next.begin;
        }
        return width >= bp.begin;
      }));

      Ember.defineProperty(this, `isAtLeast${capitalize(bp.name)}`, computed('width', function() {
        let width = this.get('width');

        return width >= bp.begin;
      }));

    });
  },

  init() {
    this._super();

    this.setupBreakpoints();

    if (typeof window === 'object' && typeof document === 'object') {
      this.setupResize();
      this.updateResolution();
    }
  }

});
