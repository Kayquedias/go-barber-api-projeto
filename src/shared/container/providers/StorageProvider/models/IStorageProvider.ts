export default interface IStorageProvider {
  saveFile(file: string | undefined): Promise<string>
  deleteFile(filer: string): Promise<void>
}
