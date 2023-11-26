import { ExtendClient } from "../../Structures/Client";

export = {
    once: false,
    name: "ready",
    async callback(client: ExtendClient) {
        console.log(`Bot conectado ${client.user.username}`)
    }
}
