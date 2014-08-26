var mocha = require('mocha');

module.exports = function() {

    var tests = [ 'test/**/*.js' ];
    var coverage = [ 'coverage/test/**/*.js' ];

    var configSlow = 200;
    var configTimeout = 2000;

    return {

        test: {
            options: {
                reporter: 'spec'
              , slow: configSlow
              , timeout: configTimeout
            }

          , src: tests
        }

      , instrumented: {
            options: {
                reporter: 'spec'
              , slow: configSlow
              , timeout: configTimeout
            }

          , src: coverage
        }

      , lcov: {
            options: {
                reporter: 'mocha-lcov-reporter'
              , quiet: true
              , captureFile: 'reports/lcov.info'
            },
            src: coverage
        }

      , coverage: {
            options: {
                reporter: 'html-cov'
              , quiet: true
              , captureFile: 'reports/coverage.html'
            }

          , src: coverage
        }

    };

};
