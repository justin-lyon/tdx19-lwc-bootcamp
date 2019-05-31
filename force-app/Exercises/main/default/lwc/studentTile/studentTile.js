import { LightningElement, api } from 'lwc'

export default class StudentTile extends LightningElement {
  @api selected = false
  @api selectedStudentId = ''
  @api student

  get tileSelected () {
    return this.selectedStudentId === this.student.Id ? "tile selected " : "tile"
  }

  studentClick () {
    const selectedEvent = new CustomEvent('studentselected', {
      bubbles: true,
      composed: true,
      detail: { studentId: this.student.Id }
    })
    this.dispatchEvent(selectedEvent)
  }
}