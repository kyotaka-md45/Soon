const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const googleTTS = require('google-tts-api')

cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "Traduire un texte entre différentes langues",
    react: "🌐",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply(" Veuillez fournir un code de langue et le texte. Utilisation : .translate [code langue] [texte]\nEx : trt fr Bonjour");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
  DRACULA TRADUCTION

Original : ${textToTranslate}

Traduit : ${translation}

🌐 Langue : ${targetLang.toUpperCase()}
`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ Une erreur s'est produite lors de la traduction de votre texte. Veuillez réessayer plus tard 🤕");
    }
});

//____________________________TTS___________________________
cmd({
    pattern: "tts",
    desc: "Convertir un texte en parole dans la langue spécifiée",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) {
            return reply("❗ Veuillez fournir un code de langue et le texte. Utilisation : .tts [code langue] [texte]\nEx : .tts en Bonjour");
        }

        const lang = args[0];
        const text = args.slice(1).join(' ');

        const url = googleTTS.getAudioUrl(text, {
            lang: lang,
            slow: false,
            host: 'https://translate.google.com',
        });

        await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    } catch (e) {
        console.log(e);
        return reply("⚠️ Une erreur s'est produite lors de la conversion de votre texte en parole. Veuillez réessayer plus tard ");
    }
});
