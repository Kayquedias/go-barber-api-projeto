export default interface IStorageProvider {
  saveFile(file: string | undefined): Promise<string>
  deleteFIle(filer: string): Promise<void>
}
