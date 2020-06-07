/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @desc 矩阵数组相关
 * */
var matrixToolkit = {
    rowLen: 9,
    colLen: 9,
    boxLen: 9,
    cellLen: 9,

    /**
     * @desc 制作行数组
     *
     * @param v {Number} (可选) 数组元素初始值 default: 0
     *
     * @return array {Array}
     * */
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(matrixToolkit.colLen);
        // 把array中的每个值都赋值为 v
        array.fill(v);

        return array;
    },


    /**
     * @desc 制作矩阵数组
     *
     * @param v {Number} (可选) 数组元素初始值 default: 0
     *
     * @return array {Array}
     * */
    makeMatrix: function makeMatrix() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        /**
         * 网址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
         * Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。
         * Array.from(arrayLike, mapFn, thisArg)
         参数
         arrayLike
         想要转换成数组的伪数组对象或可迭代对象。
         mapFn (可选参数)
         如果指定了该参数，新数组中的每个元素会执行该回调函数。
         thisArg (可选参数)
         可选参数，执行回调函数 mapFn 时 this 对象。
         返回值
         一个新的数组实例
           { length: rowLen } === new Array(rowLen)
         */
        return Array.from({ length: matrixToolkit.rowLen }, function () {
            return matrixToolkit.makeRow(v);
        });
    },


    /**
     * Fisher-Yetes 算法
     * 随机置乱算法也被称做高纳德置乱算法,通俗说就是生成一个有限集合的随机排列
     *
     * 从0位置开始，在当前列随机找一个值与当前元素值，如果与当前值相等，则不替换，否则互换双方的值
     * --> 直到导数第二行，最后一行是不需要比较的
     */
    shuffle: function shuffle(array) {
        var arrLen = array.length;
        var endIndex = arrLen - 2;
        for (var i = 0; i <= endIndex; i++) {
            var j = Math.floor(Math.random() * (arrLen - i));

            if (array[i] === array[j]) {
                continue;
            }

            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }

        return array;
    },


    /**
     * @des 检查指定位置可填写数字
     *
     *
     * */
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex];
        var col = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex);

        /*for (let i=0; i<matrix.rowLen; i++) {
            if(
                row[i] === n
                || col[i] === n
                || box[i] === n
            ){
                return false;
            }
        }*/

        // method 2
        if (row.indexOf(n) !== -1 || col.indexOf(n) !== -1 || box.indexOf(n) !== -1) {
            return false;
        }

        return true;
    }
};

/**
 * @desc 宫坐标系工具
 * */
