import express, { Router } from 'express';
import { summarize, getProfesionalTweet, suggestHashtags } from './moderationHelpers.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
const router = Router();

router.post('/moderate', async (req, res, next) => {
  try {
    let text = req.body.text;
    console.log('*** Original tweet:', text, text.length)

    if (text.length > 400) {
      console.log('### Summarizing the tweet...')
      text = await summarize(text);
      console.log('*** Summarized tweet:', text, text.length)
    } else {
      console.log('### The tweet is short enough. No summary is required.')
    }

    console.log('### Analyzing if the tweet is professional...')

    const { isProfessional, tweet: newTweet} = await getProfesionalTweet(text);

    if (!isProfessional) {
      console.log('*** The tweet was flagged as not professional');
      text = newTweet;
      console.log('*** New Tweet:', text, text.length);
    } else {
      console.log('*** The tweet is professional');
    } 

    console.log('### Generating hashtags...');

    // Replace any hashtag still there
    text = text.replace(/\#\w\w+\s?/g, '');

    const hashtags = await suggestHashtags(text);

    console.log('*** Hashtags:', hashtags, hashtags.length);

    const moderatedTweet = { text, hashtags };

    res.json(moderatedTweet);

  } catch (error) {
    next(error);
  }
});

app.use('/api', router);

app.listen(3000, () => console.log('Server running on port 3000'));
