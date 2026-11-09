// Auto-follow channel (clean implementation, no obfuscated code)
const config = require('../settings');

async function marcomalikmd(conn) {
    if (String(config.AUTO_FOLLOW_CHANNEL).toLowerCase() !== 'true') return;
    const ids = [config.CHANNEL_JID, ...(Array.isArray(config.CHANNEL_IDS) ? config.CHANNEL_IDS : [])]
        .filter(j => typeof j === 'string' && j.endsWith('@newsletter'));
    for (const jid of [...new Set(ids)]) {
        try { await conn.newsletterFollow(jid); }
        catch (e) { console.error('[Channel] follow failed for', jid, '-', e.message); }
    }
}

module.exports = { marcomalikmd };
