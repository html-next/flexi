import Ember from 'ember';

const {
  computed,
  Service
  } = Ember;

export default Service.extend({

  width: 1000,
  height: 500,

  isMobile: computed('width', function() {
    let width = this.get('width');
    return width <= 500;
  }),
  isTablet: computed('width', function() {
    let width = this.get('width');
    return width > 500 && width <= 800;
  }),
  isDesktop: computed('width', function() {
    let width = this.get('width');
    return width > 800 && width <= 1100;
  }),
  isHuge: computed('width', function() {
    let width = this.get('width');
    return width > 1100;
  }),

  breakpoints: [
    { name: 'mobile', prefix: 'xs', begin: 0, end: 400 },
    { name: 'tablet', prefix: 'sm', begin: 401, end: 700 },
    { name: 'desktop', prefix: 'md', begin: 701, end: 1060 },
    { name: 'huge', prefix: 'lg', begin: 1061 }
  ],

  _resizeHandler: null,

  willDestroy() {
    this._super(...arguments);
    window.removeEventListener('resize', this._resizeHandler, true);
  },

  init() {
    this._super();
    this._resizeHandler = () => {
      let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      this.setProperties({
        width: w,
        height: h
      });
    };
    window.addEventListener('resize', this._resizeHandler, true);
    this._resizeHandler();
  }

});
