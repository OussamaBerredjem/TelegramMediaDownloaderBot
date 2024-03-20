const express = require('express')
const { Telegraf } = require('telegraf')
const axios = require('axios');


const app = express()



const bot = new Telegraf("7101365233:AAFqlJiNNwksrIFPZBCMqwcsDy-1wmtJhkc")


const port = 3000||process.env.PORT;


  
  async function get(url) {

    const options = {
        method: 'POST',
        url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'f717a9a210msh463ba705e0514cep14ac7cjsn9e23ecc29bf6',
          'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
        },
        data: {
          url: url
        }
      };

    try {
      const response = await axios.request(options);

      return {
        author:response.data['author'],
        title:response.data['title'],
        link:response.data['medias'][0]['url']
      };
  } catch (error) {
      console.error(error);
  }
  }

bot.start((ctx) => ctx.reply('Welcome'));

bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on('message', async (ctx) => {
    const idChat = ctx.chat.id;
    const message = ctx.message.text;
    

    try{
        var replyMsg;

        if(message.includes("https://")&&message.includes("www")&&message.includes(".com")&&(message.includes("facebook")||message.includes("tiktok")||message.includes("youtube")||message.includes("instagram"))){
       
         replyMsg = await ctx.reply("uploading ...");

        const respo = await get(message);

        await ctx.deleteMessage(replyMsg.message_id);

        ctx.reply("Author : "+respo['author']+"\nTitle : "+respo['title']);
        ctx.replyWithVideo(respo['link']);
     }else{
        ctx.reply("send a valid link")
     }

    }catch(error){
        await ctx.deleteMessage(replyMsg.message_id);

        ctx.reply("error uploading");

    }

    
})

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

app.get("/hy",(req,res)=>{
  res.send("hellos");
})

app.get("/",(req,res)=>{
  res.send("hy");
})

app.listen(port,()=>console.log("connected"))
