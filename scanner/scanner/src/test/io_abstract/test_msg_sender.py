# ----------------------------------------------------------------------------------------------
# Name: Johnathan Trachte
# Project: Attendance App - This is a full stack attendance tracking and management software.
# Purpose: Validate functionality of msg_sender class.
#
# Notes:
# - For use with Attendance App API running
# - Requires an entry for "c0  45  4b  12"
# ----------------------------------------------------------------------------------------------

from unittest import TestCase
from src.main.io_abstract.msg_sender import msg_sender

class test_msg_sender(TestCase):

    # Test message with faulty data
    def test_send_message_bad_data(self):
        sender = msg_sender()

        url     = "http://localhost:8080/attendancelogs"
        header  = { "Content-Type": "application/json" }
        data    = "gabagoo"
        msg_data = (url, header, data)

        self.assertEquals(sender.send_message(msg_data), 400)

    # Test valid message
    def test_send_message_valid(self):
        sender = msg_sender()

        url         = "http://localhost:8080/attendancelogs"
        header      = { "Content-Type": "application/json" }
        uid         = "c0  45  4b  12"
        room_num    = -1
        data        = { "studentCardId":uid, "roomNum":room_num }

        self.assertEquals(sender.send_message(url, header, data), 400)