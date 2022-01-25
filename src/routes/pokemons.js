const { Router } = require('express');
const { Pokemon, Type } = require('../db');
// import noimage from 'noImage.png';

const router = Router();

const { getAllPokemons } = require('./functions.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
    const name = req.query.name;
    let pokemonsTotal = await getAllPokemons();
    if (name){
      // let pokemonName = await pokemonsTotal.filter(p => p.name.toLowerCase().trim() === name.toLowerCase().trim());
        let pokemonName = await pokemonsTotal.filter(p => p.name.toLowerCase().replace(/\s/g, '') === name.toLowerCase().replace(/\s/g, ''));
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(404).send('Sorry, no such Pokemon!');
    } else {
        res.status(200).send(pokemonsTotal);
    }
})

router.get('/:idPokemon', async (req, res) => {
    const id = req.params.idPokemon;
    const pokemonsTotal = await getAllPokemons()
    if (id){
        let pokemonId = await pokemonsTotal.filter(p => p.id == id);
        pokemonId.length ?
        res.status(200).send(pokemonId) :
        res.status(404).send('Sorry, no such Pokemon!');
    }
})

var ID = 2000;
router.post('/', async (req, res) => {
    // try {
      let {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createdInDb,
        type
      } = req.body;
  
      if (!name) return res.status(404).send('Name is mandatory!');
      if (!hp.length) {hp = '0'};
      if (!attack.length) {attack = '0'};
      if (!defense.length) {defense = '0'};
      if (!speed.length) {speed = '0'};
      if (!height.length) {height = '0'};
      if (!weight.length) {weight = '0'};
      if (!type.length) {type = 'unknown'};
  
      let pokemonCreated = await Pokemon.create({
        id: ID,
        name: name.trim(),
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createdInDb
      });
      ID++
  
      let typeDb = await Type.findAll({ where: { name: type } });
      pokemonCreated.addType(typeDb);
      res.status(200).send("Pokemon created successfully!");
    // } catch (err) {
    //   console.log(err);
    // }
  });

module.exports = router;
