import ow from 'ow'

const Instapaper = require('instapaper-node-sdk')

const { INSTAPAPER_ID, INSTAPAPER_SECRET, INSTAPAPER_USERNAME, INSTAPAPER_PASSWORD } = process.env
ow(INSTAPAPER_ID, ow.string)
ow(INSTAPAPER_SECRET, ow.string)
ow(INSTAPAPER_USERNAME, ow.string)
ow(INSTAPAPER_PASSWORD, ow.string)

const client = new Instapaper(INSTAPAPER_ID, INSTAPAPER_SECRET)
client.setCredentials(INSTAPAPER_USERNAME, INSTAPAPER_PASSWORD)

export { client }
