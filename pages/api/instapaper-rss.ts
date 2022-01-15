import { NextApiRequest, NextApiResponse } from 'next'
import { Feed } from 'feed'
import fs from 'fs-extra'
import { getInstapaperData } from '../../lib'

/**
 *
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { INSTAPAPER_ROBOT } = process.env
  if (req.headers.instapaper_robot !== INSTAPAPER_ROBOT) {
    console.error('instapaper_robot不匹配:', req.headers.instapaper_robot)
    res.status(401)
    return
  }
  const data = await getInstapaperData()
  const feed = new Feed({
    title: 'X-life-Instapaper',
    description: 'Instapaper收藏的文章',
    id: 'x-life.top',
    copyright: 'x-life.top',
    link: 'https://x-life.top',
  })
  data.items.forEach((item) => {
    feed.addItem({
      title: `【${item.foldName}】${item.title}`,
      id: item.url,
      link: item.url,
      description: item.title,
      content: item.content,
      date: new Date(item.time),
    })
  })
  console.log('xml 生成成功')
  fs.writeFileSync('./public/instapaper.xml', feed.rss2())
  res.send('ok')
}
