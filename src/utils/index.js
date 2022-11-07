function getEventCoords(event) {
    return {
        x: Math.round(event.nativeEvent.offsetX) * window.devicePixelRatio,
        y: Math.round(event.nativeEvent.offsetY) * window.devicePixelRatio,
    };
}

function getNormalizedCoords(coords) {
    return coords;
}

export { getEventCoords, getNormalizedCoords };
