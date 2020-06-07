var bs = angular.module('bs', ['ionic']);
// 自定义服务：对$http的封装，
// 目的是为了每次发请求时显示一个加载中的遮盖层，请求完成隐藏遮盖层
bs.service('$get', [
  '$http',
  '$ionicLoading',
  '$bsAlter',
  function ($http, $ionicLoading, $bsAlter) {
    // 有两个参数：
    // url:请求的地址以及对应的参数
    // successCallback：成功的处理函数
    this.sendRequest = function (url, successCallback) {
      $ionicLoading.show({
        template: 'loading...'
      });
      $http
        .get(url)
        .success(function (response) {
          $ionicLoading.hide();
          if (response.code && response.code === 4) {
            $bsAlter.alert(response.msg);
            return;
          }
          successCallback && successCallback(response);
        })
        .error(function (err) {
          console.log(err);
        });
    };
  }
]);

bs.service('$post', [
  '$http',
  '$ionicLoading',
  '$bsAlter',
  function ($http, $ionicLoading, $bsAlter) {
    // 有两个参数：
    // url:请求的地址以及对应的参数
    // successCallback：成功的处理函数
    this.sendRequest = function (url, data, successCallback) {
      $ionicLoading.show({
        template: 'loading...'
      });
      $http({
          method: 'POST',
          url: url,
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          data: data,
          transformRequest: function (obj) {
            var str = [];
            for (var p in obj) {
              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
          }
        })
        .success(function (response) {
          $ionicLoading.hide();
          if (response.code && response.code === 4) {
            $bsAlter.alert(response.msg);
            return;
          }
          successCallback && successCallback(response);
        })
        .error(function (err) {
          console.log(err);
        });
    };
  }
]);

// 封装$ionicPopup.alert方法
bs.service('$bsAlter', [
  '$ionicPopup',
  function ($ionicPopup) {
    this.alert = function (str) {
      $ionicPopup.alert({
        template: str
      });
    };
  }
]);

// 配置路由词典
bs.config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  // 设置tabs显示在底部
  $ionicConfigProvider.tabs.position('bottom');

  // 设置路由控制
  $stateProvider
    .state('start', {
      url: '/bs_start',
      templateUrl: 'tpl/start.html'
    })
    .state('main', {
      url: '/bs_main',
      templateUrl: 'tpl/main.html',
      controller: 'mainCtrl'
    })
    .state('detail', {
      url: '/bs_detail/:bid',
      templateUrl: 'tpl/detail.html',
      controller: 'detailCtrl'
    })
    .state('order', {
      url: '/bs_order/:bid',
      params: {
        cids: null
      },
      templateUrl: 'tpl/order.html',
      controller: 'orderCtrl'
    })
    .state('myOrder', {
      url: '/bs_myOrder',
      templateUrl: 'tpl/myOrder.html',
      controller: 'myOrderCtrl'
    })
    .state('myCart', {
      url: '/bs_myCart',
      templateUrl: 'tpl/myCart.html',
      controller: 'myCartCtrl'
    })
    .state('myHeart', {
      url: '/bs_myHeart',
      templateUrl: 'tpl/myHeart.html',
      controller: 'myHeartCtrl'
    })
    .state('user', {
      url: '/bs_user',
      templateUrl: 'tpl/user.html',
      controller: 'userCtrl'
    })
    .state('userMsg', {
      url: '/bs_userMsg',
      templateUrl: 'tpl/userMsg.html',
      controller: 'userMsgCtrl'
    })
    .state('userEdit', {
      url: 'bs_userEdit',
      templateUrl: 'tpl/userEdit.html',
      controller: 'userEditCtrl'
    });
  $urlRouterProvider.otherwise('/bs_start');
});

