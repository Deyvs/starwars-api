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

    const people = await Promise.all(
        data.characters
            .map(async characters => axios.get(characters))
    )

    const basePeople = people.map(({ data }) => data)
    const allCharacters = basePeople.map(({ name, gender }) => ({ name, gender }))
    
    console.log(allCharacters)
    const response = {
        title: data.title,
        director: data.director,
        releaseDate: data.release_date,
        characters: allCharacters
    }

    res.json(response)
})

app.get('/starwars/species', async function(req, res) {
    const url = `${BASE_URL}/species`;
    const { data } = await axios.get(url);
    const { results } = data;

    const mammals = results.filter(results => results.classification === 'mammal');

    const response = {
        count: mammals.length,
        species: mammals.map(mammal => {
            return {
                name: mammal.name,
                classification: mammal.classification,
                designation: mammal.designation
            }
        })
    }

    res.json(response)
})



app.listen(3008, console.log('Running on port 3008'))