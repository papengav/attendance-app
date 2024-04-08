# ----------------------------------------------------------------------------------------------
# Name: Johnathan Trachte
# Project: Attendance App - This is a full stack attendance tracking and management software.
# Purpose: Validate functionality of swipe_parser class
# ----------------------------------------------------------------------------------------------

from unittest import TestCase
from src.main.parse.swipe_parser import swipe_parser

class test_swipe_parser(TestCase):

    # Test parse_string with data containing correct string
    def test_parse_string_contains_uid(self):
        sp = swipe_parser()

        input_str = "UID (NFCID1): ab  cd  ef  01 gabagoo"
        searching_uid = "abcdef01"

        self.assertEqual(sp.parse_string(input_str), searching_uid)

    # Test parse_string with data not containing correct string
    def test_parse_string_no_uid(self):
        sp = swipe_parser()

        input_str = "hamburgercheeseburgerbigmacwhopper hamburgercheeseburgerbigmacwhopper"

        self.assertNotEqual(sp.parse_string(input_str), "")

