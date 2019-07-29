const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send('You don\'t have permissions to do that');
    var user = message.guild.member(message.mentions.users.first());
    if(!user) return message.channel.send("Give a username or he isn\'t in the server!");
    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can\'t warn this person!");
    var reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Give a reason!");

    if (!warns[user.id]) warns[user.id] = {
        warns:0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription('warn')
        .setColor('#cc0000')
        .addField('warned user', user)
        .addField('warned by', message.author)
        .addField('Warn amount', warns[user.id].warns)
        .addField('reason', reason);

    var warnChannel = message.guild.channels.find('name' , "warn-log")
    if(!warnChannel) return message.guild.send("Can not find the channel")

    message.channel.send(`:white_check_mark: Succesfuly warned ${user} for ${reason}`).then(msg => msg.delete(3000));
    warnChannel.send(warnEmbed)

}

module.exports.help = {
    name: "warn"
}