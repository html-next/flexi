export function initialize(instance) {
  let base = instance.lookup ? instance : instance.container;

  base.lookup('service:-sustains');
}

export default {
  name: '-sustains',
  initialize
};