// 总控制器
bs.controller('bsCtrl', [
  '$scope',
  '$state',
  '$timeout',
  '$location',
  '$ionicTabsDelegate',
  function ($scope, $state, $timeout, $location, $ionicTabsDelegate) {
    // 初始化用户数据
    $scope.userMsgManager = function () {
      $scope.uid = sessionStorage['uid'] || '';
      $scope.isLogin = Boolean($scope.uid);
      $scope.uname = sessionStorage['uname'] || '';
      $scope.myCart = {
        badge: sessionStorage['cartBadge'] || ''
      };
    };

    $scope.userMsgManager();

    $scope.configLoading = function () {
      $timeout(function () {
        var router = $location.$$url.split('#')[0].split('/')[1];

        // 开始目录不加载任何配置
        if (router === 'bs_start') {
          return;
        }

        var currHeaderTitle = '';

        $scope.isShowHeader = true;
        $scope.isShowFooterTabs = false;
        $scope.isShowLogo = false;
        $scope.isShowBack = true;

        // 路由匹配
        switch (router) {
          case 'bs_main':
            currHeaderTitle = '落星书屋';
            $scope.isShowHeader = false;
            $scope.isShowLogo = true;
            $scope.isShowBack = false;
            break;
          case 'bs_myCart':
            currHeaderTitle = '书车页';
            $scope.isShowFooterTabs = true;
            $scope.isShowBack = false;
            break;
          case 'bs_detail':
            currHeaderTitle = '书详情页';
            break;
          case 'bs_order':
            currHeaderTitle = '订单信息页';
            break;
          case 'bs_user':
            currHeaderTitle = '登录 / 注册';
            break;
          case 'bs_userMsg':
            currHeaderTitle = '我的信息';
            break;
          case 'bs_userEdit':
            currHeaderTitle = '个人信息编辑页';
            break;
          case 'bs_myHeart':
            currHeaderTitle = '我的收藏';
            break;
          case 'bs_myOrder':
            currHeaderTitle = '我的订单';
            break;
          default:
            break;
        }

        // 头部信息
        $scope.headerTitle = currHeaderTitle;
      }, 0);
    };

    $scope.configLoading();

    // 返回首页
    $scope.homeClass = 'ion-ios-home-outline';
    $scope.goHome = function () {
      if ($location.$$url === '/bs_main') {
        return;
      }

      $scope.homeClass = 'ion-ios-home';
      $timeout(function () {
        $scope.homeClass = 'ion-ios-home-outline';
        $scope.jump('main');
      }, 200);
    };

    $scope.goBack = function () {
      if (window) {
        window.history.back();
        $timeout(function () {
          $scope.configLoading();
        }, 0);
      }
    };

    // 底部页签点击事件
    $scope.footerTabSelect = function (index, router) {
      // 为什么不直接跳转？因为触发选项卡 on-select 事件时，首次会自动默认激活第一位页签
      $ionicTabsDelegate.select(index);
      router && $scope.jump(router);
    };

    // 定义跳转页面方法
    $scope.jump = function (desState, params) {
      $state.go(desState, params);
      $timeout(function () {
        $scope.configLoading();
      }, 0);
    };

    // 退出用户
    $scope.exitNowAccount = function () {
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('uname');
      sessionStorage.removeItem('cartBadge');
      $scope.userMsgManager();
      $scope.jump('user');
    };
  }
]);

