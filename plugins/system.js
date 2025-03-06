const config = require('../config')
const { cmd, commands } = require('../command')
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "system",
    react: "♠️",
    alias: ["uptime", "runtime"],
    desc: "Vérifie le temps d'activité",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let status = `*╭──────────●●►*
*LISTE DE TEMPS D'ACTIVITÉ DE KERM-MD-V1 ↷*

*_TEMPS D'ACTIVITÉ :➠_*  ${runtime(process.uptime())}

*_UTILISATION DE LA RAM :➠_* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

*_NOM DE L'HÔTE :➠_* ${os.hostname()}

*_PROPRIÉTAIRE :➠_* *DRACULA 🧛*
*╰──────────●●►*
`
        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: `${status}` }, { quoted: mek })

    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
