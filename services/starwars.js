const axios = require('axios');
const { getPersonIdFromPersonURL } = require('../utils/people');

const BASE_URL = 'https://swapi.dev/api';

const getFilms = async () => {
    const url = `${BASE_URL}/films`;
    return await axios.get(url);
}

const getFilmsByMovieId = async (movieId) => {
    const url = `${BASE_URL}/films/${movieId}`;
    return await axios.get(url);
}

const getPerson = async (personId) => {
    const url =`${BASE_URL}/people/${personId}`;
    return await axios.get(url);
}

const getPersonByPeopleList = async (peopleList) => {
    return Promise.all(
        peopleList.map(async (personURL) => {
            const personId = getPersonIdFromPersonURL(personURL);
            return getPerson(personId);
        })
    );
}

const getSpeciesByPage = async (page = 1) => {
    const url = `${BASE_URL}/species?pages=${page}`;
    return await axios.get(url);
}

module.exports = {
    getFilms,
    getFilmsByMovieId,
    getPerson,
    getPersonByPeopleList,
    getSpeciesByPage
}