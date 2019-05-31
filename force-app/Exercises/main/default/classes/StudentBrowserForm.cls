public with sharing class StudentBrowserForm {
  @AuraEnabled(cacheable=true)
  public static List<User> getInstructors() {
    return [SELECT Id, Name FROM User WHERE Is_Instructor__c = true ORDER BY Name];
  }

  @AuraEnabled(cacheable=true)
  public static List<Course_Delivery__c> getDeliveriesByInstructor(String instructorId) {
    if (instructorId == '') {
      return new List<Course_Delivery__c>();
    } else {
      return [
        SELECT Id, Start_Date__c, Location__c, Attendee_Count__c
        FROM Course_Delivery__c
        WHERE Instructor__c = :instructorId AND Status__c IN ('Enrolled','Completed','Delivered','Scheduled')
        ORDER BY Start_Date__c DESC
      ];
    }
  }
}
