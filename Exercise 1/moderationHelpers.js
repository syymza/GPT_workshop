
import { askGPT } from "./gptClient.js"
import { getSummarizeSystem, getSummarizeUser, getIsProfessionalSystem, getIsProfesssionalUser, getSuggestHashtagsSystem, getSuggestHashtagsUser } from "./prompts.js"

const summarize = async (longTweet) => {
    const response = await askGPT([getSummarizeSystem(), getSummarizeUser(longTweet.replaceAll('####', ''))]);
    const json = JSON.parse(response)
    return json.tweet;
}


const getProfesionalTweet = async (tweet) => {
    const response = await askGPT([getIsProfessionalSystem(), getIsProfesssionalUser(tweet.replaceAll('####', ''))]);
    const json = JSON.parse(response)
    return json;
}

const suggestHashtags = async (tweet) => {
    const response = await askGPT([getSuggestHashtagsSystem(), getSuggestHashtagsUser(tweet.replaceAll('####', ''))]);
    const json = JSON.parse(response)
    return json.hashtags;
}



export { summarize, suggestHashtags, getProfesionalTweet }