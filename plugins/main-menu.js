// ============================================
// 🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - TAP TO SELECT MENU
// 👑 Single Select + Image + Text
// 💖 Boys Power Mode: ON
// ============================================

const { waqar, commands } = require('../waqar');
const { sendInteractiveMessage } = require('gifted-btns');
const moment = require('moment-timezone');
const config = require('../config');
const axios = require('axios');
const { fakevCard } = require('../lib/fakevCard');
const { runtime } = require('../lib/functions');

// ============================================
// 📌 VIDEO & AUDIO URLS
// ============================================
const VIDEO_URLS = [
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video1.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video2.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video3.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video4.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video5.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video6.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video7.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video8.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video9.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video10.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video11.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video12.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video13.mp4',
    'https://github.com/ArslanMDofficial/ARSLAN-MD-DATA/raw/main/data/menu-video14.mp4'
];

const AUDIO_URLS = [
    'https://files.catbox.moe/p314az.mp3',
    'https://files.catbox.moe/mx2x8j.mp3',
    'https://files.catbox.moe/vu1pse.mp3',
    'https://files.catbox.moe/p316az.mp3',
    'https://files.catbox.moe/5v6e10.mp3'
];

// ============================================
// 📌 CATEGORY IMAGES
// ============================================
const CATEGORY_IMAGES = {
    menu_settings: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_group: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_islamic: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_text: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_download: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_utility: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_owner: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_extra: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_ai: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg',
    menu_stalk: 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg'
};

