const config = require('../config')
let fs = require('fs')
const os = require("os")
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "ping",
    react: "🟢",
    alias: ["vitesse"],
    desc: "Vérifie le ping du bot",
    category: "principal",
    use: '.ping2',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    var inital = new Date().getTime();
    let ping = await conn.sendMessage(from , { text: '*_Vérification du ping..._*'  }, { quoted: mek } )
    var final = new Date().getTime();
    await conn.sendMessage(from, { delete: ping.key })
    return await conn.sendMessage(from , { text: '*```📍Pong```*\n *```' + (final - inital) + ' ms📟```*'  }, { quoted: mek } )
} catch (e) {
    reply('*Erreur !!*')
    l(e)
}
})

cmd({
    pattern: "ping2",
    react: "♻️",
    alias: ["vitesse"],
    desc: "Vérifie le ping du bot",
    category: "principal",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const startTime = Date.now()
    const message = await conn.sendMessage(from, { text: '*_Calcul du ping..._*' })
    const endTime = Date.now()
    const ping = endTime - startTime
    await conn.sendMessage(from, { text: `*_Vitesse... : ${ping}ms_*`}, { quoted: message })
} catch (e) {
    console.log(e)
    reply(`${e}`)
}
})
