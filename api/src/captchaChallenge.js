
ddExecuteCaptchaChallenge = function (ddCookie, userAgent, language) {
    var t = 10;
    class e {
        constructor() {
            var t = 1723;
            var e = 7532;
            var r = (function (r) {
                for (var t = 126 ^ r.charCodeAt(0), e = 1; e < r.length; e++)
                    t +=
                        ((r.charCodeAt(e) * e) ^
                            r.charCodeAt(e - 1)) >>
                        e % 2;
                return t;
            })(ddCookie)

            this.seed = r

            this.currentNumber = r % t
            this.offsetParameter = t
            this.multiplier = e
            this.currentNumber <= 0 && (this.currentNumber += t);

        }
        getNext() {
            return (
                (this.currentNumber =
                    (this.multiplier * this.currentNumber) %
                    this.offsetParameter),
                this.currentNumber
            );
        }
    }
    for (
        var n = [
            function (r, t) {
                var e = 26157,
                    n = 0;
                if (
                    ((s =
                        "VEc5dmEybHVaeUJtYjNJZ1lTQnFiMkkvSUVOdmJuUmhZM1FnZFhNZ1lYUWdZWEJ3YkhsQVpHRjBZV1J2YldVdVkyOGdkMmwwYUNCMGFHVWdabTlzYkc5M2FXNW5JR052WkdVNklERTJOMlJ6YUdSb01ITnVhSE0"),
                        userAgent)
                ) {
                    for (
                        var a = 0;
                        a < s.length;
                        a +=
                        1 %
                        Math.ceil(
                            1 +
                            3.1425172 /
                            userAgent
                                .length
                        )
                    )
                        n +=
                            s.charCodeAt(a).toString(2) |
                            (e ^ t);
                    return n;
                }
                return s ^ t;
            },
            function (r, t) {
                for (
                    var e = (
                        userAgent.length <<
                        Math.max(r, 3)
                    ).toString(2),
                    n = -42,
                    a = 0;
                    a < e.length;
                    a++
                )
                    n += e.charCodeAt(a) ^ (t << a % 3);
                return n;
            },
            function (r, t) {
                for (
                    var e = 0,
                    n = language.toLocaleLowerCase() + t,
                    a = 0;
                    a < n.length;
                    a++
                )
                    e =
                        ((e =
                            ((e +=
                                n.charCodeAt(a) <<
                                Math.min(
                                    (a + t) % (1 + r),
                                    2
                                )) <<
                                3) -
                            e +
                            n.charCodeAt(a)) &
                            e) >>
                        a;
                return e;
            },
        ],
        a = new e(),
        o = a.seed,
        u = 0;
        u < t;
        u++
    ) {
        o ^= (0, n[a.getNext() % n.length])(u, a.seed);
    }

    return o
};



module.exports = ddExecuteCaptchaChallenge;