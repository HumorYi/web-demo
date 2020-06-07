/* 日期对象api
        console.log(date.getFullYear()); //获取当前的长年份
        /!**
         *  注释：由 getYear() 返回的值不总是 4 位的数字！对于介于 1900 与 1999 之间的年份，getYear() 方法仅返回两位数字。对于 1900 之前或 1999 之后的年份，则返回 4 位数字！
         *  注释：该方法总是结合一个 Date 对象来使用。
         *  重要事项：从 ECMAScript v3 开始，JavaScript 的实现就不再使用该方法，而使用 getFullYear() 方法取而代之！
         * *!/
        console.log(date.getYear()); //获取当前的短年份
        console.log(date.getMonth() + 1); //获取当前的月份 获取的月份数是从0-(一月份)开始的
        console.log(date.getDate()); // 获取当前的天数，今天是几号
        console.log(date.getDay()); // 获取当前的星期数 0-(星期日)
        console.log(date.getHours()); // 获取当前的小时数
        console.log(date.getMinutes()); // 获取当前的分钟数
        console.log(date.getSeconds()); // 获取当前的秒数
        console.log(date.getMilliseconds()); // 获取当前的毫秒数*/

window.$ = HTMLElement.prototype.$ = function (selector) {
    var elems = (this === window ? document : this).querySelectorAll(selector);

    return elems.length === 0 ? null : elems.length === 1 ? elems[0] : elems;
};

window.onload = function () {
    var date = new Date();
    var currYear = date.getFullYear();
    var currMonth = date.getMonth() + 1;

    var yearHtml = '<div id="sel_date"><span>年份 : </span><select id="year" onchange="select_date(this)">';
    for (var i = 1900; i <= 2117; i++) {
        if (i === currYear) {
            yearHtml += "<option value='" + i + "' selected>" + i + "</option>";
            continue;
        }

        yearHtml += "<option value='" + i + "'>" + i + "</option>";
    }
    yearHtml += '</select>';

    var monthHtml = '<span>月份 : </span><select id="month" onchange="select_date(this)">';
    for (var i = 1; i <= 12; i++) {
        if (i === currMonth) {
            monthHtml += "<option value='" + i + "' selected>" + i + "</option>";
            continue;
        }
        monthHtml += "<option value='" + i + "'>" + i + "</option>";
    }
    monthHtml += '</select></div>';

    var tableHtml = '<table id="day" cellpadding="0" cellspacing="0" border="1"><thead></thead><tbody></tbody></table></tbody></table>';

    $('#date').innerHTML = yearHtml + monthHtml + tableHtml;

    tableHtml = null;
    yearHtml = null;
    monthHtml = null;

    initDate(currYear, currMonth);
};

/**
 * 初始化日期
 * @param: year 年份
 * @param: month 月份
 * @param: callback 回调函数
 * */
function initDate(year, month) {
    // 获取table对象
    var theadDom = $('table#day > thead');
    var tbodyDom = $('table#day > tbody');

    // 星期数组
    var weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    // 日期表头信息
    var theadHtml = "<tr>";
    for (var i = 0, weekLen = weekArr.length; i < weekLen; i++) {
        theadHtml += "<th>" + weekArr[i] + "</th>";
    }
    theadHtml += "</tr>";
    // 表格追加表头日期元素
    theadDom.innerHTML = theadHtml;

    // 日期展示和回调方法的定义, 定义月份要比实际月份小一，因为月份数是从0开始的
    // var date = new Date(year, month, 1);
    // 获取本年本月的第一天是星期几
    var week = new Date(year, month-1, 1).getDay();
    // 获取本年本月的天数
    var monthDays = getDays(year, month);
    // 获取本年上个月的天数
    var prevMonthDays = getDays(year, month - 1);
    // 获取当天时间
    var currentDay = new Date().getDate();

    // 日期表身体信息
    var tbodyHtml = "";
    // 累加天数
    var incDay = 0;
    // 获取本年本月第一天的星期数 0=星期日
    var k = week;

    var formatMonth = month;
    if (formatMonth < 10) {
        formatMonth = "0" + formatMonth;
    }
    var yearAndMonth = year + "-" + formatMonth;

    while (incDay < monthDays) {
        tbodyHtml += "<tr>";
        for (var i = 0; i < 7; i++) {
            setTdText();
        }
    }

    // 表格追加表身体日期元素
    tbodyDom.innerHTML = tbodyHtml;

    // 设置表格内容
    function setTdText() {
        // 不是本月第一天的星期，表格内容显示空格
        var tdText = '';
        var tdDate = "";
        var tdClassText = '';
        /**
         * 累加本月天数规则:
         *  1、累加本月天数规则
         *  2、大于本月第一天 && 小于本月天数
         *
         * 表格文本为：累加本月天数
         * */
        if (
            (incDay === 0 && i === week)
            || (incDay > 0 && incDay < monthDays)
        ) {
            // 可读性强写法
            incDay++;
            // 高级写法 tdText = ++incDay;
            tdText = incDay;

            var formatDay = incDay;
            if (formatDay < 10) {
                formatDay = "0" + formatDay;
            }

            tdDate = " date=" + "'" + yearAndMonth + "-" + formatDay + "'";

            if (incDay === currentDay) {
                tdClassText = " class='currentDay'";
            }
        }
        else {
            if (incDay === 0) {
                // 这里计算完上个月在本月显示的天数之后，k最终值为0
                k--;
                tdText = prevMonthDays - k;
            }
            else {
                // 这里计算完下个月在本月显示的天数，利用k初始值为0自增，可减少一个变量
                k++;
                tdText = k;
            }
            tdClassText = " class='back'";
        }

        tbodyHtml += "<td" + tdClassText + tdDate + " onclick='showDate(this)'>" + tdText + "</td>";
    }
}

