const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  const url = 'https://kur.doviz.com/serbest-piyasa/amerikan-dolari';

  try {
    // Send a GET request to the URL
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract the desired information
    const exchangeRate = $('div[data-socket-key="USD"][data-socket-attr="s"]').text().trim();

    // Return the data as JSON
    return {
      statusCode: 200,
      body: JSON.stringify({ exchangeRate }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
