export const timeToSeconds = (timeStr) => {
    const [m, s] = timeStr.split(':').map(Number);
    return m * 60 + s;
}
