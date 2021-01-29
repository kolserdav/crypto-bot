import * as telegraf from 'telegraf';
import * as T from '../types';
import Request from './Request';

const { env }: any = process;
const {
  API_KEY_BOT,
  API_KEY_COINS
}: T.Env = env;

const { Telegraf } = telegraf;  


export default class Bot {
  bot: telegraf.Telegraf;
  coinMarketApi: string;
  public constructor() {
    this.coinMarketApi = 'https://pro-api.coinmarketcap.com';
    this.bot = new Telegraf(API_KEY_BOT);
    this.SetCommands();
    this.bot.launch();
  }
  
  /**
   * Bot handlers
   */
  private SetCommands() {
    this.StartBot();
    this.GetTopCurr();
  }
  
  /**
   * Welcome message
   */
  private StartBot() {
    this.bot.start((ctx) => ctx.reply('Welcome!\n Send /rates'));
  }

  /**
   * Get top currencies
   */
  private GetTopCurr() {
    const request = new Request();
    const requestOptions = {
      method: 'GET',
      uri: `${this.coinMarketApi}/v1/cryptocurrency/listings/latest`,
      qs: {
        start: 1,
        limit: 10,
      },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY_COINS
      },
      json: true,
      gzip: true
    };
    /**
     * Set bot command /rates
     */
    this.bot.command('rates', async (ctx) => {
      const res = await request.send<T.CurrencyResult>(requestOptions);
      const { error, message, body } = res;
      if (error) {
        console.error(`<${Date()}> [ERROR_GET_CURRENCIES]`, body);
        ctx.reply(`Error get currencies: ${message}`);
        return 1;
      }
      const { data } = body;
      const items = data.map((item, index) => {
        index ++;
        const spaces = (index.toString().length === 1) ? `  ` : ''; 
        return `${index}${spaces} | ${item.name} | ${item.symbol}\n`
      });
      const table = `ID | Name | Symbol\n${items.join('')}`;
      ctx.reply(table);
      return 0;
    });
  }
}