const config = require('../config');
const { cmd, commands } = require('../command');

let stopKickall = false; // Variable pour arrêter l'exécution de la commande kickall

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cmd({
    pattern: "kickall",
    desc: "Expulse tous les membres non-admin du groupe.",
    react: "🧨",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isCmd,
    command,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Vérifie que la commande est utilisée dans un groupe
        if (!isGroup) return reply(`❌ Cette commande ne peut être utilisée que dans des groupes.`);

        // Vérifie que l'utilisateur est admin
        if (!isAdmins) return reply(`❌ Seuls les admins du groupe peuvent utiliser cette commande.`);

        // Vérifie que le bot a les privilèges d'admin
        if (!isBotAdmins) return reply(`❌ J'ai besoin des privilèges d'admin pour retirer des membres du groupe.`);

        stopKickall = false; // Réinitialise le drapeau d'arrêt

        // Envoie un message d'avertissement avant l'exécution
        reply(`⚠️ *Attention !* Tous les membres non-admin seront expulsés dans *5 secondes*.\nPour annuler cette opération, tapez *.stop*.`);
        
        // Compte à rebours avant l'exécution avec possibilité d'annuler
        for (let i = 5; i > 0; i--) {
            if (stopKickall) {
                return reply(`✅ *Opération annulée.* Aucun membre n'a été expulsé.`);
            }
            await delay(1000); // Attendre 1 seconde
        }

        // Filtre des membres non-admin
        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => 
            !groupAdmins.includes(member.id) && member.id !== conn.user.jid
        );

        if (nonAdminParticipants.length === 0) {
            return reply(`✅ Aucun membre non-admin à expulser.`);
        }

        // Expulse les membres non-admin
        for (let participant of nonAdminParticipants) {
            if (stopKickall) {
                return reply(`✅ *Opération annulée.* Certains membres n'ont peut-être pas été expulsés.`);
            }
            await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                .catch(err => console.error(`⚠️ Échec de l'expulsion de ${participant.id} :`, err));
        }

        // Envoie une confirmation de succès
        reply(`✅ *Succès !* Tous les membres non-admin ont été expulsés du groupe.`);
    } catch (e) {
        console.error('Erreur lors de l\'exécution de kickall :', e);
        reply('❌ Une erreur est survenue lors de l\'exécution de la commande.');
    }
});

// Commande pour arrêter l'exécution de kickall
cmd({
    pattern: "stop",
    desc: "Arrête la commande kickall.",
    react: "⏹️",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    stopKickall = true; // Active le drapeau d'arrêt
    reply(`✅ *Opération kickall annulée.*`);
});

cmd({
    pattern: "kick",
    desc: "Expulse un participant en répondant ou en mentionnant son message.",
    react: "🚪",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Vérifie que la commande est utilisée dans un groupe
        if (!isGroup) return reply(`❌ Cette commande ne peut être utilisée que dans des groupes.`);
        
        // Seuls les admins ou le propriétaire peuvent utiliser cette commande
        if (!isAdmins && !isOwner) return reply(`❌ Seuls les admins du groupe ou le propriétaire peuvent utiliser cette commande.`);
        
        // Vérifie que le bot a les privilèges d'admin
        if (!isBotAdmins) return reply(`❌ J'ai besoin des privilèges d'admin pour retirer des membres du groupe.`);
        
        // Récupère le participant ciblé via une réponse ou une mention
        let target;
        if (quoted) {
            target = quoted.sender; // Utilise l'expéditeur du message cité
        } else if (mek.message && mek.message.mentionedJid && mek.message.mentionedJid.length > 0) {
            target = mek.message.mentionedJid[0]; // Utilise le premier identifiant mentionné
        }
        
        if (!target) {
            return reply(`❌ Veuillez mentionner ou répondre au message du participant à expulser.`);
        }
        
        // Empêche d'expulser un admin ou le bot lui-même
        if (groupAdmins.includes(target) || target === conn.user.jid) {
            return reply(`❌ Vous ne pouvez pas expulser un admin ou le bot.`);
        }
        
        // Expulse le participant du groupe
        await conn.groupParticipantsUpdate(from, [target], "remove")
            .catch(err => {
                console.error(`⚠️ Échec de l'expulsion de ${target} :`, err);
                return reply(`❌ Une erreur est survenue lors de la tentative d'expulsion du participant.`);
            });
        
        // Envoie un message de confirmation en cas de succès
        reply(`✅ Succès ! Le participant a été expulsé du groupe.`);
    } catch (e) {
        console.error('Erreur lors de l\'exécution de kick :', e);
        reply('❌ Une erreur est survenue lors de l\'exécution de la commande.');
    }
});
