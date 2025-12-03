export function ranking(points, threshold) {
    let ranked = "";
    if (points > threshold) {
        ranked="veterano";
    }
    else {
        ranked="novato";
    }
    return ranked;
}