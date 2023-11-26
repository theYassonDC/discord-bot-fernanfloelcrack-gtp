import 'dotenv/config'
import { Client } from "oceanic.js";
import { eventHandler } from "../Handlers/eventHandler";

export class ExtendClient extends Client {
    public constructor() {
        super({
            auth: process.env.DISCORD_TOKEN,
            gateway: {
                intents: 3276799
            }
        })
    }

    public async run() {
        await eventHandler(this)
        await this.connect()
    }
}