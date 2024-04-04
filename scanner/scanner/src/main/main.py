# ----------------------------------------------------------------------------------------------
# Name: Johnathan Trachte
# Project: Attendance App - This is a full stack attendance tracking and management software.
# Purpose: Handle program startup.
# ----------------------------------------------------------------------------------------------

from src.main.startup.start_manager import start_manager

def main():
    sm = start_manager()
    sm.run()

main()
