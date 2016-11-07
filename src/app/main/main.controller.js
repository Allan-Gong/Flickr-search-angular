export class MainController {
  constructor ($scope, $log, $http) {
    'ngInject';

    this.scope = $scope;
    this.log = $log;
    this.http = $http;
    //this.window = $window;

    this.items = [];

    this.bricks = [
      { src: "http://lorempixel.com/400/200/" },
      { src: "http://lorempixel.com/400/200/" },
      { src: "http://lorempixel.com/400/200/" },
      { src: "http://lorempixel.com/400/200/" }
    ];

    // this.typingTimeout = null;

    // this.doneTypingInterval = 1000;
  }

  // keyup(event){
  //   var self = this;

  //   clearTimeout(self.typingTimeout);
  //   self.typingTimeout = setTimeout(self.search(event), self.doneTypingInterval);
  // }

  // keydown(){
  //   this.log.debug('keydown typingTimer: ' + this.typingTimer);
  //   clearTimeout(this.typingTimer);
  // }

  search() {

    var self = this;

    self.items = [];
    // self.scope.$broadcast('masonry.destroy');

    var searchTerm = this.searchTerm;
    self.log.debug('searchTerm:' + searchTerm);

    if ( searchTerm.length < 3 ) { return; }

    self.loading = true;

    self.http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=JSON_CALLBACK', {
      params: { format: 'json', tagmode: 'any', tags: searchTerm }
    }).success(function(feed){
      var items = feed.items;

      angular.forEach(items, function(item, key) {
        var strTags = item.tags;
        var arrayTags = strTags.split(' ');
        item.tags = arrayTags;
      });

      self.items = items;
      window.items = items;

      self.scope.$broadcast('masonry.reload');

    }).error(function(data, status, header) {
        self.log.error('error');
    }).finally(function () {
      // Hide loading spinner whether our call succeeded or failed.
      self.loading = false;
    });;
  }
}
