## Nanodegree Website Performance Optimization portfolio project

The goal of this project is to optimize this online portfolio for speed.


### Optimizations: 
#### Part 1 of the project: Optimize PageSpeed Insights score for index.html

To achieve a PageSpeed score of at least 90 for Mobile and Desktop, following chages were made:
-   Minified and inlined style.css in index.html
-   Added media="print" attribute to print.css in index.html
    ```
    <link href="css/print.css" rel="stylesheet" media="print">
    ```
-   Added async attribute to analytics.js
    ```
    <script src="http://www.google-analytics.com/analytics.js" async></script>
    ```
-   Optimized profilepic.jpg using ImageOptim
-   Copied pizzeria.jpg from view/images, resized it to width 100 and put it img directory. Updated index.html to use this small image.
    ```
    <img src="img/pizzeria.jpg">
    ```
- Minified index.html


#### Part 2  of the project: Optimize Frames per Second in pizza.html

To make views/pizza.html render with a consistent frame-rate at 60fps when scrolling, following changes were made to views/js/main.js:
-   Changed the number of generated pizzas when the page loads from 200 to 30
    
    Before:
    ```
    for (var i = 0; i < 200; i++) {
    ...
    ```
    
    After:
    ```
    for (var i = 0; i < 30; i++) {
    ...
    ```
-   Added requestAnimationFrame on updatePositions

    Before:
    ```
    window.addEventListener('scroll', updatePositions);
    ```
    
    After:
    ```
    window.addEventListener('scroll', function() {
	window.requestAnimationFrame(updatePositions);
    });
    ```

-   Updated updatePositions function
    * Stored items.length in l variable
    * Moved document.body.scrollTop/ 1250 out of the foor loop and stored in top variable
    * Moved phase calculation out of the for loop and stored in array to be used in the for loop
    * In for loop, retrieved precaculted phase
    * Used translateX to move pizzas
    
    Before:
    ```
    function updatePositions() {
      frame++;
      window.performance.mark("mark_start_frame");

      var items = document.querySelectorAll('.mover');
      for (var i = 0; i < items.length; i++) {
        var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
      }

      // User Timing API to the rescue again. Seriously, it's worth learning.
      // Super easy to create custom metrics.
      window.performance.mark("mark_end_frame");
      window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
      if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
      }
    }
    ```

    After:
    ```
    function updatePositions() {
      frame++;
      window.performance.mark("mark_start_frame");

      var items = document.querySelectorAll('.mover');

      //  Optimizations:
      //  Stored items.length in l variable
      //  Moved document.body.scrollTop/ 1250 out of the foor loop and stored in top variable
      //  Moved phase calculation out of the for loop to calculate here and store in array to be used in the for loop
      var l = items.length;
      var top = document.body.scrollTop/ 1250;
      var phases = [];
      for (var i=0; i<5; i++){
        phases[i] = Math.sin(top + i);
      }

      for (var i = 0; i < l; i++) {
        // Optimization - retrieve precaculted phase
        var calc = (items[i].basicLeft) + 100 * phases[(i % 5)];
        // Optimization - used translateX to move pizza
        items[i].style.transform = "translateX("+ parseInt(calc) +"px)";

      }
      // User Timing API to the rescue again. Seriously, it's worth learning.
      // Super easy to create custom metrics.
      window.performance.mark("mark_end_frame");
      window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
      if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
      }
    }
    ```


To reduce time to resize pizzas is less than 5ms using the pizza size slider on views/pizza.html, following changes were to views/js/main.js:
-   Removed determineDx function
-   Updated changePizzaSizes function
    * Added switch statements to determine pizza width based on size
    * Took out document.querySelectorAll(".randomPizzaContainer" from for loop and stored in the variable pizzas
    * Removed determineDx function call to determine pizza width in for loop
	* Rmoved calculation to newwidth in px from for loop
    * Set pizzas[i].style.width to newWidth determined in the switch statement

    Before:
    ```
    function changePizzaSizes(size) {
      for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
        var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
        var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
        document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
      }
    }
    ```
  
    After:
    ```
    function changePizzaSizes(size) {
      switch(size){
        case "1":
          newWidth = 25;
          break;
        case "2":
          newWidth = 33.3;
          break;
        case "3":
          newWidth = 50;
          break;
        default:
          console.log("sizeSwitcher bug");
      }
      var pizzas = document.querySelectorAll(".randomPizzaContainer");

      for (var i = 0; i < pizzas.length; i++) {
        pizzas[i].style.width = newWidth + "%";
      }
    }
    ```

### Building the project and running Grunt
-   Download project from GitHub
-   Install Grunt's command line interface (CLI) globally
    ```
    npm install -g grunt-cli
    ```
-   Change to src directory inside the project's root directory, and run this command to install project dependencies
    ```
    npm install
    ```
-   Run Grunt with grunt command
    ```
    grunt
    ```
