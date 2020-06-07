/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * 生成九宫格
 */
// const Generator = require("../core/generator");
const Suduku = require('../core/suduku');
const Checker = require("../core/checker");

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        const suduku = new Suduku();
        suduku.make();
        const matrix = suduku.puzzleMatrix;

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

        // 为矩阵中每列添加一个 span标签
        const $cells = matrix.map(rowValues => rowValues
            .map((cellValue, colIndex) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue === 0 ? "empty" : "fixed")
                    .text(cellValue);
            }));

        // 为矩阵中的每行添加一个 div标签
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        // 把矩阵添加到面板中去
        this._$container.append($divArray);
    }

    // 布局表格大小
    layout() {
        const width = $("span:first", this._$container).width();

        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : ""
            });
    }

    /**
     * @desc 检查用户迷盘数据是否正确，错误的显示错误标记
     * */
    check() {
        // 获取需要检查的数据

        // 这里可结合数字弹窗面板对span文本做一些处理，避免显示 0 的问题
        const data =
            this._$container.children()
                .map((rowIndex, div) => {

                    return $(div).children()
                        .map((colIndex, span) => {
                            return parseInt($(span).text()) || 0;
                        });
                })
                .toArray()
                .map($data => $data.toArray());

        const checker = new Checker(data);

        if (checker.check() === true) {
            return true;
        }

        const marks = checker.matrixMarks;

        // 找到有错误标记的那些格，在页面上显示
        this._$container.children()
            .each((rowIndex, div) => {
                $(div).children().each((colIndex, span) => {
                    const $span = $(span);
                    const cell = marks[rowIndex][colIndex];

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
    reset() {
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark3")
            .addClass("empty")
            .text(0);
    }

    clear() {
        this._$container.find("span.error")
            .removeClass("error mark1 mark3")
            .addClass("empty")
            .text(0);
    }

    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }

    bindPopup(popupNumber) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);

            popupNumber.popup($cell);
        });
    }
}

module.exports = Grid;