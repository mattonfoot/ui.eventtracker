module.exports = function( config ) {

    return {
        coverage: {
            src:    [ 'test/**' ],
            dest:   'coverage/'
        },
        
        dist: {
            expand: true,     // Enable dynamic expansion.
            cwd: 'lib/',      // Src matches are relative to this path.
            src: ['**/*.js'], // Actual pattern(s) to match.
            dest: 'dist/',   // Destination path prefix.
        }
    };

};
