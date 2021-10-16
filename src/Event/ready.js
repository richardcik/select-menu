const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {

    name: "ready",
 
}  

module.exports = async () => {

  client.user.setPresence({ activity: { name: conf.client.activity }, status: "ONLINE" });
 
}