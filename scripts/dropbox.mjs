import { Dropbox } from 'dropbox'
import path from 'path'
import fs from 'fs-extra'

/** 文件上传 */
export const dropboxUpload = async (filepath) => {
  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  })
  const filename = path.basename(filepath)
  const contents = fs.readFileSync(filepath, 'utf8')
  await dbx.filesUpload({
    path: `/instapaper/${filename}`,
    contents,
    mode: { '.tag': 'overwrite' },
  })
  console.log('dropboxUpload success', filename)
}

/** 文件下载 */
export const dropboxDownload = async (filepath) => {
  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  })
  const {
    result: { fileBinary },
  } = await dbx.filesDownload({ path: filepath })
  return fileBinary.toString('utf8')
}
