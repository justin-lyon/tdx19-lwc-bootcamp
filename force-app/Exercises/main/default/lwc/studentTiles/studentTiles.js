import { LightningElement, api, track } from 'lwc';

export default class StudentTiles extends LightningElement {
  @api studentList = []
  @track selectedStudentId = ''

  studentSelected (event) {
    this.selectedStudentId = event.detail.studentId
  }
}