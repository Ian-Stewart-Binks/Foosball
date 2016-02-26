module.exports = function(grunt) {
    grunt.initConfig({
        eslint: {
            all: ['*.js', './public/js/*']
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
    
    grunt.registerTask('lint', 'eslint');
    grunt.registerTask('default', ['lint']);
};
