
import { Configuration, OpenAIApi } from 'openai';
import { searchContacts, addContact } from '../../lib/ghl';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    const aiResponse = completion.data.choices[0].message.content;
    
    if (aiResponse.includes('search')) {
      const contacts = await searchContacts(message);
      return res.status(200).json({ message: contacts });
    }
    
    return res.status(200).json({ message: aiResponse });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
