export class MainController {
  constructor ($scope, $log, $http) {
    'ngInject';

    this.scope = $scope;
    this.log = $log;
    this.http = $http;

    this.items = [];
  }

  search() {

    var self = this;

    self.items = [];

    var searchTerm = this.searchTerm;
    self.log.debug('searchTerm:' + searchTerm);

    if ( searchTerm.length < 3 ) { return; }

    self.loading = true;

    self.http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=JSON_CALLBACK', {
      params: { format: 'json', tagmode: 'any', tags: searchTerm }
    }).success(function(feed){

      var items = [];

      if (feed.items.length > 0) {

        items = feed.items;

        angular.forEach(items, function(item) {
          var strTags = item.tags;
          var arrayTags = strTags.split(' ');
          item.tags = arrayTags;
        });

      } else {
        items = [{
          'title': 'Opps, your search for ' + searchTerm + ' returned no results',
          'author': 'System administrator',
          'link': 'javascript:;',
          'media': { 'm': '' },
          'tags': ['no-results']
        }];
      }

      self.items = items;

      self.scope.$broadcast('masonry.reload');

    }).error(function(data, status) {
        self.log.error('error: ' + status + 'data: ' + data);

        self.items = [{
          'title': 'Opps, an error occurred with Flickr web service: 502',
          'author': 'System administrator',
          'link': 'javascript:;',
          'media': { 'm': '' },
          'tags': ['error', '502']
        }];

    }).finally(function () {
      self.loading = false;
    });
  }
}
