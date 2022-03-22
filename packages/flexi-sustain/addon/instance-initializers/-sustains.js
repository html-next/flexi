export function initialize(instance) {
  const base = instance.lookup ? instance : instance.container;

  base.lookup('service:-sustains');
}

export default {
  name: '-sustains',
  initialize,
};
