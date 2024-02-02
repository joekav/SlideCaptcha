function randNum(min = 0, max = 100, round = false) {
    let difference = max - min;
    let rand = round ? Math.floor(Math.random() * difference) : Math.random() * difference;
    return rand + min;
}

function generateLinearMouseMovements(endMovementX) {
    let movements = [];
    const startX = randNum(450, 550, true);
    const endX = startX + endMovementX; 
    let currentY = randNum(400, 450, true); 
    const endY = randNum(400, 500);
    const steps = randNum(50, 70, true); 
    const yMoveStep = Math.floor(Math.random() * (steps / 2)); 

    let currentTime = randNum(3500, 4000, true);
    let lastTimeStamp = currentTime;

    for (let i = 0; i < steps; i++) {
        if (i === yMoveStep) {
            currentY = endY; 
        } else if (i !== 0) { 
            currentY += randNum(-5, 5, true);
        }

        let timeStamp = lastTimeStamp + randNum(5, 20, false); 
        movements.push({
            x: Math.round(startX + (endX - startX) / steps * i),
            y: Math.round(currentY),
            ts: timeStamp
        });
        lastTimeStamp = timeStamp; 
    }

    return movements;
}

computeMoveCardinalDistances = function (n) {
    for (var t = 0, e = 0, i = 0, a = 0, o = 0; o < n.length; o++) {
        var r = n[o],
            c = r[0],
            u = r[1],
            M = Math.abs(c.x - u.x),
            d = Math.abs(c.y - u.y);
        u.x < c.x ? t += M : e += M, u.y < c.y ? i += d : a += d;
    }
    return {
        left: t,
        right: e,
        up: i,
        down: a
    };
}

getDispersion = function (n) {
    for (var t = [], e = 0; e < n.length; e++) t.push(n[e].y);
    return {
        yAvg: a(t),
        ySD: o(t)
    };
}

getFilteredSpeeds = function (n) {
    for (var t = [], e = [], i = [], a = 0; a < n.length; a++) {
        var o = n[a],
            r = o[0],
            c = o[o.length - 1],
            u = (c.ts - r.ts) / 1000;
        t.push(getDistBetweenPoints([r.x, r.y], [c.x, c.y]) / u), e.push(getDistBetweenPoints([r.x], [c.x]) / u), i.push(getDistBetweenPoints([r.y], [c.y]) / u);
    }
    return {
        speeds: t,
        xSpeeds: e,
        ySpeeds: i
    };
}

distancesToStraightLine = function (n) {
    for (var t = n[0], e = n[n.length - 1], i = getLineEq(t, e), a = [], o = [], r = 0; r < n.length; r++) {
        var c = n[r],
            u = distPointToLine(c, t, e),
            M = pointComparedToLine(c, i.a, i.b);
        M >= 0 && a.push(u), M <= 0 && o.push(u);
    }
    return {
        below: a,
        above: o
    };
}

bucketTrajectories = function (n, t) {
    for (var e = getBucketsBounds(n, t), i = placePointsInBuckets(n, e, t), o = [], r = 0; r < t; r++) {
        for (var c = i[r], u = [], M = 0; M < c.length; M++) u.push(c[M].y);
        u.length > 0 && o.push({
            x: e[r],
            y: a(u)
        });
    }
    return o;
}

getAreas = function (n) {
    if (n.length < 2) return {
        lower: null,
        upper: null
    };
    for (var t = getLineEq(n[0], n[n.length - 1]), e = 0, i = 0, a = 0; a < n.length - 1; a++) {
        var o = n[a],
            r = n[a + 1],
            c = t.a * o.x + t.b,
            u = t.a * r.x + t.b,
            M = (r.x - o.x) * (Math.abs(c - o.y) + Math.abs(u - r.y)) / 2;
        (o.y + r.y) / 2 < t.a * (o.x + r.x) / 2 + t.b ? i += M : e += M;
    }
    return {
        lower: e,
        upper: i
    };
};

getStraigthness = function (n, t) {
    for (var e = getDistBetweenPoints([n[0].x, n[0].y], [n[n.length - 1].x, n[n.length - 1].y]), i = 0, a = 0; a < t.length; a++) {
        var o = t[a][0],
            r = t[a][1];
        i += getDistBetweenPoints([o.x, o.y], [r.x, r.y]);
    }
    return e / i;
}

norm = function (n) {
    for (var t = 0, e = 0; e < n.length; e++) t += n[e] * n[e];
    return Math.sqrt(t);
}


