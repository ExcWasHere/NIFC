const express = require('express');
const router = express.Router();
const { Emotion } = require('../models');

router.post('/', async (req, res) => {
  try {
    const data = await Emotion.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const { user_id, period = 7 } = req.query;
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - Number(period));

  try {
    const history = await Emotion.findAll({
      where: {
        user_id,
        date: {
          [Emotion.sequelize.Op.gte]: dateLimit
        }
      },
      order: [['date', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
