import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        String[] stuff = stuff();
        for (String s : stuff) {
            System.out.println(s);
        }
    }

    public static String[] stuff() {
        List<String> data = new ArrayList<>() {{
            add("one");
            add("two");
            add("three");
        }};

        return data.toArray(new String[0]);
    }
}