# HTTP Responses
| Code| Status      | Description       
|-----|-------------|-------------------
| 200 | OK          | Succesful request.
| 201 | CREATED     | New resource created, generally indicates a successful POST.
| 400 | BAD REQUEST | Client error regarding request contents. Request should not be repeated.
| 403 | FORBIDDEN   | Client is either unauthenticated or not authorized to access the requested resource. Request should not be repeated.
| 404 | NOT FOUND   | Client has requested a resource that cannot be found.

# Authentication
**POST /login**
----
* **URL Params:**
None
* **Headers:**
    * Content-Type:
        application/json
* **Body:**
```
{
    username: String,
    password: String
}
```
* **Success Response:**
    * Status Code:
        200 OK
    * Body:
        ```
        {
            message: "Authentication successful",
            "token": <JWT>
            role: String
        }
        ```

&nbsp;

# User
* User object:
```
{
    id: int,
    firstName: String
    lastName: String,
    studentCardId: String,
    username: String,
    password: String,
    roleId: int
}
```
**POST /users**
----
Creates a new User and returns the URI of the new object.
* **URL Params:** 
None
* **Headers:**
    * Content-Type:
        application/json
    * Authorization:
        Bearer: `<JWT>`
* **Body:**
```
{
    firstName: String,
    lastName: String,
    studentCardId: String,
    username: String,
    password: String,
    roleId: int
}
```
* **Success Response:**
    * Status Code: 
        201 CREATED
    * Header: `Location=/users/{id}`
    * Body: `<User>`

&nbsp;

# AttendanceLog
* AttendanceLog object:
```
{
    id: Integer,
    studentId: int,
    sectionId: int,
    dateTime: TimeStamp,
    excused: Boolean
}
```
**POST /attendancelogs**
----
Creates a new AttendenceLog and returns the URI of the new object along with the created object. \
Intended only to be interacted with via IoT scanners. Possession of a student ID card serves as authorization.
* **URL Params:**
None
* **Headers:**
    * Content-Type:
* **Body:**
```
{
    studentCardId: String,
    roomNumber: Integer
}
```
* **Success Response:**
    * Status Code:
        201 CREATED
    * Header: `Location=/attendancelogs/{id}`
    * Body: `<AttendanceLog>`
    
&nbsp;

# Course
* Course object:
```
{
    id: Integer,
    name: String,
    sectionCount: Integer
}
```
**POST /courses**
----
Creates a new Course and returns the URI of the new object along with the created object.
* **URL Params:**
None
* **Headers:**
    * Content-Type:
        application/json
    * Authorization:
        Bearer: `<JWT>`
* **Body:**
```
{
    name: String
}
```
* **Success Response:**
    * Status Code:
        201 CREATED
    * Header: `Location=/courses/{id}`
    * Body: `<Course>`

    
&nbsp;

# Section
* Section object:
```
{
    id: Integer,
    roomNum: int,
    numStudents: Integer,
    course_id: int
}
```
**POST /sections**
----
Creates a new Section and returns the URI of the new object along with the created object.
* **URL Params:**
None
* **Headers:**
    * Content-Type:
        application/json
    * Authorization:
        Bearer: `<JWT>`
* **Body:**
```
{
    roomNum: int,
    numberOfStudent: int,
    courseId: int
}
```
* **Success Response:**
    * Status Code:
        201 CREATED
    * Header: `Location=/sections/{id}`
    * Body: `<Section>`

&nbsp;

# MeetingTime
* MeetingTime object:
```
{
    id: Integer,
    sectionId: int,
    dayOfWeek: int,
    startTime: Time,
    endTime: Time
}
```
**POST /meetingtimes**
----
Creates a new MeetingTime and returns the URI of the new object along with the created object.
* **URL Params:**
None
* **Headers:**
    * Content-Type:
        application/json
    * Authorization:
        Bearer: `<JWT>`
* **Body:**
    * Note: It is expected for startTime and endTime to follow "hh:mm" format
```
{
    sectionId: int,
    dayOfWeek: int,
    startTime: String,
    endTime: String
}
```
* **Success Response:**
    * Status Code:
        201 CREATED
    * Header: `Location=/meetingtimes/{id}`
    * Body: `<MeetingTime>`