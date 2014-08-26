var _gaq = {
    queue: []

  , length: 0

  , push: function( entry ) {
        var i = 0, len = entry.length;
        for (; i < len; i++) {
            if ( entry[i] === location.href ) {
                entry[i] = currentPage;
            }
        }

        this.queue.push( entry );

        this.length = this.queue.length;

        return this;
    }

  , reset: function() {
        this.queue = [];

        return this;
    }

  , last: function() {
        return this.queue[this.length - 1];
    }
};

var defaultAction = 'triggered'
  , currentPage = '<<CURRENT PAGE>>';

function basicTest( option, html, expected ) {
    it( 'On ' + html, function() {
        _gaq.reset();

        var $element = $( html );

        if ($element.children().length > 0) {
            $element = $element.children().first();
        }

        $element.trackevent( option );

        assert.deepEqual( _gaq.last(), expected, 'produces [ "' + expected.join('", "') + '" ]');
    });
}

function predefinedTypesModules( type, category ) {

    describe('Predefined tracker "'+ type +'" sets defaults correctly', function() {

        var tests = {};

        tests['<a data-track="'+ type +'"></a>'] =
                [ '_trackEvent', category, 'clicked', currentPage ];

        tests['<nav data-track="'+ type +'"><a href="/search-result-link"></a></article>'] =
                [ '_trackEvent', category, 'clicked', '/search-result-link' ];

        tests['<a href="/search-result-link" data-track="'+ type +'"></a>'] =
              [ '_trackEvent', category, 'clicked', '/search-result-link' ];

        tests['<a data-track="'+ type +'" data-action="event-action"></a>'] =
              [ '_trackEvent', category, 'event-action', currentPage ];

        tests['<a href="/search-result-link" data-track="'+ type +'" data-action="event-action"></a>'] =
                [ '_trackEvent', category, 'event-action', '/search-result-link' ];

        tests['<nav data-track="'+ type +'" data-action="event-action"><a href="/search-result-link"></a></article>'] =
                [ '_trackEvent', category, 'event-action', '/search-result-link' ];

        for ( var test in tests ) {
            basicTest( undefined, test, tests[test] );
        }
    });

}



describe('Calling $().trackevent()', function() {

    var basicTests = {

        '<button data-track="event-category"></button>':
          [ '_trackEvent', 'event-category', 'clicked', currentPage ]

      , '<form data-track="event-category"><button></button></form>':
          [ '_trackEvent', 'event-category', 'submitted', currentPage ]

      , '<a data-track="event-category"></a>':
          [ '_trackEvent', 'event-category', 'clicked', currentPage ]

      , '<nav data-track="event-category"><a></a></nav>':
          [ '_trackEvent', 'event-category', 'clicked', currentPage ]

      , '<button data-track="event-category" data-action="event-action"></button>':
            [ '_trackEvent', 'event-category', 'event-action', currentPage ]

      , '<button data-track="tophat"></button>':
            [ '_trackEvent', 'tophat', 'clicked', currentPage ]

    };

    for ( var test in basicTests ) {
        basicTest( undefined, test, basicTests[test] );
    }

});



describe('action and href attributes set label', function() {

    var overideActionTests = {

        '<form action="/form-submit" data-track="event-category"><button></button></form>':
          [ '_trackEvent', 'event-category', 'submitted', '/form-submit' ]

      , '<a href="/tracked-link" data-track="event-category"></a>':
          [ '_trackEvent', 'event-category', 'clicked', '/tracked-link' ]

      , '<nav data-track="event-category"><a href="/nav-link"></a></nav>':
          [ '_trackEvent', 'event-category', 'clicked', '/nav-link' ]

    };

    for ( var test in overideActionTests ) {
        basicTest( undefined, test, overideActionTests[test] );
    }

});



describe('can override action with data attribute', function() {

    var overideActionTests = {

        '<a href="/link-action#ref" data-track="event-category" data-action="event-action"></a>':
            [ '_trackEvent', 'event-category', 'event-action', '/link-action#ref' ]

      , '<nav data-track="event-category" data-action="event-action"><a href="/link-action#ref"></a></nav>':
            [ '_trackEvent', 'event-category', 'event-action', '/link-action#ref' ]

      , '<form action="/form-action" data-track="event-category" data-action="event-action"></form>':
            [ '_trackEvent', 'event-category', 'event-action', '/form-action' ]

      , '<form action="/form-action" data-track="event-category" data-action="event-action"><button></button></form>':
            [ '_trackEvent', 'event-category', 'event-action', '/form-action' ]

      , '<button data-track="event-category" data-action="event-action" data-label="event-label"></button>':
            [ '_trackEvent', 'event-category', 'event-action', 'event-label' ]

    };

    for ( var test in overideActionTests ) {
        basicTest( undefined, test, overideActionTests[test] );
    }

});



