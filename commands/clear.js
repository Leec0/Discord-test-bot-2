const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send("You don\'t have permissions to to this!");
    if(!args[0]) return message.channel.send("Please give a specific number");
    if(Number.isInteger(parseInt(args[0]))){

        var amount = parseInt(args[0]) + 1;
        message.channel.bulkDelete(amount).then(() =>{

            if(args[0] == 0){
                message.channel.send(":x: can\'t delete 0 message\'s").then(msg => msg.delete(3000));

            }else if(args[0] == 1){
                message.channel.send(`:white_check_mark: Succesful deleted 1 message`).then(msg => msg.delete(3000));

            }else {
                message.channel.send(`:white_check_mark: Succesful deleted ${args[0]} message\'s`).then(msg => msg.delete(3000));
            }

            
        });

    } else {
        return message.channel.send("Give a round number!");
    }

}

module.exports.help = {
    name: "clear"
}