// ============================================
// 🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - SPOTIFY SONG DOWNLOADER
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 💖 BOYS Power Mode: ON
// 📌 Converted from your friend's bot
// ============================================

const { waqar } = require('../waqar');
const axios = require('axios');
const yts = require('yt-search');
const { fakevCard } = require('../lib/fakevCard');

// API Base URL
const DC_BASE = 'https://apis.davidcyriltech.my.id';

waqar({
    pattern: "spotify",
    alias: ["spoti", "spdl", "songsearch", "music"],
    desc: "🌸 Search and download a song as audio",
    category: "download",
    react: "🌸",
    filename: __filename
},
async (waqar, mek, m, { from, reply, text }) => {
    try {
        if (!text) {
            return reply("🌸 Example:\n.spotify Blinding Lights 💕");
        }

        // STEP 1: Search YouTube for the song
        const search = await yts(text + ' audio');
        if (!search.videos.length) {
            return reply(`🌸 No results found for: ${text} 💕`);
        }

        const vid = search.videos[0];
        const videoUrl = vid.url;
        const title = vid.title || text;
        const artist = vid.author?.name || '🌸 Unknown Artist';
        const duration = vid.timestamp || 'N/A';
        const thumbnail = vid.thumbnail || 'https://i.ytimg.com/vi/default/hqdefault.jpg';

        // STEP 2: Send Thumbnail with Details
        const caption = `
╭────────────────────◇
│  ❦ 🎵 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗜𝗡𝗚 ❦
│  ㋡━━━━━━━━━━━━━━━㋡
│ ♡⪼  🎶 ${title}
│ ♡⪼  👩‍🎤 ${artist}
│ ♡⪼  ⏱️ ${duration}
│ ♡⪼. 📥 Processing...
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
        `;

        await waqar.sendMessage(from, {
            image: { url: thumbnail },
            caption: caption
        }, { quoted: fakevCard });

        // STEP 3: Download MP3 via API
        const apiUrl = `${DC_BASE}/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const { data } = await axios.get(apiUrl, { timeout: 35000 });

        const audioUrl = data?.result?.download_url || 
                        data?.result?.downloadUrl || 
                        data?.result?.url || 
                        data?.url || 
                        data?.link || 
                        data?.result?.download?.url;

        if (!audioUrl) {
            throw new Error('Could not retrieve download link');
        }

        // STEP 4: Send Audio
        await waqar.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: fakevCard });

    } catch (err) {
        console.error('🌸 Spotify Error:', err);
        
        if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
            return reply("⏳ API timeout. Please try again. 💕");
        }

        reply(`🌸 Song download failed: ${err.message || 'Unknown error'} 💕`);
    }
});
