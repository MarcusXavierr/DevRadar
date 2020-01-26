module.exports = function parseStringAsArray(arryaAsString) {
    return arryaAsString.split(',').map(techs => techs.trim());
}