// Importation des modules nécessaires
const config = require('../config');
const { cmd } = require('../command');
const { runtime, getRam, getDate, getPlatform, textToStylist, addSpace } = require('../lib/functions');

cmd(
  {
    pattern: 'menu ?(.*)',
    react: '📑',
    desc: 'Affiche la liste des commandes du bot.',
    category: 'principal',
    use: '.menu',
    filename: __filename,
    dontAddCommandList: true,
  },
  async (conn, mek, m, { from, reply, ctx }) => {
    try {
      const commands = {};

      ctx.commands.forEach((command) => {
        if (!command.dontAddCommandList && command.pattern !== undefined) {
          let cmdType = command.category ? command.category.toLowerCase() : 'autres';
          if (!commands[cmdType]) commands[cmdType] = [];

          let isDisabled = command.active === false;
          let cmd = command.name.trim();
          commands[cmdType].push(isDisabled ? `${cmd} [désactivé]` : cmd);
        }
      });

      const sortedCommandKeys = Object.keys(commands).sort();
      const [date, time] = getDate();

      let msg = `╭──❖ 「 *${config.BOT_NAME}* 」 ❖──
│ 📌 *Statut du bot*
│ ├⏳ *Uptime* : ${runtime(process.uptime())}
│ ├⚙️ *Mode* : ${config.MODE}
│ ├📌 *Préfixe* : ${config.PREFIX}
│ ├📊 *Mémoire utilisée* : ${getRam()}
│ ├🤖 *Version* : 1.0.0
│ ├👤 *Créateur* : Pharouk
│ ├🔄 *Toujours en ligne* : ${config.ALWAYS_ONLINE}
╰───────────────────◇\n\n`;

      if (m.args && commands[m.args]) {
        msg += ` ╭─❏ ${textToStylist(m.args.toLowerCase(), 'smallcaps')} ❏\n`;
        commands[m.args]
          .sort((a, b) => a.localeCompare(b))
          .forEach((plugin) => {
            msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`;
          });
        msg += ` ╰─────────────────`;
        return await conn.sendMessage(from, { text: msg }, { quoted: mek });
      }

      for (const command of sortedCommandKeys) {
        msg += ` ╭─❏ ${textToStylist(command.toLowerCase(), 'smallcaps')} ❏\n`;
        commands[command]
          .sort((a, b) => a.localeCompare(b))
          .forEach((plugin) => {
            msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`;
          });
        msg += ` ╰─────────────────\n`;
      }

      await conn.sendMessage(from, { text: msg.trim() }, { quoted: mek });
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);
