// ============================================
// 🌸 MSG INSPECT - §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 🔍 Inspect quoted message structure
// ============================================

const { waqar } = require('../waqar');
const config = require('../settings');

// ============================================
// 🎀 GIRL STYLE HELPERS
// ============================================

function girlBox(title, rows) {
    const body = rows.map(([emoji, label, value]) => 
        `│  ✿ ${emoji} ${label}: ${value || ''}`
    ).join('\n');
    return `
╭────────────────────◇
│  ✿ ${title} ✿
│  ✌︎㋡━━━━━━━━━✌︎㋡
${body}
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
`;
}

// ============================================
// 🔍 MSG INSPECT COMMAND
// ============================================

waqar({
    pattern: "inspect",
    alias: ["msginspect", "evalmsg", "msgstruct", "debugmsg"],
    desc: "🔍 Inspect quoted message structure",
    category: "owner",
    react: "🔍",
    filename: __filename
}, async (waqar, mek, m, { 
    from, 
    reply, 
    isOwner, 
    isCreator,
    isReply,
    quoted,
    quotedMessage,
    repliedType,
    sender
}) => {
    try {
        // 👑 Only Owner can use
        if (!isOwner && !isCreator) {
            return reply(`🌸 Only my Waqar writes can use this! 🦁💖`);
        }

        // ── Check if replying ──
        if (!isReply || !quoted) {
            return reply(girlBox('🔍 MSG INSPECT HELP', [
                ['📌', 'Usage', '.inspect (reply to message)'],
                ['💖', 'Example', 'Reply to any message with .inspect'],
                ['📋', 'Shows', 'Message structure, type, sender'],
                ['🔍', 'Use', 'Debugging message objects'],
                ['👑', 'By', '§࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶']
            ]));
        }

        // ── Loading ──
        await waqar.sendMessage(from, { react: { text: '🔍', key: mek.key } });

        // ── Get quoted message data ──
        const quotedMsg = quoted.msg || quoted;
        const chatJid = from;
        const senderNum = (sender || '').split('@')[0];

        // ── Get message structure ──
        let msgStructure = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
                          mek.message?.imageMessage?.contextInfo?.quotedMessage ||
                          mek.message?.videoMessage?.contextInfo?.quotedMessage ||
                          mek.message?.audioMessage?.contextInfo?.quotedMessage ||
                          mek.message?.documentMessage?.contextInfo?.quotedMessage ||
                          quotedMsg || {};

        // ── Detect message type ──
        let realType = repliedType || 'unknown';

        // ── Handle viewOnce ──
        if (msgStructure?.viewOnceMessage?.message) {
            msgStructure = msgStructure.viewOnceMessage.message;
            realType = 'viewOnceMessage';
        }

        // ── Handle documentWithCaption ──
        if (msgStructure?.documentWithCaptionMessage?.message) {
            msgStructure = msgStructure.documentWithCaptionMessage.message;
            realType = 'documentWithCaptionMessage';
        }

        // ── Handle poll message ──
        if (msgStructure?.pollCreationMessageV3) {
            realType = 'pollCreationMessageV3';
        }

        // ── Detect real type from object keys ──
        if (msgStructure && typeof msgStructure === 'object') {
            const keys = Object.keys(msgStructure);
            for (const key of keys) {
                if (key !== 'contextInfo' && key !== 'messageContextInfo') {
                    realType = key;
                    break;
                }
            }
        }

        // ── Build code output ──
        let finalCodeOutput = '';
        let prettyStructure = '';

        try {
            prettyStructure = JSON.stringify(msgStructure, null, 2);
        } catch (e) {
            prettyStructure = String(msgStructure);
        }

        // ── Build response ──
        const infoText = girlBox('🔍 MSG INSPECT RESULT', [
            ['📋', 'Type', realType],
            ['👤', 'Sender', senderNum || 'unknown'],
            ['💬', 'Chat', chatJid.substring(0, 15) + '...'],
            ['📊', 'Keys', Object.keys(msgStructure).length || 0],
            ['📦', 'Size', `${(JSON.stringify(msgStructure).length / 1024).toFixed(2)} KB`]
        ]);

        // ── Send structure as code block ──
        const codeBlock = `\`\`\`json\n${prettyStructure.substring(0, 1500)}\n\`\`\``;

        // ── Check if structure is too long ──
        let responseText = infoText + '\n\n📋 *Message Structure:*\n' + codeBlock;

        if (prettyStructure.length > 1500) {
            responseText += '\n\n⚠️ *Structure too long! Showing first 1500 characters.*';
        }

        // ── Send response ──
        await reply(responseText);

        // ── Send code for execution (if owner) ──
        if (isOwner || isCreator) {
            const execCode = `// ── Message Structure ──\nconst msg = ${prettyStructure};\n\n// ── Send similar message ──\nawait conn.relayMessage(m.chat, msg, { messageId: "INSPECT-" + Date.now() });`;

            await waqar.sendMessage(from, {
                document: Buffer.from(execCode, 'utf-8'),
                mimetype: 'text/javascript',
                fileName: `inspect_${Date.now()}.js`,
                caption: `📋 *Inspect Code*\n💖 Copy and use in your code`
            }, { quoted: mek });
        }

        await waqar.sendMessage(from, { react: { text: '💖', key: mek.key } });

    } catch (error) {
        console.error('🌸 Inspect Error:', error);
        reply(`🌸 Error: ${error.message} 💕`);
        await waqar.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});

// ============================================
// 📊 MSG INSPECT SHORT
// ============================================

waqar({
    pattern: "msgtype",
    alias: ["type", "msgtype"],
    desc: "🔍 Show message type only",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (waqar, mek, m, { 
    from, 
    reply, 
    isOwner, 
    isCreator,
    isReply,
    quoted,
    repliedType,
    sender 
}) => {
    try {
        if (!isOwner && !isCreator) {
            return reply(`🌸 Only my Waqar writes can use this! 🦁💖`);
        }

        if (!isReply || !quoted) {
            return reply(`🌸 Reply to a message with .msgtype 💕`);
        }

        const quotedMsg = quoted.msg || quoted;
        const senderNum = (sender || '').split('@')[0];

        let msgStructure = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
                          mek.message?.imageMessage?.contextInfo?.quotedMessage ||
                          mek.message?.videoMessage?.contextInfo?.quotedMessage ||
                          quotedMsg || {};

        // ── Detect real type ──
        let realType = repliedType || 'unknown';

        if (msgStructure?.viewOnceMessage?.message) {
            realType = 'viewOnceMessage';
        }
        if (msgStructure?.documentWithCaptionMessage?.message) {
            realType = 'documentWithCaptionMessage';
        }
        if (msgStructure?.pollCreationMessageV3) {
            realType = 'pollCreationMessageV3';
        }

        if (msgStructure && typeof msgStructure === 'object') {
            const keys = Object.keys(msgStructure);
            for (const key of keys) {
                if (key !== 'contextInfo' && key !== 'messageContextInfo') {
                    realType = key;
                    break;
                }
            }
        }

        const response = girlBox('📋 MSG TYPE', [
            ['📋', 'Type', realType],
            ['👤', 'Sender', senderNum || 'unknown'],
            ['📊', 'Keys', Object.keys(msgStructure).length || 0]
        ]);

        await reply(response);

    } catch (error) {
        console.error('🌸 MsgType Error:', error);
        reply(`🌸 Error: ${error.message} 💕`);
    }
});

console.log('🌸 MSG INSPECT plugin loaded! 💖');
