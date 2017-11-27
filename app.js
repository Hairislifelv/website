var env = {};

// Import variables if present (from env.js)
if(window){
  Object.assign(env, window.__env);
}

angular.module('hairislifelv', [
  // 'selectbox'
  'ui.router',
  'ngResource',
  'LocalStorageModule',
  'angular.filter',
  'sapioCart'
])
.constant('__env', env)

// Pages
.component('homeComponent', {
  templateUrl: '/app/components/views/pages/home.html',
})
.component('aboutComponent', {
  templateUrl: '/app/components/views/pages/about.html',
})
.component('servicesComponent', {
  templateUrl: '/app/components/views/pages/services.html',
})
.component('lostComponent', {
  templateUrl: '/app/components/views/pages/lost.html',
})
.component('boutiqueComponent', {
  templateUrl: '/app/components/views/pages/boutique.html',
  bindings: {
    products: '<'
  }
})
.component('contactComponent', {
  templateUrl: '/app/components/views/pages/contact.html',
})
.component('galleryComponent', {
  templateUrl: '/app/components/views/pages/gallery.html',
})
.component('cartComponent', {
  templateUrl: '/app/components/views/pages/cart.html',
  controller: function(localStorageService, cartService, $scope) {
    var vm = this, items = [];

    vm.items = localStorageService.get('cart').items;

    $scope.$on('LocalStorageModule.notification.setitem', function (key, newVal, type) {
      $scope.$apply(function () {
        vm.items = JSON.parse(newVal.newvalue).items;
      });
    });
  }
})
.component('checkoutComponent', {
  templateUrl: '/app/components/views/pages/checkout.html',
  controller: function(localStorageService) {
    var vm = this;

    vm.items = localStorageService.get('cart').items;

    console.log(vm.items);
  }
})
.component('thankyouComponent', {
  templateUrl: '/app/components/views/pages/thankyou.html',
})

// Components
.component('headerComponent', {
  templateUrl: '/app/components/views/header.html',
})
.component('footerComponent', {
  templateUrl: '/app/components/views/footer.html',
  controller: function() {
    var vm = this;

    vm.date = new Date();
  }
})

// Includes
.component('aboutIncludesComponent', {
  templateUrl: '/app/components/views/includes/about.html',
})
.component('callToActionIncludesComponent', {
  templateUrl: '/app/components/views/includes/callToAction.html',
})

// Factories
.factory('api', api)

// Config
.config(config)

// Directives
// .directive('cart', function() {
//   return {
//     restrict: 'E',
//     link: function() {
//       console.log('cart directive');
//       // $('.select-drop').selectbox();
//     }
//   }
// })
// .directive('selectBox', function() {
//   return {
//     link: function() {
//       // $('.select-drop').selectbox();
//     }
//   }
// })
// .directive('datePicker', function() {
//   return {
//     link: function() {
//       // $('.datepicker').datepicker({
//       //     startDate: 'dateToday',
//       //     autoclose: true
//       // });
//     }
//   }
// })
// .directive('siyoTimer', function() {
//   return {
//     link: function() {
//       // $('#simple_timer').syotimer({
//       //     year: 2018,
//       //     month: 5,
//       //     day: 9,
//       //     hour: 20,
//       //     minute: 30
//       // });
//     }
//   }
// })
// .directive('slider', function() {
//   return {
//     link: function() {
//       // var minimum = 12;
//       // var maximum = 300;
//       // var priceMin = $('#price-amount-1');
//       // var priceMax = $('#price-amount-2');
//       // $('#price-range').slider({
//       //     range: true,
//       //     min: minimum,
//       //     max: maximum,
//       //     values: [minimum, maximum],
//       //     slide: function(event, ui) {
//       //         priceMin.val('$' + ui.values[0]);
//       //         priceMax.val('$' + ui.values[1]);
//       //     }
//       // });
//       // priceMin.val('$' + $('#price-range').slider('values', 0));
//       // priceMax.val('$' + $('#price-range').slider('values', 1));
//     }
//   }
// })
// .directive('slider', function() {
//   return {
//     link: function() {
//       // $('a.group').fancybox({
//       //     'transitionIn': 'elastic',
//       //     'transitionOut': 'elastic',
//       //     'speedIn': 600,
//       //     'speedOut': 200,
//       //     'overlayShow': false
//       // });
//     }
//   }
// })
.directive('heroSlider', function() {
  return {
    restrict: 'E',
    templateUrl:  'app/directives/views/heroSlider.html',
    replace: false,
    link: function(element, attrs) {
      initOwl();

      function initOwl() {
        var $heroSlider = $('.main-slider .inner');

        if ($heroSlider.length > 0) {
          $heroSlider.each(function() {
            var loop = $(this).parent().data('loop'),
              autoplay = $(this).parent().data('autoplay'),
              interval = $(this).parent().data('interval') || 3000;

            $(this).owlCarousel({
              items: 1,
              loop: loop,
              margin: 0,
              nav: true,
              dots: true,
              navText: [],
              autoplay: autoplay,
              autoplayTimeout: interval,
              autoplayHoverPause: true,
              smartSpeed: 700
            });
          });
        }

        $('.rtl .main-slider .inner').owlCarousel({
            rtl: true
        });
      }
    }
  }
})

