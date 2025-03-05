require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });
let current = 0;

const names = ["Nhật", "Thiện","Chung", "Hải Anh" ];

const sendReminder = (current) => {
  const name = names[current];
  const message = `🔔 Nhắc nhở: Hôm nay đến lượt **${name}** lau nhà! 🧹🧼`;
  bot.sendMessage(CHAT_ID, message, { parse_mode: "Markdown" });
};

cron.schedule(
  "00 30 19 * * *",
  () => {
    console.log("Đang gửi tin nhắn nhắc nhở...");
    if(current ===3) {
        current = 0;
    }
    sendReminder(current);
    current++;
  },
  {
    timezone: "Asia/Ho_Chi_Minh",
  }
);

console.log("Bot Telegram đã chạy...");