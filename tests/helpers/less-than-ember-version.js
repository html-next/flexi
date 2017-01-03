import Ember from 'ember';

export default function lessThanEmberVersion(major, minor) {
  const numbers = Ember.VERSION.split('-')[0].split('.');
  const actualMajor = parseInt(numbers[0], 10);
  const actualMinor = parseInt(numbers[1], 10);
  return actualMajor < major || (actualMajor === major && actualMinor < minor);
}
