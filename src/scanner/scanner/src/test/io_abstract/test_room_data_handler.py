# ----------------------------------------------------------------------------------------------
# Name: Johnathan Trachte
# Project: Attendance App - This is a full stack attendance tracking and management software.
# Purpose: Validate functionality of room_data_handler class
# ----------------------------------------------------------------------------------------------

from unittest import TestCase
from src.main.io_abstract.room_data_handler import room_data_handler

class test_room_data_hanlder(TestCase):

    # Test incorrectly formatted file
    def test_read_room_num_bad_format(self):
        rd_handle = room_data_handler()

        room_num = rd_handle.read_room_num("roomDataBad.txt")
        self.assertEqual(room_num,-1)


    # Test correctly formatted file
    def test_read_room_num_correct_format(self):
        rd_handle = room_data_handler()

        room_num = rd_handle.read_room_num("roomData.txt")
        self.assertEqual(room_num,3)