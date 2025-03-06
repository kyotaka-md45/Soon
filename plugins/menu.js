const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd(
  {
    pattern: 'menu',
    react: '📑',
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
      *📜 ${config.BOT_NAME} - MENU 📜*
      ───────────────
      ✅ *Statut :* En ligne ✅
      ⏳ *Uptime :* ${runtime(process.uptime())}
      🚀 *Mode :* ${config.MODE}
      ⚡ *Préfixe :* ${config.PREFIX}
      💾 *RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
      🤖 *Version :* 4.2.1
      👑 *Créateur :* Kɢ Tᴇᴄʜ
      ───────────────
      🎭 *Commandes disponibles* 🎭

      📥 *Téléchargement* :
        - .fb  
        - .insta  
        - .video  
        - .play  
        - .song  
        - .spotify  
      
      🔎 *Recherche* :
        - .google  
        - .yts  
        - .movie  
        - .lyrics  

      🎮 *Jeux* :
        - .numbergame  
        - .roll  
        - .coinflip  
        - .pick  

      🔞 *NSFW* :
        - .nsfw  
        - .penis  
        - .nude  
        - .sex  
        - .kiss  

      🧠 *IA* :
        - .gpt  
        - .ai  
        - .analyse  
        - .llama3  

      👨‍💻 *Admin* :
        - .updatecmd  
        - .settings  
        - .owner  
        - .repo  
        - .status  

      👥 *Groupe* :
        - .kick  
        - .promote  
        - .demote  
        - .tagall  
        - .invite  

      📃 *Infos* :
        - .about  
        - .dev  
        - .botinfo  
        - .ping  

      🖼️ *Images* :
        - .img  
        - .logo  
        - .wallpaper  

      💡 *Autres* :
        - .fact  
        - .joke  
        - .qr  
        - .timezone  
        - .quote  
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
