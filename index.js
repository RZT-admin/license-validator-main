const fs = require('fs')
const express = require('express')
// const cors = require('cors');
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
    const licensesList = JSON.parse(fs.readFileSync('./licenses.json', 'utf8'));
    const isLicenseValid = licensesList.includes(licenseToValidate)
    res.status(isLicenseValid ? 200 : 401)
    res.send(isLicenseValid ? 'OK' : 'KO')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})