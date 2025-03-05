const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "settings",
    react: "🎛️",
    alias: ["setting", "env"],
    desc: "Obtenez la liste des paramètres du bot.",
    category: "main",
    use: '.settings',
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // Fonction qui renvoie ✅ ou ❌ en fonction de la valeur booléenne, en considérant plusieurs formats
        const statusIcon = (status) => {
            return (status === true || status === 'true' || status === 1) ? "✅" : "❌";
        };

        // Création du message de paramètres avec le format mis à jour
        let madeSetting = `╭───⚙️ *Paramètres de ${config.BOT_NAME}* ⚙️───╮
│
│ 🟢 *➤ Statut de lecture automatique*: ${statusIcon(config.AUTO_READ_STATUS)}
│ ⚙️ *➤ Mode*: *${config.MODE}*
│ 🎙️ *➤ Voix automatique*: ${statusIcon(config.AUTO_VOICE)}
│ 🖼️ *➤ Sticker automatique*: ${statusIcon(config.AUTO_STICKER)}
│ 💬 *➤ Réponse automatique*: ${statusIcon(config.AUTO_REPLY)}
│ ✉️ *➤ Message d'activité*: *${config.ALIVE_MSG}*
│ 🔗 *➤ Anti-lien*: ${statusIcon(config.ANTI_LINK)}
│ 🚫 *➤ Anti-mauvais*: ${statusIcon(config.ANTI_BAD)}
│ ⌨️ *➤ Préfixe*: *[ ${config.PREFIX} ]*
│ 🎥 *➤ Enregistrement factice*: ${statusIcon(config.FAKE_RECORDING)}
│ 😀 *➤ Réaction automatique*: ${statusIcon(config.AUTO_REACT)}
│ ❤️ *➤ Réaction en cœur*: ${statusIcon(config.HEART_REACT)}
│ 👑 *➤ Réaction du propriétaire*: ${statusIcon(config.OWNER_REACT)}
│ 🤖 *➤ Nom du bot*: *${config.BOT_NAME}*
│
╰──────────────────────────╯

DRACULA»🌐
`;

        // Envoi du message de paramètres avec le format mis à jour
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: madeSetting
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
