package attendanceapp.api.command;

import org.springframework.stereotype.Service;

import java.util.Stack;

@Service
public class Invoker {
    public final Stack<Command> done;
    public final Stack<Command> unDone;

    public Invoker() {
        done = new Stack<>();
        unDone = new Stack<>();
    }

    public boolean undo() {
        boolean undo = false;

        if (!done.isEmpty()) {
            Command command = done.pop();
            command.unExecute();
            unDone.push(command);
            undo = true;
        }

        return undo;
    }

    public boolean redo() {
        boolean redo = false;

        if (!unDone.isEmpty()) {
            Command command = unDone.pop();
            command.execute();
            done.push(command);
            redo = true;
        }

        return redo;
    }
}
