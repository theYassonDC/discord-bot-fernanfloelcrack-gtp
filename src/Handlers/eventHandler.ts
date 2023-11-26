import type {  ExtendClient } from "../Structures/Client"
import { readdirSync } from "fs"
import { join } from "path"

export async function eventHandler(client: ExtendClient) {
  const categories = readdirSync(join(__dirname, "..", "Events"))

  for (const category of categories) {
    const eventFiles = readdirSync(join(__dirname, "..", "Events", category))
    for (const eventFile of eventFiles) {
      const event: any = await import(join(__dirname, "..", "Events", category, eventFile))
      console.log('Eventos cargados!')
      if (event.once) {
        client.once(event.name, (...args: any) => void event.callback(client, ...args))
      } else {
        client.on(event.name, (...args: any) => void event.callback(client, ...args))
      }
    }
  }
}
