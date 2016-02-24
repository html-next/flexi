/* jshint node:true */
module.exports = {

  // breakpoints, order does not matter, they will be sorted by `begin`
  // `name` is used for layout names and booleans on the device/layout service
  // `prefix` is used for column classes, column attributes, and container breakpoint classes
  // `begin` is the pixel value at which this breakpoint becomes active
  breakpoints: [
    { name: 'mobile', prefix: 'xs', begin: 0 },
    { name: 'tablet', prefix: 'sm', begin: 400 },
    { name: 'desktop', prefix: 'md', begin: 800 },
    { name: 'huge', prefix: 'lg', begin: 1200 }
  ],

  // number of columns for the grid
  columns: 12,

  // grid classes are created via `${colPrefix}-${breakpointPrefix}-${columnNumber}`
  columnPrefix: 'col',

  // if false, @media css is not included
  includeMediaCSS: true,

  // if false, default element styles are not included
  includeElementCSS: true,

  // if false, no styles are included
  includeCSS: true
};
