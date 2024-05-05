//----------------------------------------------------------------------------------------------
// Name: Gavin Papenthien
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Command Pattern Invoker to store Command Stacks.
//----------------------------------------------------------------------------------------------

package attendanceapp.api.command;

import org.springframework.stereotype.Service;

import java.util.Stack;

//---------------------------------------------------------------
// Command Pattern Invoker to store Command Stacks.
//---------------------------------------------------------------
@Service
public class Invoker {
    public final Stack<Command> done;
    public final Stack<Command> unDone;

    public Invoker() {
        done = new Stack<>();
        unDone = new Stack<>();
    }
}
