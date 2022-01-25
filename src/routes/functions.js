const { Pokemon, Type } = require('../db.js');
const axios = require('axios');


const getAllPokemons = async () => {
  const apiFirstBatch = await axios.get('https://pokeapi.co/api/v2/pokemon');
  const apiFirstBatchData = apiFirstBatch.data.results;
  const apiSecondBatch = await axios.get(apiFirstBatch.data.next);
  const apiSecondBatchData = apiSecondBatch.data.results;
  const allApiInfo = apiFirstBatchData.concat(apiSecondBatchData);
  const subRequest = allApiInfo.map(p => axios.get(p.url));
  let apiInfo = await Promise.all(subRequest);
  
  apiInfo = apiInfo.map(p => {
      return {
          id: p.data.id,
          name: p.data.name,
          hp: p.data.stats[0].base_stat,
          attack: p.data.stats[1].base_stat,
          defense: p.data.stats[2].base_stat,
          speed: p.data.stats[5].base_stat,
          height: p.data.height,
          weight: p.data.weight,
          image: p.data.sprites.other["dream_world"].front_default,
          types: p.data.types.map(p => p.type.name),
      };
  });
  // return apiInfo;

  const getDBInfo = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const normalizeDbInfo = getDBInfo.map(p => {
    return {
      id: p.dataValues.id,
      name: p.dataValues.name,
      hp: p.dataValues.hp,
      attack: p.dataValues.attack,
      defense: p.dataValues.defense,
      speed: p.dataValues.speed,
      height: p.dataValues.height,
      weight: p.dataValues.weight,
      image: p.dataValues.image,
      types: p.dataValues.types.map(p => p.name),
      createdInDb: p.dataValues.createdInDb,
    };
  });
  
  const infoTotal= apiInfo.concat(normalizeDbInfo);
  return infoTotal;
};

module.exports = { getAllPokemons };
