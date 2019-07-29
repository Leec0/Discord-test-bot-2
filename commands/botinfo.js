const discord = require("discord.js");

module.exports.run = async(bot, message, arguments) => {
    
    var botIcon = bot.user.displayAvatarURL;
    var botEmbed = new discord.RichEmbed()
        .setDescription("discord bot info")
        .setColor('#119c24')
        .setThumbnail(botIcon)
        .addField('bot name', bot.user.username)
        .addField('Gemaakt op', bot.user.createdAt);
    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo"
}