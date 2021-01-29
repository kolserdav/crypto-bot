declare module 'telegraf' {
  type Reply = (value: string) => any;
  type Context = {
    reply: Reply;
  }
  type Handler = (ctx: Context) => any
  class Telegraf {
    constructor(apiKey: string);
    command(name: string, handler: Handler): void;
    start(handler: Handler): void;
    launch(): void;
  }
}