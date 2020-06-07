/**
 *  create by jianyi on 2017/12/18.
 */
const Toolkit = require('./toolkit');
const tool_matrix = Toolkit.matrix;
const rowLen = tool_matrix.rowLen;

/**
 * @desc 检查数独解决方案
 *
 * @param array {Array} 进行检查的 数组
 *
 * @return marks {Array} 检查过后数组的结果标记
 */
function checkArray(array) {
    const len = array.length;
    const marks = new Array(len);
    // 默认都是成功的
    marks.fill(true);

    for (let i = 0; i < len - 1; i++) {
        // 对已经为false的数据进行过滤
        if (marks[i] === false) {
            continue;
        }

        let v = array[i];

        // 是否有效 0 -> 无效 , 1~9 -> 有效
        if (v === 0) {
            marks[i] = false;
            continue;
        }

        // i+1 ~ 9 位置的数据 是否和 i 位置的数据 重复
        for (let j = i + 1; j < len; j++) {

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
class Checker {

    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMarks = tool_matrix.makeMatrix(true);
    }

    get matrixMarks() {
        return this._matrixMarks;
    }

    get isSuccess() {
        return this._success;
    }

    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        // 检查标记
        this._success = this._matrixMarks.every(row => row.every(mark => mark === true));

        return this._success;
    }

    checkRows() {
        for (let rowIndex = 0; rowIndex < rowLen; rowIndex++) {
            // 检查当前行
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);

            // 遍历当前标记数组，找到 错误标记 的那一列，把当前行下的当前列的 错误标记 同步到 错误标记矩阵中
            for (let colIndex = 0, len = marks.length; colIndex < len; colIndex++) {
                if (marks[colIndex] === false) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }

            }
        }
    }

    checkCols() {
        const colLen = tool_matrix.colLen;

        for (let colIndex = 0; colIndex < colLen; colIndex++) {
            // 按行号来遍历当前列下的所有行数据
            const cols = [];

            for (let rowIndex = 0; rowIndex < rowLen; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);

            for (let rowIndex = 0, len = marks.length; rowIndex < len; rowIndex++) {
                if (marks[rowIndex] === false) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkBoxes() {
        let box = Toolkit.box;
        let boxLen = tool_matrix.boxLen;
        let cellLen = tool_matrix.cellLen;

        for (let boxIndex = 0; boxIndex < boxLen; boxIndex++) {
            const boxes = box.getBoxCells(this._matrix, boxIndex);

            const marks = checkArray(boxes);

            for (let cellIndex = 0; cellIndex < cellLen; cellIndex++) {
                if (marks[cellIndex] === false) {
                    const {rowIndex, colIndex} = box.convertFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }

        }
    }
}

module.exports = Checker;