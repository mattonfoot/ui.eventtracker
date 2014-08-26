var mocha = require('mocha');

module.exports = function() {

    var tests = [ 'test/**/*.html' ];

    var configSlow = 200;
    var configTimeout = 2000;

    return {

        test: {
            options: {
                mocha: {
                    ignoreLeaks: true
                }

              , run: true

              , reporter: 'Spec'
              , slow: configSlow
              , timeout: configTimeout
            }

          , src: tests
        }

    };

};
