const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send('You don\'t have permissions to do that');
    var user = message.guild.member(message.mentions.users.first());
    if (!user) return message.channel.send("Give a username or he isn\'t in the server!");
    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can\'t warn this person!");

    var muteRole = message.guild.roles.find("name", "muted");
    if (!muteRole) return message.channel.send("This role doesn\'t exist!");

    var muteTime = args[1];
    if (!muteTime) return message.channel.send("Pls giva a time");

    await (user.addRole(muteRole.id));
    var mute = new discord.RichEmbed()
        .setDescription('mute')
        .setColor('#cc0000')
        .addField('muted user', user)
        .addField('muted by', message.author)
        .addField('Time', muteTime);

    var muteChannel = message.guild.channels.find('name', "mute-log")
    if (!muteChannel) return message.guild.send("Can not find the channel")

    message.channel.send(`:white_check_mark: Succesfuly muted ${user} for ${muteTime}`).then(msg => msg.delete(3000));
    muteChannel.send(mute)

    setTimeout(function () {
        user.removeRole(muteRole.id);
        var unMute = new discord.RichEmbed()
            .setDescription('Unmuted')
            .setColor('#cc0000')
            .addField('muted user', user)
        var muteChannel = message.guild.channels.find('name', "mute-log")
        if (!muteChannel) return message.guild.send("Can not find the channel")

        muteChannel.send(unMute)

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute"
}