const { cmd } = require("../command");

const config = require("../config");

const fs = require("fs");

const path = require("path");

// Path to config.js

const configPath = path.join(__dirname, "../config.js");

cmd(

  {

    pattern: "settings",

    desc: "බොට් එකේ සැකසුම් බටන් සමඟ පෙන්වයි",

    category: "general",

    react: "⚙️",

    filename: __filename,

  },

  async (sock, mek, m, { reply, isOwner, from }) => {

    try {

      // බොට් හිමිකරුට පමණයි

      if (!isOwner) {

        return await reply("❌ මෙම කමාන්ඩ් එක බොට් හිමිකරුට පමණයි!");

      }

      // සැකසුම් පෙන්වීම ෆෝමැට් කරන්න

      const settings = `

⚙️ *MANJU_MD බොට් සැකසුම්* ⚙️

*ප්‍රිෆික්ස්*: ${config.PREFIX}

*හිමිකරුගේ අංකය*: ${config.OWNER_NUM}

*මෝඩ්*: ${config.MODE} (බටන් භාවිතා කර toggle කරන්න)

*සෙෂන් ID*: ${config.SESSION_ID ? "සකසා ඇත" : "සකසා නැත"}

*ඕටෝ බයෝ*: ${config.AUTO_BIO === "true" ? "සක්‍රියයි" : "අක්‍රියයි"}

*ඕටෝ රීඩ්*: ${config.AUTO_READ === "true" ? "සක්‍රියයි" : "අක්‍රියයි"}

*ඕටෝ ටයිපින්*: ${config.AUTO_TYPING === "true" ? "සක්‍රියයි" : "අක්‍රියයි"}

*ඕටෝ රෙකෝඩින්*: ${config.AUTO_RECORDING === "true" ? "සක්‍රියයි" : "අක්‍රියයි"}

*ඇන්ටි-කෝල්*: ${config.ANTICALL === "true" ? "සක්‍රියයි" : "අක්‍රියයි"}

*ඇලයිව් පණිවිඩය*: ${config.ALIVE_MSG.slice(0, 50)}... (සම්පූර්ණ බැලීමට .alive භාවිතා කරන්න)

*ඇලයිව් රූපය*: ${config.ALIVE_IMG ? "සකසා ඇත" : "සකසා නැත"}

📝 *සටහන*: පහත බටන් භාවිතා කර සැකසුම් toggle කරන්න.

`;

      // බටන් සකස් කරන්න

      const buttons = [

        // මෝඩ් ටොගල් බටන්

        {

          buttonId: "toggle_mode_public",

          buttonText: { displayText: config.MODE === "public" ? "🔄 මෝඩ්: ප්‍රයිවට් කරන්න" : "🔄 මෝඩ්: පබ්ලික් කරන්න" },

          type: 1,

        },

        // ඕටෝ බයෝ ටොගල් බටන්

        {

          buttonId: "toggle_auto_bio",

          buttonText: { displayText: config.AUTO_BIO === "true" ? "❌ ඕටෝ බයෝ අක්‍රිය කරන්න" : "✅ ඕටෝ බයෝ සක්‍රිය කරන්න" },

          type: 1,

        },

        // ඕටෝ රීඩ් ටොගල් බටන්

        {

          buttonId: "toggle_auto_read",

          buttonText: { displayText: config.AUTO_READ === "true" ? "❌ ඕටෝ රීඩ් අක්‍රිය කරන්න" : "✅ ඕටෝ රීඩ් සක්‍රිය කරන්න" },

          type: 1,

        },

        // ඕටෝ ටයිපින් ටොගල් බටන්

        {

          buttonId: "toggle_auto_typing",

          buttonText: { displayText: config.AUTO_TYPING === "true" ? "❌ ඕටෝ ටයිපින් අක්‍රිය කරන්න" : "✅ ඕටෝ ටයිපින් සක්‍රිය කරන්න" },

          type: 1,

        },

        // ඕටෝ රෙකෝඩින් ටොගල් බටන්

        {

          buttonId: "toggle_auto_recording",

          buttonText: { displayText: config.AUTO_RECORDING === "true" ? "❌ ඕටෝ රෙකෝඩින් අක්‍රිය කරන්න" : "✅ ඕටෝ රෙකෝඩින් සක්‍රිය කරන්න" },

          type: 1,

        },

        // ඇන්ටි-කෝල් ටොගල් බටන්

        {

          buttonId: "toggle_anti_call",

          buttonText: { displayText: config.ANTICALL === "true" ? "❌ ඇන්ටි-කෝල් අක්‍රිය කරන්න" : "✅ ඇන්ටි-කෝල් සක්‍රිය කරන්න" },

          type: 1,

        },

      ];

      // Baileys නවතම අනුවාදයට ගැලපෙන බටන් පණිවිඩයක් යවන්න

      await sock.sendMessage(from, {

        text: settings,

        buttons: buttons,

        headerType: 1,

        footer: "MANJU_MD බොට්",

      }, { quoted: mek });

    } catch (e) {

      console.error("❌ Settings කමාන්ඩ් එකේ දෝෂයක්:", e);

      await reply("❌ සැකසුම් ගන්න ගිය වෙලේ දෝෂයක් ඇති වුණා.");

    }

  }

);

