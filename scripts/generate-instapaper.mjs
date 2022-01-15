import { Feed } from 'feed'
import fs from 'fs-extra'
import { getInstapaperData } from './instapaper/index.mjs'

// eslint-disable-next-line import/no-anonymous-default-export
const generateInstapaper = async () => {
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
  fs.writeFileSync('public/instapaper.xml', feed.rss2())
  console.log('xml 写入成功')
}

generateInstapaper().catch((error) => {
  console.log('instapaper.xml 执行失败')
  console.log('error', error)
})
