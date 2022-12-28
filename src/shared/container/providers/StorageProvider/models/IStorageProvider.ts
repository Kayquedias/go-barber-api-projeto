export default interface IStorageProvider {
  saveFile(file: string): Promise<string>
  deleteFIle(filer: string): Promise<void>
}