// 书屋控制器
bs.controller('mainCtrl', [
  '$scope',
  '$get',
  '$ionicSideMenuDelegate',
  '$ionicModal',
  function ($scope, $get, $ionicSideMenuDelegate, $ionicModal) {
    // 显示侧边栏方向
    $scope.showSide = function (e) {
      $ionicSideMenuDelegate.toggleLeft();
    };

    // 判断是否可加载
    $scope.hasMore = true;

    // 对应对象获取搜索框关键字
    $scope.info = {
      kw: ''
    };

    // 定义空数组获取书列表
    $scope.books = [];

    // 定义 '关于落星书屋' 的信息
    $scope.infoList = [{
        name: '开发者',
        value: '落星'
      },
      {
        name: '版本号',
        value: 'version 1.0'
      },
      {
        name: 'email',
        value: 'luoxing8493@126.com'
      },
      {
        name: '开发者个人网站',
        value: 'huangjianyi.applinzi.com'
      }
    ];

    // 定义模态框 '关于落星书屋' 页面
    $ionicModal
      .fromTemplateUrl('tpl/about.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function (modal) {
        $scope.aboutModal = modal;
      });

    // 打开模态框
    $scope.open = function () {
      $scope.aboutModal.show();
    };

    // 关闭模态框
    $scope.close = function () {
      $scope.aboutModal.hide();
    };

    // 退出App
    $scope.exitApp = function () {
      ionic.Platform.exitApp();
    };

    // 获取书列表
    function getBooks() {
      $get.sendRequest('./data/bs_getByPage.php', function (response) {
        var data = response.data;
        if (data.length) {
          $scope.books = data;
          $scope.hasBooks = true;
          return;
        }
        $scope.hasBooks = false;
      });
    }

    getBooks();

    // 下拉请求更多的书
    $scope.loadMore = function () {
      if ($scope.books) {
        $get.sendRequest(
          './data/bs_getByPage.php?start=' + $scope.books.length,
          function (response) {
            $scope.books = $scope.books.concat(response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (response.data.length < 5) {
              $scope.hasMore = false;
            }
          }
        );
      }
    };

    // 搜索框按关键字查询符合条件的书
    // $scope.$watch监听的必须是对象
    $scope.$watch('info.kw', function () {
      if ($scope.info.kw) {
        $get.sendRequest('./data/bs_getByKW.php?kw=' + $scope.info.kw, function (
          response
        ) {
          var data = response.data;
          if (data.length) {
            $scope.books = response.data;
            $scope.hasBooks = true;
            return;
          }

          $scope.hasBooks = false;
        });

        return;
      }

      getBooks();
    });
  }
]);

// 书详情控制器
bs.controller('detailCtrl', [
  '$scope',
  '$get',
  '$post',
  '$stateParams',
  function ($scope, $get, $post, $stateParams) {
    // 添加/取消 关注
    $scope.isHeart = false;

    var bookId = $stateParams.bid;

    // 请求对应bid的书详情页
    $get.sendRequest('./data/bs_detail.php?bid=' + bookId, function (response) {
      $scope.book = response.data;
      if (!$scope.$parent.isLogin) {
        return;
      }

      $get.sendRequest(
        './data/heart_has.php?uid=' + $scope.$parent.uid + '&bid=' + bookId,
        function (response) {
          $scope.isHeart = response.isHeart;
        }
      );
    });

    // 切换关注
    $scope.toggleHeart = function () {
      if (!$scope.$parent.isLogin) {
        $scope.$parent.jump('user');
        return;
      }

      $post.sendRequest(
        './data/heart_toggle.php', {
          uid: $scope.$parent.uid,
          bid: bookId
        },
        function (response) {
          $scope.isHeart = response.isHeart;
        }
      );
    };

    // 跳转到购物车
    $scope.goCart = function () {
      $scope.$parent.footerTabSelect(1, 'myCart');
    };

    // 添加到书车
    $scope.addToCart = function () {
      if (!$scope.$parent.isLogin) {
        $scope.$parent.jump('user');
        return;
      }

      $post.sendRequest(
        './data/cart_add.php', {
          uid: $scope.$parent.uid,
          bid: bookId
        },
        function (response) {
          if (!response.isExist) {
            $scope.$parent.myCart.badge = ++sessionStorage['cartBadge'];
          }
        }
      );
    };

    // 立即购买
    $scope.goBuy = function () {
      var url = 'order';
      if (!$scope.$parent.isLogin) {
        url = 'user';
      }
      $scope.$parent.jump(url, {
        bid: bookId
      });
    };
  }
]);

