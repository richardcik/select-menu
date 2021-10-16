////// HANDLER ////
const { Discord, Client, MessageEmbed, Guild } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
require("discord-buttons")(client);

/////////////////// HANDLER ///////////////////
let config = require("./src/Config/config.json");
const fs = require("fs");
const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;
/////////////////// HANDLER ///////////////////


client.login(config.token).catch(console.log("Token yanlış"))
client.on("message", (message) => {
  if (
    message.author.bot ||
    !message.content.startsWith(config.prefix) ||
    !message.channel ||
    message.channel.type == "dm"
  )
    return;
  let args = message.content.substring(config.prefix.length).split(" ");
  let command = args[0];
  let bot = message.client;
  args = args.splice(1);
  let calistirici;
  if (commands.has(command)) {
    calistirici = commands.get(command);
    calistirici.execute(bot, message, args);
  } else if (aliases.has(command)) {
    calistirici = aliases.get(command);
    calistirici.execute(bot, message, args);
  }
});
/////////////////// HANDLER ///////////////////
fs.readdir("./src/Commands", (err, files) => {
  if (err) return console.error(err);
  files = files.filter((file) => file.endsWith(".js"));
  console.log("\x1b[31m%s\x1b[0m", `[ -------------------------------- ]`);
  console.log("\x1b[32m%s\x1b[0m", `[ BOT CONNECTED ]`);
  console.log("\x1b[36m%s\x1b[0m", `[ ${files.length} COMMANDS LOADED ]`);
  files.forEach((file) => {
    let prop = require(`./src/Command/${file}`);
    if (!prop.config) return;
    if (typeof prop.onLoad === "function") prop.onLoad(client);
    commands.set(prop.config.name, prop);
    if (prop.config.aliases)
      prop.config.aliases.forEach((aliase) => aliases.set(aliase, prop));
  });
});
/////////////////// HANDLER ///////////////////
fs.readdir("./src/Event", (err, files) => {
  if (err) return console.error(err);
  console.log("\x1b[36m%s\x1b[0m", `[ ${files.length} EVENTS LOADED ]`);
  console.log("\x1b[31m%s\x1b[0m", `[ -------------------------------- ]`);
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let prop = require(`./src/Event/${file}`);
      if (!prop.config) return;
      client.on(prop.config.name, prop);
    });
});
/////////////////// HANDLER ///////////////////
