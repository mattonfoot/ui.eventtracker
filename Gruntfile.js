module.exports = function( grunt )
{
    "use strict";

    // helper function to load task configs

    function loadConfig( path, config ) {
        var glob = require( 'glob' )
          , object = {}
          , key;

        glob.sync('*', { cwd: path })
            .forEach(function( option ) {
                key = option.replace( /\.js$/, '' );
                object[key] = require( path + option )( config );
            });

        return object;
    }

    // actual config

    var config = {

        pkg: grunt.file.readJSON('package.json')

      , env: process.env

    };

    grunt.util._.extend(config, loadConfig( './tasks/options/', config ));

    grunt.initConfig(config);

    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // local tasks
    grunt.loadTasks('tasks');




    // clean
    // grunt.registerTask('clean'     , [ 'clean' ]);

    // test
    grunt.registerTask('coverage'     , [ 'clean:coverage', 'blanket', 'copy:coverage', 'mochaTest:instrumented', 'mochaTest:lcov', 'mochaTest:coverage' ]);
    grunt.registerTask('webserver'    , [ 'connect:dev' ]);
    grunt.registerTask('test'         , [ 'jshint:test', 'mocha:test' ]);

    // build
    grunt.registerTask('build'        , [ 'jshint:src', 'test', 'copy:dist', 'uglify:dist' ]);

    // auto build
    // grunt.registerTask('default'   , [ 'watch' ]);

};
