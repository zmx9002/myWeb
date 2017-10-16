/**
 * 适配手机屏幕
 * 注：标签的尺寸单位请使用 rem(根据html的font-size定义宽度)
 *    页面按照640px宽度定义，如果想要得到640px的宽度，只要修改成6.4rem即可，以此类推！(rem = px/100)
 * data-mw = '640' default
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        maxWidth = docEl.dataset['mw'] || 640,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        readyRE = /complete|loaded|interactive/,
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / maxWidth) + 'px';
            //window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
            //公式就是: window.devicePixelRatio = 物理像素 / dips (非视网膜屏为1， 视网膜屏为2)
            //docEl.setAttribute("dpr", window.devicePixelRatio ? window.devicePixelRatio : "");
            doc.removeEventListener('DOMContentLoaded', recalc);
        };
    win.orientation; //safair bug
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);

    if (readyRE.test(document.readyState) && document.body)
        recalc();
    else
        doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);