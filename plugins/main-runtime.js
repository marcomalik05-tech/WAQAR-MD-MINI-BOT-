// ============================================
// 🕐 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 MINI - RUNTIME WITH BUTTONS
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 🔥 EXACT SAME STYLE AS MENU
// 💖 Interactive Buttons + Single Select
// ============================================

const { waqar, commands } = require('../waqar');
const { sendInteractiveMessage } = require('gifted-btns');
const moment = require('moment-timezone');
const config = require('../config');

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

// ============================================
// 🕐 RUNTIME COMMAND - WITH GIFTED-BTNS
// ============================================
waqar({
    pattern: "runtime",
    alias: ["uptime", "alive", "status", "botinfo", "ping"],
    desc: "🕐 Check bot runtime and status with buttons",
    category: "main",
    react: "🕐",
    filename: __filename
}, async (waqar, mek, m, { from, reply, pushname }) => {
    try {
        // ── Reactions ──────────────────────────────────────────
        const reactions = ['⏳', '🔄', '✅'];
        for (const emoji of reactions) {
            await waqar.sendMessage(from, { react: { text: emoji, key: mek.key } }).catch(() => {});
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // ── Stats ──────────────────────────────────────────────
        const totalCommands = commands ? commands.length : 0;
        const uptime = formatUptime(process.uptime());
        const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const botName = config.BOT_NAME || "💕⃝🕊️ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💕⃝🕊️";
        const ownerName = config.OWNER_NAME || "ᴹᴿMALIK-ᴍD ";
        const prefix = config.PREFIX || ".";
        const pushName = pushname || 'User';
        const pakTime = moment().tz('Asia/Karachi').format('hh:mm:ss A');
        const pakDate = moment().tz('Asia/Karachi').format('DD/MM/YYYY');
        const greeting = getGreeting();

        // ── Build Text ─────────────────────────────────────────
        const text = `
╭────────────────────◇
│ 💕⃝🕊️ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💕⃝🕊️
│  ㋡━━━━━━━━━━━━━━━㋡
│ ❦ 👤 User: ${pushName}
│ ❦ 👑 Owner: ${ownerName}
│ ❦ ⏰ Time: ${pakTime}
│ ❦ 📅 Date: ${pakDate}
│ ❦ ⏳ Uptime: ${uptime}
│ ❦ 📊 Commands: ${totalCommands}
│ ❦ 💾 Memory: ${memory} MB
│ ❦ 🔧 Prefix: ${prefix}
│ ❦ 🌟 ${greeting}
╰────────────────────○

💖 *Tap a button below for quick actions*
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

        // ── SEND WITH GIFTED-BTNS ─────────────────────────────
        await sendInteractiveMessage(waqar, from, {
            text: text,
            footer: `💖 ${botName} | ${uptime}`,
            interactiveButtons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🔖 ᴛᴀᴘ ᴛᴏ ᴏᴘᴇɴ ᴍᴇɴᴜ 💻',
                        sections: [{
                            title: '📌 Qᴜɪᴄᴋ Aᴄᴛɪᴏɴs',
                            highlight_label: '🔍 sᴇʟᴇᴄᴛ',
                            rows: [
                                {
                                    title: '📜 ᴏᴘᴇɴ ᴍᴇɴᴜ',
                                    description: 'View all commands with categories',
                                    id: 'menu'
                                },
                                {
                                    title: '🕐 ʀᴇғʀᴇsʜ sᴛᴀᴛᴜs',
                                    description: 'Update runtime information',
                                    id: 'runtime'
                                },
                                {
                                    title: '👑 ᴏᴡɴᴇʀ ɪɴғᴏ',
                                    description: 'Contact bot owner',
                                    id: 'owner'
                                },
                                {
                                    title: '🚀 ᴘɪɴɢ',
                                    description: 'Check bot latency',
                                    id: 'ping'
                                }
                            ]
                        }]
                    })
                },
                // ── Quick Reply Buttons ──────────────────────────
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🚀 Ping',
                        id: `${prefix}ping`
                    })
                },
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '👑 Owner',
                        id: `${prefix}owner`
                    })
                },
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '📜 Menu',
                        id: `${prefix}menu`
                    })
                },
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🕐 Refresh',
                        id: `${prefix}runtime`
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

        // ── LISTENER FOR SINGLE SELECT ─────────────────────────
        const menuHandler = async (update) => {
            const incoming = update.messages?.[0];
            if (!incoming?.message || incoming.key.remoteJid !== from) return;

            const msg = incoming.message;
            let selectedId = null;

            if (msg.listResponseMessage?.singleSelectReply?.selectedRowId) {
                selectedId = msg.listResponseMessage.singleSelectReply.selectedRowId;
            }

            if (!selectedId) return;

            waqar.ev.off("messages.upsert", menuHandler);

            if (selectedId === 'menu') {
                await waqar.sendMessage(from, {
                    text: `📜 *Opening Menu...*\n\nType \`${prefix}menu\` to see full menu.`
                }, { quoted: incoming });
            } else if (selectedId === 'runtime') {
                await waqar.sendMessage(from, {
                    text: `🕐 *Refreshing...*\n\n⏳ Uptime: ${uptime}\n🕰️ Time: ${pakTime}\n📅 Date: ${pakDate}`
                }, { quoted: incoming });
            } else if (selectedId === 'owner') {
                await waqar.sendMessage(from, {
                    text: `👑 *Owner Info*\n\n📱 Number: 923293245445\n💖 Name: Waqar writes-ᴍᴅ`
                }, { quoted: incoming });
            } else if (selectedId === 'ping') {
                const start = Date.now();
                await waqar.sendMessage(from, { text: '🏓 Pinging...' }, { quoted: incoming });
                const latency = Date.now() - start;
                await waqar.sendMessage(from, {
                    text: `🏓 *Pong!*\n\n⚡ Latency: ${latency}ms\n⏱️ Uptime: ${uptime}`
                }, { quoted: incoming });
            }
        };

        waqar.ev.on("messages.upsert", menuHandler);
        setTimeout(() => waqar.ev.off("messages.upsert", menuHandler), 60000);

        // ── Reaction ───────────────────────────────────────────
        await waqar.sendMessage(from, { react: { text: '💖', key: mek.key } });

    } catch (error) {
        console.error('🕐 Runtime Error:', error);
        
        // ── Fallback: Simple message ──────────────────────────
        try {
            const uptime = formatUptime(process.uptime());
            const pakTime = moment().tz('Asia/Karachi').format('hh:mm:ss A');
            const botName = config.BOT_NAME || "🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🌸";
            
            const fallbackText = `
╭────────────────────◇
│ 💕⃝🕊️ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💕⃝🕊️
│  ㋡━━━━━━━━━━━━━━━㋡
│  ✿ ⏳ Uptime: ${uptime}
│  ✿ 🕰️ Time: ${pakTime}
│  ✿ 📊 Commands: ${commands ? commands.length : 0}
│  ✿ 📌 Prefix: ${config.PREFIX || '.'}
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐`;
            await reply(fallbackText);
        } catch (fallbackError) {
            await reply(`🕐 Error loading runtime: ${error.message} 💕`);
        }
    }
});

console.log('🕐 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶- Runtime with Gifted Buttons Loaded! 💖');
