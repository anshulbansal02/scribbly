function getEventCoords(event) {
    return {
        x: Math.round(event.nativeEvent.offsetX) * window.devicePixelRatio,
        y: Math.round(event.nativeEvent.offsetY) * window.devicePixelRatio,
    };
}

function getNormalizedCoords(coords) {
    return coords;
}

function hexToRgba(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return { R: (c >> 16) & 255, G: (c >> 8) & 255, B: c & 255 };
    }
    throw new Error("Bad Hex");
}

export { getEventCoords, getNormalizedCoords, hexToRgba };
