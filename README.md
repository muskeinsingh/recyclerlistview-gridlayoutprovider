# recyclerlistview-gridlayoutprovider
[![npm version](https://img.shields.io/npm/v/recyclerlistview-gridlayoutprovider.svg)](https://www.npmjs.com/package/recyclerlistview-gridlayoutprovider)
[![travis](https://travis-ci.org/muskeinsingh/recyclerlistview-gridlayoutprovider.svg?branch=master)](https://travis-ci.org/muskeinsingh/recyclerlistview-gridlayoutprovider)
[![npm](https://img.shields.io/npm/dm/recyclerlistview-gridlayoutprovider.svg?maxAge=2592000)](https://npmcharts.com/compare/recyclerlistview-gridlayoutprovider?minimal=true)
[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)

Grid Layout Provider built on top of [RecyclerListView!](https://github.com/Flipkart/recyclerlistview). Works beautifully on Android, iOS and web. Compatible with recyclerlistview version greater than 1.4.0-beta.6.

**Why use GridLayoutProvider?**

In cases where you are rendering a list of grids - you would have to explicitly calculate and tell the width/height of each cell. Grid Layout Provider minimises that effort for the users as it calculates the width/height based on the spans each index/type wants to consume. Tell us the type of each cell, max span that any cell can achieve and the span for each cell - we will calculate the width (in case of vertical list)/height (in case of horizontal list) for you. Do checkout our sample code to understand more.

**GIF**

![](https://j.gifs.com/ZV3qNv.gif)

**API**

It's a pretty simple and intuitive API. Grid Layout Provider needs just 4 things:
1. Max Span
2. Layout type for each index (similar to Layout Provider)
3. Span for each index
4. Width/Height for each index (width only for vertical scrollable lists and height only for horizontal scrollable lists)

**Sample**

[Snack Sample code](https://snack.expo.io/rybd0OUkE)

**Report Issues**

Please raise issues [here](https://github.com/muskeinsingh/recyclerlistview-gridlayoutprovider/issues)

**Contributors**

[Muskein Singh](https://twitter.com/muskein) and [Talha Naqvi](https://twitter.com/naqvitalha)

**Contact Us**

Email us at cross-platform@flipkart.com in case of any queries

