import { Feed } from 'feed'
import fs from 'fs-extra'
import tempy from 'tempy'
import { getInstapaperData } from './instapaper/index.mjs'
import { dropboxUpload, dropboxDownload } from './dropbox.mjs'

const rssFilePath = tempy.file({ name: 'instapaper.xml' })
const instapaperFilePath = tempy.file({ name: 'instapaper-data.json' })

// eslint-disable-next-line import/no-anonymous-default-export
const generateInstapaper = async () => {
  const cachedJson = await dropboxDownload('/instapaper/instapaper-data.json')
    .then((val) => JSON.parse(val))
    .catch(() => null)
  const data = await getInstapaperData(cachedJson)
  fs.writeJSONSync(instapaperFilePath, data)
  console.log('generateInstapaper success', instapaperFilePath)
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
  const rssData = feed.rss2()
  fs.writeFileSync(rssFilePath, rssData)
  console.log('xml 写入成功', rssFilePath)

  // dropbox文件上传
  await dropboxUpload(rssFilePath)
  await dropboxUpload(instapaperFilePath)
}

generateInstapaper().catch((error) => {
  console.log('instapaper.xml 执行失败')
  console.log('error', error)
})
