
const { possibleGlrd, possibleHc, possibleOrientationTypes, possiblePixelRatios, possibleResolutions } = require('./devices.js')
const Signals = require('./signals.js')
const axios = require('axios');
const { getMovements } = require('./mouse.js')

function MagicNum(r, t) {
    var navigator = {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        languages: ['en', 'en-GB'],
        language: 'en-GB'
    }

    function e(r, t, e) {
        this.seed = r, this.currentNumber = r % t, this.offsetParameter = t, this.multiplier = e, this.currentNumber <= 0 && (this.currentNumber += t)
    }

    e.prototype.getNext = function () {
        return this.currentNumber = this.multiplier * this.currentNumber % this.offsetParameter, this.currentNumber
    };
    for (var n = [function (r, t) {
        var e = 26157, n = 0;
        if (s = "VEc5dmEybHVaeUJtYjNJZ1lTQnFiMkkvSUVOdmJuUmhZM1FnZFhNZ1lYUWdZWEJ3YkhsQVpHRjBZV1J2YldVdVkyOGdkMmwwYUNCMGFHVWdabTlzYkc5M2FXNW5JR052WkdVNklERTJOMlJ6YUdSb01ITnVhSE0", navigator.userAgent) {
            for (var a = 0; a < s.length; a += 1 % Math.ceil(1 + 3.1425172 / navigator.userAgent.length)) n += s.charCodeAt(a).toString(2) | e ^ t;
            return n
        }
        return s ^ t
    }, function (r, t) {
        for (var e = (navigator.userAgent.length << Math.max(r, 3)).toString(2), n = -42, a = 0; a < e.length; a++) n += e.charCodeAt(a) ^ t << a % 3;
        return n
    }, function (r, t) {
        for (var e = 0, n = (navigator.language ? navigator.language.substr(0, 2) : void 0 !== navigator.languages ? navigator.languages[0].substr(0, 2) : "default").toLocaleLowerCase() + t, a = 0; a < n.length; a++) e = ((e = ((e += n.charCodeAt(a) << Math.min((a + t) % (1 + r), 2)) << 3) - e + n.charCodeAt(a)) & e) >> a;
        return e
    }], a = new e(function (r) {
        for (var t = 126 ^ r.charCodeAt(0), e = 1; e < r.length; e++) t += (r.charCodeAt(e) * e ^ r.charCodeAt(e - 1)) >> e % 2;
        return t
    }(r), 1723, 7532), o = a.seed, u = 0; u < t; u++) {
        o ^= (0, n[a.getNext() % n.length])(u, a.seed)
    }

    return o
}

function randNum(min = 0, max = 100, round = false) {
    let difference = max - min;
    let rand = round ? Math.floor(Math.random() * difference) : Math.random() * difference;
    return rand + min;
}

