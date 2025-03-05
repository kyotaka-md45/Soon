const config = require('../config')
const { cmd } = require('../command')
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    react: "🟢",
    desc: "Get bot command list.",
    category: "main",
    use: ".menu",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let madeMenu = `╭━━━━━━━〈 ${config.BOT_NAME} 〉━━━━━━━╮
┃ *Runtime:* ${runtime(process.uptime())}
┃ *Mode:* ${config.MODE}
┃ *Prefix:* ${config.PREFIX}
┃ *RAM Usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
┃ *Bot Version:* 4.2.1
╰━━━━━━━━━━━━━━━━━━━━━━╯

📥 *DOWNLOADER*  
> .fb | .insta | .twitter | .play | .spotify  

🎮 *GAMES*  
> .numbergame | .roll | .coinflip  

🔎 *SEARCH*  
> .yts | .google | .weather  

🧠 *AI*  
> .gpt | .ai  

👥 *GROUP*  
> .remove | .add | .promote | .demote  

🤖 *BOT*  
> .menu | .version | .repo  

⛱️ *RANDOM*  
> .dog | .cat | .anime | .waifu  

🌐 *OTHER*  
> .quote | .joke | .timezone  

📃 *INFO*  
> .about | .ping | .status  
`

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek })

    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
