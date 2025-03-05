const { cmd } = require('../command'); // Supposons que vous avez un gestionnaire de commandes
const axios = require('axios'); // Pour effectuer des requêtes HTTP à l'API GitHub
const fs = require('fs'); // Pour enregistrer les fichiers téléchargés

// Détails du dépôt GitHub
const REPO_OWNER = 'Pharouk';
const REPO_NAME = 'DRACULA';
const PLUGINS_FOLDER = 'plugins'; // Dossier où sont stockés les plugins

// URL de base de l'API GitHub
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PLUGINS_FOLDER}`;

// Stocker temporairement la liste des plugins
let pluginListCache = [];

// Commande pour lister tous les plugins
cmd({
    pattern: "listplugins", // Déclencheur de la commande
    alias: ["pluginslist", "listplugs", "listplugin"], // Alias
    use: '.listplugins', // Exemple d'utilisation
    react: "📂", // Réaction emoji
    desc: "Liste tous les plugins disponibles dans le dépôt du bot.", // Description
    category: "utility", // Catégorie de la commande
    filename: __filename // Nom du fichier actuel
},

async (conn, mek, m, { from, reply }) => {
    try {
        // Récupérer la structure du dossier depuis GitHub
        const response = await axios.get(GITHUB_API_URL);
        const plugins = response.data.filter(item => item.type === 'file'); // Lister uniquement les fichiers

        if (plugins.length === 0) {
            return reply("Aucun plugin trouvé dans le dépôt.");
        }

        // Mettre en cache la liste des plugins pour une utilisation ultérieure
        pluginListCache = plugins;

        // Construire une liste des plugins
        let pluginList = " DRACULA v1 Plugins:*\n\n";
        plugins.forEach((plugin, index) => {
            pluginList += `${index + 1}. ${plugin.name}\n> `; // Ajouter le nom du plugin à la liste
        });

        // Ajouter des instructions pour le téléchargement
        pluginList += "\nRépondez avec le numéro du fichier ou le nom du fichier pour télécharger.";

        // Envoyer la liste à l'utilisateur
        await reply(pluginList);
    } catch (error) {
        console.error("Erreur :", error); // Enregistrer l'erreur
        reply("*Erreur : Impossible de récupérer les plugins depuis le dépôt. Veuillez réessayer plus tard.*");
    }
});

// Commande pour télécharger un plugin spécifique
cmd({
    pattern: "plugin", // Déclencheur de la commande
    alias: ["downloadplugin", "getplugin"], // Alias
    use: '.plugin <plugin_name>', // Exemple d'utilisation
    react: "⬇️", // Réaction emoji
    desc: "Télécharge un plugin spécifique depuis le dépôt du bot.", // Description
    category: "utility", // Catégorie de la commande
    filename: __filename // Nom du fichier actuel
},

async (conn, mek, m, { from, reply, args, senderNumber }) => {
    try {
        let pluginName = args[0]; // Obtenir le nom ou le numéro du plugin à partir de l'argument

        // Si l'utilisateur répond à un message, vérifier si c'est un numéro
        if (m.quoted && m.quoted.key.fromMe) {
            const quotedText = m.quoted.text;
            if (/📂 \DRACULA v1 Plugins:\*/i.test(quotedText)) {
                // Extraire le numéro du fichier de la réponse
                const fileNumber = parseInt(pluginName);
                if (!isNaN(fileNumber) && fileNumber > 0 && fileNumber <= pluginListCache.length) {
                    pluginName = pluginListCache[fileNumber - 1].name;
                }
            }
        }

        // Vérifier si l'utilisateur a fourni un nom de plugin
        if (!pluginName) {
            return reply("Veuillez fournir un nom de plugin ou un numéro pour le télécharger.\nExemple : `.plugin ytdl.js` ou répondez avec `.plugin 1`");
        }

        // Récupérer le fichier du plugin depuis GitHub
        const response = await axios.get(`${GITHUB_API_URL}/${pluginName}`);
        const pluginUrl = response.data.download_url; // Obtenir l'URL de téléchargement

        // Télécharger le fichier du plugin
        const pluginResponse = await axios.get(pluginUrl, { responseType: 'arraybuffer' });
        const pluginPath = `./${pluginName}`; // Enregistrer le fichier localement

        // Enregistrer le fichier sur le système local
        fs.writeFileSync(pluginPath, pluginResponse.data);

        // Message de confirmation avec image et légende
        const statusMessage = {
            image: { url: `https://i.ibb.co/5x444Mnp/mrfrankofc.jpg` }, // Remplacez par votre URL d'image
            caption: `Téléchargement réussi de ${pluginName} `,
            contextInfo: {
                mentionedJid: [senderNumber],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: 'DRACULA',
                    serverMessageId: 143
                }
            }
        };

        // Envoyer le fichier à l'utilisateur
        await conn.sendMessage(
            from,
            {
                document: fs.readFileSync(pluginPath),
                mimetype: 'application/javascript', // Type MIME pour les fichiers JS
                fileName: pluginName
            },
            { quoted: mek }
        );

        // Envoyer le message de confirmation
        await conn.sendMessage(from, statusMessage, { quoted: mek });

        // Supprimer le fichier local après envoi
        fs.unlinkSync(pluginPath);
    } catch (error) {
        console.error("Erreur :", error); // Enregistrer l'erreur
        reply("Erreur : Impossible de télécharger le plugin. Vérifiez le nom du plugin ou réessayez plus tard.");
    }
});