function c(n, t) {
    for (var e = [], i = 0; i < n.length - t + 1; i++) e.push(n.slice(i, i + t));
    return e;
}

function a(n) {
    if (!n || 0 == n.length) return null;
    for (var t = 0, e = 0; e < n.length; e++) t += n[e];
    return t / n.length;
}

function o(n) {
    if (!n || 0 == n.length) return null;
    for (var t = a(n), e = 0, i = 0; i < n.length; i++) {
        var o = t - n[i];
        e += Math.pow(o, 2);
    }
    var r = e / n.length;
    return Math.sqrt(r);
}

getDistBetweenPoints = function (n, t) {
    for (var e = Math.min(n.length, t.length), i = [], a = 0; a < e; a++) i.push(t[a] - n[a]);
    return norm(i);
}
getLineEq = function (n, t) {
    var e = (t.y - n.y) / (t.x - n.x);
    return {
        a: e,
        b: n.y - e * n.x
    };
}

distPointToLine = function (n, t, e) {
    return Math.abs((e.x - t.x) * (t.y - n.y) - (t.x - n.x) * (e.y - t.y)) / Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
pointComparedToLine = function (n, t, e) {
    return n.y - (t * n.x + e);
}

getBucketsBounds = function (n, t) {
    for (var e = getExtremePoints(n), i = (e.right.x - e.left.x) / t, a = [], o = 0; o < t; o++) a.push(e.left.x + o * i);
    return a.push(e.right.x), a;
}

getExtremePoints = function (n) {
    for (var t = n[0], e = n[0], i = 1; i < n.length; i++) {
        var a = n[i];
        (a.x < t.x || a.x == t.x && a.y > t.y) && (t = a), (a.x > e.x || a.x == e.x && a.y < e.y) && (e = a);
    }
    return {
        left: t,
        right: e
    };
}

placePointsInBuckets = function (n, t, e) {
    for (var i = [], a = 0; a < e; a++) i.push([]);
    for (var o = 0; o < n.length; o++) for (var r = n[o], c = 0; c < t.length; c++) if (r.x <= t[c + 1]) {
        i[c].push(r);
        break;
    }
    return i;
}

function r(n) {
    return Math.max.apply(null, n);
}

computeHash = function (n) {
    for (var t = n.slice(0, 100), e = "", i = 0; i < t.length; i++) e += t[i].x + "," + t[i].y + "|";
    for (var a = 0, o = 0; o < e.length; o++) {
        a = (a << 5) - a + e.charCodeAt(o);
    }
    return a;
}



function getMovements(endMovementX) {

    var coordsList = generateLinearMouseMovements(endMovementX);

    console.log(coordsList)

    var e = c(coordsList, 2)
    var u = c(coordsList, Math.min(coordsList.length, 5))
    var M = computeMoveCardinalDistances(e);
    var d = getDispersion(coordsList);
    var s = getFilteredSpeeds(u);
    var g = distancesToStraightLine(coordsList);
    var w = bucketTrajectories(coordsList, 30)
    var l = getAreas(w)



    mouse = {}

    mouse["m_crdL"] = M.left
    mouse["m_crdR"] = M.right
    mouse["m_crdU"] = M.up
    mouse["m_crdD"] = M.down
    mouse["m_yDspA"] = d.yAvg
    mouse["m_yDspSD"] = d.ySD
    mouse["m_spdA"] = a(s.speeds)
    mouse["m_spdSD"] = o(s.speeds)
    mouse["m_xSpdA"] = a(s.xSpeeds)
    mouse["m_xSpdSD"] = o(s.xSpeeds)
    mouse["m_ySpdA"] = a(s.ySpeeds)
    mouse["m_ySpdSD"] = o(s.ySpeeds)
    mouse["m_str8"] = getStraigthness(coordsList, e)
    mouse["m_maxDstB"] = r(g.below)
    mouse["m_maxDstA"] = r(g.above)
    mouse["m_arL"] = l.lower
    mouse["m_arU"] = l.upper
    mouse["m_csd"] = randNum(40, 80, true)
    mouse["m_cnt"] = coordsList.length
    mouse["m_untrcnt"] = 0
    mouse["m_clsdcnt"] = coordsList.length
    mouse["m_clsdrt"] = 1
    mouse["m_incnt"] = coordsList.length + randNum(1, 5, true)
    mouse["m_inhsh"] = computeHash(coordsList)




    return mouse

}


module.exports = {
    getMovements
}