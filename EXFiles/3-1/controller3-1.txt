import { LightningElement, track, wire } from 'lwc';
import getLocations from '@salesforce/apex/CourseDeliveryLocations.getLocations';

export default class LocationComponent extends LightningElement {
	@track mapMarkers;
	@track markersTitle = "Deliveries Worldwide";
	@track cardTitle = "Deliveries";

	@wire(getLocations)
	wired_getLocations({ error, data }) {
		this.mapMarkers = [];
		if (data) {
			data.forEach(loc => {
				this.mapMarkers.push({ 
					location: 
					{
						City: loc.City__c, 
						Country: loc.Country__c,
					},
					description: loc.City__c + ", " + loc.Country__c + ", " +  loc.numDeliveries + " sessions",
				});
			});

		} else if (error) {
			this.error = error;
		}
	}
}
