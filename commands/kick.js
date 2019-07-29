const discord = require("discord.js");

module.exports.run = async(bot, message, arguments) => {
    
    var kickUser = message.guild.member(message.mentions.users.first());
    if(!kickUser) return message.channel.send("User not found!");
    var reason = arguments.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don\'t have permision to do that!");
    if(kickUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You can\'t kick ${kickUser}!`);
    var kick = new discord.RichEmbed()
        .setDescription('kick')
        .setColor('#cc0000')
        .addField('kicked user', kickUser)
        .addField('kicked by', message.author)
        .addField('reason', reason);

    var kickChannel = message.guild.channels.find('name' , "kick-log")
    if(!kickChannel) return message.guild.send("Can not find the channel")

    message.guild.member(kickUser).kick(reason)

    message.channel.send(`:white_check_mark: Succesfuly kicked ${kickUser}!`).then(msg => msg.delete(3000));
    kickChannel.send(kick)

    return;
}

module.exports.help = {
    name: "kick"
}