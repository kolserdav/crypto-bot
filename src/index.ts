import dotenv from 'dotenv';
dotenv.config();
import Bot from './Bot';

// Start bot
new Bot();
console.info(`<${Date()}> Bot started!`)

