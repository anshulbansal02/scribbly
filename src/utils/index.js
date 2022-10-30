function getEventCoords(event) {
    return {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop,
    };
}

function getNormalizedCoords(coords) {
    return coords;
}

export { getEventCoords, getNormalizedCoords };
