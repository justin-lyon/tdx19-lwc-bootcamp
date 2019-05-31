import { CurrentPageReference } from 'lightning/navigation'
import { LightningElement, track, wire } from 'lwc'
import getStudents from '@salesforce/apex/StudentBrowser.getStudents'
import { fireEvent } from 'c/pubsub'

export default class StudentBrowser extends LightningElement {
  @track selectedInstructorId = ''
  @track selectedDeliveryId = ''

  constructor() {
    super()
    // Call the super constructor here...
    const studentNames = ['Rad', 'Stuart', 'Andres', 'Rahul', 'Amit', 'Simon'];

    this.studentList = studentNames.map((Name, Id) => {
      return {
        sobjectType: 'Contact',
        Name,
        PhotoUrl: '/services/images/photo/003B0FakePictId',
        Id
      }
    })
  }

  @wire(CurrentPageReference) pageRef

  @wire(getStudents, {
    instructorId: '$selectedInstructorId',
    courseDeliveryId: '$selectedDeliveryId'
  })
  students

  deliverySelected (event) {
    this.selectedInstructorId = event.detail.instructorId
    this.selectedDeliveryId = event.detail.deliveryId
  }

  handleNotify (event) {
    const studentId = event.detail.studentId
    fireEvent(this.pageRef, 'studentChange', { studentId })
  }
}