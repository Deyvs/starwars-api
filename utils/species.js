const getSpeciesByType = (species, type) => {
    return species.filter((specie) => specie.classification === type);
}

const buildSpeciesResponse = (species) => {
    return species.map((specie) => {
        return {
            name: specie.name,
            classification: specie.classification,
            designation: specie.designation
        }
    })
}

module.exports = {
    getSpeciesByType,
    buildSpeciesResponse
}