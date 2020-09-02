const Discord = require('discord.js')

exports.run = async(bot, message, args) => {

let embed = new Discord.RichEmbed()

.setTitle(`${message.guild.name}`)
.setDescription('**Aqui estão**:\nIP: BREVE\nLOJA: BREVE')
.setColor('ORANGE')
.setFooter(bot.user.username, bot.user.avatarURL)
message.channel.send(embed)

}

exports.help = {
    nome: "ip",
    descricao: null
}