var boxToolkit = {

    /**
     * @desc 获取当前宮内每一格的值
     *
     * @return Array {Array}
     * */
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        // 当页面格局从全局宮转为全局格时，等于横向和纵向都缩小了3倍
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];

        for (var cellIndex = 0; cellIndex < matrixToolkit.colLen; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;

            result.push(matrix[rowIndex][colIndex]);
        }

        return result;
    },


    /**
     * @desc 注意：要定义一个格式的位置，必须要有横坐标和纵坐标才可确定。
     *
     * 注意全局格，宮，宫内格之间 格局的联系
     *  1、全局格是：9 * 9,   （0~8，0~8）
     *  2、全局宮是：3 * 3
     *  3、宫内格是：3 * 3
     *
     *  其实这三者之间的布局联系紧密，
     *      全局宮和宫内格布局一样，而全局格与前两者之间有倍数（3）联系
     *
     *      全局宮和宫内格布局:
     *      （
     *          横向：
     *              1、0~2
     *              2、3~5
     *              3、6~8
     *
     *              x * 1
     *          纵向：
     *              1、0~3~6
     *              2、1~4~7
     *              3、2~5~8
     *
     *              y * 3
     *
     *          可以发现刚好都与3有关，
     *              x % 3 可以得到 宫内格 在 当前宮 中的横坐标
     *              Math.floor(y / 3) * 3 可以得到 宫内格 在 当前宮 中的纵坐标
     *
     *              刚好又发现：横坐标 + 纵坐标 = 宫内格序号;
     *
     *
     * 参数解析：
     *    rowIndex: 全局行位置，
     *    colIndex: 全局列位置，
     *    boxIndex: 当前宮位置，
     *    cellIndex: 宮内格序号（0~8）
     */

    // 把行坐标和列坐标 转变为 宮位置和宫内格序号
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            /**
             * @desc 获取当前宮位置
             *       1、当页面格局从全局格转为全局宮时，等于横向和纵向都放大了3倍
             *       2、全局宮之间纵坐标的差异为：0~3~6
             *       3、全局宮之间横坐标的差异为：0~2
             */
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            /**
             * @desc 获取宫内序号
             *       1、全局格坐标（x: 0~8, y: 0~8）先转为全局宮坐标（x: 0~2, y: 0~2）
             *       2、全局宮内格纵坐标之间的差异为：0~3~6
             *       3、全局宮内格横坐标之间的差异为：0~2
             *       4、宫内格序号：（row: 0~2, col: 0~2, i: { row: 0~3~6, col: 0~2 }）
             */
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },


    // 把宮位置和宫内格序号 转变为 行坐标和列坐标
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        // 获取当前宮在全局宮中的起始坐标，再加上当前格偏移起始坐标之间的差值，得到全局格的 横、纵坐标
        return {
            /**
             * @desc 获取当前格列在全局格中的列坐标
             *       1、当页面格局从全局宮转为全局格时，等于横向和纵向都缩小了3倍
             *       2、一个宮内有3行3列宫内格，全局宮一行有3个宮，
             *        当前行宮与宮间隔为：0~2~5~8
             *       3、宫内序号列之间的差异为：0~2
             *
             *       4、boxIndex % 3 * 3 可获取到横坐标之间 当前宮 距离 全局格（初始坐标（0，0））之间的 横向距离
             *       5、cellIndex % 3 可获取 当前格 在 当前宮 内的横向距离
             */
            colIndex: boxIndex % 3 * 3 + cellIndex % 3,
            /**
             *  @desc 获取当前格列在全局格中的行坐标
             *       1、当页面格局从全局宮转为全局格时，等于横向和纵向都缩小了3倍
             *       2、全局宮每行宮之间纵坐标的差异为：0~2~5~8
             *       3、全局宮之间横坐标的差异为：0~2
             *
             *       4、Math.floor(boxIndex / 3) * 3 当前宮 距离 全局格（初始坐标（0，0））之间的 纵向距离
             *       5、Math.floor(cellIndex / 可获取 当前格 在 当前宮 内的纵向距离
             */
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3)
        };
    }
};

/**
 * @desc 工具集
 * */

var Toolkit = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        /**
         * 矩阵数组相关的工具
         * */
        get: function get() {
            return matrixToolkit;
        }

        /**
         * 宫坐标系的相关工具
         * */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

module.exports = Toolkit;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($("#container"));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", function (e) {
    if (grid.check() === true) {
        alert("success");
        return;
    }

    alert("failed");
});

$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});

$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * 生成九宫格
 */