// 个人书车控制器
bs.controller('myCartCtrl', [
  '$scope',
  '$get',
  '$post',
  '$bsAlter',
  '$ionicTabsDelegate',
  '$ionicPopup',
  function ($scope, $get, $post, $bsAlter, $ionicTabsDelegate, $ionicPopup) {
    $scope.hasBook = false;
    $ionicTabsDelegate.selectedIndex() !== 1 && $scope.footerTabSelect(1);

    if (!$scope.$parent.isLogin) {
      return;
    }

    $get.sendRequest(
      './data/cart_select.php?uid=' + $scope.$parent.uid,
      function (response) {
        if (response.data.length) {
          $scope.hasBook = true;
        }

        // 记录已选中个数，用于匹配是否全选
        var selectCount = 0;
        $scope.carts = response.data.map(function (record) {
          record.cid = Number(record.cid);
          record.bid = Number(record.bid);
          record.bookCount = Number(record.bookCount);
          record.isSelect = Boolean(record.isSelect);

          if (record.isSelect) {
            selectCount++;
          }

          return record;
        });

        $scope.isSelectAll = selectCount ?
          selectCount === $scope.carts.length :
          false;

        // 总计书车中书的总价
        $scope.sumAll = function () {
          var totalPrice = 0;
          $scope.carts.forEach(function (record) {
            if (record.isSelect) {
              totalPrice += record.price * record.bookCount;
            }
          });

          return totalPrice.toFixed(2) || 0.0;
        };

        function updateIsSelectServer(cids, isSelect) {
          $post.sendRequest('./data/cart_updateSelect.php', {
            uid: $scope.$parent.uid,
            cids: cids,
            isSelect: Number(isSelect)
          });
        }

        // 选中书籍
        $scope.selectBook = function (book) {
          book.isSelect ? selectCount++ : selectCount--;
          $scope.isSelectAll = $scope.carts.length === selectCount;

          updateIsSelectServer([Number(book.cid)], book.isSelect);
        };

        // 全选书籍
        $scope.selectAllBook = function () {
          var cartIds = [],
            isSelectAll = Boolean($scope.isSelectAll);

          $scope.carts = $scope.carts.map(function (record) {
            if (record.isSelect !== isSelectAll) {
              record.isSelect = isSelectAll;
              cartIds.push(Number(record.cid));
            }

            return record;
          });

          updateIsSelectServer(cartIds, isSelectAll);
        };

        // 更新书车输入框中书的数量
        function updateCountServer(book) {
          $post.sendRequest(
            './data/cart_updateCount.php', {
              uid: $scope.$parent.uid,
              cid: book.cid,
              bookCount: Number(book.bookCount)
            },
            function (response) {
              book.isSelect = true;
            }
          );
        }

        // 判断数量输入框中内容是否符合条件
        $scope.validateBookCount = function (book) {
          var bookCount = book.bookCount;

          if (
            bookCount === '' ||
            bookCount !== bookCount ||
            isNaN(bookCount) ||
            bookCount.indexOf('.') !== -1 ||
            bookCount < 1
          ) {
            $bsAlter.alert('请输入大于1的整数');
          }

          updateCountServer(book);
        };

        // 增加书数量
        $scope.increment = function (book) {
          book.bookCount++;
          updateCountServer(book);
        };

        // 减少书数量
        $scope.decrement = function (book) {
          if (book.bookCount <= 1) {
            return;
          }

          book.bookCount--;
          updateCountServer(book);
        };

        // 点击商品数量输入框弹窗输入数量
        $scope.changeBookCount = function (book) {
          // 后台处理逻辑，如果当前书未选中，如果点击
          // (oldBookCount = oldBookCount > 1 ? oldBookCount++ : oldBookCount)
          $scope.oldBook = {
            count: book.bookCount
          };
          $ionicPopup.show({
            template: '<button class="button button-small" :disabled="oldBook.count===1" ng-class="oldBook.count===1 ? \'button-stable\' : \'button-dark\'" ng-click="oldBook.count= oldBook.count <=1 ? oldBook.count : oldBook.count-1">-</button>' +
              '<input type="number" ng-model="oldBook.count">' +
              '<button class="button button-small button-dark" ng-click="oldBook.count=oldBook.count+1;">+</button>',
            title: '修改购买数量',
            scope: $scope,
            buttons: [{
                text: '取消',
                type: 'button-stable'
              },
              {
                text: '<b>确定</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if ($scope.oldBook.count === book.bookCount) {
                    return;
                  }

                  book.bookCount = $scope.oldBook.count;
                  updateCountServer(book);
                }
              }
            ]
          });
        };

        // 跳转到订单页
        $scope.$parent.jumpToOrder = function () {
          var cids = [];

          $scope.carts.forEach(function (cart) {
            cids.push(cart.cid);
          });

          $scope.$parent.jump('order', {
            cids: cids
          });
        };
      }
    );
  }
]);

