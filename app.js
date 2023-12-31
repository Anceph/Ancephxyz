const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/api/doviz/usd', async (req, res) => {
    const url = 'https://kur.doviz.com/serbest-piyasa/amerikan-dolari';

    try {
        // Send a GET request to the URL
        const response = await axios.get(url);

        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Extract the desired information
        const exchangeRate = $('div[data-socket-key="USD"][data-socket-attr="s"]').text().trim();

        // Return the data as JSON
        res.json({
            exchangeRate
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get('/api/doviz/eur', async (req, res) => {
    const url = 'https://kur.doviz.com/serbest-piyasa/euro';

    try {
        // Send a GET request to the URL
        const response = await axios.get(url);

        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Extract the desired information
        const exchangeRate = $('div[data-socket-key="EUR"][data-socket-attr="s"]').text().trim();

        // Return the data as JSON
        res.json({
            exchangeRate
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
