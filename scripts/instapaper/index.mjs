import { client } from './client.mjs'
import pMap from 'p-map'
import _ from 'lodash'
import delay from 'delay'
const limit = 100
/**
 * 获取instapaper 数据
 * api:https://www.instapaper.com/api/full
 */
export const getInstapaperData = async (cachedJson) => {
  const folders = await client
    .listFolders({ limit })
    .then((list) => list.filter((item) => item.type === 'folder'))
  console.log('获取到folder列表')
  const items = _.flatten(
    await pMap(
      folders,
      async (folder) => {
        console.log('获取folder详情', folder.title)
        const list = await client.list({
          folder_id: folder.folder_id,
          limit,
        })
        return pMap(
          list.filter((item) => item.type === 'bookmark'),
          async (item) => {
            const cachedItem =
              cachedJson && cachedJson.items.find((i) => i.hash === item.hash && i.url === item.url)
            if (cachedItem) {
              console.log('命中缓存，已跳过', folder.title, item.title)
              return cachedItem
            }
            const content = await client.getText(item.bookmark_id).catch(() => '')
            console.log('获取到item', item.title)
            await delay(1000 * 1)
            return {
              ...item,
              content,
              foldName: folder.title,
            }
          },
          { concurrency: 1 }
        )
      },
      { concurrency: 1 }
    )
  ).sort((a, b) => b.time - a.time)
  console.log('处理完毕')
  return { folders, items }
}
