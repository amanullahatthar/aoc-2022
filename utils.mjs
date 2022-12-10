export const sum = array => array.reduce((a, b) => a + b, 0);

export const chebyshevDistance = (point1, point2) => Math.max(
    Math.abs(point1.x - point2.x), Math.abs(point1.y - point2.y)
);

export const manhattanDistance = (point1, point2) =>
    Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
