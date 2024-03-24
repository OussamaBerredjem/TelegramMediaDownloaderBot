const express = require('express')
const { Telegraf } = require('telegraf')
const axios = require('axios');


const app = express()



const bot = new Telegraf("API_KEY")


const port = 443||process.env.PORT;


  
  async function get(url) {

    const options = {
        method: 'POST',
        url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'API_KEY',
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
    
    if( ctx.message.text){

    try{

      const message = ctx.message.text;

        var replyMsg;

        if(message.includes("https://")&&(message.includes("www")||message.includes("vm"))&&message.includes(".com")&&(message.includes("facebook")||message.includes("tiktok")||message.includes("youtube")||message.includes("instagram"))){
       
         replyMsg = await ctx.reply("uploading ...");

        const respo = await get(message);

        await ctx.deleteMessage(replyMsg.mess);

        ctx.reply("Author : "+respo['author']+"\nTitle : "+respo['title']);
        ctx.replyWithVideo(respo['link']);
     }else{
        ctx.reply("send a valid link")
     }

    }catch(error){
        await ctx.deleteMessage(replyMsg.message_id);

        ctx.reply("unknown error");

    }}else{
      ctx.reply("error send a link message");

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

app.head("/head",(req,res)=>{
  res.send("hy");
})

app.listen(port,()=>console.log("connected"))
