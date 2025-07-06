# Telegram Checklist Notification Cleaner Bot

This is a Node.js Telegram bot that automatically deletes system notification messages related to checklist task updates (both "done" and "not done" tasks) in group chats.
Created with t.me/telelakel and Grok AI.

## Features

- Silently deletes Telegram system notifications for checklist tasks marked as done (`marked_as_done_task_ids`) or not done (`marked_as_not_done_task_ids`) in group chats.
- Operates only in group chats, ignoring private chats.
- Logs errors to the console without sending messages to the chat.

## Prerequisites

- Node.js (version 14 or higher recommended)
- A Telegram bot token obtained from BotFather
- Admin permissions for the bot in the target Telegram group, including the "Delete Messages" permission

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/telelakel/Checklist-Remove-Notifications.git
   cd Checklist-Remove-Notifications
   ```

2. Install the required dependencies:

   ```bash
   npm install node-telegram-bot-api dotenv
   ```

3. Create a `.env` file in the project root and add your bot token:

   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

4. Run the bot:

   ```bash
   node bot.js
   ```

## Usage

1. Add the bot to a Telegram group and grant it admin permissions with the ability to delete messages.
2. The bot will automatically and silently delete system notifications for checklist task updates in the group chat.

## Code Overview

The bot uses the `node-telegram-bot-api` library to interact with the Telegram API and `dotenv` to load the bot token from a `.env` file. It listens for messages containing `checklist_tasks_done` and deletes them if they include `marked_as_done_task_ids` or `marked_as_not_done_task_ids` in group chats.

### Key Logic

- Loads the bot token from the `TELEGRAM_BOT_TOKEN` environment variable.
- Checks for `msg.checklist_tasks_done` and ensures the chat is not private (`msg.chat.type !== 'private'`).
- Deletes the notification message (`msg.message_id`) if it contains task updates.
- Logs any errors to the console silently.

## Requirements

- **Bot Permissions**: The bot must be an admin in the group with the "Delete Messages" permission.
- **Group Context**: The bot only processes checklist update notifications in group chats.
- **Environment Variable**: The `TELEGRAM_BOT_TOKEN` must be set in the `.env` file.

## Notes

- The bot does not modify or delete the original checklist messages, only the system notifications about task updates.
- If the bot lacks permissions to delete messages, it will fail silently, and errors will be logged to the console.
- Keep the Telegram bot token secure and do not expose it in the repository. Use the `.env` file to store it.
