const Discord = require('discord.js')
const config = require('../../config.json');
const fs = require('fs')
exports.run = async(bot, message, args) => {

    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

    let prefix = prefixes[message.guild.id].prefixes; 

    let embed = new Discord.RichEmbed();

    embed.setTitle('Lista de comandos | ADMIN')
    .setColor('ORANGE')
    .setDescription('Aqui estão todos os comandos disponíveis, apenas usem com moderação no canal <#665303087262466048>.\nObs: Caso ache algum Bug, ou algo do tipo, avise os superiores sobre o mesmo.')
    .addField(`${prefix}Ban`, `Use-o para punir um jogador.`)
    .addField(`${prefix}Kick`, `Use-o par expulsar um jogador.`)
    .addField(`${prefix}Mute`, `Use-o para silenciar um jogador.`)
    .addField(`${prefix}Unban`, `Use-o para desbanir um jogador.`)
    .addField(`${prefix}Unmute`, `Use-o para tirar aplicação do mute de um jogador.`)
    .setFooter(`Total de comandos ${bot.commands.size}`, bot.user.avatarURL)

    let embed1 = new Discord.RichEmbed();

    embed1.setTitle('Lista de comandos')
    .setColor('ORANGE')
    //.setDescription('Aqui estão todos os comandos disponíveis, apenas usem com moderação no canal <#665303087262466048>.\nObs: Caso ache algum Bug, ou algo do tipo, avise os superiores sobre o mesmo.')
    .addField(`${prefix}Anunciar`, `Fazer um anúncio no servidor.`)
    .addField(`${prefix}Botinfo`, `Obter informações do servidor.`)
    .addField(`${prefix}ip`, `Visualizar os IPs do servidor.`)
    .addField(`${prefix}Limpar`, `Limpar o bate-papo.`)
    .addField(`${prefix}Ping`, `Respota da mensagem ao servidor.`)
    .addField(`${prefix}Serverinfo`, `Informações do servidor úteis.`)
    .addField(`${prefix}Sugestão`, `Fazer uma sugestão.`)
    .addField(`${prefix}Userinfo`, `Ver informações de um usuário.`)
    .setFooter(`Total de comandos ${bot.commands.size}`, bot.user.avatarURL)
    message.delete(20000)
    message.channel.send(embed)
   .then(async message => {

      await message.channel.send(embed1)
      message.delete(20000)

   })
}

exports.help = {
    nome: "Help",
    descricao: null
}