const { Discord, MessageEmbed } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageMenu,
  MessageMenuOption,
} = require("discord-buttons");

  module.exports.config = {

  name: "menu",
  aliases: ["menu"],
  usage: "Taslak",
  
                          };

module.exports.execute = async(client, message, args) => {
  
  let option_1 = new MessageMenuOption()
    .setLabel("Mesaj Seçeneği")
    .setValue("1")
    .setDescription("Embed Mesaj")
    .setDefault()
    .setEmoji("📚");

  let option_2 = new MessageMenuOption()
    .setLabel("Mesaj Seçeneği")
    .setValue("2")
    .setDescription("Normal Mesaj")
    .setDefault()
    .setEmoji("🔱");

  let selection = new MessageMenu()
    .setID("selector")
    .setPlaceholder("Seçim Menüsü")
    .addOption(option_1)
    .addOption(option_2);

  await message.channel.send(
    `Aşağıdaki menüden seçim yapmalısın dostum!`,
    selection
  );

  client.on("clickMenu", async (menu) => {
    let uye = menu.clicker.member; // üye tanımı belki birşeye yarar
    menu.reply.defer(); // hata vermesini engeller
    if (menu.values[0] === "1") {
      message.channel.send({
        embed: {
          description: `embed mesaj`,
          footer: {
            text: "richard yaptı la :)",
            icon_url:
              message.author.avatarURL(),
          },
          color: "RANDOM",
          thumbnail: {
            url: message.author.avatarURL(),
          },
        },
      });
    }
    if (menu.values[0] === "2") {
      message.channel.send("normal mesaj");
    }
  });
};

    
  };
