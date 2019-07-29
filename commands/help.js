const discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    try{

        var text = "**DiscordBot2** \n\n **__Commands__** \n !prefix - change your prefix \n !ban - !ban user reason \n !kick - !kick user reason \n !serverinfo - get the info about the server \n !botinfo - get info about the bot";
        message.author.send(text);
        message.channel.send("Look at your dm\'s!")

    }catch (error){
        message.channel.send("Soneting whent wrong!");
    }
}

module.exports.help = {
    name: "help"
}