async function generatePayload(body) {
    // console.log(body)
    var p = body.ddm.hash.slice(-4)
    var q = Math.floor(Math.random() * 9)
    var d = Math.random().toString(16).slice(2, 10).toUpperCase()

    var hsv = d.slice(0, q) + p + d.slice(q);

    var lol = Signals.Signals(4046101435, body.ddm.cid, body.ddm.hash, hsv)

    var glvd = Object.keys(possibleGlrd)[Math.floor(Math.random() * Object.keys(possibleGlrd).length)]
    var glrd = possibleGlrd[glvd][Math.floor(Math.random() * possibleGlrd[glvd].length)]
    var screen = possibleResolutions[Math.floor(Math.random() * possibleResolutions.length)]

    var position;
    try {
        const response = await axios({
            method: "POST",
            url: "http://127.0.0.1:3030/position",
            data: JSON.stringify({
                "background_image": body.background_image,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        position = response.data;
    } catch (error) {
        console.log(error.data)
        return {"error": error.data}

    }

    var cap = MagicNum(body.ddm.cid, 10)


    var mouse = getMovements(position.position[0] + randNum(15, 30, true))

    var p = new lol()
    p.addSignal("v", "1.8.2")
    p.addSignal("h", "97946689b033b3727194dd2bffeb337ba15cd6fba2ab5775e8b5e6d255da6074")
    p.addSignal("tstf", 16) // navigator.hardwareConcurrency * 2
    p.addSignal("tagpu", randomFloatString(10, 16)) // hn is earlier performance.now() // performance.now() - hn 
    p.addSignal("ccsT", "Error\nat a (<anonymous>:317:28)\nat <anonymous>:939:34\nat <anonymous>:1165:34\nat p.exports (<anonymous>:958:19)\nat g.sendPayload (<anonymous>:1499:25)\n")
    p.addSignal("ccsB", "t/static/chunks/4114.d5b644d4ccc9b88c.js:11:7944)\nat n.args.<computed> (https://cdn.oaistatic.com/_next/static/chunks/4114.d5b644d4ccc9b88c.js:59:153)")
    p.addSignal("ccsH", 2520352591) // defined, never changed
    p.addSignal("ccsV", "a709286857318dc6587a0bd877c6010672ad8b5a8eae3d6b29e3c055f629cdf3") // no idea
    p.addSignal("cssS", "1.36,2.78,8.63,14.96,3.02,4.56,10.73,4.15,2.79") // no idea
    p.addSignal("css0", "32, 108, 5") // no idea
    p.addSignal("css1", "14.9216, 1.02084, -0.3228, 0.0300839, -0.149609, 0.793364, -4.4068, 0.410699, -0.173615, 2.90683, 1.16728, -0.108786, -1.86288, 31.1903, 12.5249, -0.167277") // no idea
    p.addSignal("cssH", "0px")
    p.addSignal("plgod", false)
    p.addSignal("plg", 5)
    p.addSignal("plgne", true)
    p.addSignal("plgre", true)
    p.addSignal("plgof", false)
    p.addSignal("plggt", false)
    p.addSignal("pltod", false)
    p.addSignal("psn", true)
    p.addSignal("edp", true)
    p.addSignal("addt", true)
    p.addSignal("wsdc", true)
    p.addSignal("ccsr", true)
    p.addSignal("nuad", true)
    p.addSignal("bdca", false)
    p.addSignal("idn", true)
    p.addSignal("capi", false)
    p.addSignal("svde", false)
    p.addSignal("vpbq", true)
    p.addSignal("dvm", "8")
    p.addSignal("vco", "")
    p.addSignal("vcots", false)
    p.addSignal("vch", "probably")
    p.addSignal("vchts", true)
    p.addSignal("vcw", "probably")
    p.addSignal("vcwts", true)
    p.addSignal("vc3", "maybe")
    p.addSignal("vc3ts", false)
    p.addSignal("vcmp", "")
    p.addSignal("vcmpts", false)
    p.addSignal("vcq", "")
    p.addSignal("vcqts", false)
    p.addSignal("vc1", "probably")
    p.addSignal("vc1ts", true)
    p.addSignal("aco", "probably")
    p.addSignal("acots", false)
    p.addSignal("acmp", "probably")
    p.addSignal("acmpts", true)
    p.addSignal("acw", "probably")
    p.addSignal("acwts", false)
    p.addSignal("acma", "maybe")
    p.addSignal("acmats", false)
    p.addSignal("acaa", "probably")
    p.addSignal("acaats", true)
    p.addSignal("ac3", "")
    p.addSignal("ac3ts", false)
    p.addSignal("acf", "probably")
    p.addSignal("acfts", false)
    p.addSignal("acmp4", "maybe")
    p.addSignal("acmp4ts", false)
    p.addSignal("acmp3", "probably")
    p.addSignal("acmp3ts", false)
    p.addSignal("acwm", "maybe")
    p.addSignal("acwmts", false)
    p.addSignal("ocpt", false)
    p.addSignal("lg", "en")
    p.addSignal("orf", "")
    p.addSignal("wgPCM", "bgra8unorm")
    p.addSignal("spwn", false)
    p.addSignal("emt", false)
    p.addSignal("bfr", false)
    p.addSignal("npmtm", false)
    p.addSignal("wdifrm", false)
    p.addSignal("phe", false)
    p.addSignal("nm", false)
    p.addSignal("awe", false)
    p.addSignal("geb", false)
    p.addSignal("dat", false)
    p.addSignal("sqt", false)
    p.addSignal("trrd", randomFloatString(0, 1))
    p.addSignal("ucdv", false)
    p.addSignal("tzp", "Europe/London")
    p.addSignal("tz", 0)
    p.addSignal("rs_w", screen.width)
    p.addSignal("rs_h", screen.height)
    p.addSignal("isb", false)
    p.addSignal("pr", possiblePixelRatios[Math.floor(Math.random() * possiblePixelRatios.length)])
    p.addSignal("mq", "aptr:fine, ahvr:hover")
    p.addSignal("plu", "PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF")
    p.addSignal("mmt", "application/pdf,text/pdf")
    p.addSignal("dt", false)
    p.addSignal("bchk", "3223aeb6721e0d0917e7928181193ac88dcd62fad5cadfbe7a2b2b473ecf58ee70f018dbdb1a1832e8dc6528387b0745971dbcd82384a61e9a4e3f")
    p.addSignal("crt", 100)
    p.addSignal("br_w", (screen.width * 3) / 2)
    p.addSignal("br_h", (screen.height * 3) / 2)
    p.addSignal("br_ih", (screen.height * 3) / 2)
    p.addSignal("br_iw", (screen.width * 3) / 2)
    p.addSignal("ars_w", (screen.width * 3) / 2)
    p.addSignal("ars_h", (screen.height * 3) / 2)
    p.addSignal("cvs", true)
    p.addSignal("hdn", false)
    p.addSignal("med", "defined")
    p.addSignal("so", possibleOrientationTypes[Math.floor(Math.random() * possibleOrientationTypes.length)])
    p.addSignal("xt1", true)
    p.addSignal("hcovdr", false)
    p.addSignal("plovdr", false)
    p.addSignal("ftsovdr", false)
    p.addSignal("hcovdr2", false)
    p.addSignal("plovdr2", false)
    p.addSignal("ftsovdr2", false)
    p.addSignal("glvd", glvd)
    p.addSignal("glrd", glrd)
    p.addSignal("hc", possibleHc[Math.floor(Math.random() * possibleHc.length)])
    p.addSignal("br_oh", (screen.height * 3) / 2)
    p.addSignal("br_ow", (screen.width * 3) / 2)
    p.addSignal("ua", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    p.addSignal("wbd", false)
    p.addSignal("ts_mtp", "0")
    p.addSignal("mob", false)
    p.addSignal("iccsH", 2622228169)
    p.addSignal("iccsV", "a709286857318dc6587a0bd877c6010672ad8b5a8eae3d6b29e3c055f629cdf3")
    p.addSignal("pcsoNumShapes", 7)
    p.addSignal("chksm", "d4ffa8ea90c2a63b8a890eb3af1786d2")
    p.addSignal("k_lyts", 48)
    p.addSignal("k_lytk", "edu-hz=p;]/[l8ws59o.6v3`gjq1ty'\\#kfirxa27m40nbc,")
    p.addSignal("wgAdFt", "iindirect-first-instance,depth32float-stencil8,depth-clip-control,shader-f16,float32-filterable,texture-compression-bc,rg11b10ufloat-renderable,bgra8unorm-storage")
    p.addSignal("wgAdLim", "mbs: 4294967296, msbbs: 4294967292")
    p.addSignal("wgAdNfo", "{\"vendor\":\"nvidia\",\"architecture\":\"ampere\",\"device\":\"\",\"description\":\"\"}")
    p.addSignal("wgTime", "getAd: 741, adFt: 782.3000000000029, adNfo: 818.6000000000058")
    p.addSignal("wwl", false)
    p.addSignal("pcso", "e0e0fea2b798e383357dd34bc72b61c0")
    p.addSignal("cfpfe", "KHNlbGVjdG9yKSA9PiB7CiAgICAgICAgICAgICAgICBsZXQgbm9kZXMgPSBbXQoKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikKICAgICAgICAgICAgICAgIH0g")
    p.addSignal("stcfp", "Zm5iaGFncG1qZmthbm5mYmxsYW1nL2pzL2RvbS5qczoyMTozMgphdCBBcnJheS5yZWR1Y2UgKDxhbm9ueW1vdXM+KQphdCBvbk1lc3NhZ2UgKGNocm9tZS1leHRlbnNpb246Ly9ncHBvbmdtaGprcGZuYmhhZ3BtamZrYW5uZmJsbGFtZy9qcy9kb20uanM6MTk6Mjkp")
    p.addSignal("mdhf", true)
    p.addSignal("m_crdL", mouse.m_crdL)
    p.addSignal("m_crdR", mouse.m_crdR)
    p.addSignal("m_crdU", mouse.m_crdU)
    p.addSignal("m_crdD", mouse.m_crdD)
    p.addSignal("m_yDspA", mouse.m_yDspA)
    p.addSignal("m_yDspSD", mouse.m_yDspSD)
    p.addSignal("m_spdA", mouse.m_spdA)
    p.addSignal("m_spdSD", mouse.m_spdSD)
    p.addSignal("m_xSpdA", mouse.m_xSpdA)
    p.addSignal("m_xSpdSD", mouse.m_xSpdSD)
    p.addSignal("m_ySpdA", mouse.m_ySpdA)
    p.addSignal("m_ySpdSD", mouse.m_ySpdSD)
    p.addSignal("m_str8", mouse.m_str8)
    p.addSignal("m_maxDstB", mouse.m_maxDstB)
    p.addSignal("m_maxDstA", mouse.m_maxDstA)
    p.addSignal("m_arL", mouse.m_arL)
    p.addSignal("m_arU", mouse.m_arU)
    p.addSignal("m_csd", mouse.m_csd)
    p.addSignal("m_cnt", mouse.m_cnt)
    p.addSignal("m_untrcnt", mouse.m_untrcnt)
    p.addSignal("m_clsdcnt", mouse.m_clsdcnt)
    p.addSignal("m_clsdrt", mouse.m_clsdrt)
    p.addSignal("m_incnt", mouse.m_incnt)
    p.addSignal("m_inhsh", mouse.m_inhsh)
    p.addSignal("m_fmi", false)
    p.addSignal("mrpos", "35,23")
    p.addSignal("bAdio", false)
    p.addSignal("xUser", position.position[0])
    p.addSignal("isf", false)
    p.addSignal("cdhf", true)
    p.addSignal("dp0", true)
    p.addSignal("pcsoSeed", -6)
    p.addSignal("jst3a", Math.round(randomFloatString(4000, 12000)))
    p.addSignal("jstsoc", Math.round(randomFloatString(800, 1300)))



    return { "payload": p.buildPayload(), "capChallenge": cap }
}

function randomFloatString(min, max) {
    let num = min + Math.random() * (max - min); // Generate a random float between 6 and 40
    return num.toFixed(15); // Convert to string with 15 decimal places
}


exports.main = generatePayload;