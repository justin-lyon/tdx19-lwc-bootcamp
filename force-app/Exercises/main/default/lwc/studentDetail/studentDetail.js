import { CurrentPageReference } from 'lightning/navigation'
import { LightningElement, track, wire } from 'lwc'
import { registerListener } from 'c/pubsub'

export default class StudentDetail extends LightningElement {
  @track studentId
  @track fields = ['Name', 'Email', 'Phone', 'Description']
  @wire(CurrentPageReference) pageRef

  connectedCallback () {
    registerListener('studentChange', this.handleStudentChange, this)
  }

  handleStudentChange (event) {
    this.studentId = event.studentId
  }
}