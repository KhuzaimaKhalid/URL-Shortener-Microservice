require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const url = require('url');

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// In-memory storage for URLs (in production, use a database)
const urlDatabase = {};
let urlCounter = 1;

// Function to validate URL format and check DNS
function validateAndCheckUrl(inputUrl, callback) {
  // First check basic URL format
  const urlPattern = /^https?:\/\/(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\/?.*$/;
  
  if (!urlPattern.test(inputUrl)) {
    return callback(false);
  }

  try {
    const parsedUrl = new URL(inputUrl);
    
    // Check if protocol is http or https
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return callback(false);
    }
    
    // Use DNS lookup to verify hostname exists
    dns.lookup(parsedUrl.hostname, (err) => {
      if (err) {
        callback(false);
      } else {
        callback(true);
      }
    });
    
  } catch (error) {
    callback(false);
  }
}

// POST endpoint to create short URL
app.post('/api/shorturl', function(req, res) {
  const originalUrl = req.body.url;

  // Check if URL is provided
  if (!originalUrl) {
    return res.json({ error: 'invalid url' });
  }

  // Validate URL format and check DNS
  validateAndCheckUrl(originalUrl, (isValid) => {
    if (!isValid) {
      return res.json({ error: 'invalid url' });
    }

    // Check if URL already exists in database
    for (let id in urlDatabase) {
      if (urlDatabase[id] === originalUrl) {
        return res.json({
          original_url: originalUrl,
          short_url: parseInt(id)
        });
      }
    }

    // Store new URL and return response
    const shortUrl = urlCounter;
    urlDatabase[shortUrl] = originalUrl;
    urlCounter++;

    res.json({
      original_url: originalUrl,
      short_url: shortUrl
    });
  });
});

// GET endpoint to redirect to original URL
app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url;
  
  // Check if short_url is a valid number
  if (!/^\d+$/.test(shortUrl)) {
    return res.json({ error: 'Wrong format' });
  }
  
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});