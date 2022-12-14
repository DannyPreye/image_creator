const router = require('express').Router();
const C = require('../index');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// setup multer to store images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 4000000,
    files: 2,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
      cb(new Error('Image must be in .png format'));
    }
    cb(undefined, true);
  },
});

// Configure the openAI
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Create an image
router.post('/create', async (req, res) => {
  const { prompt, n, size } = req.body;

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: n,
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
      message: "There's an error. Query violates the rule",
    });
  }
});

// Image Edit Routes
router.post('/edit', upload.single('photo'), async (req, res) => {
  const { prompt, n, size } = req.body;
  const tempPath = req.file.path;
  const file = path.join(__dirname, `./images/${req.file.fieldname}`);
  console.log(file);
  try {
    // const response = await openai.createEdit(
    //   fs.createReadStream('./images/back.png'),
    //   prompt,
    //   n,
    //   size == 'large' ? '1024x1024' : size === 'medium' ? '512x512' : '256x256'
    // );
    res.status('200').json({
      success: true,
      //   data: response.data.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Data was not parsed',
    });

    console.log(err);
  }
});

module.exports = router;
