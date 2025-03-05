// Importation des modules nécessaires
const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');

// Définition de la commande "menu"
cmd(
  {
    pattern: 'menu',
    react: '📑',
    desc: 'Affiche la liste des commandes du bot.',
    category: 'principal',
    use: '.menu',
    filename: __filename,
  },
  async (conn, mek, m, { from, reply }) => {
    try {
      let menu = `╭─❖ 「 *${config.BOT_NAME}* 」 ❖─
│ 📌 *Statut du bot*
│ ├⏳ *Uptime* : ${runtime(process.uptime())}
│ ├⚙️ *Mode* : ${config.MODE}
│ ├📌 *Préfixe* : ${config.PREFIX}
│ ├📊 *Mémoire utilisée* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
│ ├🤖 *Version* : 1.0.0
│ ├👤 *Créateur* : Pharouk 
│ ├🔄 *Toujours en ligne* : ${config.ALWAYS_ONLINE}
╰──────────◇

📌 *Commandes disponibles :*
🎵 *Téléchargement* : .fb, .insta, .video, .play, .song...
🔎 *Recherche* : .google, .weather, .ytsearch, .movie...
🎮 *Jeux* : .numbergame, .roll, .coinflip...
🤖 *AI* : .gpt, .ai, .analyse...
🛠️ *Outils* : .sticker, .tts, .convert...
📜 *Infos* : .botinfo, .status, .ping...
👥 *Groupe* : .add, .kick, .promote, .demote...
👑 *Admin* : .settings, .shutdown, .broadcast...

📌 Tape *.menu <catégorie>* pour plus de détails !`;

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
