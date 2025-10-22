const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Horlapookie,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function Horlapookie_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Horlapookie = Horlapookie({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_Horlapookie.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Horlapookie.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Horlapookie.ev.on('creds.update', saveCreds);
            Pair_Code_By_Horlapookie.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Horlapookie.sendMessage(Pair_Code_By_Horlapookie.user.id, { text: 'Vinic-Xmd~' + b64data });

                    let Star_MD_TEXT = `

╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─ 
╎   『 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 』   
╎  ✦ ᴠɪɴɪᴄ xᴍᴅ sᴇssɪᴏɴ
╎  ✦  ʙʏ Kelvin Tech ̸*
╰╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴

> ▌   『 🔐 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 』   
> ▌  • Session ID:  
> ▌  ⛔ [ Please set your SESSION_ID in setting.js ] 

╔═════◇
║        『••• OWNER INFO •••』
║ ❒ Telegram: https://youtube.com/@delostvoyage?si=THjP91AT9TNCHZIJ

║ ❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/25675558536969_

║ ❒ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: _https://wa.me/channel/0029Vb6eR1r05MUgYul6Pc2W
> fork the following repo
║ ❒ Repo 2: _https://github.com/Kevintech-hub/Vinic-Xmd-
╚════════════════════╝ 
 *Kelvin Tech*
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   𝐄𝐍𝐉𝐎𝐘 ᴠɪɴɪᴄ xᴍᴅ ᵇᵒᵗ
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
______________________________
❁ [ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!] ❁
`;

                    await Pair_Code_By_Horlapookie.sendMessage(Pair_Code_By_Horlapookie.user.id, { text: Star_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Horlapookie.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Horlapookie_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await Horlapookie_PAIR_CODE();
});

module.exports = router;
