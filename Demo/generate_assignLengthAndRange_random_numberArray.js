/**
 * Created by luoxing {Date}
 */

var random_numberArray = (function (n, minRang, maxRang) {

    /**
     * @desc 生成 指定长度和范围 的一个随机数字数组，minRang 和 maxRang 作为扩展参数，可指定数字区间的范围
     *
     * @param n {Number | StringNumber | Boolean: true} 前面类型中的值（目前只想到这几个类型，后面如果发现有再加入）
     * @param minRang {Number} 最小区间 （可选） default: 1
     * @param maxRang {Number} 最大区间 （可选） default: 31
     *
     * @return Array | Boolean {Array | Boolean} 如果有异常，则抛出false，否则返回生成的随机数组
     */

    /**
     * @desc 验证数据是否可用
     *  1、n类型
     *  2、n是否为正确的数据
     *  3、扩展参数（区间）是否可用
     * */
    /*if (verifyVariableType(n) === false
        || verifyData_isAvailable(n) === false
        || verifyRange_isAvailable(minRang, maxRang) === false
    ) {
        return false;
    }*/

    if (verifyVariableType(n) === false) {
        return "数字长度参数 类型错误，请输入正确的数字类型（Number, String, Boolean）";
    }

    if (verifyData_isAvailable(n) === false) {
        return "数字长度参数 数据错误，建议输入正整数，可以尝试输入js中能够转为正整数的任意类型数据";
    }

    if (verifyRange_isAvailable(minRang, maxRang) === false) {
        return "数字区间参数 数据错误，请输入两个不相等的正整数，如果有开始数字区间，那么请一定要输入闭合数字区间，并且 开始数字区间 要小于 结束区间";
    }

    n = verifyData_isAvailable(n);
    minRang = Math.floor(minRang) || 1;
    maxRang = Math.floor(maxRang) || 31;

    var randomNumberArray = [];

    // 递减遍历n
    for (var i = n; i > 0; i--) {
        var randomNumber = generateRandomNumber(minRang, maxRang);

        // 反复替换生成的随机数，直至得到一个在数组中未出现过的数字
        while (verifyNumberInArray(randomNumberArray, randomNumber) === true) {
            randomNumber = generateRandomNumber(minRang, maxRang);
        }

        randomNumberArray.push(randomNumber);
    }

    if (randomNumberArray.length === 0) {
        return "随机数字数组为空，请联系作者：luoxing@8493.com , 谢谢";
    }

    // 手动回收变量
    verifyVariableType = null;
    verifyData_isAvailable = null;
    verifyRange_isAvailable = null;
    generateRandomNumber = null;
    verifyNumberInArray = null;

    // 返回生成的随机数字数组
    return randomNumberArray;

    /**
     * @desc 验证变量类型是否为所指定的类型
     *
     * @param variable {Any} 变量
     *
     * @return Boolean {Boolean} 符合要求：true，否则：false
     */
    function verifyVariableType(variable) {
        switch (Object.prototype.toString.call(variable).slice(8, -1)) {
            case "String":
                return true;
            case "Boolean":
                return true;
            case "Number":
                return true;
            default:
                return false;
        }
    }

    /**
     * @desc 验证数据可用性
     *
     * @param data 上面验证类型正确过后的数据
     *
     * @return Boolean | Number {Boolean | Number} 符合要求：返回转换后的数字，否则：false
     * */
    function verifyData_isAvailable(data) {

        switch (typeof data) {
            case "number":
                // 如果 <= 0，则表示无效
                if (data <= 0) {
                    return false;
                }

                return data;
            case "boolean":
                if (data === false) {
                    return false;
                }

                return Number(data);
            case "string":

                // Number(data) 可能转译为 0 的 字符串数据
                if (data === "" || data === "false" || data === "0") {
                    return false;
                }

                // 字符串数据为 Boolean 类型字符串, 且值是 true
                if (data === "true") {
                    return Number(Boolean(data));
                }

                // 不正确的字符串数据
                if (isNaN(data) === true) {
                    return false;
                }

                // 数字类型的字符串
                return Number(data);
        }
    }

    /**
     * @desc 验证区间数字范围是否可用
     *
     * @param minRang {Number} 最小数字
     * @param maxRang {Number} 最大数字
     * */
    function verifyRange_isAvailable(minRang, maxRang) {

        // 有minRang 就必须要有 maxRang，且两者必须是 >= 0 且 经过转换值之后 minRang <= maxRang 的正整数
        if (
            (minRang !== undefined && typeof minRang !== "number" || minRang <= 0)
            &&
            (maxRang === undefined || typeof maxRang !== "number" || maxRang >= 0)
            ||
            Math.floor(minRang) >= Math.floor(maxRang)
        ) {
            return false;
        }

        return true;
    }

    /**
     * @desc 生成指定数字区间的正整数
     *
     * @param minRang {Number} 最小整数范围
     * @param maxRang {Number} 最大整数范围
     * */
    function generateRandomNumber(minRang, maxRang) {
        return Math.floor(Math.random() * (maxRang - minRang)) + minRang;
    }

    /**
     * @desc 验证数字是否已存在数组中
     *
     * @param numberArray {Array} 数字数组
     * @param randomNumber {Number} 随机正整数
     *
     * @return Boolean {Boolean}
     * */
    function verifyNumberInArray(numberArray, randomNumber) {
        if (numberArray.indexOf(randomNumber) !== -1) {
            return true;
        }

        return false;
    }

})(12, 132, 412);

console.log(random_numberArray);
