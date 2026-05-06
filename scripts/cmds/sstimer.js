const moment = require("moment-timezone");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "sstimer",
  version: "6.1",
  role: 0,
  author: "ꜰᴀʀʜᴀɴ-ᴋʜᴀɴ",
  description: "SS Time Announcement",
  category: "AutoTime",
  countDown: 3,
};

module.exports.onLoad = async function ({ api }) {

  const targetTime = "08:30 PM"; // ⏰ এখানে টাইম সেট করো

  const imageUrl = "https://i.imgur.com/BJu6JNZ.jpeg";

  const message =
`༐༐ꓸ⃟༐༐ 𝐀𝐒𝐒𝐀𝐋𝐀𝐌𝐔𝐀𝐋𝐀𝐘𝐊𝐔𝐌 ༐༐ꓸ⃟༐༐
━━━━━━━━━━━━━━━━━━━━━━━
••═╬🔥𝐏𝐑𝐄𝐌✦🌻IK🔥✦𝐏𝐀KHI🔥✦🅰𝐋𝐋🔥✦MUSIC✦🌻BAND🔥╬═••࿐
━━━━━━━━━━━━━━━━━━━━━━━
📢 𝐒𝐒 𝐓𝐈𝐌𝐄 𝐀𝐍𝐍𝐎𝐔𝐍𝐂𝐄𝐌𝐄𝐍𝐓
━━━━━━━━━━━━━━━━━━━━━━━
⏰ 𝐓𝐈𝐌𝐄:
👉 রাত 8:30 PM ➜ 9:30 PM 💯
━━━━━━━━━━━━━━━━━━━━━━━
🔰 𝐈𝐌𝐏𝐎𝐑𝐓𝐀𝐍𝐓 𝐑𝐔𝐋𝐄𝐒
━━━━━━━━━━━━━━━━━━━━━━━
✔ সবাইকে অবশ্যই কলে থাকতে হবে  
✔ সময়মতো উপস্থিত থাকা বাধ্যতামূলক  
✔ SS TIME এ সবাই অ্যাকটিভ থাকতে হবে
━━━━━━━━━━━━━━━━━━━━━━━
🚫 𝐒𝐓𝐑𝐈𝐂𝐓 𝐖𝐀𝐑𝐍𝐈𝐍𝐆
━━━━━━━━━━━━━━━━━━━━━━━
❌ এই সময়ে কোনো SMS করা যাবে না  
⛔ SMS করলে সরাসরি রিমুভ করা হবে  
💥 Admin সিদ্ধান্তই ফাইনাল  
━━━━━━━━━━━━━━━━━━━━━━━
👑 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓 𝐓𝐄𝐀𝐌
━━━━━━━━━━━━━━━━━━━━━━━
📌 সব সিদ্ধান্ত Admin Team এর অধীনে  
⚠️ নিয়ম না মানলে ব্যবস্থা নেওয়া হবে  
━━━━━━━━━━━━━━━━━━━━━━━
╔╦═══════════════════╦╗
❤️ 𝐀𝐋𝐋 𝐂𝐑𝐄𝐀𝐓𝐎𝐑 ❤️  
❤️⚘ཻ͜͡♡ 𝐑𝐀𝐅𝐒𝐀𝐍 ♡⚘͜͡❤️  
╚╩═══════════════════╩╝`;

  const cacheDir = path.join(__dirname, "cache");
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

  if (!global.__sentMap) global.__sentMap = {};

  const checkTimeAndSend = async () => {
    const now = moment().tz("Asia/Dhaka").format("hh:mm A");
    if (now !== targetTime) return;

    const imagePath = path.join(cacheDir, "ss.jpg");

    if (!fs.existsSync(imagePath)) {
      try {
        const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(imagePath, Buffer.from(res.data));
      } catch (e) {
        console.log("Image download error");
        return;
      }
    }

    try {
      const threads = await api.getThreadList(1000, null, ["INBOX"]);
      const groups = threads.filter(t => t.isGroup);

      for (const thread of groups) {
        const key = `${thread.threadID}_${now}`;
        if (global.__sentMap[key]) continue;

        global.__sentMap[key] = true;

        api.sendMessage({
          body: message,
          attachment: fs.createReadStream(imagePath)
        }, thread.threadID);
      }

      console.log("✅ SS Announcement Sent");

    } catch (err) {
      console.error(err);
    }
  };

  setInterval(checkTimeAndSend, 60000);
};

module.exports.onStart = () => {};
