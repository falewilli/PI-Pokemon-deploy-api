const { Router } = require('express');
const { Type } = require('../db');
const axios = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
  const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
  const eachType = typesApi.data.results;
  
  eachType.forEach((p) => {
    Type.findOrCreate({
      where: {
        name: p.name,
      },
    });
  });  
  const allTypes = await Type.findAll();
  res.status(200).send(allTypes);
});

module.exports = router;
