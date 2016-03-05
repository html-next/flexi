/*
// BEGIN-SNIPPET settings-1
{
 // the number of columns for the grid
 columns: 12,

 // optional, used for column classes: `${colPrefix}-${breakpointPrefix}-${columnNumber}`
 columnPrefix: 'col',

 // if false, @media css is not included
 includeMediaCSS: true,

 // if false, default element styles are not included
 includeElementCSS: true,

 // if true, will convert layout attributes on non-layout elements to classes as well
 transformAllElementLayoutAttributes: false,

 // grid and layout element gutters
 gutterPadding: '.5rem',

 // if false, no styles are included (trumps `includeMediaCSS` and `includeElementCSS`)
 includeCSS: true,

 // an array of breakpoints to use in your app (see below)
 breakpoints: [
   { name: 'mobile', prefix: 'xs', begin: 0 },
   { name: 'tablet', prefix: 'sm', begin: 768 },
   { name: 'desktop', prefix: 'md', begin: 992 },
   { name: 'huge', prefix: 'lg', begin: 1200 }
 ]
}
// END-SNIPPET

// BEGIN-SNIPPET settings-2
 { name: 'mobile', prefix: 'xs', begin: 0 }
// END-SNIPPET

// BEGIN-SNIPPET settings-html-1
 <box xs="n visible vertical">
// END-SNIPPET

 // BEGIN-SNIPPET settings-html-2
 <box class="col-xs-n visible-xs vertical-xs">
 // END-SNIPPET

// BEGIN-SNIPPET settings-css-1
 // wrapper class for container breakpoint
 .container-xs {}

 // these classes are valid when the @media
 // breakpoint is true or when within .container-xs
 .hidden-xs {
   display: none;
 }

 .visible-xs {
   display: initial;
 }

 .vertical-xs {
   flex-direction: column;
 }

 .horizontal-xs {
   flex-direction: row;
 }

 .wrap-xs {
   flex-wrap: wrap;
 }

 .nowrap-xs {
   flex-wrap: nowrap;
 }
// END-SNIPPET
 */