// ============================================
// 📌 HELPERS
// ============================================
function formatUptime(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

function getGreeting() {
    const time = moment().tz('Asia/Karachi').format('HH:mm:ss');
    if (time < '05:00:00') return 'ɢᴏᴏᴅ ɴɪɢʜᴛ 🌌';
    if (time < '12:00:00') return 'ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌄';
    if (time < '15:00:00') return 'ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ 🌅';
    if (time < '18:00:00') return 'ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃';
    if (time < '20:00:00') return 'ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌃';
    return 'ɢᴏᴏᴅ ɴɪɢʜᴛ 🌌';
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================
// 🎬 MAIN MENU (Random Video + Audio)
// ============================================
waqar({
    pattern: "menu",
    alias: ["help", "cmds", "commands", "allmenu2"],
    desc: "🌸 Tap to select menu with random video + audio",
    category: "main",
    react: "🌸",
    filename: __filename
}, async (waqar, mek, m, { from, reply, pushname }) => {
    try {
        // ── Reactions ──────────────────────────────────────────
        const reactions = ['⏳', '🔄', '⚙️', '✅'];
        for (const emoji of reactions) {
            await waqar.sendMessage(from, { react: { text: emoji, key: mek.key } }).catch(() => {});
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // ── Stats ──────────────────────────────────────────────
        const totalCommands = commands.length;
        const uptime = runtime(process.uptime());
        const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const botName = config.BOT_NAME || "💕⃝🕊️ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💕⃝🕊️";
        const ownerName = config.OWNER_NAME || "ᴹᴿMalik-ᴍD ";
        const prefix = config.PREFIX || ".";
        const pushName = pushname || 'User';
        const pakTime = moment().tz('Asia/Karachi').format('hh:mm:ss A');
        const pakDate = moment().tz('Asia/Karachi').format('DD/MM/YYYY');
        const greeting = getGreeting();

        // ── Select Random Video & Audio ──────────────────────
        const randomVideo = getRandomItem(VIDEO_URLS);
        const randomAudio = getRandomItem(AUDIO_URLS);

        // ── Build Menu Text ────────────────────────────────────
        const headerText = `
╭───────────────────◇
│ 💕⃝🕊️ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💕⃝🕊️
│㋡━━━━━━━━━━━━━━━━㋡
││♡⪼ 👤 User: ${pushName}
││♡⪼ 👑 Owner: ${ownerName}
││♡⪼ ⏰ Time: ${pakTime}
││♡⪼ 📅 ${pakDate}
││♡⪼ ⏳ ${uptime}
││♡⪼ 📊 Commands: ${totalCommands}
││♡⪼ 💾 Memory: ${memory} MB
││♡⪼ 🔧 Prefix: ${prefix}
││♡⪼ 🌟 ${greeting}
╰───────────────────○
❦M A R C O M A L I K－ＭＤ－Ｍｉｎｉ

💖 *ᴛᴀᴘ ᴛᴏ ᴏᴘᴇɴ ᴍᴇɴᴜ" ʙᴇʟᴏᴡ ᴛᴏ sᴇʟᴇᴄᴛ ᴀ ᴄᴀᴛᴇɢᴏʀʏ*
        `.trim();

        // ── Context Info ───────────────────────────────────────
        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363431096532056@newsletter',
                newsletterName: '🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐',
                serverMessageId: 143
            }
        };

        // ── STEP 1: Send Random Video ─────────────────────────
        try {
            const headCheck = await axios.head(randomVideo).catch(() => null);
            if (headCheck && headCheck.status === 200) {
                await waqar.sendMessage(from, {
                    video: { url: randomVideo },
                    mimetype: 'video/mp4',
                    ptv: true,
                    caption: `🌸 *${botName}* 💖\n👑 Welcome ${pushName || 'King'}!`,
                    gifPlayback: false,
                    contextInfo: contextInfo
                }, { quoted: fakevCard });
            }
        } catch (videoError) {
            console.log('🌸 Video send skipped:', videoError.message);
        }

        // ── STEP 2: Send Image + Tap to Select ────────────────
        const imageUrl = config.MENU_IMAGE_URL || 'https://i.ibb.co/MxvkhCpC/IMG-20261107-WA0115.jpg';

        // ── Categories ─────────────────────────────────────────
        const categories = [
            { id: 'menu_settings', title: '⚙️ ʙᴏᴛ sᴇᴛᴛɪɴɢs' },
            { id: 'menu_group', title: '🛡 ɢʀᴏᴜᴘ ᴛᴏᴏʟs' },
            { id: 'menu_islamic', title: '☪️ ɪsʟᴀᴍɪᴄ' },
            { id: 'menu_text', title: '🎨 ᴛᴇxᴛ ᴇғғᴇᴄᴛs' },
            { id: 'menu_download', title: '📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ' },
            { id: 'menu_utility', title: '🛠 ᴜᴛɪʟɪᴛʏ' },
            { id: 'menu_owner', title: '👑 ᴏᴡɴᴇʀ' },
            { id: 'menu_extra', title: '📌 ᴇxᴛʀᴀ' },
            { id: 'menu_ai', title: '🤖 ᴀɪ' },
            { id: 'menu_stalk', title: '👀 sᴛᴀʟᴋ' }
        ];

        // ── Send Interactive Message ──────────────────────────
        await sendInteractiveMessage(waqar, from, {
            text: headerText,
            footer: `💖 ${botName} | ${uptime}`,
            interactiveButtons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🔖 ᴛᴀᴘ ᴛᴏ ᴏᴘᴇɴ ᴍᴇɴᴜ 💻',
                        sections: [{
                            title: '📌 ᴄᴀᴛᴇɢᴏʀɪᴇs',
                            highlight_label: '🔍 sᴇʟᴇᴄᴛ',
                            rows: categories.map(cat => ({
                                title: cat.title,
                                description: `Tap to view ${cat.title} commands`,
                                id: cat.id
                            }))
                        }]
                    })
                },
                // ── URL Buttons ──────────────────────────
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '💖 🄶🅁🄾🅄🄿 ✌︎㋡',
                        url: config.GROUP_LINK || 'https://chat.whatsapp.com/K2UzShZXPbcFXPvoREhArD?s=cl&p=a&iam=2'
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🎀 🄲🄷🄰🄽🄽🄴🄻 ✌︎㋡',
                        url: config.CHANNEL_LINK || 'https://whatsapp.com/channel/0029VbE1PSOGzzKS8DCvLM32'
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '👑 🄾🅆🄽🄴🅁 ✌︎㋡',
                        url: config.OWNER_LINK || 'https://wa.me/923293245445'
                    })
                }
            ]
        });

        // ── STEP 3: Send Random Audio ─────────────────────────
        try {
            const audioCheck = await axios.head(randomAudio).catch(() => null);
            if (audioCheck && audioCheck.status === 200) {
                await waqar.sendMessage(from, {
                    audio: { url: randomAudio },
                    mimetype: 'audio/mpeg',
                    ptt: false,
                    contextInfo: contextInfo
                }, { quoted: fakevCard });
            }
        } catch (audioError) {
            console.log('🌸 Audio send skipped:', audioError.message);
        }

        // ── Reaction ───────────────────────────────────────────
        await waqar.sendMessage(from, { react: { text: '💖', key: mek.key } });

    } catch (error) {
        console.error('🌸 Menu Error:', error);
        
        // ── Fallback: Simple menu ──────────────────────────────
        try {
            const fallbackMenu = `
╭────────────────────◇
│ 💕⃝🕊️ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💕⃝🕊️
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ 🤖 Bot: ${config.BOT_NAME || 'Waqar Right'}
│  ✿ 👑 Owner: ${config.OWNER_NAME || 'WAQAR QUEEN'}
│  ✿ 📊 Commands: ${commands.length}
│  ✿ ⏱️ Uptime: ${runtime(process.uptime())}
│  ✿ 📌 Prefix: ${config.PREFIX || '.'}
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐`;
            await reply(fallbackMenu);
        } catch (fallbackError) {
            reply(`🌸 Error loading menu: ${error.message} 💕`);
        }
    }
});

