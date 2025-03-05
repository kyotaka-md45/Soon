const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "gpt",
    alias: "ai",
    desc: "Interagir avec ChatGPT en utilisant l'API redoutable.",
    category: "ai",
    react: "🤖",
    use: "<votre requête>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        // Vérification de l'entrée utilisateur
        if (!q) return reply("⚠️ Veuillez fournir une requête pour ChatGPT.\n\nExemple :\n.gpt Qu'est-ce que l'IA ?");
        
        // Utilisation de `${text}` dans le endpoint API
        const text = q;  // Texte de la requête de l'utilisateur
        const encodedText = encodeURIComponent(text);  // S'assurer que le texte est encodé correctement

        const url = `https://api.dreaded.site/api/chatgpt?text=${encodedText}`;

        console.log('URL demandée :', url);  // Afficher l'URL pour vérification

        // Appel à l'API avec headers personnalisés (ajoutez des headers si nécessaire)
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',  // Ajouter un User-Agent pour simuler une requête valide
                'Accept': 'application/json',  // Spécifier que l'on attend une réponse JSON
            }
        });

        // Afficher la réponse complète pour le débogage
        console.log('Réponse complète de l\'API :', response.data);

        // Vérification de la structure de la réponse
        if (!response || !response.data || !response.data.result) {
            return reply(" Aucune réponse reçue de l'API GPT. Veuillez réessayer plus tard.");
        }

        // Extraire uniquement le texte de la réponse (le prompt)
        const gptResponse = response.data.result.prompt;

        if (!gptResponse) {
            return reply(" Le format de réponse de l'API est inattendu. Veuillez réessayer plus tard.");
        }

        // Image à envoyer
        const ALIVE_IMG = 'https://i.ibb.co/938481dt/lordkerm.jpg'; // Remplacez par l'URL de votre image

        // Légende avec les informations formatées
        const formattedInfo = `🤖 *Réponse ChatGPT :*\n\n${gptResponse}`;

        // Envoyer le message avec l'image et la légende
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG }, // Vérifiez que l'URL est valide
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: 'DRACULA',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Erreur dans la commande GPT :", error);

        // Affichage des détails de l'erreur dans la console
        if (error.response) {
            console.log("Données de réponse d'erreur :", error.response.data);
        } else {
            console.log("Détails de l'erreur :", error.message);
        }

        // Répondre avec les détails de l'erreur
        const errorMessage = `
❌ Une erreur est survenue lors du traitement de la commande GPT.
🛠 *Détails de l'erreur* :
${error.message}

Veuillez signaler ce problème ou réessayer plus tard.
        `.trim();
        return reply(errorMessage);
    }
});

cmd({
    pattern: "llama3",
    desc: "Obtenir une réponse de Llama3 AI à partir du prompt fourni.",
    category: "ai",
    react: "🤖",
    filename: __filename,
    use: ".llama3 <votre prompt>"
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        // Vérifier qu'un prompt est fourni par l'utilisateur
        if (!q) return reply("⚠️ Veuillez fournir un prompt pour Llama3 AI.");

        // Informer l'utilisateur que la requête est en cours de traitement
        await reply("> *Traitement de votre prompt...*");

        // URL de l'API avec le prompt utilisateur encodé
        const apiUrl = `https://api.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(q)}`;

        // Envoyer une requête GET à l'API
        const response = await axios.get(apiUrl);
        console.log("Réponse de l'API Llama3 :", response.data);

        // Extraire la réponse de l'IA
        let llamaResponse;
        if (typeof response.data === "string") {
            llamaResponse = response.data.trim();
        } else if (typeof response.data === "object") {
            llamaResponse = response.data.response || response.data.result || JSON.stringify(response.data);
        } else {
            llamaResponse = "Impossible de traiter la réponse de l'IA.";
        }

        // Image à joindre
        const AI_IMG = 'https://i.ibb.co/V09y0WJY/mrfrankofc.jpg'; // Remplacez par une URL d'image valide

        // Texte de la réponse formatée
        const formattedInfo = `🤖 *Réponse Llama3 :*\n\n${llamaResponse}`;

        // Envoyer la réponse avec une image
        await conn.sendMessage(from, {
            image: { url: AI_IMG }, // Vérifiez que l'URL est valide
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: 'DRACULA',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Erreur dans la commande llama3 :", error);
        return reply(`❌ Une erreur est survenue : ${error.message}`);
    }
});
