const axios = require('axios');
require('dotenv').config();

const TRANSACTION_SERVICE_URL = process.env.TRANSACTION_SERVICE_URL;

const forwardRequest = async (method, url, data, headers) => {
  try {
    const response = await axios({
      method,
      url: `${TRANSACTION_SERVICE_URL}${url}`,
      data,
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { forwardRequest };
