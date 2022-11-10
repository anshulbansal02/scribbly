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
        return { R: (c >> 16) & 255, G: (c >> 8) & 255, B: c & 255, A: 255 };
    }
    throw new Error("Bad Hex");
}

function colorMatch(c1, c2, thresh = 1) {
    return c1.R === c2.R && c1.G === c2.G && c1.B === c2.B && c1.A === c2.A;
}

function coordsToIndex(point, imageWidth) {
    return (point.y * imageWidth + point.x) * 4;
}

function getPixelColor(point, imageData) {
    const index = coordsToIndex(point, imageData.width);
    return {
        R: imageData.data[index],
        G: imageData.data[index + 1],
        B: imageData.data[index + 2],
        A: imageData.data[index + 3],
    };
}

function setPixelColor(point, color, imageData) {
    const index = coordsToIndex(point, imageData.width);
    imageData.data[index] = color.R;
    imageData.data[index + 1] = color.G;
    imageData.data[index + 2] = color.B;
    imageData.data[index + 3] = color.A;
    return index;
}

export {
    getEventCoords,
    getNormalizedCoords,
    hexToRgba,
    colorMatch,
    getPixelColor,
    setPixelColor,
    coordsToIndex,
};