// බටන් clicks හසුරුවන්න

cmd(

  {

    pattern: "toggle_",

    desc: "සැකසුම් ටොගල් බටන් clicks හසුරුවයි",

    dontAddCommandList: true, // කමාන්ඩ් ලිස්ට් එකට එකතු කරන්න එපා

    filename: __filename,

  },

  async (sock, mek, m, { reply, isOwner, from }) => {

    try {

      // බොට් හිමිකරුට පමණයි

      if (!isOwner) {

        return await reply("❌ සැකසුම් ටොගල් කිරීමට බොට් හිමිකරුට පමණයි!");

      }

      // බටන් ID ගන්න

      const buttonMessage = mek.message?.buttonsResponseMessage;

      if (!buttonMessage) return;

      const buttonId = buttonMessage.selectedButtonId;

      if (!buttonId) return;

      // වත්මන් config ලෝඩ් කරන්න

      let newConfig = { ...config };

      // බටන් ID අනුව ටොගල් කරන්න

      if (buttonId === "toggle_mode_public") {

        newConfig.MODE = newConfig.MODE === "public" ? "private" : "public";

        await reply(`✅ මෝඩ් ${newConfig.MODE} ලෙස සකසා ඇත!`);

      } else if (buttonId === "toggle_auto_bio") {

        newConfig.AUTO_BIO = newConfig.AUTO_BIO === "true" ? "false" : "true";

        await reply(`✅ ඕටෝ බයෝ ${newConfig.AUTO_BIO === "true" ? "සක්‍රිය" : "අක්‍රිය"} කරන ලදී!`);

      } else if (buttonId === "toggle_auto_read") {

        newConfig.AUTO_READ = newConfig.AUTO_READ === "true" ? "false" : "true";

        await reply(`✅ ඕටෝ රීඩ් ${newConfig.AUTO_READ === "true" ? "සක්‍රිය" : "අක්‍රිය"} කරන ලදී!`);

      } else if (buttonId === "toggle_auto_typing") {

        newConfig.AUTO_TYPING = newConfig.AUTO_TYPING === "true" ? "false" : "true";

        await reply(`✅ ඕටෝ ටයිපින් ${newConfig.AUTO_TYPING === "true" ? "සක්‍රිය" : "අක්‍රිය"} කරන ලදී!`);

      } else if (buttonId === "toggle_auto_recording") {

        newConfig.AUTO_RECORDING = newConfig.AUTO_RECORDING === "true" ? "false" : "true";

        await reply(`✅ ඕටෝ රෙකෝඩින් ${newConfig.AUTO_RECORDING === "true" ? "සක්‍රිය" : "අක්‍රිය"} කරන ලදී!`);

      } else if (buttonId === "toggle_anti_call") {

        newConfig.ANTICALL = newConfig.ANTICALL === "true" ? "false" : "true";

        await reply(`✅ ඇන්ටි-කෝල් ${newConfig.ANTICALL === "true" ? "සක්‍රිය" : "අක්‍රිය"} කරන ලදී!`);

      } else {

        return await reply("❌ වලංගු නොවන බටන් ක්‍රියාවක්!");

      }

      // config.js ෆයිල් එක යාවත්කාල කරන්න

      const configContent = `module.exports = ${JSON.stringify(newConfig, null, 2)};`;

      fs.writeFileSync(configPath, configContent);

      // Config යාවත්කාල කරන්න

      delete require.cache[require.resolve("../config")];

      Object.assign(config, newConfig);

      // වෙනස්කම් තහවුරු කරන්න

      await reply("✅ සැකසුම් යාවත්කාල කරන ලදී! වෙනස්කම් බලන්න .settings යළි ධාවනය කරන්න.");

    } catch (e) {

      console.error("❌ සැකසුම් ටොගල් කිරීමේ දෝෂයක්:", e);

      await reply("❌ සැකසුම් ටොගල් කිරීමේදී දෝෂයක් ඇති වුණා.");

    }

  }

);