------------------------------------------------------------------------------------------------
-- Name: Gavin Papenthien
-- Project: Attendance App - This is a full stack attendance tracking and management software.
-- Purpose: Create mock data to test the API with.
------------------------------------------------------------------------------------------------

INSERT INTO ROLES (NAME) VALUES
('Student'),
('Professor'),
('Administrator');

INSERT INTO USERS (FIRST_NAME, LAST_NAME, STUDENT_CARD_ID, USERNAME, PASSWORD, ROLE_ID) VALUES
('Gavin', 'Papenthien', 'ABC123', 'papengav', 'password123', 1),
('Sam', 'Miller', 'DEF456', 'millerSam', 'pwd456', 1);

INSERT INTO COURSES (NAME, SECTION_COUNT) VALUES
('SE3330', 2);

INSERT INTO SECTIONS (ROOM_NUM, NUM_STUDENTS, COURSE_ID) VALUES
(1, 1, 1);

INSERT INTO ENROLLMENTS (SECTION_ID, STUDENT_ID) VALUES
(1, 1);