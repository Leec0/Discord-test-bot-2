const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.log(err);
    var jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0){
        console.log("can\'t find any files!")
        return;
    }

    jsfiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`File ${f} is loaded`);

        bot.commands.set(fileGet.help.name, fileGet);
    })

});

bot.on("ready", async () => {

    console.log(`Logged in as: ${bot.user.username}!`);
            
    bot.user.setActivity("!help", {
        type: "PLAYING"
    });
});

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.find("name", 'memb');
    if(!role) return;
    member.addRole(role);
    const channel = member.guild.channels.find('name', "general");
    if (!channel) return;
    var join = new discord.RichEmbed()
        .setDescription(`Welcome ${member} to the server!`)
        .setTitle(`Welcome`)
        .setColor(`#F00`)
    channel.send(join);
});

bot.on("message",  async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var prefixs = JSON.parse(fs.readFileSync('./prefixes.json'));
    if(!prefixs[message.guild.id]){
        prefixs[message.guild.id] ={
            prefixs: botConfig.prefix
        };
    }
    var prefix = prefixs[message.guild.id].prefixs;

    // var prefix = botConfig.prefix;
    var messageArry = message.content.split(' ');
    var command = messageArry[0];
    var arguments = messageArry.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));
    if(commands) commands.run(bot,message, arguments)

});

bot.login(botConfig.token);