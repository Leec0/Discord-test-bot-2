const discord = require("discord.js");

module.exports.run = async(bot, message, arguments) => {
    
    var serverIcon = message.guild.iconURL;
    var serverEmbed = new discord.RichEmbed()
    .setDescription("server info")
    .setColor('#119c24')
    .setThumbnail(serverIcon)
    .addField('bot name', bot.user.username)
    .addField('joined on', message.member.joinedAt)
    .addField('total members', message.guild.memberCount);
    return message.channel.send(serverEmbed)
}

module.exports.help = {
    name: "serverinfo"
}