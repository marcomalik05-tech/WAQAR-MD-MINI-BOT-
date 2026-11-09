const { waqar } = require('../waqar');
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'courses.json');

function load() {
    try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return []; }
}

waqar({
    pattern: 'pdf',
    alias: ['pdfurl', 'pdfsettings'],
    desc: 'Course link finder: .pdf <course name> | .pdf settings',
    category: 'tools',
    react: '📚',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    const query = (q || '').trim().toLowerCase();
    if (!query || query === 'settings') {
        return reply('📚 *PDF COMMANDS*\n\n• .pdf settings - ye list\n• .pdf <course name> - course ka link\n• .pdf list - saare course names');
    }
    const list = load();
    if (query === 'list') {
        return reply(list.length ? list.map((c, i) => `${i + 1}. ${c.name}`).join('\n') : 'Abhi koi course add nahi hai.');
    }
    const hits = list.filter(c => c.name.toLowerCase().includes(query)).slice(0, 5);
    if (!hits.length) return reply('❌ Is naam ka course nahi mila. .pdf list try karein.');
    return reply(hits.map(c => `📘 *${c.name}*\n${c.url}`).join('\n\n'));
});
