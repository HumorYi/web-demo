/**
 *  create by jianyi on 2017/12/18.
 */

/**
 * @desc 数字弹窗面版
 */
class PopupNumbers {

    constructor($panel) {
        this.$panel = $panel.hide().removeClass("hidden");

        this.$panel.on("click", "span", e => {
            const $cell = this._$targetCell;

            const $span = $(e.target);

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
                }
                else {
                    $cell.removeClass("mark3")
                        .addClass("mark1");
                }
            }
            else if ($span.hasClass("mark3")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                }
                else {
                    $cell.removeClass("mark1")
                        .addClass("mark3");
                }
            }
            else if ($span.hasClass("empty")) {
                $cell.text(0)
                    .removeClass("mark1")
                    .removeClass("mark3")
                    .addClass("empty");
            }
            else {
                // 1~9 回填数字
                $cell.removeClass("empty")
                    .text($span.text());
            }

            this.hide();
        });
    }

    popup($cell) {
        this._$targetCell = $cell;

        const {left, top} = $cell.position();

        this.$panel
            .css({
                "left": `${left}px`,
                "top": `${top}px`
            })
            .show();
    }

    hide() {
        this.$panel.hide();
    }
}

module.exports = PopupNumbers;