# URL Shortener Microservice

A full-stack JavaScript URL shortener microservice built with Node.js and Express.js as part of the freeCodeCamp Back End Development and APIs certification.

## 🚀 Live Demo

This project creates a RESTful API that allows users to submit URLs and receive shortened versions that redirect to the original URLs.

## 📋 Features

- **URL Shortening**: Convert long URLs into short, numeric identifiers
- **URL Validation**: Validates URL format and checks if the domain exists using DNS lookup
- **Redirection**: Automatically redirects short URLs to their original destinations
- **Error Handling**: Returns appropriate error messages for invalid URLs
- **In-Memory Storage**: Stores URL mappings (easily replaceable with database)

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-Origin Resource Sharing middleware
- **DNS Module** - Built-in Node.js module for domain validation
- **dotenv** - Environment variable management

## 📁 Project Structure

```
url-shortener-microservice/
├── server.js              # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── views/
│   └── index.html         # Frontend interface
└── public/
    └── style.css          # Styling (if applicable)
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd url-shortener-microservice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   touch .env
   ```
   Add the following to `.env`:
   ```
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - The API will be available at `http://localhost:3000/api/shorturl`

## 📚 API Documentation

### Create Short URL

**Endpoint:** `POST /api/shorturl`

**Request Body:**
```json
{
  "url": "https://www.example.com"
}
```

**Success Response:**
```json
{
  "original_url": "https://www.example.com",
  "short_url": 1
}
```

**Error Response:**
```json
{
  "error": "invalid url"
}
```

### Redirect to Original URL

**Endpoint:** `GET /api/shorturl/:short_url`

**Example:** `GET /api/shorturl/1`

**Response:** HTTP 302 redirect to the original URL

**Error Response:** 
```json
{
  "error": "No short URL found for the given input"
}
```

## ✅ Test Requirements

This microservice passes all freeCodeCamp test requirements:

1. ✅ Provides a custom project (not the example URL)
2. ✅ POST requests to `/api/shorturl` return JSON with `original_url` and `short_url` properties
3. ✅ GET requests to `/api/shorturl/<short_url>` redirect to the original URL
4. ✅ Invalid URLs return `{ error: 'invalid url' }`

## 🔍 URL Validation

The service validates URLs by:
- Checking proper URL format (must start with `http://` or `https://`)
- Using DNS lookup to verify the domain exists
- Rejecting malformed URLs or non-existent domains

**Valid URL examples:**
- `https://www.google.com`
- `http://example.com`
- `https://www.freecodecamp.org/forum`

**Invalid URL examples:**
- `ftp://example.com` (wrong protocol)
- `https://invalid-domain-that-doesnt-exist.com`
- `not-a-url`

## 🧪 Testing

To test the API manually:

1. **Test URL shortening:**
   ```bash
   curl -X POST http://localhost:3000/api/shorturl \
     -H "Content-Type: application/json" \
     -d '{"url":"https://www.google.com"}'
   ```

2. **Test redirection:**
   ```bash
   curl -I http://localhost:3000/api/shorturl/1
   ```

3. **Test invalid URL:**
   ```bash
   curl -X POST http://localhost:3000/api/shorturl \
     -H "Content-Type: application/json" \
     -d '{"url":"invalid-url"}'
   ```

## 🚦 Error Handling

The API handles various error scenarios:
- **Invalid URL format**: Returns `{ error: 'invalid url' }`
- **Non-existent domain**: Returns `{ error: 'invalid url' }`
- **Missing URL in request**: Returns `{ error: 'invalid url' }`
- **Invalid short URL**: Returns appropriate error message
- **Non-numeric short URL**: Returns `{ error: 'Wrong format' }`

## 🗄️ Data Storage

Currently uses in-memory storage for simplicity. For production use, consider:
- **MongoDB** with Mongoose
- **PostgreSQL** with pg
- **Redis** for fast lookups
- **MySQL** with mysql2

## 🔄 Potential Enhancements

- [ ] Database integration for persistent storage
- [ ] Custom short URL aliases
- [ ] Click tracking and analytics
- [ ] Rate limiting
- [ ] URL expiration
- [ ] User authentication
- [ ] Bulk URL shortening
- [ ] QR code generation

## 📝 Dependencies

```json
{
  "express": "^4.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of the freeCodeCamp curriculum.

## 🎓 freeCodeCamp Project

This project is part of the [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) certification from freeCodeCamp.

**Project Link:** [URL Shortener Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

---

Made with ❤️ for freeCodeCamp certification
