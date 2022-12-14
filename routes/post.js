const router = require('express').Router();
const C = require('../index');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Configure the openAI
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Create an image
router.post('/create-image', async (req, res) => {
  const { prompt, n, size } = req.body;

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size:
        size == 'large'
          ? '1024x1024'
          : size == 'medium'
          ? '512x512'
          : '256x256',
    });
    res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "There's an error. Data could not be loaded",
    });
  }
});

router.get('/', async (req, res) => {
  res.send('hello');
});

module.exports = router;
