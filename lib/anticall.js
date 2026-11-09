// ============================================
// 🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 ANTI-CALL HANDLER
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 🔥 Auto reject incoming calls
// ============================================

const config = require('../settings');

/**
 * 📵 Register Anti-Call handler
 * @param {Object} sock - WhatsApp socket
 */
function registerAntiCall(sock) {
    if (!sock) return;

    sock.ev.on('call', async (calls) => {
        try {
            // ── Check if anti-call is enabled ──
            if (config.ANTI_CALL !== 'true') return;

            for (const call of calls) {
                if (call.status !== 'offer') continue;

                // ── Reject call ──
                try {
                    await sock.rejectCall(call.id, call.from);
                    console.log(`[AntiCall] Rejected call from ${call.from}`);
                } catch (e) {
                    console.error('[AntiCall] Reject error:', e.message);
                }

                // ── Send rejection message ──
                const rejectMsg = config.REJECT_MSG || '📵 Call rejected by bot';
                try {
                    await sock.sendMessage(call.from, {
                        text: `
╭────────────────────◇
│  ✿ 📵 Cᴀʟʟ Rᴇᴊᴇᴄᴛᴇᴅ ✿
│  ✌︎㋡━━━━━━━━━✌︎㋡
│  ✿ ${rejectMsg}
│  ✿ 💡 Bot is in anti-call mode
│  ✿ 👑 WAQAR WRITES & MARCO MALIK
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
`.trim()
                    });
                } catch (e) {
                    console.error('[AntiCall] Message error:', e.message);
                }
            }
        } catch (error) {
            console.error('[AntiCall] Error:', error.message);
        }
    });

    console.log('📵 ANTI-CALL handler registered!');
}

module.exports = { registerAntiCall };
