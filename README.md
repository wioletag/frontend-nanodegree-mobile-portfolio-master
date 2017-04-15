## Nanodegree Website Performance Optimization portfolio project

The goal of this project is to optimize this online portfolio for speed.

### To run this project:


### Optimizations: 
#### Part 1 of the project: Optimize PageSpeed Insights score for index.html

To achieve a PageSpeed score of at least 90 for Mobile and Desktop, following chages were made:
- Minified and inlined style.css in index.html
- Added media="print" attribute to print.css in index.html
    ```
    <link href="css/print.css" rel="stylesheet" media="print">
    ```
- Added async attribute to analytics.js
    ```
    <script src="http://www.google-analytics.com/analytics.js" async></script>
    ```
- Optimized profilepic.jpg using ImageOptim
- Copied pizzeria.jpg from view/images, resized it to width 100 and put it img directory. Updated index.html to use this small image.
    ```
    <img src="img/pizzeria.jpg">
    ```
- Minified index.html


#### Part 2  of the project: Optimize Frames per Second in pizza.html

To make views/pizza.html render with a consistent frame-rate at 60fps when scrolling, following changes are made to views/js/main.js:


To reduce time to resize pizzas is less than 5ms using the pizza size slider on views/pizza.html, following changes are to views/js/main.js:
