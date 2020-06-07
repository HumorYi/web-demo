/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * @desc 生成数独游戏
 */

// 1、 生成完成的解决方案，Generator
// 2、 随机去除部分数据：按比例

const Generator = require('./generator');

class Suduku {

    constructor() {
        // 生成完成的解决方案
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    make(level = 5) {
        // 生成迷盘
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        });
    }
}

module.exports = Suduku;