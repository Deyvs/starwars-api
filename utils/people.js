const getPersonIdFromPersonURL = (personURL) => personURL.split('/')[5];

module.exports = {
    getPersonIdFromPersonURL
}