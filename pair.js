process.on('uncaughtException', (err) => {
    console.error('Caught exception:', err);
});

const express = require('express');
const fs = require('fs');
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const router = express.Router();
const sessionDir = './session';
if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir);
}

let retryCount = 0;
const maxRetries = 10; // Number of retries
const retryInterval = 10000; // 10 seconds
const maxRetryDuration = 100000; // 100 seconds (100,000 milliseconds)

router.get('/', async (req, res) => {
    let num = req.query.number;

    async function immuPair() {
        const { state, saveCreds } = await useMultiFileAuthState(`./session`);
        try {
            let botz = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.windows("MicrosoftEdge"),

            if (!botz.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await botz.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            botz.ev.on('creds.update', saveCreds);

            botz.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === "open") {
                    console.log("Connected successfully");
                    retryCount = 0; // Reset retry count on successful connection
                    try {
                        await delay(10000);
                        const auth_path = './session/';
                        const user_jid = jidNormalizedUser(botz.user.id);

                        // Read and encode session file with Base64
                        let sessionX = fs.readFileSync(auth_path + 'creds.json');
                        let base64String = Buffer.from(sessionX).toString('base64');
                        let encodedSession = `Vinic-Xmd:~${base64String}`;
                        
                       try {
    await botz.sendMessage(botz.user.id, { text: encodedSession });
    console.log("✅ Session sent!");
} catch (err) {
    console.error("❌ Send failed:", err);
} 


                    } catch (e) {
                        console.error("Failed to send session:", e);
                        require('child_process').exec('pm2 restart IMMU'); 
                    }

          await delay(100);
          await botz.ws.close();
          await botz.end();
    fs.rmSync(sessionDir, { recursive: true, force: true });
    require('child_process').exec('pm2 restart IMMU');

                } else if (connection === "close") {
                    const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.statusCode;
                    console.log(`Disconnected! reason: ${reason}.`);

                    if (retryCount >= maxRetries) {
                        console.log(`Exiting due to max retries reached`);
                        require('child_process').exec('pm2 restart IMMU');
                    } else {
                        retryCount++;
                        console.log(`Reconnecting... Attempt ${retryCount}`);
                        setTimeout(immuPair, retryInterval);
                    }
                }
            });

        } catch (err) {
            console.error("Service restarted due to error:", err);
            fs.rmSync(sessionDir, { recursive: true, force: true });
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
            require('child_process').exec('pm2 restart IMMU');
        }
    }

    await immuPair();

    // Extend the timeout to 5 minutes
    setTimeout(() => {
        if (!res.headersSent) {
            res.status(500).json({ error: 'Process exiting due to timeout' });
            require('child_process').exec('pm2 restart IMMU'); // Force exit after 5 minutes
        }
    }, maxRetryDuration); // 5-minute delay
});

module.exports = router;
