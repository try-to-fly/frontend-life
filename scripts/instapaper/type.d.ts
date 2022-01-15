/** 文件夹 */
export interface InstaPaperFoldItem {
  title: string
  display_title: string
  sync_to_mobile: number
  folder_id: number
  position: number
  type: string
  slug: string
}

/** 元素 */
export interface InstaPaperItem {
  hash: string
  description: string
  bookmark_id: number
  private_source: string
  title: string
  url: string
  progress_timestamp: number
  time: number
  progress: number
  starred: string
  type: string
}
