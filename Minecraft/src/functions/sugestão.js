const Discord = new require('discord.js')

module.exports.run = async (bot, message, args) => {
    
    message.delete()
    let sugestao = args.join(" ")

    if(!sugestao) return message.reply('**você precisa escrever sua sugestão**.')
    .then(msg => {
     msg.delete(5000)
    })

    message.channel.send('> Sua sugestão foi enviada com sucesso!')

    bot.channels.get("683437644684066864").send( // <- ID do canal que será enviado a sugestão.

        new Discord.RichEmbed()

        .setColor('ORANGE')
        .addField('💡 Sugestão', `${sugestao}`)
        .setThumbnail()
        .setFooter(`Sugestão enviada por: ${message.author.username}`, `${message.author.displayAvatarURL}`))
        .then(async msg => {

    await msg.react('✅')
    await msg.react('❎')

   })
}
