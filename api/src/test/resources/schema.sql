------------------------------------------------------------------------------------------------
-- Name: Gavin Papenthien
-- Project: Attendance App - This is a full stack attendance tracking and management software.
-- Purpose: Create database schema for API to construct entities and interfaces with.
------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ROLES
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS USERS
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    FIRST_NAME VARCHAR(255) NOT NULL,
    LAST_NAME VARCHAR(255) NOT NULL,
    STUDENT_CARD_ID VARCHAR(50),
    USERNAME VARCHAR(50) NOT NULL,
    PASSWORD VARCHAR(50) NOT NULL,
    ROLE_ID INT REFERENCES ROLES(ID)
);

CREATE TABLE IF NOT EXISTS COURSES
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    NAME VARCHAR(255),
    SECTION_COUNT INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS SECTIONS
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    room_num INT NOT NULL,
    NUM_STUDENTS INT NOT NULL DEFAULT 0,
    COURSE_ID INT REFERENCES COURSES(ID)
);

CREATE TABLE IF NOT EXISTS MEETING_TIMES
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    SECTION_ID INT REFERENCES SECTIONS(ID),
    DAY_OF_WEEK INT,
    START_TIME TIME,
    END_TIME TIME
);

CREATE TABLE IF NOT EXISTS ATTENDANCE_LOGS
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    STUDENT_ID INT REFERENCES USERS(ID),
    SECTION_ID INT REFERENCES SECTIONS(ID),
    DATE_TIME TIMESTAMP,
    EXCUSED BOOLEAN
);

CREATE TABLE IF NOT EXISTS ENROLLMENTS
(
    ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    SECTION_ID INT REFERENCES SECTIONS(ID),
    STUDENT_ID INT REFERENCES USERS(ID)
);