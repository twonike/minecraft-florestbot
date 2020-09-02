const Discord = require('discord.js'); 
const bot = new Discord.Client(); 
const links = require('./links.json');
const config = require('./config.json');
const fs = require('fs');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('keelta.json') 
const discloud = require("discloud-status");
const db = low(adapter)

bot.commands = new Discord.Collection();
console.log('|SRC  |Status|')
console.log('|------------|')


 fs.readdir("./src/admin/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./src/admin/${file}`);
      let commandName = file.split(".")[0];
      console.log(`| ${commandName} ✅`);
      bot.commands.set(commandName, props);
    });
  });

  fs.readdir("./src/functions/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./src/functions/${file}`);
      let commandName = file.split(".")[0];
      console.log(`| ${commandName} ✅`);
      bot.commands.set(commandName, props);
    });
  });
  
  fs.readdir("./src/help/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./src/help/${file}`);
      let commandName = file.split(".")[0];
      console.log(`| ${commandName} ✅`);
      bot.commands.set(commandName, props);
    });
  });
bot.on('message', message => {
    responseObject = links;
    if(responseObject[message.content]){
        message.channel.send(responseObject[message.content]);
    }
}); 

//{name: `Você gosta das minhas funções? Me adicione | -invite 📣`, type: 'STREAMING', url: 'https://twitch.tv/srdedo_'}, {name: `Me adicione no seu servidor!| -invite 📣`, type: 'PLAYING'}

bot.on('ready', () => {
    
    console.log(`Jogadores: ${bot.users.size} Canais: ${bot.channels.size} Servidores: ${bot.guilds.size}`)
     let status = [
         {name: `Use /help | ${bot.users.size} jogadores.`, type: 'PLAYING'},   
         {name: `loja.redetwisty.tk` , type: 'WATCHING'} ,
         {name: `forum.redetwisty.tk` , type: 'WATCHING'} 
     ]
         function setStatus() {
             let altStatus = status[Math.floor(Math.random()*status.length)]
             bot.user.setPresence({game: altStatus})
         }
         setStatus();
         setInterval(() => setStatus(), 10000)
 });

 bot.on('raw', async dados => {

  
  if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return

    if(dados.d.message_id != "665307670370189355") return

    let servidor = bot.guilds.get("654447497225306152")

    let membro = servidor.members.get(dados.d.user_id)

    let cargo1 = servidor.roles.get('654447891263389699')
       
    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.name === "👽"){
            if(membro.roles.has(cargo1)) return
            membro.addRole(cargo1)
        }
    }
  });

bot.on('message', message => { 
  
    if(message.author.bot) return; 
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes; 
    
    let mencionar = new Discord.RichEmbed()

    .setDescription(`**Olá ${message.author}**.\n\n✅ Meu prefixo no servidor atualmente é \`${prefix}\`\n✅ Meu menu de comandos é \`${prefix}help\` ou \`${prefix}comandos\` `)
    .setColor("#4e2022")
    .setFooter('Mensagem será removida automaticamente.')

    if(message.author.bot) return;
    if(message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)){
      return message.channel.send(mencionar)
      
      .then(message =>{

        message.delete(10000)

      })
    } 

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    let arquivocmd = bot.commands.get(command.toLowerCase().slice(prefix.length));
  
    if(arquivocmd) return arquivocmd.run(bot, message, args);
    
  })

bot.login(config.token)