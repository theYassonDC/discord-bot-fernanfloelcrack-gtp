import { ExtendClient } from "../../Structures/Client";
import { AnyGuildChannel, Message, Uncached } from 'oceanic.js'
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export = {
    once: false,
    name: "messageCreate",
    async callback(client: ExtendClient, msg: Message<Uncached | AnyGuildChannel>) {
        if (msg.author.bot) return
        if (msg.content.startsWith('<@1178209770214277131>') && msg.channel?.id === '1157924766490042460') {
            await msg.channel?.sendTyping()
            const sendTypingInterval = setInterval(() => {
                msg.channel?.sendTyping()
            }, 5000)
            const completion = await openai.chat.completions.create({
                messages: [
                    {   // Context message
                        role: "system",
                        content: "Responde los variadamente mensajes manera humor negro, sarcastica, divertida, humoristica, original y grosera y al final diciendo carajo o chorizo que sean respuestas cortas y breves"
                    },
                    {
                        role: 'user',
                        content: msg.content
                    }
                ],
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                max_tokens: 100,
            });
            clearInterval(sendTypingInterval)
            const res = completion.choices[0].message.content
            msg.channel?.createMessage({ content: `${res}` })
        }
    }
}
