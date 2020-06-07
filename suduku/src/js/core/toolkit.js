/**
 * @desc 矩阵数组相关
 * */
const matrixToolkit = {
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
    makeRow(v = 0) {
        const array = new Array(matrixToolkit.colLen);
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
    makeMatrix(v = 0) {
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
        return Array.from({length: matrixToolkit.rowLen}, () => matrixToolkit.makeRow(v));
    },

    /**
     * Fisher-Yetes 算法
     * 随机置乱算法也被称做高纳德置乱算法,通俗说就是生成一个有限集合的随机排列
     *
     * 从0位置开始，在当前列随机找一个值与当前元素值，如果与当前值相等，则不替换，否则互换双方的值
     * --> 直到导数第二行，最后一行是不需要比较的
     */
    shuffle(array) {
        const arrLen = array.length;
        const endIndex = arrLen - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = Math.floor(Math.random() * (arrLen - i));

            if (array[i] === array[j]) {
                continue;
            }

            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    },

    /**
     * @des 检查指定位置可填写数字
     *
     *
     * */
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const col = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);

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
        if(
            row.indexOf(n) !== -1
            || col.indexOf(n) !== -1
            || box.indexOf(n) !== -1
        ){
            return false;
        }

        return true;
    }
};

/**
 * @desc 宫坐标系工具
 * */
const boxToolkit = {

    /**
     * @desc 获取当前宮内每一格的值
     *
     * @return Array {Array}
     * */
    getBoxCells(matrix, boxIndex) {
        // 当页面格局从全局宮转为全局格时，等于横向和纵向都缩小了3倍
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];

        for (let cellIndex = 0; cellIndex < matrixToolkit.colLen; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;

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
    convertToBoxIndex(rowIndex, colIndex) {
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
        }
    },

    // 把宮位置和宫内格序号 转变为 行坐标和列坐标
    convertFromBoxIndex(boxIndex, cellIndex) {
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
        }
    }
};

/**
 * @desc 工具集
 * */
class Toolkit {
    /**
     * 矩阵数组相关的工具
     * */
    static get matrix() {
        return matrixToolkit;
    }

    /**
     * 宫坐标系的相关工具
     * */
    static get box() {
        return boxToolkit;
    }
}

module.exports = Toolkit;