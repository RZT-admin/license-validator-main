const fs = require('fs')
const express = require('express')
// const cors = require('cors');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000

// // Set up CORS options
// const corsOptions = {
//   origin: ['*', 'http://localhost:5173'],
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// Enable JSON support
app.use(express.json());

app.get('/validate-license', (req, res) => {
    const licenseToValidate = req.query.key
    const licensesPath = path.join(__dirname, 'licenses.json');
    const licensesList = JSON.parse(fs.readFileSync(licensesPath, 'utf8'));
    // const licensesList = JSON.parse(fs.readFileSync('./licenses.json', 'utf8'));
    const isLicenseValid = licensesList.includes(licenseToValidate)
    res.status(isLicenseValid ? 200 : 401)
    res.send(isLicenseValid ? 'OK' : 'KO')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)
