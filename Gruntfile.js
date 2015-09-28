module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'public/assets/css/style.css' : 'public/assets/sass/style.scss'
        }
      }
    },

    cssmin: {
      with_banner: {
        options: {
          banner: '/* My minified CSS */'
        },
        files: {
          'public/assets/css/minified.css' : ['public/assets/css/animate.min.css', 'public/assets/css/style.css']
        }
      }
    },

    watch: {
      css: {
        files: 'public/assets/sass/style.scss',
        tasks: ['sass', 'cssmin']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};