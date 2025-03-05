const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: "updatecmd",
  react: "🧞",
  desc: "Met à jour les commandes.",
  category: "owner",
  filename: __filename
},
async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
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
    if (!isOwner) return reply("Seul le propriétaire du bot peut utiliser cette commande.");
    
    const pluginsDir = path.join(__dirname, '../plugins');
    const files = fs.readdirSync(pluginsDir);
    
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(pluginsDir, file);
        require(filePath);
        console.log(`Chargé ${file}`);
      }
    }
    
    reply("Commandes mises à jour avec succès.");
  } catch (e) {
    console.log(e);
    reply(`Erreur lors de la mise à jour des commandes : ${e.message}`);
  }
});
