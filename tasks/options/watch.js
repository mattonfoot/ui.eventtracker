module.exports = function( config ) {

    return {

        test: {
            files: 'test/**/*.js',
            tasks: [ 'test' ]
        },

        src: {
            files: 'lib/**/*',
            tasks: [ 'build' ]
        }

    };

};
