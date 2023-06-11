const SYSTEM =  "system"
const USER = "user"


const getSummarizeSystem = () => ({
    role: SYSTEM,
    content: `
        You are helping a developer to moderate a series of tweets.
        You will receive a TWEET wrapped by #### as a separation token.
        You need to summarize a long tweet with a shorter one.
        Do not include any hashtags in your summary.
        Your answer will be a JSON in the following format:

        { "tweet": <SUMMARY> }

        <SUMMARY> represents the result of your output text.
        <SUMMARY> needs to be a professional tweet.
        <SUMMARY> should be a single sentence.
    `
});

const getSummarizeUser = (tweet) => ({
    role: USER,
    content: `This is the tweet to summarise: ####${tweet}####. Your JSON answer:`
})


const getIsProfessionalSystem = () => ({
    role: SYSTEM,
    content: `
        You are helping a developer to moderate a series of tweets.
        You will receive a TWEET wrapped by #### as a separation token.
        You need to analyse the token and check if it is professoinal.

        If the answer is not professional, rewrite the tweet more professionally, maintaining the original meaning.

        Your output will be a JSON in the following format:
        
        If the tweet is professional:

        { "isProfessional": true }

        If the tweet is not professional:

        { "isProfessional": false, "tweet": <NEW_TWEET> } where <NEW_TWEET> is the new professssional tweet.

        `
});

const getIsProfesssionalUser = (tweet) => ({
    role: USER,
    content: `This is the tweet to analyse: ####${tweet}####. Your JSON answer:`
});


const getSuggestHashtagsSystem = () => ({
    role: SYSTEM,
    content: `
        You are helping a developer to moderate a series of tweets.
        You will receive a TWEET wrapped by #### as a separation token.
        You need to analyse the token and suggest exactly 3 hashtags.

        Your output will be a JSON in the following format:

        { "hashtags": [<HASHTAG>, <HASHTAG>, <HASHTAG>] }

        Each <HASHTAG> is a relevant hashtag.

        `
});

const getSuggestHashtagsUser = (tweet) => ({
    role: USER,
    content: `This is the tweet for which you need to generate hashtags: ####${tweet}####. Your JSON answer:`
});

export { getSummarizeSystem, getSummarizeUser, getIsProfessionalSystem, getIsProfesssionalUser, getSuggestHashtagsSystem, getSuggestHashtagsUser  };