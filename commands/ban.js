const discord = require("discord.js");

module.exports.run = async(bot, message, arguments) => {
    
 
    var banUser = message.guild.member(message.mentions.users.first());
    if(!banUser) return message.channel.send("User not found!");
    var reason = arguments.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don\'t have permision to do that!");
    if(banUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You can\'t ban ${banUser}!`);
    var ban = new discord.RichEmbed()
        .setDescription('ban')
        .setColor('#cc0000')
        .addField('baned user', banUser)
        .addField('baned by', message.author)
        .addField('reason', reason);

    var banChannel = message.guild.channels.find('name' , "ban-log")
    if(!banChannel) return message.guild.send("Can not find the channel")

    message.guild.member(banUser).ban(reason)

    message.channel.send(`:white_check_mark: Succesfuly banned ${banUser}`).then(msg => msg.delete(3000));
    banChannel.send(ban)
    
    return;
}

module.exports.help = {
    name: "ban"
}