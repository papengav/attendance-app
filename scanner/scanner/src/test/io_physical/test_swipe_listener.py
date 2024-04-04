# ----------------------------------------------------------------------------------------------
# Name: Johnathan Trachte
# Project: Attendance App - This is a full stack attendance tracking and management software.
# Purpose: Validate functionality of swipe_listener class
# ----------------------------------------------------------------------------------------------

from unittest import TestCase
from src.main.io_physical.swipe_listener import swipe_listener

class test_room_data_hanlder(TestCase):

    # Test object/USB port initialization
    def test_constructor(self):
        sl = swipe_listener()

        self.assertNotEqual(sl.usb, None)

    # Test without NFC card reader attached
    def test_nfc_list_no_reader(self):
        sl = swipe_listener()

        self.assertEqual(sl.nfc_list(), "")

    # Test with NFC card reader attached
    def test_nfc_list_with_reader(self):
        sl = swipe_listener()

        self.assertNotEquals(sl.nfc_list().find("UID"), -1)

    # Test with constant input 1
    def test_scanner_listen_one_card(self):
        sl = swipe_listener()

        self.assertEqual(sl.scanner_listen(), b'1')

    # Test with constant input 0
    def test_scanner_listen_zero_nocard(self):
        sl = swipe_listener()

        self.assertEqual(sl.scanner_listen(), b'0')