// const Generator = require("../core/generator");
var Suduku = __webpack_require__(3);
var Checker = __webpack_require__(5);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var suduku = new Suduku();
            suduku.make();
            var matrix = suduku.puzzleMatrix;

            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

            // 为矩阵中每列添加一个 span标签
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue === 0 ? "empty" : "fixed").text(cellValue);
                });
            });

            // 为矩阵中的每行添加一个 div标签
            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });

            // 把矩阵添加到面板中去
            this._$container.append($divArray);
        }

        // 布局表格大小

    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();

            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }

        /**
         * @desc 检查用户迷盘数据是否正确，错误的显示错误标记
         * */

    }, {
        key: "check",
        value: function check() {
            // 获取需要检查的数据

            // 这里可结合数字弹窗面板对span文本做一些处理，避免显示 0 的问题
            var data = this._$container.children().map(function (rowIndex, div) {

                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($data) {
                return $data.toArray();
            });

            var checker = new Checker(data);

            if (checker.check() === true) {
                return true;
            }

            var marks = checker.matrixMarks;

            // 找到有错误标记的那些格，在页面上显示
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span);
                    var cell = marks[rowIndex][colIndex];

                    if ($span.is(".fixed")) {
                        return;
                    }

                    if (cell === true) {
                        if ($span.hasClass("error") === true) {
                            $span.removeClass("error");
                        }

                        return;
                    }

                    if ($span.hasClass("error") === false) {
                        $span.addClass("error");
                    }
                });
            });
        }

        /**
         * @desc 重置当前游戏迷盘至初始状态
         * */

    }, {
        key: "reset",
        value: function reset() {
            this._$container.find("span:not(.fixed)").removeClass("error mark1 mark3").addClass("empty").text(0);
        }
    }, {
        key: "clear",
        value: function clear() {
            this._$container.find("span.error").removeClass("error mark1 mark3").addClass("empty").text(0);
        }
    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumber) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);

                popupNumber.popup($cell);
            });
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * @desc 生成数独游戏
 */

// 1、 生成完成的解决方案，Generator
// 2、 随机去除部分数据：按比例

var Generator = __webpack_require__(4);

var Suduku = function () {
    function Suduku() {
        _classCallCheck(this, Suduku);

        // 生成完成的解决方案
        var generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    _createClass(Suduku, [{
        key: 'make',
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            // 生成迷盘
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Suduku;
}();

module.exports = Suduku;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * 生成数独解决方案
 * */

var Toolkit = __webpack_require__(0);
var matrix = Toolkit.matrix;
var rowLen = matrix.rowLen;
var cellLen = matrix.colLen;

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (this.internalGenerate() === false) {
                console.log("try again");
            }
        }

        /**
         * 生成数独数据
         * */

    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            // TODO 入口方法

            // 生成矩阵
            this.matrix = matrix.makeMatrix();

            // 初始生成一个有序的且随机的数组
            this.orders = matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return matrix.shuffle(row);
            });

            // 循环检查每一行
            for (var n = 1; n <= rowLen; n++) {
                if (this.fillNumber(n) === false) {
                    return false;
                }
            }

            return true;

            // return matrix.makeRow().every(n);
        }

        /**
         * @desc 填充数字
         *
         * @param n {Number}
         * */

    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }

        /**
         * 为每行中的某列填充数据
         * */

    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            // 递归调用 8行
            if (rowIndex > 8) {
                return true;
            }

            // 获取当前行数据
            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];

            // TODO 随机选择列，且是有序的，才能在递归中顺序进行
            for (var i = 0; i < cellLen; i++) {
                // 获取orders中一个有序的序号
                var colIndex = orders[i];

                // 已填充过数据（初始数组时，默认所有值为0）
                if (row[colIndex] !== 0) {
                    continue;
                }

                // 检查该位置是否可填数字 （除了当前行、列、宮）
                if (matrix.checkFillable(this.matrix, n, rowIndex, colIndex) === false) {
                    continue;
                }

                // 给当前行下的当前列 填充数字
                row[colIndex] = n;

                // 当前行填写 n 成功，递归调用 fillRow() 来在下一行中 填写 n，如果没填进去，就继续寻找当前行下一个位置
                if (this.fillRow(n, rowIndex + 1) === false) {
                    // 上一行坐标
                    var preRowIndex = rowIndex;
                    var fillColIndex = colIndex;
                    // 恢复上一行当前列填写的数据为0（初始值）
                    this.matrix[preRowIndex][fillColIndex] = 0;
                    continue;
                }

                return true;
            }

            return false;
        }
    }]);

    return Generator;
}();

