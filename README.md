# ScrumOfTheEarth
## Attendance App
* Gavin Papenthien
* Sam Miller
* John Trachte
* Dylan Brodie

## API
Backend RESTful API \
Built with Java 21 and Spring Boot 3.2.2 \
Build Tool - Apache Maven

Authoritative system for all business logic & resource CRUD. \
Fully implemented stateless JWT authentication & User role-based authorization.

**Dependancies:**
* Apache Maven 3.9.6 https://maven.apache.org/download.cgi
* All other dependancies listed in `pom.xml` will be automatically installed by Maven.
* Java 21

**Build Instructions:**
* Open IntelliJ IDE
* Select `file --> open`
* Navigate to API source download
* Select `pom.xml`
* Choose "Open as project"
* Run `ApiApplication` file

**Test Reproduction:**
* Open in IntelliJ IDE with the same method as Build Instructions.
* Navigate to `src/test/java/attendanceapp.api` in the Project Explorer
* Right click the `attendanceapp.api` package
* Hover "More Run/Debug" on the dropdown
* Select "Run 'tests in "attendanceapp.api'" with Coverage"
* If prompted in bottom right corner of IDE, accept "Enable Lombok Generation"
* When tests are complete running, a report should appear on the right side of the IDE.
* If prompted with popup, select "Replace Active Suites"

**Warning:** If tests are ran at 11:50pm or later, they will crash. The tests are reliant on automatically generated data using SQL queries that add ten minutes to the current local time and does not wrap into the next day, causing failure.

## Database

**Dependancies:**
* pgAdmin4 install
* Latest PostgreSQL version
* libnfc-bin
* libnfc-examples
* Ubuntu device


**Build Instructions:**
* Open pgAdmin4
* Connect to server or create one
* Write queries to create needed tables for database
* Write `SELECT` queries to check if columns created successfully
* Add things to table using the `INSERT INTO` command

## Scanner
### In Ubuntu
* Run scanner/install.sh as root
* Create relevant roomData.txt in /usr directory

**Dependancies:**
* Python
* PySerial

**Build Instructions:**

## Frontend 

**Dependancies:**
* Node js
* React
* IDE capable of runnin java script

**Build Instructions:**
* (recommended) Install newest VS Code
* Install newest nodejs LTS version for your operating system
* open ternminal in VS Code and run this line: npm install npm-scripts
* then run this line: npm install universal-cookie