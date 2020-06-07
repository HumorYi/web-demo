/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * 生成数独解决方案
 * */

const Toolkit = require('./toolkit');
const matrix = Toolkit.matrix;
const rowLen = matrix.rowLen;
const cellLen = matrix.colLen;

class Generator {

    generate() {
        while (this.internalGenerate() === false) {
            console.log("try again");
        }
    }

    /**
     * 生成数独数据
     * */
    internalGenerate() {
        // TODO 入口方法

        // 生成矩阵
        this.matrix = matrix.makeMatrix();

        // 初始生成一个有序的且随机的数组
        this.orders = matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => matrix.shuffle(row));

        // 循环检查每一行
        for (let n = 1; n <= rowLen; n++) {
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
    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    /**
     * 为每行中的某列填充数据
     * */
    fillRow(n, rowIndex) {
        // 递归调用 8行
        if (rowIndex > 8) {
            return true;
        }

        // 获取当前行数据
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];

        // TODO 随机选择列，且是有序的，才能在递归中顺序进行
        for (let i = 0; i < cellLen; i++) {
            // 获取orders中一个有序的序号
            const colIndex = orders[i];

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
                const preRowIndex = rowIndex;
                const fillColIndex = colIndex;
                // 恢复上一行当前列填写的数据为0（初始值）
                this.matrix[preRowIndex][fillColIndex] = 0;
                continue;
            }

            return true;
        }

        return false;
    }
}

module.exports = Generator;