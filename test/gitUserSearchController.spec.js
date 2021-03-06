describe('GitUserSearchController', function() {

  beforeEach(module('GitUserSearch'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function() {


    var items =  [
        {
          "login": "tansaku",
          "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
          "html_url": "https://github.com/tansaku"
        },
        {
          "login": "stephenlloyd",
          "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
          "html_url": "https://github.com/stephenlloyd"
        }
      ];

    var httpBackend;
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      $httpBackend
        .expectGET("https://api.github.com/search/users?key=d423d0901c401fb4c4f5d2de4016c4e395741b28&q=hello")
        .respond(
          { items: items }
        );
      }));


    afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
    });

    it('displays search results', function() {

      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });

});