// 书单控制器
bs.controller('orderCtrl', [
  '$scope',
  '$get',
  '$post',
  '$stateParams',
  '$bsAlter',
  function ($scope, $get, $post, $stateParams, $bsAlter) {
    // 订单数据
    $scope.order = {
      uid: $scope.$parent.uid,
      uname: '',
      phone: '',
      addr: ''
    };

    var bid = $stateParams.bid,
      cids = $stateParams.cids,
      url = './data/order_addFromBookDetail.php';

    // 获取详情页的书id，只有直接从书详情页跳转过来才有
    if (bid) {
      $scope.order.bid = bid;
    } else if (cids) {
      // 否则是从书车页点击去结算
      $scope.order.cids = cids;
      url = './data/order_addFromCart.php';
    }

    // 提交订单
    $scope.submitOrder = function () {
      if ($scope.order.uname && $scope.order.phone && $scope.order.addr) {
        $post.sendRequest(url, $scope.order, function (response) {
          $scope.oid = response.oid;
          $scope.requestResult = '下单成功，订单编号为' + $scope.oid;

          // 重新获取书车的记录个数
          if (cids) {
            $get.sendRequest(
              './data/cart_getCount.php?uid=' + $scope.$parent.uid,
              function (response) {
                $scope.$parent.myCart.badge = sessionStorage['cartBadge'] =
                  response['cartBadge'] || 0;
              }
            );
          }
        });
        return;
      }

      $bsAlter.alert('请填写 收书人、手机号码、收书地址 信息');
    };
  }
]);

// 个人书单控制器
bs.controller('myOrderCtrl', [
  '$scope',
  '$get',
  function ($scope, $get) {
    $scope.$parent.userMsgManager('书单页');

    $get.sendRequest(
      './data/order_getByUid.php?uid=' + $scope.$parent.uid,
      function (response) {
        $scope.orderList = response.data;
      }
    );
  }
]);

// 我的收藏
bs.controller('myHeartCtrl', [
  '$scope',
  '$get',
  function ($scope, $get) {
    $scope.$parent.userMsgManager('关注页');

    $get.sendRequest(
      './data/heart_select.php?uid=' + $scope.$parent.uid,
      function (response) {
        $scope.heart = response.data;
      }
    );
  }
]);

