import Ember from 'ember';

const {
  computed,
  Service,
  get,
  run
  } = Ember;

export default Service.extend({

  orientation: computed('resolution', function() {
    let resolution = this.get('resolution');
    let isLandscape = resolution.width >= resolution.height;
    return isLandscape ? 'landscape' : 'portrait';
  }).readOnly(),

  resolution: computed(function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }).readOnly(),

  _parseUserAgent: computed(function() {}),

  type: computed('model', function() {
    let model = this.get('model');
    if (['ipad', 'surface', 'desktop', 'browser'].indexOf(model) !== -1) {
      return 'tablet';
    }
    return 'phone';
  }).readOnly(),

  /*
   version: computed(function() {
   return (get(window, 'device.platform') || get(window, 'navigator.platform')).toLowerCase()
   }).readOnly(),
   */

  model: computed(function() {
    let model = (get(window, 'device.model') || 'browser').toLowerCase();
    if (model.indexOf('ipad') !== -1) {
      return 'ipad';
    }
    if (model.indexOf('iphone') !== -1) {
      return 'iphone';
    }
    return model;
  }).readOnly(),

  isPhone: computed.equal('type', 'phone'),
  isTablet: computed.equal('type', 'tablet'),

  platform: computed(function() {
    return (get(window, 'device.platform') || get(window, 'navigator.platform') || 'browser').toLowerCase();
  }).readOnly(),

  init() {
    this._super();

    // some mobile devices emit this when changing, check `window.orientation || window.screen.orientation`
    // but using it for detection is unstable because `0` could be landscape or portrait depending on
    // a device's default setting
    /*
     window.addEventListener('orientationchange', () => {
     this.notifyPropertyChange('orientation');
     }, true);
     */

    // some mobile devices emit this and `devicemotion`
    /*
     This doesn't help with landscape vs/portrait but would with
     small changes in screen, we could build fancy effects!
     window.addEventListener('deviceorientation', () => {
     this.notifyPropertyChange('orientation');
     }, true);
     */

    // some mobile devices don't emit orientationchange, but nearly all will fire a resize
    // event which we can debounce instead to catch the switch.
    window.addEventListener('resize', () => {
      run.debounce(this, this.notifyPropertyChange, 'resolution', 16);
    }, true);

    document.addEventListener('deviceready', () => {
      this.notifyPropertyChange('platform');
      this.notifyPropertyChange('model');
      /*
       this.notifyPropertyChange('version');
       */
      this.notifyPropertyChange('type');
    });
  }

});
