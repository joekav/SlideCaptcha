vals = {}
function Signals(p, q, d, hsv) {
    var c = 1789537805,
        n = Date.now() & 255,
        e = Date.now(),
        i = e,
        o = Math.floor(Math.random() * 1000),
        a = Math.floor(Math.random() * 1000);
    function h(p) {
        if (!p) return c;
        for (var q = 0, d = 0; d < p.length; d++) q = (q << 5) - q + p.charCodeAt(d) << 0;
        return q == 0 ? c : q;
    }
    function l(p) {
        return p > 37 ? 59 + p : p > 11 ? 53 + p : p > 1 ? 46 + p : 50 * p + 45;
    }
    function t(p) {
        var q = p ^ i,
            d = -1,
            c = function () {
                q = function (p) {
                    for (var q = 100; true;) {
                        switch (q) {
                            case 100:
                                p ^= p << 13, q = 97;
                                continue;
                            case 97:
                                p ^= p >> 17, q = 177;
                                continue;
                            case 177:
                                p ^= p << 5, q = 253;
                                continue;
                            case 253:
                                return p;
                        }
                        break;
                    }
                }(q);
            };
        this.getByte = function () {
            var p = 14,
                e = 0;
            if (++d > 2 && 3 * (p | e) - (~p & e) + 2 * ~(p | e) - (p | ~e) - ~(p & e) < 15) for (var i = 243; true;) {
                switch (i) {
                    case 243:
                        c(), i = 191;
                        continue;
                    case 191:
                        d = 0, i = 15;
                        continue;
                    case 15:
                        break;
                }
                break;
            } else 6, 5;
            var t = 16 - d * 8;
            return function () {
                for (var p = 0, d = 3; d >= 0; d--) p |= n << d * 8;
                return p ^ q;
            }() >> t & 255;
        };
    }
    function g() {
        var c = function (q, d) {
            return h(q) ^ e + o + a * 2 ^ h(d) ^ p;
        }(q, d),
            g = [],
            m = [],
            k = [];
        i += a;
        var j = new t(c),
            r = function (p) {
                for (var q = [], d = 0, c = 0; c < p.length; c++) {
                    var n = p.charCodeAt(c),
                        e = 10,
                        i = 2;
                    if (n < 128 && Math.round((-(e | i) - (~e & i) + 5 * (e ^ i) + 4 * ~(e ^ i) - ~i - ~e - (~e | i) - ~(e & i)) / 2) > 5) q[d++] = n; else if (n < 2048) for (var o = 202; true;) {
                        switch (o) {
                            case 202:
                                q[d++] = n >> 6 | 192, o = 167;
                                continue;
                            case 167:
                                q[d++] = n & 63 | 128, o = 96;
                                continue;
                            case 96:
                        }
                        break;
                    } else (n & 64512) == 55296 && c + 1 < p.length && (p.charCodeAt(c + 1) & 64512) == 56320 ? (n = 65536 + ((n & 1023) << 10) + (p.charCodeAt(++c) & 1023), q[d++] = n >> 18 | 240, q[d++] = n >> 12 & 63 | 128, q[d++] = n >> 6 & 63 | 128, q[d++] = n & 63 | 128) : (q[d++] = n >> 12 | 224, q[d++] = n >> 6 & 63 | 128, q[d++] = n & 63 | 128);
                }
                for (var g = 0; g < q.length; g++) q[g] ^= j.getByte();
                return q;
            },
            f = function (p) {
                try {
                    return JSON.stringify(p);
                } catch (p) {
                    return;
                }
            };
        this.addSignal = function (p, q) {
            vals[p] = q
            var d = 9,
                c = 9;
            if (typeof p == "string" && p.length != 0 || !(4 * (d | c) - 3 * (~d & c) + 6 * ~(d | c) - 2 * ~(d ^ c) - ~c - (d | ~c) - ~d + 1 < 20)) {
                11, 14;
                var n = 11,
                    e = 11;
                if (!(q && ["number", "string", "boolean"].indexOf(typeof q) == -1 && e + (n & ~e) + (n & e) < 27)) {
                    2, 13;
                    var i = f(p),
                        o = f(q),
                        a = 4,
                        h = 13;
                    (!p || void 0 === o || p === String.fromCharCode(120, 116, 49)) && Math.round((-(a | h) - (~a & h) + 5 * (a ^ h) + 4 * ~(a ^ h) - ~h - ~a - (~a | h) - ~(a & h)) / 2) > -10 || (10, 3, k.push(j.getByte()), g.push(r(i)), k.push(j.getByte()), m.push(r(o)));
                }
            }
        }, this.alreadyAdded = new Set(), this.addSignalOnce = function (p, q) {
            if (!this.alreadyAdded.has(p)) for (var d = 22; true;) {
                switch (d) {
                    case 22:
                        this.alreadyAdded.add(p), d = 82;
                        continue;
                    case 82:
                        this.addSignal(p, q), d = 131;
                        continue;
                    case 131:
                }
                break;
            }
        }, this.buildPayload = function () {
            // console.log(vals)
            if (this._pl) return this._pl;
            for (var p, q = [], d = g.length, c = 0; c < d; c++) {
                var e = 0 === c ? 123 : 44;
                q.push(e ^ k[2 * c]), Array.prototype.push.apply(q, g[c]), q.push(58 ^ k[2 * c + 1]), Array.prototype.push.apply(q, m[c]);
            }

            p = hsv
            var a = [(q.length ? 44 : 123) ^ j.getByte()].concat(r(JSON.stringify(String.fromCharCode(114, 51, 110))), 58 ^ j.getByte(), r(p || "33"));
            return Array.prototype.push.apply(q, a), q.push(125 ^ j.getByte()), g.length = 0, m.length = 0, k.length = 0, this._pl = function (p) {
                for (var q = 0, d = []; q < p.length;) {
                    var c = (p[q++] ^ n) << 16 | (p[q++] ^ n) << 8 | p[q++] ^ n;
                    d.push(String.fromCharCode(l(c >> 18 & 63)), String.fromCharCode(l(c >> 12 & 63)), String.fromCharCode(l(c >> 6 & 63)), String.fromCharCode(l(63 & c)));
                }
                var e = p.length % 3;
                return e && (d.length -= 3 - e), d.join("");
            }(q);
        }, this.set = this.addSignal, this.set1 = this.addSignalOnce, this.bp = this.buildPayload;
    }
    return function () {
        for (var q = 239; true;) {
            switch (q) {
                case 239:
                    i += o, q = 232;
                    continue;
                case 232:
                    new g(c ^ p ^ 3074654), q = 200;
                    continue;
                case 200:
                    break;
            }
            break;
        }
    }(), g;
};



exports.Signals = Signals;