describe('can override form action and href with label data attribute', function() {

    var overideActionTests = {

        '<form action="/form-action" data-track="event-category" data-action="event-action"><button data-label="event-label"></button></form>':
            [ '_trackEvent', 'event-category', 'event-action', 'event-label' ]

      , '<nav data-track="event-category" data-action="event-action"><a href="/nav-link" data-label="event-label"></a></nav>':
            [ '_trackEvent', 'event-category', 'event-action', 'event-label' ]

    };

    for ( var test in overideActionTests ) {
        basicTest( undefined, test, overideActionTests[test] );
    }

});



describe('can set value with data attribute', function() {

    var overideActionTests = {

        '<button data-track="event-category" data-action="event-action" data-label="event-label" data-value="999"></button>':
            [ '_trackEvent', 'event-category', 'event-action', 'event-label', 999 ]

    };

    for ( var test in overideActionTests ) {
        basicTest( undefined, test, overideActionTests[test] );
    }

});



var eventTypes = {
    'searchresult': 'search link'
  , 'glossary': 'a-z link'
  , 'navigation': 'navigation link'
  , 'subsection': 'navigation expandable'
  , 'homepage content link': 'homepage content link'
  , 'search': 'search'
};

for ( var eventType in eventTypes ) {
    predefinedTypesModules( eventType, eventTypes[eventType] );
}




describe('Predefined tracker "pagination" sets defaults correctly', function() {

    var paginationTests = {

        '<nav data-track="pagination"><a href="/link-action#next" rel="next"></a></nav>':
            [ '_trackEvent', 'pagination', 'next', currentPage ]

      , '<nav data-track="pagination"><a href="/link-action#prev" rel="previous"></a></nav>':
            [ '_trackEvent', 'pagination', 'previous', currentPage ]

      , '<a href="/link-action#next" rel="next" data-track="pagination"></a>':
            [ '_trackEvent', 'pagination', 'next', currentPage ]

      , '<a href="/link-action#prev" rel="previous" data-track="pagination"></a>':
            [ '_trackEvent', 'pagination', 'previous', currentPage ]

    };

    for ( var eventType in paginationTests ) {
        basicTest( undefined, eventType, paginationTests[eventType] );
    }

});




describe('Predefined tracker "download" sets defaults correctly', function() {

    var tophatTests = {

        '<a title="tracked download" data-track="download"></a>':
            [ '_trackEvent', 'download', 'tracked download', currentPage ]

      , '<a title="tracked download" data-track="download" data-action="event-action"></a>':
            [ '_trackEvent', 'download', 'event-action', currentPage ]

      , '<a href="/action-link" title="tracked download" data-track="download"></a>':
            [ '_trackEvent', 'download', 'tracked download', currentPage ]

      , '<nav data-track="download"><a href="/action-link" title="tracked download"></a></nav>':
            [ '_trackEvent', 'download', 'tracked download', currentPage ]

      , '<nav data-track="download"><a href="/action-link" title="tracked download" data-action="event-action"></a></nav>':
            [ '_trackEvent', 'download', 'event-action', currentPage ]

      , '<a title="tracked download" data-track="slidedownload"></a>':
            [ '_trackEvent', 'download slide', 'tracked download', currentPage ]

      , '<a title="tracked download" data-track="slidedownload" data-action="event-action"></a>':
            [ '_trackEvent', 'download slide', 'event-action', currentPage ]

      , '<a href="/action-link" title="tracked download" data-track="slidedownload"></a>':
            [ '_trackEvent', 'download slide', 'tracked download', currentPage ]

      , '<nav data-track="slidedownload"><a href="/action-link" title="tracked download"></a></nav>':
            [ '_trackEvent', 'download slide', 'tracked download', currentPage ]

      , '<nav data-track="slidedownload"><a href="/action-link" title="tracked download" data-action="event-action"></a></nav>':
            [ '_trackEvent', 'download slide', 'event-action', currentPage ]

    };

    for ( var test in tophatTests ) {
        basicTest( undefined, test, tophatTests[test] );
    }

});




describe('Calling $().trackevent("tophat")', function() {

    var tophatTests = {

        '<a title="tracked service"></a>':
            [ '_trackEvent', 'tophat', 'tracked service', currentPage ]

      , '<a title="tracked service" data-track="event-ignored"></a>':
            [ '_trackEvent', 'tophat', 'tracked service', currentPage ]

      , '<a title="tracked service" data-action="event-action"></a>':
            [ '_trackEvent', 'tophat', 'event-action', currentPage ]

      , '<a href="/action-link" title="tracked service"></a>':
            [ '_trackEvent', 'tophat', 'tracked service', currentPage ]

      , '<nav class="menu-item-evidence"><a href="/action-link" title="tracked service" class="collapsed"></a></nav>':
            [ '_trackEvent', 'tophat', 'tracked service expanded', currentPage ]

      , '<nav class="menu-item-evidence"><a href="/action-link" title="tracked service"></a></nav>':
            [ '_trackEvent', 'tophat', 'tracked service collapsed', currentPage ]

      ,

    };

    for ( var test in tophatTests ) {
        basicTest( 'tophat', test, tophatTests[test] );
    }

});
