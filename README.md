## Nanodegree Website Performance Optimization portfolio project

The goal of this project is to optimize this online portfolio for speed.

### To run this project:

### Part 1 of the project: Optimize PageSpeed Insights score for index.html


1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)


#### Part 2  of the project: Optimize Frames per Second in pizza.html

### Following are the changes made in views/js/main.js to to optimize views/pizza.html:
