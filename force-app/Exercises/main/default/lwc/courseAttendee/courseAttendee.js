import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import FIELD_CourseName from '@salesforce/schema/Course_Attendee__c.Course_Delivery__r.Course__r.Name';
import FIELD_StartDate from '@salesforce/schema/Course_Attendee__c.Course_Delivery__r.Start_Date__c';
import FIELD_StudentId from '@salesforce/schema/Course_Attendee__c.Student__c';
import FIELD_StudentName from '@salesforce/schema/Course_Attendee__c.Student__r.Name';
import FIELD_StudentPict from '@salesforce/schema/Course_Attendee__c.Student__r.PhotoUrl';
const fields = [FIELD_CourseName, FIELD_StartDate, FIELD_StudentId, FIELD_StudentName, FIELD_StudentPict];

export default class CourseAttendee extends NavigationMixin(LightningElement) {
	@api recordId;
	@track attendee;
	@track error;

	@wire(getRecord, { recordId: '$recordId', fields })
	wiredStudent({ error, data }) {
		if (data) {
			const courseName = this._getDisplayValue(data, FIELD_CourseName);
			const startDate = this._getDisplayValue(data, FIELD_StartDate);
			this.attendee = {
				cardTitle: `${courseName} on ${startDate}`,
				studentId: this._getDisplayValue(data, FIELD_StudentId),
				studentTile: {
					Name: this._getDisplayValue(data, FIELD_StudentName),
					PhotoUrl: this._getDisplayValue(data, FIELD_StudentPict),
				}
			};
			this.error = undefined;
		} else if (error) {
			this.error = error;
			this.attendee = undefined;
		}
	}

	onEdit() {
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: this.recordId,
				objectApiName: 'Course_Attendee__c',
				actionName: 'edit'
			}
		});
	}

	_getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}
}