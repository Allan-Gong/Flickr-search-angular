describe('main.controller', () => {
  let vm;
  var $httpBackend, $rootScope;

  beforeEach(angular.mock.module('angularFlickrSearch'));

  beforeEach(inject(($injector) => {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');

    vm = $controller('MainController', {'$scope' : $rootScope });
  }));

  describe('on success', () => {



    it('should return items on search() when searchTerm is equal to or greater than 3 letters', () => {

      var returnedItems = [
        {
          'title': 'Test title 1',
          'author': 'Test author 1',
          'link': 'https://www.flickr.com/services/api/dummy-link-1/',
          'media': { 'm': 'https://www.flickr.com/services/api/image/test1.png' },
          'tags': 'tag11 tag12'
        },
        {
          'title': 'Test title 2',
          'author': 'Test author 2',
          'link': 'https://www.flickr.com/services/api/dummy-link-2/',
          'media': { 'm': 'https://www.flickr.com/services/api/image/test2.png' },
          'tags': 'tag21 tag22'
        }
      ];

      $httpBackend.whenJSONP(/.+/).respond(200, {
        'items': returnedItems
      });

      vm.searchTerm = 'nba';
      vm.search();
      $httpBackend.flush();

      var expectedItems = [
        {
          'title': 'Test title 1',
          'author': 'Test author 1',
          'link': 'https://www.flickr.com/services/api/dummy-link-1/',
          'media': { 'm': 'https://www.flickr.com/services/api/image/test1.png' },
          'tags': ['tag11', 'tag12']
        },
        {
          'title': 'Test title 2',
          'author': 'Test author 2',
          'link': 'https://www.flickr.com/services/api/dummy-link-2/',
          'media': { 'm': 'https://www.flickr.com/services/api/image/test2.png' },
          'tags': ['tag21', 'tag22']
        }
      ];

      expect(vm.items).toEqual(expectedItems);
    });

    it('should return null on search() when searchTerm is less than 3 letters', () => {
      vm.searchTerm = 'na';
      vm.search();
      expect(vm.items).toEqual([]);
    });

  });

  describe('on failure', () => {
    it('should return an error item when API call failed', () => {
      $httpBackend.whenJSONP(/.+/).respond(500, {
        'error': 'Opps'
      });

      vm.searchTerm = 'nba';
      vm.search();
      $httpBackend.flush();

      expect(vm.items.length).toEqual(1);

      var errorItem = vm.items[0];

      expect(errorItem.tags).toEqual(['error', '502']);

    });

    it('should return an error item when API call returns no results', () => {
      $httpBackend.whenJSONP(/.+/).respond(200, {
        'items': []
      });

      vm.searchTerm = 'nba';
      vm.search();
      $httpBackend.flush();

      expect(vm.items.length).toEqual(1);

      var errorItem = vm.items[0];

      expect(errorItem.tags).toEqual(['no-results']);

    });
  });


});
