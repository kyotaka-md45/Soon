const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd(
  {
    pattern: 'menu',
    react: '',
    desc: 'Affiche la liste des commandes du bot.',
    category: 'main',
    use: '.menu',
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      umarmd,
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
      reply,
    }
  ) => {
    try {
      let menu = `╭━━━⋆⋅⋆━━━╮
 ${config.BOT_NAME} - MENU 
───────────────
 Sᴛᴀᴛᴜs: En ligne 
⏳ Uᴘᴛɪᴍᴇ: ${runtime(process.uptime())}
🚀 Mᴏᴅᴇ: ${config.MODE}
⚡ Pʀᴇғɪxᴇ: ${config.PREFIX}
💾 *Rᴀᴍ:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
🤖 Vᴇʀsɪᴏɴ: 1.0.0
👑 Cʀᴇᴀᴛᴏʀ: Pʜᴀʀᴏᴜᴋ
───────────────
🎭 *Cᴏᴍᴍᴀɴᴅᴇs Dɪsᴘᴏɴɪʙʟᴇs* 🎭

📥 Tᴇ́ʟᴇᴄʜᴀʀɢᴇᴍᴇɴᴛ: 
  ➤ .sᴇɴᴅɪᴍᴀɢᴇ  

🔎 Rᴇᴄʜᴇʀᴄʜᴇ:
  ➤ .ғɪɴᴅɴᴀᴍᴇ  
  ➤ .ʟʏʀɪᴄs  
  ➤ .ᴛʀᴀɴsʟᴀᴛᴏʀ  
  ➤ .ᴡᴇᴀᴛʜᴇʀ  

🎮 Jᴇᴜx:  
  ➤ .ᴀᴄᴛɪᴏɴ-ᴠᴇʀɪᴛᴇ  
  ➤ .ᴘɪɴɢ  
  ➤ .ʀᴀɴᴋ  

👨‍💻 Aᴅᴍɪɴ:
  ➤ .ᴄᴍᴅᴜᴘᴅᴀᴛᴇ  
  ➤ .ᴜᴘᴅᴀᴛᴇ  
  ➤ .sᴇᴛᴛɪɴɢ  

👥 Gʀᴏᴜᴘᴇ: 
  ➤ .ᴋɪᴄᴋᴀʟʟ  

📃 Iɴғᴏs:  
  ➤ .sʏsᴛᴇᴍ  

💡 Aᴜᴛʀᴇs:  
  ➤ .ᴀʟɪᴠᴇ  
  ➤ .ᴇᴠᴀʟ  
  ➤ .ᴅᴇʟ  
  ➤ .ᴀɴᴛɪ-ᴠɪᴇᴡ-ᴏɴᴄᴇ  
  ➤ .ʀᴇsᴛᴀʀᴛ  
  ➤ .ᴄᴏᴜɴᴛʀʏ-ᴄᴏᴅᴇ  
╰━━━━━━━━━━━━╯`;

      await conn.sendMessage(
        from,
        { image: { url: config.ALIVE_IMG }, caption: menu },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
