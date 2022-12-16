require('dotenv').config();
const router = require('express').Router();

const { Configuration, OpenAIApi } = require('openai');

// Configure the openAI
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Create an image route
router.post('/create', async (req, res) => {
  const { query, number, size } = req.body;
  try {
    const response = await openai.createImage({
      prompt: query,
      n: number,
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
      message:
        'No image could be created for this prompt.Try modifying the prompt',
    });
  }
});

module.exports = router;
