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
            role: String
        }
        ```

&nbsp;

# Users
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

# AttendanceLogs
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
Creates a new AttendenceLog and returns the URI of the new object along with the created object.
* **URL Params:**
None
* **Headers:**
    * Content-Type:
        application/json
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