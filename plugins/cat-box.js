// ============================================
// 🌸 CATBOX UPLOADER - §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 🔥 Upload media to Catbox.moe
// ============================================

const { waqar } = require('../waqar');
const { sendInteractiveMessage } = require('gifted-btns');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const config = require('../settings');

// ============================================
// 📌 API BASE URL
// ============================================
const API_BASE = 'https://apis.davidcyriltech.my.id/uploader/catbox';

// ============================================
// 🦁 BOYS STYLE HELPERS
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

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙`;
}

// ============================================
// 📤 UPLOAD TO CATBOX COMMAND
// ============================================

waqar({
    pattern: "upload",
    alias: ["catbox", "url", "uploadfile", "uploadmedia", "tohost"],
    desc: "🌸 Upload media to Catbox.moe",
    category: "utility",
    react: "📤",
    filename: __filename
}, async (waqar, mek, m, { 
    from, 
    reply, 
    isReply, 
    quoted, 
    repliedType, 
    sender,
    text 
}) => {
    try {
        // ── Check if replying ──
        if (!isReply || !quoted) {
            return reply(girlBox('📤 CATBOX UPLOADER', [
                ['📌', 'Usage', '.upload (reply to media)'],
                ['📌', 'With Name', '.upload filename.jpg'],
                ['💖', 'Supports', 'Images, Videos, Audio, Documents'],
                ['📤', 'Host', 'catbox.moe'],
                ['👑', 'By', '§࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶']
            ]));
        }

        // ── Get quoted message ──
        const quotedMsg = quoted.msg || quoted;
        
        // ── Check media type ──
        const isImage = repliedType === 'image' || 
                        quotedMsg?.mimetype?.includes('image') ||
                        quotedMsg?.imageMessage;

        const isVideo = repliedType === 'video' || 
                        quotedMsg?.mimetype?.includes('video') ||
                        quotedMsg?.videoMessage;

        const isAudio = repliedType === 'audio' || 
                        quotedMsg?.mimetype?.includes('audio') ||
                        quotedMsg?.audioMessage;

        const isDocument = repliedType === 'document' || 
                           quotedMsg?.mimetype?.includes('application') ||
                           quotedMsg?.documentMessage;

        const isSticker = repliedType === 'sticker' || 
                          quotedMsg?.mimetype?.includes('webp') ||
                          quotedMsg?.stickerMessage;

        if (!isImage && !isVideo && !isAudio && !isDocument && !isSticker) {
            return reply(`🌸 Please reply to an image, video, audio, document, or sticker! 💕`);
        }

        // ── Get filename ──
        let fileName = text || 'upload';
        if (!path.extname(fileName)) {
            // Add extension based on type
            if (isImage) fileName += '.jpg';
            else if (isVideo) fileName += '.mp4';
            else if (isAudio) fileName += '.mp3';
            else if (isDocument) fileName += '.pdf';
            else if (isSticker) fileName += '.webp';
        }

        // ── Loading Reaction ──
        await waqar.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        // ── Download media ──
        let buffer = null;
        let mimeType = '';

        try {
            if (typeof quoted.download === 'function') {
                buffer = await quoted.download();
            } else if (mek.quoted && typeof mek.quoted.download === 'function') {
                buffer = await mek.quoted.download();
            }

            // Get mime type
            if (quotedMsg?.mimetype) {
                mimeType = quotedMsg.mimetype;
            } else if (isImage) {
                mimeType = 'image/jpeg';
            } else if (isVideo) {
                mimeType = 'video/mp4';
            } else if (isAudio) {
                mimeType = 'audio/mpeg';
            } else if (isDocument) {
                mimeType = 'application/octet-stream';
            } else if (isSticker) {
                mimeType = 'image/webp';
            }

        } catch (e) {
            console.error('[Upload] Download error:', e.message);
            return reply(`🌸 Failed to download media: ${e.message} 💕`);
        }

        if (!buffer || buffer.length === 0) {
            return reply(`🌸 Failed to download media! 💕`);
        }

        // ── Send waiting message ──
        const waitMsg = await reply(girlBox('📤 UPLOADING', [
            ['📁', 'File', fileName],
            ['📦', 'Size', `${(buffer.length / 1024).toFixed(2)} KB`],
            ['📤', 'Host', 'catbox.moe'],
            ['⏳', 'Status', 'Uploading...']
        ]));

        // ── Upload to Catbox ──
        try {
            const formData = new FormData();
            formData.append('file', buffer, {
                filename: fileName,
                contentType: mimeType
            });

            const response = await axios.post(API_BASE, formData, {
                headers: {
                    ...formData.getHeaders(),
                    'Accept': 'application/json'
                },
                timeout: 60000
            });

            const data = response.data;

            if (!data.success || !data.url) {
                return reply(`🌸 Upload failed: ${data.message || 'Unknown error'} 💕`);
            }

            const uploadUrl = data.url;

            // ── Send success with buttons ──
            const caption = boyBox('📤 UPLOAD SUCCESSFUL', [
                ['✅', 'Status', 'Uploaded successfully'],
                ['📁', 'File', fileName],
                ['📦', 'Size', `${(buffer.length / 1024).toFixed(2)} KB`],
                ['📤', 'Host', data.provider || 'catbox.moe'],
                ['🔗', 'URL', uploadUrl]
            ]);

            await sendInteractiveMessage(waqar, from, {
                text: caption,
                footer: `💖 ${config.BOT_NAME || '§࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶'}`,
                interactiveButtons: [
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📋 Copy URL',
                            copy_code: uploadUrl
                        })
                    },
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: '🌐 Open Link',
                            url: uploadUrl
                        })
                    },
                    {
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: '🔄 Upload Again',
                            id: `.upload ${fileName}`
                        })
                    }
                ]
            });

            // ── Update wait message ──
            try {
                await waqar.sendMessage(from, {
                    text: girlBox('📤 UPLOAD COMPLETE', [
                        ['✅', 'Status', 'Done!'],
                        ['🔗', 'URL', uploadUrl.length > 30 ? uploadUrl.substring(0, 30) + '...' : uploadUrl],
                        ['📤', 'Host', data.provider || 'catbox.moe']
                    ]),
                    edit: waitMsg.key
                });
            } catch (e) {}

            await waqar.sendMessage(from, { react: { text: '💖', key: mek.key } });

        } catch (uploadError) {
            console.error('[Upload] Upload error:', uploadError.message);
            
            if (uploadError.response?.status === 413) {
                return reply(`🌸 File too large! Max size limit exceeded. 💕`);
            } else if (uploadError.code === 'ECONNABORTED') {
                return reply(`🌸 Upload timeout! Please try again. 💕`);
            } else {
                return reply(`🌸 Upload failed: ${uploadError.message} 💕`);
            }
        }

    } catch (error) {
        console.error('🌸 Upload Error:', error);
        reply(`🌸 Error: ${error.message} 💕`);
        await waqar.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});

// ============================================
// 📤 UPLOAD BY URL COMMAND
// ============================================

waqar({
    pattern: "uploadurl",
    alias: ["uploadfromurl", "urlupload", "uploadlink"],
    desc: "🌸 Upload file from URL to Catbox",
    category: "utility",
    react: "🔗",
    filename: __filename
}, async (waqar, mek, m, { from, text, reply, sender }) => {
    try {
        if (!text) {
            return reply(boyBox('🔗 UPLOAD FROM URL', [
                ['📌', 'Usage', '.uploadurl <file_url>'],
                ['💖', 'Example', '.uploadurl https://example.com/image.jpg'],
                ['💖', 'Example 2', '.uploadurl https://example.com/video.mp4'],
                ['📤', 'Host', 'catbox.moe']
            ]));
        }

        // ── Validate URL ──
        const url = text.trim();
        if (!url.match(/^https?:\/\/.+/i)) {
            return reply(`🌸 Invalid URL! Please provide a valid file URL. 💕`);
        }

        // ── Loading ──
        await waqar.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        // ── Download file from URL ──
        const fileResponse = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            timeout: 60000
        });

        const buffer = Buffer.from(fileResponse.data);
        const fileName = path.basename(url) || 'upload_file';
        const mimeType = fileResponse.headers['content-type'] || 'application/octet-stream';

        // ── Send waiting ──
        await reply(girlBox('📤 UPLOADING FROM URL', [
            ['🔗', 'Source', url.length > 40 ? url.substring(0, 40) + '...' : url],
            ['📦', 'Size', `${(buffer.length / 1024).toFixed(2)} KB`],
            ['⏳', 'Status', 'Uploading...']
        ]));

        // ── Upload to Catbox ──
        const formData = new FormData();
        formData.append('file', buffer, {
            filename: fileName,
            contentType: mimeType
        });

        const response = await axios.post(API_BASE, formData, {
            headers: {
                ...formData.getHeaders(),
                'Accept': 'application/json'
            },
            timeout: 60000
        });

        const data = response.data;

        if (!data.success || !data.url) {
            return reply(`🌸 Upload failed: ${data.message || 'Unknown error'} 💕`);
        }

        const uploadUrl = data.url;

        // ── Send success ──
        await sendInteractiveMessage(waqar, from, {
            text: girlBox('📤 UPLOAD SUCCESSFUL', [
                ['✅', 'Status', 'Uploaded successfully'],
                ['🔗', 'URL', uploadUrl],
                ['📤', 'Host', data.provider || 'catbox.moe']
            ]),
            footer: `💖 ${config.BOT_NAME || '§࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶'}`,
            interactiveButtons: [
                {
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({
                        display_text: '📋 Copy URL',
                        copy_code: uploadUrl
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🌐 Open Link',
                        url: uploadUrl
                    })
                }
            ]
        });

        await waqar.sendMessage(from, { react: { text: '💖', key: mek.key } });

    } catch (error) {
        console.error('🌸 UploadURL Error:', error);
        
        if (error.code === 'ECONNABORTED') {
            reply(`🌸 Download timeout! Please try again. 💕`);
        } else if (error.response?.status === 404) {
            reply(`🌸 File not found at the provided URL! 💕`);
        } else {
            reply(`🌸 Error: ${error.message} 💕`);
        }
        
        await waqar.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});

console.log('🌸 CATBOX UPLOADER plugin loaded! 💖');
