const express = require('express');
const app = express();
const { getFilms,
        getFilmsByMovieId,
        getPersonByPeopleList,
        getSpeciesByPage        
} = require('./services/starwars');

const { getSpeciesByType,
        buildSpeciesResponse        
} = require('./utils/species');


app.get('/starwars/films', async (req, res) => {
    try {
        const { status, data } = await getFilms();
        res.json(data);
    } catch(error) {
        if(error.response) {
            const { response } = error;

            if(response.status === 404) {
                res.status(404).send("Filme não encontrado");
            } else if(response.status === 408) {
                res.status(408).send("Tempo de resposta excedido.");
            } else {
                res.status(500).send("Erro interno do servidor");
            }
        } else {
            res.status(500).send("Erro interno do servidor.")
        }
    } 
})

app.get('/starwars/films/:movieId', async function(req, res) {
    try {
        const { movieId } = req.params;
        const { data } = await getFilmsByMovieId(movieId);
    
        const { characters } = data;
        const peopleResponse = await getPersonByPeopleList(characters);
        const peopleByNameAndGender = peopleResponse.map(({ data }) => data)
                                                    .map(({ name, gender }) => ({ name, gender })
        )
       
        res.json({
            title: data.title,
            director: data.director,
            releaseDate: data.release_date,
            characters: peopleByNameAndGender
        })
    }catch {
        if(error.response) {
            const { response } = error;

            if(response.status === 404) {
                res.status(404).send("Filme não encontrado");
            } else if(response.status === 408) {
                res.status(408).send("Tempo de resposta excedido.");
            } else {
                res.status(500).send("Erro interno do servidor");
            }
        } else {
            res.status(500).send("Erro interno do servidor.")
        }
    }    
})

app.get('/starwars/species', async function(req, res) {
    try {
        const { page, specieType = 'all '} = req.query;

        if (!page) {
            throw newError('Page is required')
        }
        const { status, data } = await getSpeciesByPage(page);
        const { results, next } = data;

        const species = specieType ==='all' ? results : getSpeciesByType(results, specieType)
        const response = {
            next: next,
            count: species.length,
            species: buildSpeciesResponse(species)
            }
        
        res.json(response)

    } catch(error) {
        if(error.response) {
            const { response } = error;

            if(response.status === 404) {
                res.status(404).send("Filme não encontrado");
            } else if(response.status === 408) {
                res.status(408).send("Tempo de resposta excedido.");
            } else {
                res.status(500).send("Erro interno do servidor");
            }
        } else {
            res.status(500).send("Erro interno do servidor.")
        }
    }
});

app.listen("3008", console.log("Running on port 3008"))