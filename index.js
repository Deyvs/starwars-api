const express = require('express');
const axios = require('axios');
const app = express();

const BASE_URL = 'https://swapi.dev/api';

app.get('/starwars/films', async function(req, res) {
    const url = `${BASE_URL}/films`;

    const { data } = await axios.get(url);
    res.json(data);
})

app.get('/starwars/films/:moveId', async function(req, res) {

    const { moveId } = req.params;
    const url = `${BASE_URL}/films/${moveId}`;

    const { data } = await axios.get(url);

    const response = {
        title: data.title,
        director: data.director,
        releaseDate: data.release_date,
        people: data.characters
    }

    res.json(response)
})

app.get('/starwars/species/:page', async function(req, res) {
    const { page } = req.params;

    const url = `${BASE_URL}/species?page=${page}`;

    const { data } = await axios.get(url);
    const { results, next } = data;
    res.json(results)
})



app.listen(3008, console.log('Running on port 3008'))