// ============================================
// 📌 CATEGORY MENU COMMANDS (With Image)
// ============================================

// ── Settings Menu ────────────────────────────
waqar({
    pattern: "menu_settings",
    alias: ["settings"],
    desc: "🌸 Bot settings commands",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ ⚙️ ʙᴏᴛ sᴇᴛᴛɪɴɢs ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .public / .private
│  ✿ .antidelete on/off
│  ✿ .status on/off
│  ✿ .anticall on/off
│  ✿ .autoreacts on/off
│  ✿ .welcome on/off
│  ✿ .alive
│  ✿ .ping
│  ✿ .setprefix [char]
│  ✿ .setmenupic [url/reply]
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_settings },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Group Menu ───────────────────────────────
waqar({
    pattern: "menu_group",
    alias: ["groupmenu"],
    desc: "🌸 Group tools commands",
    category: "menu",
    react: "🛡",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 🛡 ɢʀᴏᴜᴘ ᴛᴏᴏʟs ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .kick (reply to user)
│  ✿ .leave (bot leaves group)
│  ✿ .addmember [number]
│  ✿ .add [number]
│  ✿ .mute / .unmute
│  ✿ .promote / .demote
│  ✿ .tagall [note]
│  ✿ .admintag [note]
│  ✿ .tag [text] (or reply)
│  ✿ .hidetag [text]
│  ✿ .link
│  ✿ .revoke
│  ✿ .setgname [name]
│  ✿ .setgdesc [text]
│  ✿ .groupinfo
│  ✿ .antilink on/off
│  ✿ .antitag on/kick/off
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_group },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Islamic Menu ─────────────────────────────
waqar({
    pattern: "menu_islamic",
    alias: ["islamic"],
    desc: "🌸 Islamic commands",
    category: "menu",
    react: "☪️",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ ☪️ ɪsʟᴀᴍɪᴄ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .asmaulhusna [1-20]
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_islamic },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Text Effects Menu ────────────────────────
waqar({
    pattern: "menu_text",
    alias: ["texteffects"],
    desc: "🌸 Text effects commands",
    category: "menu",
    react: "🎨",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 🎨 ᴛᴇxᴛ ᴇғғᴇᴄᴛs ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .matrix [text]
│  ✿ .1917 [text]
│  ✿ .fancy [text]
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_text },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Download Menu ─────────────────────────────
waqar({
    pattern: "menu_download",
    alias: ["dlmenu", "download"],
    desc: "🌸 Download & media commands",
    category: "menu",
    react: "📥",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ & ᴍᴇᴅɪᴀ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .song [name]
│  ✿ .play [name/url]
│  ✿ .ytdl [name/url]
│  ✿ .video [name/url]
│  ✿ .ytmp3 [url]
│  ✿ .ytmp4 [url]
│  ✿ .dp (get profile pic)
│  ✿ .getpp [number]
│  ✿ .vv (reply to once view)
│  ✿ .save (reply to media)
│  ✿ .facebook [url]
│  ✿ .fb [url]
│  ✿ .tiktok [url]
│  ✿ .mediafire [url]
│  ✿ .instagram [url]
│  ✿ .igdl [url]
│  ✿ .apk [app name]
│  ✿ .weather [city]
│  ✿ .sticker (reply to image)
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_download },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Utility Menu ─────────────────────────────
waqar({
    pattern: "menu_utility",
    alias: ["utility"],
    desc: "🌸 Utility commands",
    category: "menu",
    react: "🛠",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 🛠 ᴜᴛɪʟɪᴛʏ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .simdata [number]
│  ✿ .time
│  ✿ .repo
│  ✿ .owner
│  ✿ .ping
│  ✿ .alive
│  ✿ .runtime
│  ✿ .calc [expression]
│  ✿ .enc [javascript code]
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_utility },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Owner Menu ───────────────────────────────
waqar({
    pattern: "menu_owner",
    alias: ["ownermenu"],
    desc: "🌸 Owner commands",
    category: "menu",
    react: "👑",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 👑 ᴏᴡɴᴇʀ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .shutdown (restart)
│  ✿ .block / .unblock
│  ✿ .join / .leave
│  ✿ .forward <jid1,jid2,...> (reply)
│  ✿ .broadcast <message>
│  ✿ .setppbot (reply)
│  ✿ .anticall on/off
│  ✿ .autotyping on/off
│  ✿ .alwaysonline on/off
│  ✿ .autoread on/off
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_owner },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Extra Menu ───────────────────────────────
waqar({
    pattern: "menu_extra",
    alias: ["extra"],
    desc: "🌸 Extra commands",
    category: "menu",
    react: "📌",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 📌 ᴇxᴛʀᴀ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .pair [number]
│  ✿ .botstatus
│  ✿ .menu
│  ✿ .left (leave group)
│  ✿ .alive2
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_extra },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── AI Menu ──────────────────────────────────
waqar({
    pattern: "menu_ai",
    alias: ["aimenu"],
    desc: "🌸 AI commands",
    category: "menu",
    react: "🤖",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 🤖 ᴀɪ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .ai [question]
│  ✿ .gpt [question]
│  ✿ .gemini [question]
│  ✿ .dalle [prompt]
│  ✿ .remini (reply to image)
│  ✿ .aiart [prompt]
│  ✿ .text2img [prompt]
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_ai },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

// ── Stalk Menu ───────────────────────────────
waqar({
    pattern: "menu_stalk",
    alias: ["stalk"],
    desc: "🌸 Stalk commands",
    category: "menu",
    react: "👀",
    filename: __filename
}, async (waqar, mek, m, { from, reply }) => {
    const text = `
╭────────────────────◇
│  ✿ 👀 sᴛᴀʟᴋ ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ .tiktokstalk [username]
│  ✿ .instastalk [username]
│  ✿ .githubstalk [username]
│  ✿ .nowa [number]
│  ✿ .truecaller [number]
╰────────────────────○
> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
    `.trim();
    
    await waqar.sendMessage(from, {
        image: { url: CATEGORY_IMAGES.menu_stalk },
        caption: text,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: mek });
});

console.log('🌸 WAQAR WRITES - Tap to Select Menu with Image + Text Loaded! 💖');
console.log('📌 Video URLs: ${VIDEO_URLS.length} | Audio URLs: ${AUDIO_URLS.length}');
console.log('📌 Category images: ${Object.keys(CATEGORY_IMAGES).length}');
