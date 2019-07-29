const discord = require("discord.js")
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("You don\'t have permision to do that!")

    if(!args[0]) return message.channel.send("Do: !prefix <New Prefix>");

    var prefixs = JSON.parse(fs.readFileSync('./prefixes.json'));

    prefixs[message.guild.id] = {
        prefixs: args[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixs), (err) =>{
        if (err) console.log(err);
    });

    var stringEmbed = new discord.RichEmbed()
        .setColor("#F00")
        .setTitle("Prefix")
        .setDescription(`Prefix changed to ${args[0]}`);

    message.channel.send(stringEmbed)

}

module.exports.help = {
    name: "prefix"
}