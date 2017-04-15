module.exports = function(grunt) {

  grunt.initConfig({
    minifyHtml: {
      options: {},
      dist: {
        files: {
          '../dist/index.html': 'index.html'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-minify-html');
  grunt.registerTask('default', ['minifyHtml']);

};
