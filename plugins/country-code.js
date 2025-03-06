const axios = require("axios");
const { cmd } = require("../command");

// Fonction utilitaire pour convertir un code ISO de pays en emoji de drapeau
function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

cmd({
    pattern: "check",
    desc: "Vérifie l'indicatif téléphonique d'un pays et retourne le(s) nom(s) correspondant(s) avec le drapeau",
    category: "utilitaire",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        let code = args[0];
        if (!code) {
            return reply("❌ Veuillez fournir un indicatif de pays. Exemple : `.check 237`");
        }

        // Supprime tout signe '+' du code
        code = code.replace(/\+/g, '');

        // Récupère tous les pays via l'API REST Countries v2
        const url = "https://restcountries.com/v2/all";
        const { data } = await axios.get(url);

        // Filtre les pays dont les indicatifs téléphoniques incluent le code donné
        const matchingCountries = data.filter(country =>
            country.callingCodes && country.callingCodes.includes(code)
        );

        if (matchingCountries.length > 0) {
            const countryNames = matchingCountries
                .map(country => `${getFlagEmoji(country.alpha2Code)} ${country.name}`)
                .join("\n");
            reply(`✅ *Indicatif du pays*: ${code}\n🌍 *Pays concernés* :\n${countryNames}`);
        } else {
            reply(`❌ Aucun pays trouvé pour l'indicatif ${code}.`);
        }
    } catch (error) {
        console.error(error);
        reply("❌ Une erreur est survenue lors de la vérification de l'indicatif.");
    }
});
