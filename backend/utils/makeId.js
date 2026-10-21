function makeId(prefix) {
    return (prefix ? prefix + "-" : "") + Date.now().toString(36) + "-" + Math.floor(Math.random() * 10000);
}

module.exports = makeId;