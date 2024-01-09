const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

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