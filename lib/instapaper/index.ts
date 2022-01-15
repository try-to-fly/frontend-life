import { client } from './client'
import pMap from 'p-map'
import mem from 'mem'
import _ from 'lodash'
import ms from 'ms'
import delay from 'delay'
import { InstaPaperFoldItem, InstaPaperItem } from '@/lib/instapaper/type'
const limit = 100
const cacheTime = ms('60m')
export * from './type'
/**
 * 获取instapaper 数据
 * api:https://www.instapaper.com/api/full
 */
export const getInstapaperData = mem(
  async () => {
    const folders: InstaPaperFoldItem[] = await client
      .listFolders({ limit })
      .then((list: InstaPaperFoldItem[]) => list.filter((item) => item.type === 'folder'))
    console.log('获取到folder列表')
    const items = _.flatten(
      await pMap(
        folders,
        async (folder) => {
          console.log('获取folder详情', folder.title)
          const list: InstaPaperItem[] = await client.list({
            folder_id: folder.folder_id,
            limit,
          })
          return pMap(
            list.filter((item) => item.type === 'bookmark'),
            async (item) => {
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
  },
  { maxAge: cacheTime }
)
