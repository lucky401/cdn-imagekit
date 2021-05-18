const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const ImageKit = require('imagekit');

// Init imagekit
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const app = express();

// allow cross-origin requests
const whitelist = [
  'http://localhost:3001',
  'http://facial-recognition.masukin.link/',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// secure your Express apps by setting various HTTP headers using Helmet
app.use(helmet());
// compress all responses
app.use(compression());

app.get('/auth', function (req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(process.env.PORT || 3001, function () {
  console.log('Live at Port 3001');
});
