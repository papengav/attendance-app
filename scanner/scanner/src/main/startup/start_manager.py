# ----------------------------------------------------------------------------------------------
# Name: Johnathan Trachte
# Project: Attendance App - This is a full stack attendance tracking and management software.
# Purpose: Manage instantiations and hold reused objects.
# ----------------------------------------------------------------------------------------------

from src.main.io_abstract.msg_sender import msg_sender
from src.main.io_abstract.room_data_handler import room_data_handler
from src.main.io_physical.swipe_listener import swipe_listener
from src.main.message_assembly.swipe_msg_assembler import swipe_msg_assembler
from src.main.parse.swipe_parser import swipe_parser

class start_manager:

    room_data_h = room_data_handler()       # room_data_handler to be reused by class
    room_num = -1                           # Room number of this scanner (-1 indicates value not found)
    swipe_listen = swipe_listener()         # swipe_listener to be reused by class
    swipe_p = swipe_parser()                # swipe_parser to be reused by class
    swipe_assembler = swipe_msg_assembler() # swipe_msg_assembler to be reused by class
    sender = msg_sender()                   # msg_sender to be reused by class

    # Main loop function to scan NFC tags, parse the data, and handle POST requests
    def run(self):
        self.room_num = self.room_data_h.read_room_num("roomData.txt")
        if (-1 == self.room_num):
            exit("Room number error")

        # start a swipe listener
        # start a swipe parser

        # while(true)
        while (True):
            card_ready = self.swipe_listen.scanner_listen()

        # if 0
            if (b'0' == card_ready):
                continue
        #    nothing
        # if 1
            elif (b'1' == card_ready):
                http_resp = self.handle_card()
                if (http_resp != -1):
                    print("New http response:  ", http_resp)

            elif (-1 == card_ready):
                break

    def handle_card(self):
            # call nfc-list
            card_data = self.swipe_listen.nfc_list()
            if (-1 == card_data.find("UID")):
                return -1

            print("\n\nCARD DATA\n", card_data, "\n\n")

            # parse returned string
            uid = self.swipe_p.parse_string(card_data)
            print("\n\nUID\n", uid, "\n\n")

            # form info into a JSON string message
            message = self.swipe_assembler.assemble_msg(uid, self.room_num)
            print("\n\nURL\n", message[0], "\n\n")

            # send message
            http_resp = self.sender.send_message(message)
            return http_resp
