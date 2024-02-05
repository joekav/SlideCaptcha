const { possibleGlrd, possibleHc, possibleOrientationTypes, possiblePixelRatios, possibleResolutions } = require("./devices.js");
const Signals = require("./signals.js");
const axios = require("axios");
const { getMovements } = require("./mouse.js");
const ddExecuteCaptchaChallenge = require("./captchaChallenge.js");

function randNum(min = 0, max = 100, round = false) {
    let difference = max - min;
    let rand = round ? Math.floor(Math.random() * difference) : Math.random() * difference;
    return rand + min;
}

async function generatePayload(body) {
    var finalFourHash = body.ddm.hash.slice(-4);
    var randomNum = Math.floor(Math.random() * 9);
    var randomString = Math.random().toString(16).slice(2, 10).toUpperCase();

    var hsv = randomString.slice(0, randomNum) + finalFourHash + randomString.slice(randomNum);

    var signalsClass = Signals.Signals(4046101435, body.ddm.cid, body.ddm.hash, hsv);

    // random values from collected data
    var glvd = Object.keys(possibleGlrd)[Math.floor(Math.random() * Object.keys(possibleGlrd).length)];
    var glrd = possibleGlrd[glvd][Math.floor(Math.random() * possibleGlrd[glvd].length)];
    var screen = possibleResolutions[Math.floor(Math.random() * possibleResolutions.length)];

    // fetch position from python detection server
    var position;
    try {
        const response = await axios({
            method: "POST",
            url: "http://127.0.0.1:3030/position",
            data: JSON.stringify({
                background_image: body.background_image,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        position = response.data;
    } catch (error) {
        return { error: error.data };
    }

    var captchaChallenge = ddExecuteCaptchaChallenge(body.ddm.cid, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", "en");

    var mouse = getMovements(position.position[0] + randNum(15, 30, true));

    var signals = new signalsClass();
    signals.addSignal("v", "1.8.2");
    signals.addSignal("h", "97946689b033b3727194dd2bffeb337ba15cd6fba2ab5775e8b5e6d255da6074");
    signals.addSignal("tstf", 16); 
    signals.addSignal("tagpu", randomFloatString(10, 16)); 
    signals.addSignal("ccsT", "Error\nat a (<anonymous>:317:28)\nat <anonymous>:939:34\nat <anonymous>:1165:34\nat p.exports (<anonymous>:958:19)\nat g.sendPayload (<anonymous>:1499:25)\n");
    signals.addSignal("ccsB", "t/static/chunks/4114.d5b644d4ccc9b88c.js:11:7944)\nat n.args.<computed> (https://cdn.oaistatic.com/_next/static/chunks/4114.d5b644d4ccc9b88c.js:59:153)");
    signals.addSignal("ccsH", 2520352591); 
    signals.addSignal("ccsV", "a709286857318dc6587a0bd877c6010672ad8b5a8eae3d6b29e3c055f629cdf3"); 
    signals.addSignal("cssS", "1.36,2.78,8.63,14.96,3.02,4.56,10.73,4.15,2.79"); 
    signals.addSignal("css0", "32, 108, 5"); 
    signals.addSignal("css1", "14.9216, 1.02084, -0.3228, 0.0300839, -0.149609, 0.793364, -4.4068, 0.410699, -0.173615, 2.90683, 1.16728, -0.108786, -1.86288, 31.1903, 12.5249, -0.167277"); // no idea
    signals.addSignal("cssH", "0px");
    signals.addSignal("plgod", false);
    signals.addSignal("plg", 5);
    signals.addSignal("plgne", true);
    signals.addSignal("plgre", true);
    signals.addSignal("plgof", false);
    signals.addSignal("plggt", false);
    signals.addSignal("pltod", false);
    signals.addSignal("psn", true);
    signals.addSignal("edp", true);
    signals.addSignal("addt", true);
    signals.addSignal("wsdc", true);
    signals.addSignal("ccsr", true);
    signals.addSignal("nuad", true);
    signals.addSignal("bdca", false);
    signals.addSignal("idn", true);
    signals.addSignal("capi", false);
    signals.addSignal("svde", false);
    signals.addSignal("vpbq", true);
    signals.addSignal("dvm", "8");
    signals.addSignal("vco", "");
    signals.addSignal("vcots", false);
    signals.addSignal("vch", "probably");
    signals.addSignal("vchts", true);
    signals.addSignal("vcw", "probably");
    signals.addSignal("vcwts", true);
    signals.addSignal("vc3", "maybe");
    signals.addSignal("vc3ts", false);
    signals.addSignal("vcmp", "");
    signals.addSignal("vcmpts", false);
    signals.addSignal("vcq", "");
    signals.addSignal("vcqts", false);
    signals.addSignal("vc1", "probably");
    signals.addSignal("vc1ts", true);
    signals.addSignal("aco", "probably");
    signals.addSignal("acots", false);
    signals.addSignal("acmp", "probably");
    signals.addSignal("acmpts", true);
    signals.addSignal("acw", "probably");
    signals.addSignal("acwts", false);
    signals.addSignal("acma", "maybe");
    signals.addSignal("acmats", false);
    signals.addSignal("acaa", "probably");
    signals.addSignal("acaats", true);
    signals.addSignal("ac3", "");
    signals.addSignal("ac3ts", false);
    signals.addSignal("acf", "probably");
    signals.addSignal("acfts", false);
    signals.addSignal("acmp4", "maybe");
    signals.addSignal("acmp4ts", false);
    signals.addSignal("acmp3", "probably");
    signals.addSignal("acmp3ts", false);
    signals.addSignal("acwm", "maybe");
    signals.addSignal("acwmts", false);
    signals.addSignal("ocpt", false);
    signals.addSignal("lg", "en");
    signals.addSignal("orf", "");
    signals.addSignal("wgPCM", "bgra8unorm");
    signals.addSignal("spwn", false);
    signals.addSignal("emt", false);
    signals.addSignal("bfr", false);
    signals.addSignal("npmtm", false);
    signals.addSignal("wdifrm", false);
    signals.addSignal("phe", false);
    signals.addSignal("nm", false);
    signals.addSignal("awe", false);
    signals.addSignal("geb", false);
    signals.addSignal("dat", false);
    signals.addSignal("sqt", false);
    signals.addSignal("trrd", randomFloatString(0, 1));
    signals.addSignal("ucdv", false);
    signals.addSignal("tzp", "Europe/London");
    signals.addSignal("tz", 0);
    signals.addSignal("rs_w", screen.width);
    signals.addSignal("rs_h", screen.height);
    signals.addSignal("isb", false);
    signals.addSignal("pr", possiblePixelRatios[Math.floor(Math.random() * possiblePixelRatios.length)]);
    signals.addSignal("mq", "aptr:fine, ahvr:hover");
    signals.addSignal("plu", "PDF Viewer,Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,WebKit built-in PDF");
    signals.addSignal("mmt", "application/pdf,text/pdf");
    signals.addSignal("dt", false);
    signals.addSignal("bchk", "3223aeb6721e0d0917e7928181193ac88dcd62fad5cadfbe7a2b2b473ecf58ee70f018dbdb1a1832e8dc6528387b0745971dbcd82384a61e9a4e3f");
    signals.addSignal("crt", 100);
    signals.addSignal("br_w", (screen.width * 3) / 2);
    signals.addSignal("br_h", (screen.height * 3) / 2);
    signals.addSignal("br_ih", (screen.height * 3) / 2);
    signals.addSignal("br_iw", (screen.width * 3) / 2);
    signals.addSignal("ars_w", (screen.width * 3) / 2);
    signals.addSignal("ars_h", (screen.height * 3) / 2);
    signals.addSignal("cvs", true);
    signals.addSignal("hdn", false);
    signals.addSignal("med", "defined");
    signals.addSignal("so", possibleOrientationTypes[Math.floor(Math.random() * possibleOrientationTypes.length)]);
    signals.addSignal("xt1", true);
    signals.addSignal("hcovdr", false);
    signals.addSignal("plovdr", false);
    signals.addSignal("ftsovdr", false);
    signals.addSignal("hcovdr2", false);
    signals.addSignal("plovdr2", false);
    signals.addSignal("ftsovdr2", false);
    signals.addSignal("glvd", glvd);
    signals.addSignal("glrd", glrd);
    signals.addSignal("hc", possibleHc[Math.floor(Math.random() * possibleHc.length)]);
    signals.addSignal("br_oh", (screen.height * 3) / 2);
    signals.addSignal("br_ow", (screen.width * 3) / 2);
    signals.addSignal("ua", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    signals.addSignal("wbd", false);
    signals.addSignal("ts_mtp", "0");
    signals.addSignal("mob", false);
    signals.addSignal("iccsH", 2622228169);
    signals.addSignal("iccsV", "a709286857318dc6587a0bd877c6010672ad8b5a8eae3d6b29e3c055f629cdf3");
    signals.addSignal("pcsoNumShapes", 7);
    signals.addSignal("chksm", "d4ffa8ea90c2a63b8a890eb3af1786d2");
    signals.addSignal("k_lyts", 48);
    signals.addSignal("k_lytk", "edu-hz=p;]/[l8ws59o.6v3`gjq1ty'\\#kfirxa27m40nbc,");
    signals.addSignal("wgAdFt", "iindirect-first-instance,depth32float-stencil8,depth-clip-control,shader-f16,float32-filterable,texture-compression-bc,rg11b10ufloat-renderable,bgra8unorm-storage");
    signals.addSignal("wgAdLim", "mbs: 4294967296, msbbs: 4294967292");
    signals.addSignal("wgAdNfo", '{"vendor":"nvidia","architecture":"ampere","device":"","description":""}');
    signals.addSignal("wgTime", "getAd: 741, adFt: 782.3000000000029, adNfo: 818.6000000000058");
    signals.addSignal("wwl", false);
    signals.addSignal("pcso", "e0e0fea2b798e383357dd34bc72b61c0");
    signals.addSignal("cfpfe", "KHNlbGVjdG9yKSA9PiB7CiAgICAgICAgICAgICAgICBsZXQgbm9kZXMgPSBbXQoKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikKICAgICAgICAgICAgICAgIH0g");
    signals.addSignal("stcfp", "Zm5iaGFncG1qZmthbm5mYmxsYW1nL2pzL2RvbS5qczoyMTozMgphdCBBcnJheS5yZWR1Y2UgKDxhbm9ueW1vdXM+KQphdCBvbk1lc3NhZ2UgKGNocm9tZS1leHRlbnNpb246Ly9ncHBvbmdtaGprcGZuYmhhZ3BtamZrYW5uZmJsbGFtZy9qcy9kb20uanM6MTk6Mjkp");
    signals.addSignal("mdhf", true);
    signals.addSignal("m_crdL", mouse.m_crdL);
    signals.addSignal("m_crdR", mouse.m_crdR);
    signals.addSignal("m_crdU", mouse.m_crdU);
    signals.addSignal("m_crdD", mouse.m_crdD);
    signals.addSignal("m_yDspA", mouse.m_yDspA);
    signals.addSignal("m_yDspSD", mouse.m_yDspSD);
    signals.addSignal("m_spdA", mouse.m_spdA);
    signals.addSignal("m_spdSD", mouse.m_spdSD);
    signals.addSignal("m_xSpdA", mouse.m_xSpdA);
    signals.addSignal("m_xSpdSD", mouse.m_xSpdSD);
    signals.addSignal("m_ySpdA", mouse.m_ySpdA);
    signals.addSignal("m_ySpdSD", mouse.m_ySpdSD);
    signals.addSignal("m_str8", mouse.m_str8);
    signals.addSignal("m_maxDstB", mouse.m_maxDstB);
    signals.addSignal("m_maxDstA", mouse.m_maxDstA);
    signals.addSignal("m_arL", mouse.m_arL);
    signals.addSignal("m_arU", mouse.m_arU);
    signals.addSignal("m_csd", mouse.m_csd);
    signals.addSignal("m_cnt", mouse.m_cnt);
    signals.addSignal("m_untrcnt", mouse.m_untrcnt);
    signals.addSignal("m_clsdcnt", mouse.m_clsdcnt);
    signals.addSignal("m_clsdrt", mouse.m_clsdrt);
    signals.addSignal("m_incnt", mouse.m_incnt);
    signals.addSignal("m_inhsh", mouse.m_inhsh);
    signals.addSignal("m_fmi", false);
    signals.addSignal("mrpos", "35,23");
    signals.addSignal("bAdio", false);
    signals.addSignal("xUser", position.position[0]);
    signals.addSignal("isf", false);
    signals.addSignal("cdhf", true);
    signals.addSignal("dp0", true);
    signals.addSignal("pcsoSeed", -6);
    signals.addSignal("jst3a", Math.round(randomFloatString(4000, 12000)));
    signals.addSignal("jstsoc", Math.round(randomFloatString(800, 1300)));

    return {
        payload: signals.buildPayload(),
        captchaChallenge: captchaChallenge,
    };
}

function randomFloatString(min, max) {
    let num = min + Math.random() * (max - min); // Generate a random float between 6 and 40
    return num.toFixed(15); // Convert to string with 15 decimal places
}

exports.main = generatePayload;
