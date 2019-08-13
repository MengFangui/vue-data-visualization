// 函数防抖
export function debounce(fn, wait, immediate) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) {
                fn.apply(this, arguments)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
}