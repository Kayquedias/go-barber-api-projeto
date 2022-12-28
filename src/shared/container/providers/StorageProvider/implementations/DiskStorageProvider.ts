import fs from 'fs'
import path from 'path'
import uploadConfig from 'src/config/upload'
import IStorageProvider from '../models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    )
    return file
  }

  public async deleteFIle(filer: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, filer)
    try {
      await fs.promises.stat(filePath)
    } catch (err) {
      return
    }
    await fs.promises.unlink(filePath)
  }
}