// 用户登录注册控制器
bs.controller('userCtrl', [
  '$scope',
  '$post',
  '$bsAlter',
  function ($scope, $post, $bsAlter) {
    function userTest(unameVal, upwdVal) {
      if (!unameVal || !upwdVal) {
        $bsAlter.alert('用户名或密码不能为空!');
        return false;
      } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/.test(unameVal)) {
        $bsAlter.alert('用户名长度必须为1~10位，只能输入英文 / 中文 / 数字');
        return false;
      } else if (upwdVal.length < 8 || upwdVal.length > 16) {
        $bsAlter.alert('密码长度必须为8 ~ 16位');
        return false;
      }

      return true;
    }

    // 登录验证
    $scope.loginTest = function () {
      if (!userTest($scope.unameVal, $scope.upwdVal)) {
        return;
      }

      $post.sendRequest(
        './data/user_login.php', {
          uname: $scope.unameVal.trim(),
          upwd: $scope.upwdVal
        },
        function (response) {
          sessionStorage['uid'] = response['uid'];
          sessionStorage['uname'] = response['uname'];
          sessionStorage['cartBadge'] = response['cartBadge'];
          $scope.$parent.userMsgManager();
          $scope.$parent.jump('main');
        }
      );
    };

    // 注册验证
    $scope.registerTest = function () {
      if (!userTest($scope.unameVal, $scope.upwdVal)) {
        return;
      }

      $post.sendRequest(
        './data/user_register.php', {
          uname: $scope.unameVal.trim(),
          upwd: $scope.upwdVal
        },
        function (response) {
          $bsAlter.alert('注册成功，请登录');
        }
      );
    };
  }
]);

// 显示 '用户信息' 页面
bs.controller('userMsgCtrl', [
  '$scope',
  '$get',
  function ($scope, $get) {
    $get.sendRequest(
      './data/user_orderAndHeartBadge.php?uid=' + $scope.$parent.uid,
      function (response) {
        $scope.heartBadge = response.heartBadge;
        $scope.orderBadge = response.orderBadge;
      }
    );
  }
]);

// 编辑 '用户信息' 页面
bs.controller('userEditCtrl', [
  '$scope',
  '$post',
  '$bsAlter',
  '$ionicModal',
  '$timeout',
  function ($scope, $post, $bsAlter, $ionicModal, $timeout) {
    // 修改用户名
    $scope.uname = {
      val: $scope.$parent.uname
    };

    $scope.alterUname = function () {
      var newUname = $scope.uname.val;

      if (!newUname) {
        $bsAlter.alert('用户名不能为空!');
        return;
      } else if (!/^[A-z\d\u4e00-\u9fa5]{1,10}$/.test(newUname)) {
        $bsAlter.alert('用户名只能为英文 / 中文 / 数字');
        return;
      } else if (newUname === $scope.$parent.uname) {
        $bsAlter.alert('新用户名和旧用户名一致');
        return;
      }

      $post.sendRequest(
        './data/user_updateUname.php', {
          uid: $scope.$parent.uid,
          uname: newUname.trim()
        },
        function (response) {
          $scope.$parent.uname = newUname;
          $bsAlter.alert('修改成功');
        }
      );
    };

    $ionicModal
      .fromTemplateUrl('tpl/userUpdatePwd.html', {
        scope: $scope
      })
      .then(function (modal) {
        $scope.updateUpwd = modal;
      });

    // 打开模态框
    $scope.openUpdatePwd = function () {
      $scope.updateUpwd.show();
    };

    // 关闭模态框
    $scope.closeUpdatePwd = function () {
      $scope.updateUpwd.hide();
    };

    // 获取用户旧新密码
    $scope.upwd = {
      oldVal: '',
      newVal: ''
    };

    // 修改用户密码
    $scope.alterPwd = function () {
      var oldUpwd = $scope.upwd.oldVal,
        newUpwd = $scope.upwd.newVal;

      if (!oldUpwd || !newUpwd) {
        $bsAlter.alert('旧密码或新密码不能为空');
        return;
      } else if (newUpwd.length < 8 || newUpwd.length > 16) {
        $bsAlter.alert('新密码长度必须为8 ~ 16位');
        return;
      } else if (oldUpwd === newUpwd) {
        $bsAlter.alert('旧密码和新密码相同，请输入与旧密码不同的新密码');
        return;
      }

      $post.sendRequest(
        './data/user_updateUpwd.php', {
          uid: $scope.$parent.uid,
          oldUpwd: oldUpwd,
          newUpwd: newUpwd
        },
        function (response) {
          $scope.closeUpdatePwd();
          $bsAlter.alert('修改成功，请登录');
          $scope.$parent.exitNowAccount();
        }
      );
    };
  }
]);