module.exports = Generator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  create by jianyi on 2017/12/18.
 */
var Toolkit = __webpack_require__(0);
var tool_matrix = Toolkit.matrix;
var rowLen = tool_matrix.rowLen;

/**
 * @desc 检查数独解决方案
 *
 * @param array {Array} 进行检查的 数组
 *
 * @return marks {Array} 检查过后数组的结果标记
 */
function checkArray(array) {
    var len = array.length;
    var marks = new Array(len);
    // 默认都是成功的
    marks.fill(true);

    for (var i = 0; i < len - 1; i++) {
        // 对已经为false的数据进行过滤
        if (marks[i] === false) {
            continue;
        }

        var v = array[i];

        // 是否有效 0 -> 无效 , 1~9 -> 有效
        if (v === 0) {
            marks[i] = false;
            continue;
        }

        // i+1 ~ 9 位置的数据 是否和 i 位置的数据 重复
        for (var j = i + 1; j < len; j++) {

            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }

    return marks;
}

/**
 * 1、输入：matrix, 用户完成的数独数据 9 * 9
 * 2、处理：对matrix 行、列、宮 进行检查，并填写 marks
 * 3、输出：检查是否成功、marks
 * */

var Checker = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._matrixMarks = tool_matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: 'check',
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            // 检查标记
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark === true;
                });
            });

            return this._success;
        }
    }, {
        key: 'checkRows',
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < rowLen; rowIndex++) {
                // 检查当前行
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);

                // 遍历当前标记数组，找到 错误标记 的那一列，把当前行下的当前列的 错误标记 同步到 错误标记矩阵中
                for (var colIndex = 0, len = marks.length; colIndex < len; colIndex++) {
                    if (marks[colIndex] === false) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'checkCols',
        value: function checkCols() {
            var colLen = tool_matrix.colLen;

            for (var colIndex = 0; colIndex < colLen; colIndex++) {
                // 按行号来遍历当前列下的所有行数据
                var cols = [];

                for (var rowIndex = 0; rowIndex < rowLen; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }

                var marks = checkArray(cols);

                for (var _rowIndex = 0, len = marks.length; _rowIndex < len; _rowIndex++) {
                    if (marks[_rowIndex] === false) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'checkBoxes',
        value: function checkBoxes() {
            var box = Toolkit.box;
            var boxLen = tool_matrix.boxLen;
            var cellLen = tool_matrix.cellLen;

            for (var boxIndex = 0; boxIndex < boxLen; boxIndex++) {
                var boxes = box.getBoxCells(this._matrix, boxIndex);

                var marks = checkArray(boxes);

                for (var cellIndex = 0; cellIndex < cellLen; cellIndex++) {
                    if (marks[cellIndex] === false) {
                        var _box$convertFromBoxIn = box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _box$convertFromBoxIn.rowIndex,
                            colIndex = _box$convertFromBoxIn.colIndex;

                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: 'matrixMarks',
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: 'isSuccess',
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

module.exports = Checker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * @desc 数字弹窗面版
 */
var PopupNumbers = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this.$panel = $panel.hide().removeClass("hidden");

        this.$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;

            var $span = $(e.target);

            /*let spanText = $span.html();
            console.log($span.html() === 0);
            console.log(spanText);
            if (spanText === 0) {
                  spanText = "";
                console.log(spanText);
            }*/

            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark3")) {
                    $cell.removeClass("mark3");
                } else {
                    $cell.removeClass("mark3").addClass("mark1");
                }
            } else if ($span.hasClass("mark3")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark1").addClass("mark3");
                }
            } else if ($span.hasClass("empty")) {
                $cell.text(0).removeClass("mark1").removeClass("mark3").addClass("empty");
            } else {
                // 1~9 回填数字
                $cell.removeClass("empty").text($span.text());
            }

            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this.$panel.css({
                "left": left + "px",
                "top": top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this.$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

module.exports = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map