/**
 * 获取一年中每个月的天数
 * 1、2月份：闰年-29天，平年-28天
 * 2、4、6、9、11月份，这几个月-30天
 * 3、其余的月份-31天 / 1、3、5、7、9、10、12这几个月-31天
 * @param: year 年份
 * @param: month 月份
 * */
function getDays(year, month) {
    var days = 31;
    if (isLearYear(year) === true && month === 2) {
        days = 29;
    }
    else if (isLearYear(year) === false && month === 2) {
        days = 28;
    }
    else if (month === 4 || month === 6 || month === 9 || month === 11) {
        days = 30;
    }

    return days;
}

/**
 * 判断是否是闰年
 * 规则：能 被 4 整除，但是 不能 被 100 整除 / 能被 400 整除
 * */
function isLearYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));
}

/**
 * 日期下拉框选中时，更新日历
 * @param obj: 当前选中的对象
 * */
function select_date(obj) {
    var selYear = Number($('select#year').value);
    var selMonth = Number($('select#month').value);

    initDate(selYear, selMonth);
}

/**
 * 点击当前天数，显示完整日期
 * */
function showDate(obj) {
    var tdDate = obj.getAttribute('date');
    var month = Number($('select#month').value);

    // 只对本月天数进行触发
    if (tdDate && (Number(tdDate.split('-')[1]) === month)) {

        var styleSheetList = document.styleSheets;
        // var cssRuleList = $("head > link#date_css");

        for (var i = 0, ssLen = styleSheetList.length; i < ssLen; i++) {
            var currStyleSheet = styleSheetList[i];

            if (currStyleSheet["ownerNode"]["id"] === "date_css") {

                var rules = currStyleSheet["rules"];

                for (var j = 0, ruleLen = rules.length; j < ruleLen; j++) {

                    var curr = rules[j];

                    if (curr.selectorText === "table#day > tbody > tr > td"
                        || curr.selectorText === "table#day > thead > tr > th"
                    ) {
                        curr.style.borderColor = randHexFinallyColor();
                        curr.style.background = 'linear-gradient(5deg, ' + randRgbColor() + ',' + randRgbColor() + ')';
                        curr.style.color = randHexFinallyColor();
                        curr.style.boxShadow = "0px 0px 12px 2px " + randHexFinallyColor() + " inset";
                    }
                }

                return;
            }
        }
    }
}

/**
 * 随机颜色
 * */
function randRgbColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**
 * 随机十六进制颜色
 * 16777215从和而来？
 * hex颜色值是从 #000000 到 #ffffff，
 * 后面那六位数是16进制数，
 * 相当于 "0x000000" 到 "0xffffff"。
 * 实现思路是将hex的最大值 ffffff 先转换成 10 进制，进行random后在转会16进制。
 * */
function randHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * randHexColor优化版
 * */
function randHexAdvancedColor() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
}

/**
 * randHexAdvancedColor修复版
 * 修正上面版本的bug（无法生成纯白色与hex位数不足问题）。
 * 0x1000000相当0xffffff+1，确保会抽选到0xffffff。
 * */
function randHexFinallyColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}