module.exports = function(grunt) {
    grunt.initConfig({
        eslint: {
            all: ['*.js', './public/js/*']
        },
        flake8: {
            src: ['util/**/*.py']
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.registerTask('lint', 'eslint');
    grunt.registerTask('default', ['lint']);
};
