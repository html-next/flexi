import Ember from 'ember';

const {
  computed,
  Service,
  run
  } = Ember;

export default Service.extend({

  width: 1000,
  height: 500,

  orientation: computed('width', 'height', function() {
    let resolution = this.getProperties('width', 'height');
    let isLandscape = resolution.width >= resolution.height;
    return isLandscape ? 'landscape' : 'portrait';
  }).readOnly(),

  deviceIsLandscape: computed.equal('orientation', 'landscape'),
  deviseIsPortrait: computed.not('deviceIsLandscape'),

  breakpoints: null,
  _resizeHandler: null,

  willDestroy() {
    this._super(...arguments);
    window.removeEventListener('resize', this._resizeHandler, true);
  },

  getResolution() {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.setProperties({
      width: w,
      height: h
    });
  },

  setupResize() {
    this._resizeHandler = () => {
      run.debounce(this, this.getResolution, 16);
    };
    window.addEventListener('resize', this._resizeHandler, true);
  },

  setupBreakpoints() {
    if (!this.breakpoints) {
      throw new Error('You must configure some breakpoints');
    }

    this.breakpoints.forEach((bp, i) => {
      Ember.defineProperty(this, `is${capitalize(bp.name)}`, computed('width', function() {
        let width = this.get('width');
        let next = this.breakpoints[i + 1];

        if (next) {
          return width >= bp.begin && width < next.begin;
        }
        return width >= bp.begin;
      }));
    });
  },

  init() {
    this._super();

    this.setupBreakpoints();
    this.setupResize();
    this.getResolution();
  }

});

function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}