function api(__env, $resource) {
  var baseUrl = __env.apiUrl;

  var api = {
    products: $resource('http://0.0.0.0:3004/products', {}, {
      get: {
        method: 'GET'
      },
      post: {
        method: 'POST'
      }
    })
  };

  return api;
}

function config($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('hairislifelv').setNotify(true, true);

  $urlRouterProvider.otherwise('/404');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  var states = [
    {
      name: 'home',
      url: '/',
      component: 'homeComponent',
    },
    {
      name: 'about',
      url: '/about',
      component: 'aboutComponent',
    },
    {
      name: 'cart',
      url: '/cart',
      component: 'cartComponent',
    },
    {
      name: 'checkout',
      url: '/checkout',
      component: 'checkoutComponent',
    },
    {
      name: 'thankyou',
      url: '/thank-you',
      component: 'thankyouComponent',
    },
    {
      name: 'services',
      url: '/services',
      component: 'servicesComponent',
    },
    {
      name: 'gallery',
      url: '/gallery',
      component: 'galleryComponent',
    },
    {
      name: '404',
      url: '/404',
      component: 'lostComponent',
    },
    {
      name: 'boutique',
      url: '/boutique',
      component: 'boutiqueComponent',
      resolve: {
        products: function (api) {
          return api.products.get({}).$promise;
        }
      }
    },
    {
      name: 'contact',
      url: '/contact',
      component: 'contactComponent'
    }
  ];

  states.forEach(function (state) {
    $stateProvider.state(state);
  });
}

  // 'use strict';
  // $(window).load(function() {
  //     $('.body-wrapper').each(function() {
  //         var header_area = $('.header');
  //         var main_area = header_area.children('.nav-wrapper');
  //         var logo = main_area.find('.navbar-header');
  //         var navigation = main_area.find('.navbar-collapse');
  //         var original = {
  //             nav_top: navigation.css('margin-top')
  //         };
  //         $(window).scroll(function() {
  //             if (main_area.hasClass('bb-fixed-header') && ($(this).scrollTop() === 0 || $(this).width() < 750)) {
  //                 main_area.removeClass('bb-fixed-header').appendTo(header_area);
  //                 navigation.animate({
  //                     'margin-top': original.nav_top
  //                 }, {
  //                     duration: 300,
  //                     queue: false,
  //                     complete: function() {
  //                         header_area.css('height', 'auto');
  //                     }
  //                 });
  //             } else if (!main_area.hasClass('bb-fixed-header') && $(this).width() > 750 && $(this).scrollTop() > header_area.offset().top + header_area.height() - parseInt($('html').css('margin-top'), 10)) {
  //                 header_area.css('height', header_area.height());
  //                 main_area.css({
  //                     'opacity': '0'
  //                 }).addClass('bb-fixed-header');
  //                 main_area.appendTo($('body')).animate({
  //                     'opacity': 1
  //                 });
  //                 navigation.css({
  //                     'margin-top': '0px'
  //                 });
  //             }
  //         });
  //     });
  //     $(window).trigger('resize');
  //     $(window).trigger('scroll');
  // });
  //
  // $('.navbar a.dropdown-toggle').on('click', function(e) {
  //     var elmnt = $(this).parent().parent();
  //     if (!elmnt.hasClass('nav')) {
  //         var li = $(this).parent();
  //         var heightParent = parseInt(elmnt.css('height').replace('px', ''), 10) / 2;
  //         var widthParent = parseInt(elmnt.css('width').replace('px', ''), 10) - 10;
  //         if (!li.hasClass('open')) {
  //             li.addClass('open');
  //         } else {
  //             li.removeClass('open');
  //         }
  //         $(this).next().css('top', heightParent + 'px');
  //         $(this).next().css('left', widthParent + 'px');
  //         return false;
  //     }
  // });
  // if ($('.navbar').width() > 1007) {
  //     $('.nav .dropdown').on('mouseover', function() {
  //         $(this).addClass('open');
  //     }), $('.nav .dropdown').on('mouseleave', function() {
  //         $(this).removeClass('open');
  //     });
  // }
