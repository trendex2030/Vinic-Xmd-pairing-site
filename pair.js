const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Kevin_Terri,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function Vinic_Xmd_Pair_Code() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Kevin_Terri = Kevin_Terri({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "silva", "Mac OS"]
             });
             if(!Pair_Code_By_Kevin_Terri.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Kevin_Terri.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Kevin_Terri.ev.on('creds.update', saveCreds)
            Pair_Code_By_Kevin_Terri.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Kevin_Terri.sendMessage(Pair_Code_By_Kevin_Terri.user.id, { text: 'Vinic-Xmd~' + b64data });

               let Vinic_Xmd_TEXT = `
*Vinic-Xmd awesome bot*
*you have used pairing method*
> YOU HAVE SUCCESSFULLY COMPLETED YOUR FIRST STEP
> NOW COPY THE SESSION CODE ABOVE AND USE IT IN YOUR PREFERED DEPLOYING SITE
____________________________________
╔════◇
║『 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍』

║ ❒ Kelvin Tech: _https://wa.me/256755585369_

╚════════════════════❒
╔═════◇
║ 『••• OWNER INFO •••』
║ 

║ ❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/254700143167_

║ ❒ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: _https://whatsapp.com/channel/0029Vb6eR1r05MUgYul6Pc2W_
> fork the following repo
║ ❒ Repo:  _https://github.com/Kevintech-hub/Vinic-Xmd-_
║ 
╚════════════════════╝ 
 *Kevin Tech*
___________________________

'_Don't Forget To Give Star To My Repo_`
 await Pair_Code_By_Kevin_Terri.sendMessage(Pair_Code_By_Kevin_Terri.user.id,{text:Vinic_Xmd_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Kevin_Terri.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Vinic_Xmd_Pair_Code();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await Vinic_Xmd_Pair_Code()
});
module.exports = router
