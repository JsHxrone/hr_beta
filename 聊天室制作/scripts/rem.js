! function(n, px) {
    let e = n.document,
        t = e.documentElement,
        i = 720,
        d = i / px,
        o = "orientationchange" in n ? "orientationchange" : "resize",
        a = function() {
            let n = t.clientWidth || 320;
            n > 720 && (n = 720);
            t.style.fontSize = Math.ceil(n / d) + "px"
            console.log(Math.ceil(n / d) + "px")
        };
    e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
}(window, 32)