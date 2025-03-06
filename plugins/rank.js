const { cmd } = require('../command');

// Stockage simulé en mémoire pour les niveaux des utilisateurs
const userLevels = {};

// Fonction pour calculer le niveau en fonction de l'XP
const calculateLevel = (xp) => Math.floor(0.1 * Math.sqrt(xp));

cmd({
    pattern: "rank",  // Conserve "rank"
    desc: "Vérifie le niveau d'un utilisateur.",
    react: "📊",
    category: "utilitaire",
    use: ".rank [@mention ou réponse]",
    filename: __filename,
}, async (conn, mek, m, { reply, isGroup, mentionedJid }) => {
    try {
        let target;

        // Déterminer l'utilisateur ciblé
        // Cas 1 : Si une mention est présente, utiliser l'utilisateur mentionné.
        if (mentionedJid?.length > 0) {
            target = mentionedJid[0]; // Premier utilisateur mentionné
        } 
        // Cas 2 : Si l'utilisateur répond à un message, utiliser l'expéditeur du message cité.
        else if (m.quoted && m.quoted.sender) {
            target = m.quoted.sender; // Utilisateur ayant envoyé le message cité
        } 
        // Cas 3 : Si ni mention ni réponse, utiliser l'expéditeur de la commande.
        else {
            target = m.sender; // Par défaut, l'expéditeur
        }

        if (!target) {
            return reply("❌ Veuillez mentionner un utilisateur ou répondre à son message pour vérifier son rang.");
        }

        // Initialiser les données de l'utilisateur si elles n'existent pas
        if (!userLevels[target]) {
            userLevels[target] = { experience: 0, messages: 0 };
        }

        // Simuler un gain d'expérience
        const userData = userLevels[target];
        userData.messages += 1;
        userData.experience += Math.floor(Math.random() * 10) + 5;

        const level = calculateLevel(userData.experience);
        const nextLevelXP = Math.pow((level + 1) / 0.1, 2);
        const currentLevelXP = Math.pow(level / 0.1, 2);
        const progressPercent = Math.floor(((userData.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
        const progressBar = "🟠".repeat(progressPercent / 10) + "🟢".repeat(10 - progressPercent / 10);

        // URL de l'image pour le classement
        const levelImageURL = "https://files.catbox.moe/rrgoyh.jpeg"; // Remplacez par l'URL de l'image souhaitée
        
        // Envoyer les informations du rang sous forme de texte et d'image
        const caption = `📊 *Informations sur le Rang*\n\n👤 *Utilisateur*: @${
            target.split("@")[0]
        }\n🔝 *Niveau*: ${level}\n🔄 *Progression*: ${progressPercent}%\n${progressBar}\n📩 *Messages envoyés*: ${
            userData.messages
        }\n✨ *XP*: ${userData.experience}\n\n> PHAROUK `;

        // Envoyer l'image et la légende ensemble
        await conn.sendMessage(
            m.chat,
            { image: { url: levelImageURL }, caption, mentions: [target] },
            { quoted: mek }
        );

    } catch (error) {
        console.error("Erreur dans la commande rank :", error);
        reply("❌ Une erreur est survenue lors de la récupération du rang. Veuillez réessayer.");
    }
});
