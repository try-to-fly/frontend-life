import { NextApiRequest, NextApiResponse } from 'next'
import { dropboxDownload } from '../../scripts/dropbox.mjs'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const content = await dropboxDownload('/instapaper/instapaper.xml')
  res.setHeader('content-type', 'text/xml; charset=utf-8')

  res.send(content)
}
