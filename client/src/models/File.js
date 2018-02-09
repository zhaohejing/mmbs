import Mmbs from 'mmbs'
export default class FileManager {
  constructor(props) {
    this.name = props.name;
    this.file = props.file;
  }
  upload() {
    const file = new Mmbs.File(this.name, this.file);
    return file.save()
  }
  delete(file) {
    return file.destroy()
  }
}
