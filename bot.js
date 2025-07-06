const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not set in the .env file.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  if (msg.checklist_tasks_done && msg.chat.type !== 'private') {
    const markedAsDone = msg.checklist_tasks_done.marked_as_done_task_ids;
    const markedAsNotDone = msg.checklist_tasks_done.marked_as_not_done_task_ids;

    if ((markedAsDone && markedAsDone.length > 0) || (markedAsNotDone && markedAsNotDone.length > 0)) {
      try {
        await bot.deleteMessage(msg.chat.id, msg.message_id);
      } catch (error) {
        console.error('Error deleting notification message:', error);
      }
    }
  }
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('Bot is running.');
