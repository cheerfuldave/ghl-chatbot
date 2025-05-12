
import axios from 'axios';

const GHL_API_URL = 'https://services.leadconnectorhq.com';
const GHL_TOKEN = process.env.GHL_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

export const searchContacts = async (query) => {
  const response = await axios.get(`${GHL_API_URL}/contacts/search`, {
    headers: { Authorization: `Bearer ${GHL_TOKEN}` },
    params: { query, locationId: LOCATION_ID }
  });
  return response.data;
};

export const addContact = async (contactData) => {
  const response = await axios.post(`${GHL_API_URL}/contacts`, 
    { ...contactData, locationId: LOCATION_ID },
    { headers: { Authorization: `Bearer ${GHL_TOKEN}` } }
  );
  return response.data;
};
