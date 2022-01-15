// const Instapaper = require('instapaper-node-sdk')
import Instapaper from 'instapaper-node-sdk'
import path from 'path'

import dotenv from 'dotenv'

const isDevelopment = process.env.NODE_ENV === 'development'
if (isDevelopment) {
  dotenv.config({
    path: path.resolve(process.cwd(), '.env.local'),
  })
}
console.log(process.env)

const { INSTAPAPER_ID, INSTAPAPER_SECRET, INSTAPAPER_USERNAME, INSTAPAPER_PASSWORD } = process.env

const client = new Instapaper(INSTAPAPER_ID, INSTAPAPER_SECRET)
client.setCredentials(INSTAPAPER_USERNAME, INSTAPAPER_PASSWORD)

export { client }
