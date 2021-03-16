# rest-exercises
### Overview
We’ve used SpringBoot and Spring’s WEB MVC annotations to create a service currently can return a list of patients or a
single patient by ID.

### Requirement
Add a new method to the service to return a filtered list of patients whose first or last name matches a given value.
The returned list should be sorted ascending by the patient’s last name and first name.

#### Optional Requirement 1
Create a method that adds a new patient to the service’s list.

#### Optional Requirement 2
Modify the Patient model to support a list of email addresses.  Each email address should have one of the following types
associated with it:
- Home
- Work
- Other

