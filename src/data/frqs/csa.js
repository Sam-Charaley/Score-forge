// AP CS A free-response practice, one per FRQ type twice over.
// Each part's sample solution replaces its "// part (x)" line in `setup`, and
// `verify` is a test that must print "ALL PASS" (npm run verify:questions).
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.

export const FRQ_TYPES = {
  methods: 'Methods and Control Structures',
  class: 'Class Design',
  arraylist: 'Data Analysis with ArrayList',
  '2d': '2D Array',
};

export default [
  {
    id: 'csa-frq-methods-001',
    type: 'methods',
    title: 'Word game',
    intro: 'A word game scores words by their vowels. All words contain only lowercase letters. You will write two static methods of the WordGame class.',
    setup: `public class WordGame {
    /** Returns the number of vowels (a, e, i, o, u) in word. */
    // part (a)

    /** Returns the word in words with the most vowels.
     *  If several words tie, returns the one that appears first.
     *  Precondition: words.length > 0 */
    // part (b)
}`,
    parts: [
      {
        id: 'a',
        prompt: 'Write the static method countVowels, which returns the number of vowels in word. For example, countVowels("banana") returns 3 and countVowels("rhythm") returns 0.',
        header: 'public static int countVowels(String word)',
        solution: `    public static int countVowels(String word) {
        int count = 0;
        for (int i = 0; i < word.length(); i++) {
            String letter = word.substring(i, i + 1);
            if ("aeiou".indexOf(letter) >= 0) {
                count++;
            }
        }
        return count;
    }`,
        points: [
          { id: 'a1', text: 'Loops over every character of word, with no index going out of bounds' },
          { id: 'a2', text: 'Gets one character at a time, for example with substring(i, i + 1)' },
          { id: 'a3', text: 'Correctly decides whether that character is a vowel (equals or indexOf, not ==)' },
          { id: 'a4', text: 'Counts the vowels and returns the count' },
        ],
      },
      {
        id: 'b',
        prompt: 'Write the static method mostVowels, which returns the word in words with the most vowels. If several words tie, return the one that comes first. You must use countVowels appropriately; assume it works as specified, whatever you wrote in part (a).',
        header: 'public static String mostVowels(String[] words)',
        solution: `    public static String mostVowels(String[] words) {
        String best = words[0];
        for (int i = 1; i < words.length; i++) {
            if (countVowels(words[i]) > countVowels(best)) {
                best = words[i];
            }
        }
        return best;
    }`,
        points: [
          { id: 'b1', text: 'Calls countVowels on the words being compared' },
          { id: 'b2', text: 'Keeps track of the best word so far and replaces it only when a later word has strictly more vowels' },
          { id: 'b3', text: 'Returns the correct word, including the first one in a tie' },
        ],
      },
    ],
    verify: `check(WordGame.countVowels("banana") == 3, "banana");
check(WordGame.countVowels("rhythm") == 0, "rhythm");
check(WordGame.countVowels("aeiou") == 5, "aeiou");
check(WordGame.mostVowels(new String[]{"cat", "audio", "queue"}).equals("audio"), "tie keeps first");
check(WordGame.mostVowels(new String[]{"sky"}).equals("sky"), "single word");
check(WordGame.mostVowels(new String[]{"dog", "idea"}).equals("idea"), "later word wins");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-methods-002',
    type: 'methods',
    title: 'Step challenge',
    intro: 'A fitness app turns daily step counts into points. You will write two static methods of the StepChallenge class.',
    setup: `public class StepChallenge {
    /** Returns the points earned for one day of steps. */
    // part (a)

    /** Returns the total points for a week of step counts.
     *  Precondition: steps.length == 7 */
    // part (b)
}`,
    parts: [
      {
        id: 'a',
        prompt: 'Write pointsForDay. Fewer than 5,000 steps earns 0 points. 5,000 to 9,999 steps earns 1 point. 10,000 or more steps earns 3 points, plus 1 more point for each full 5,000 steps above 10,000. For example, 4,999 steps earns 0, 7,500 earns 1, 10,000 earns 3, 14,999 earns 3, and 20,000 earns 5.',
        header: 'public static int pointsForDay(int steps)',
        solution: `    public static int pointsForDay(int steps) {
        if (steps < 5000) {
            return 0;
        } else if (steps < 10000) {
            return 1;
        } else {
            return 3 + (steps - 10000) / 5000;
        }
    }`,
        points: [
          { id: 'a1', text: 'Returns 0 for fewer than 5,000 steps and 1 for 5,000 to 9,999 (both boundaries correct)' },
          { id: 'a2', text: 'Gives 3 points at 10,000 steps or more' },
          { id: 'a3', text: 'Adds one point per full 5,000 steps above 10,000, using integer division or an equivalent loop' },
          { id: 'a4', text: 'Returns the correct total in every case' },
        ],
      },
      {
        id: 'b',
        prompt: 'Write weekPoints, which returns the sum of pointsForDay for all seven days. If every day has at least 5,000 steps, add a bonus of 5 points. You must use pointsForDay appropriately; assume it works as specified.',
        header: 'public static int weekPoints(int[] steps)',
        solution: `    public static int weekPoints(int[] steps) {
        int total = 0;
        boolean everyDay = true;
        for (int s : steps) {
            total += pointsForDay(s);
            if (s < 5000) {
                everyDay = false;
            }
        }
        if (everyDay) {
            total += 5;
        }
        return total;
    }`,
        points: [
          { id: 'b1', text: 'Calls pointsForDay for each of the seven days and adds the results' },
          { id: 'b2', text: 'Correctly determines whether every day has at least 5,000 steps' },
          { id: 'b3', text: 'Adds the 5-point bonus only in that case and returns the total' },
        ],
      },
    ],
    verify: `check(StepChallenge.pointsForDay(4999) == 0, "4999");
check(StepChallenge.pointsForDay(5000) == 1, "5000");
check(StepChallenge.pointsForDay(7500) == 1, "7500");
check(StepChallenge.pointsForDay(10000) == 3, "10000");
check(StepChallenge.pointsForDay(14999) == 3, "14999");
check(StepChallenge.pointsForDay(20000) == 5, "20000");
check(StepChallenge.weekPoints(new int[]{5000, 6000, 10000, 5000, 5000, 5000, 15000}) == 1 + 1 + 3 + 1 + 1 + 1 + 4 + 5, "bonus week");
check(StepChallenge.weekPoints(new int[]{4999, 6000, 10000, 5000, 5000, 5000, 15000}) == 0 + 1 + 3 + 1 + 1 + 1 + 4, "no bonus");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-class-001',
    type: 'class',
    title: 'Bus pass',
    intro: 'A BusPass stores a number of rides. Write the complete BusPass class, including any instance variables, a constructor, and the methods described. A pass can never hold more than 50 rides.',
    setup: `// Write the complete BusPass class.
// part (a)`,
    parts: [
      {
        id: 'a',
        prompt: `The class must have:
- A constructor that takes the starting number of rides. If it is more than 50, the pass starts with 50.
- takeRide(): if at least one ride is left, uses one and returns true. Otherwise returns false and changes nothing.
- reload(int rides): adds rides to the pass, but never above 50.
- getRidesLeft(): returns the rides left.

Example:
BusPass pass = new BusPass(2);
pass.takeRide();      // returns true, 1 ride left
pass.takeRide();      // returns true, 0 rides left
pass.takeRide();      // returns false, 0 rides left
pass.reload(60);      // 50 rides left (capped)`,
        header: 'public class BusPass',
        solution: `public class BusPass {
    private static final int MAX_RIDES = 50;
    private int ridesLeft;

    public BusPass(int rides) {
        ridesLeft = Math.min(rides, MAX_RIDES);
    }

    public boolean takeRide() {
        if (ridesLeft > 0) {
            ridesLeft--;
            return true;
        }
        return false;
    }

    public void reload(int rides) {
        ridesLeft = Math.min(ridesLeft + rides, MAX_RIDES);
    }

    public int getRidesLeft() {
        return ridesLeft;
    }
}`,
        points: [
          { id: 'a1', text: 'Declares a private instance variable for the rides left' },
          { id: 'a2', text: 'Writes a constructor with the right header that sets rides, capped at 50' },
          { id: 'a3', text: 'takeRide has the correct header and only uses a ride when one is left' },
          { id: 'a4', text: 'takeRide returns true or false correctly' },
          { id: 'a5', text: 'reload has the correct header and adds the rides' },
          { id: 'a6', text: 'reload never lets the total go above 50' },
          { id: 'a7', text: 'getRidesLeft returns the current number of rides' },
        ],
      },
    ],
    verify: `BusPass pass = new BusPass(2);
check(pass.takeRide(), "first ride");
check(pass.takeRide(), "second ride");
check(!pass.takeRide(), "empty pass refuses");
check(pass.getRidesLeft() == 0, "zero left");
pass.reload(60);
check(pass.getRidesLeft() == 50, "reload capped");
check(new BusPass(80).getRidesLeft() == 50, "constructor capped");
BusPass other = new BusPass(48);
other.reload(1);
check(other.getRidesLeft() == 49, "small reload");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-class-002',
    type: 'class',
    title: 'Thermostat',
    intro: 'A Thermostat has a target temperature that can be raised or lowered, and reports what it is doing for a given room temperature. Write the complete Thermostat class.',
    setup: `// Write the complete Thermostat class.
// part (a)`,
    parts: [
      {
        id: 'a',
        prompt: `The class must have:
- A constructor that takes the starting target temperature, an int from 10 to 30.
- raise(): adds 1 to the target, but never above 30.
- lower(): subtracts 1 from the target, but never below 10.
- getTarget(): returns the target.
- status(int roomTemp): returns "heating" if roomTemp is more than 1 degree below the target, "cooling" if it is more than 1 degree above the target, and "idle" otherwise.

Example:
Thermostat t = new Thermostat(21);
t.status(19);   // "heating"
t.status(20);   // "idle"
t.status(23);   // "cooling"`,
        header: 'public class Thermostat',
        solution: `public class Thermostat {
    private static final int MIN_TARGET = 10;
    private static final int MAX_TARGET = 30;
    private int target;

    public Thermostat(int startTarget) {
        target = startTarget;
    }

    public void raise() {
        if (target < MAX_TARGET) {
            target++;
        }
    }

    public void lower() {
        if (target > MIN_TARGET) {
            target--;
        }
    }

    public int getTarget() {
        return target;
    }

    public String status(int roomTemp) {
        if (roomTemp < target - 1) {
            return "heating";
        } else if (roomTemp > target + 1) {
            return "cooling";
        }
        return "idle";
    }
}`,
        points: [
          { id: 'a1', text: 'Declares a private instance variable for the target and sets it in a correct constructor' },
          { id: 'a2', text: 'raise adds 1 but never goes above 30' },
          { id: 'a3', text: 'lower subtracts 1 but never goes below 10' },
          { id: 'a4', text: 'getTarget returns the target' },
          { id: 'a5', text: 'status has the correct header and returns a String' },
          { id: 'a6', text: 'status returns "heating" and "cooling" at the right temperatures (more than 1 degree away)' },
          { id: 'a7', text: 'status returns "idle" within 1 degree, including exactly 1 degree away' },
        ],
      },
    ],
    verify: `Thermostat t = new Thermostat(21);
check(t.status(19).equals("heating"), "heating");
check(t.status(20).equals("idle"), "idle low edge");
check(t.status(22).equals("idle"), "idle high edge");
check(t.status(23).equals("cooling"), "cooling");
Thermostat top = new Thermostat(30);
top.raise();
check(top.getTarget() == 30, "raise capped");
Thermostat bottom = new Thermostat(10);
bottom.lower();
check(bottom.getTarget() == 10, "lower capped");
bottom.raise();
check(bottom.getTarget() == 11, "raise works");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-arraylist-001',
    type: 'arraylist',
    title: 'Playlist cleanup',
    intro: 'A Playlist stores Song objects in an ArrayList. The Song class is shown. You will write one method of the Playlist class.',
    setup: `public class Song {
    private String title;
    private int seconds;

    public Song(String title, int seconds) {
        this.title = title;
        this.seconds = seconds;
    }

    public String getTitle() { return title; }
    public int getSeconds() { return seconds; }
}

public class Playlist {
    private ArrayList<Song> songs;

    public Playlist(ArrayList<Song> songs) {
        this.songs = songs;
    }

    public ArrayList<Song> getSongs() { return songs; }

    /** Removes every song shorter than minSeconds and returns
     *  how many songs were removed. */
    // part (a)
}`,
    parts: [
      {
        id: 'a',
        prompt: 'Write removeShort, which removes every song in songs whose length is less than minSeconds, keeps the other songs in their original order, and returns how many songs were removed.',
        header: 'public int removeShort(int minSeconds)',
        solution: `    public int removeShort(int minSeconds) {
        int removed = 0;
        for (int i = songs.size() - 1; i >= 0; i--) {
            if (songs.get(i).getSeconds() < minSeconds) {
                songs.remove(i);
                removed++;
            }
        }
        return removed;
    }`,
        points: [
          { id: 'a1', text: 'Visits every song in the list, with no index going out of bounds' },
          { id: 'a2', text: 'Gets each song\'s length with getSeconds and compares it to minSeconds correctly' },
          { id: 'a3', text: 'Removes each short song with remove' },
          { id: 'a4', text: 'Does not skip a song after removing one (loops backwards, or does not advance i after a removal)' },
          { id: 'a5', text: 'Counts the removals and returns the count' },
        ],
      },
    ],
    verify: `ArrayList<Song> list = new ArrayList<>();
list.add(new Song("a", 30));
list.add(new Song("b", 20));
list.add(new Song("c", 200));
list.add(new Song("d", 10));
list.add(new Song("e", 90));
Playlist p = new Playlist(list);
check(p.removeShort(60) == 3, "three removed, including two in a row");
check(p.getSongs().size() == 2, "two left");
check(p.getSongs().get(0).getTitle().equals("c") && p.getSongs().get(1).getTitle().equals("e"), "order kept");
check(p.removeShort(10) == 0, "none removed");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-arraylist-002',
    type: 'arraylist',
    title: 'Survey averages',
    intro: 'A Survey stores Response objects in an ArrayList. Each response records which question it answers and a rating from 1 to 5. You will write one method of the Survey class.',
    setup: `public class Response {
    private String question;
    private int rating;

    public Response(String question, int rating) {
        this.question = question;
        this.rating = rating;
    }

    public String getQuestion() { return question; }
    public int getRating() { return rating; }
}

public class Survey {
    private ArrayList<Response> responses;

    public Survey(ArrayList<Response> responses) {
        this.responses = responses;
    }

    /** Returns the average rating of the responses to question,
     *  or 0.0 if there are none. */
    // part (a)
}`,
    parts: [
      {
        id: 'a',
        prompt: 'Write averageFor, which returns the average rating of all responses whose question equals the question parameter. If no responses match, return 0.0.',
        header: 'public double averageFor(String question)',
        solution: `    public double averageFor(String question) {
        int total = 0;
        int count = 0;
        for (Response r : responses) {
            if (r.getQuestion().equals(question)) {
                total += r.getRating();
                count++;
            }
        }
        if (count == 0) {
            return 0.0;
        }
        return (double) total / count;
    }`,
        points: [
          { id: 'a1', text: 'Visits every response in the list' },
          { id: 'a2', text: 'Compares the question with equals, not ==' },
          { id: 'a3', text: 'Adds up the ratings of the matching responses and counts them' },
          { id: 'a4', text: 'Returns 0.0 when nothing matches, with no division by zero' },
          { id: 'a5', text: 'Returns the average as a double, without integer division' },
        ],
      },
    ],
    verify: `ArrayList<Response> list = new ArrayList<>();
list.add(new Response("food", 4));
list.add(new Response("speed", 2));
list.add(new Response("food", 5));
list.add(new Response(new String("food"), 4));
Survey s = new Survey(list);
check(Math.abs(s.averageFor("food") - 13.0 / 3) < 1e-9, "food average is not integer division");
check(s.averageFor("speed") == 2.0, "single match");
check(s.averageFor("price") == 0.0, "no match");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-2d-001',
    type: '2d',
    title: 'Theater seats',
    intro: 'A Theater stores seats in a 2D array of Strings. Each element is the name of the person in that seat, or null if the seat is empty. Row 0 is the front row. You will write one method of the Theater class.',
    setup: `public class Theater {
    private String[][] seats;

    public Theater(String[][] seats) {
        this.seats = seats;
    }

    /** Returns the index of the first row, starting from the front,
     *  that has at least needed empty seats next to each other
     *  in that row, or -1 if no row does.
     *  Precondition: needed > 0 */
    // part (a)
}`,
    parts: [
      {
        id: 'a',
        prompt: 'Write firstRowWithBlock, which returns the index of the first row that has at least needed empty seats in a row (side by side in the same row). Return -1 if no row has such a block. For example, a row of null, "Ana", null, null has a block of 2 empty seats but not 3.',
        header: 'public int firstRowWithBlock(int needed)',
        solution: `    public int firstRowWithBlock(int needed) {
        for (int r = 0; r < seats.length; r++) {
            int run = 0;
            for (int c = 0; c < seats[r].length; c++) {
                if (seats[r][c] == null) {
                    run++;
                    if (run >= needed) {
                        return r;
                    }
                } else {
                    run = 0;
                }
            }
        }
        return -1;
    }`,
        points: [
          { id: 'a1', text: 'Visits rows in order from the front, and every seat in each row, with no index going out of bounds' },
          { id: 'a2', text: 'Checks for an empty seat with == null' },
          { id: 'a3', text: 'Counts empty seats that are next to each other' },
          { id: 'a4', text: 'Resets the count when a seat is taken and at the start of each row' },
          { id: 'a5', text: 'Returns the first row whose block is long enough' },
          { id: 'a6', text: 'Returns -1 when no row has a long enough block' },
        ],
      },
    ],
    verify: `String[][] seats = {
    {"Ana", null, "Bo", null},
    {null, "Cy", null, null},
    {null, null, null, "Di"},
    {null, "Ed", null, null}
};
Theater t = new Theater(seats);
check(t.firstRowWithBlock(1) == 0, "single seat in front row");
check(t.firstRowWithBlock(2) == 1, "pair at the end of row 1");
check(t.firstRowWithBlock(3) == 2, "three in row 2");
check(t.firstRowWithBlock(4) == -1, "no block of four");
String[][] split = {{null, null, "X"}, {null, "Y", "Z"}};
check(new Theater(split).firstRowWithBlock(3) == -1, "a run does not carry over to the next row");`,
    reviewed: false,
  },
  {
    id: 'csa-frq-2d-002',
    type: '2d',
    title: 'Heat map hot spots',
    intro: 'A HeatMap stores temperatures in a 2D int array. A hot spot is a cell whose value is strictly greater than each of its neighbours directly above, below, left and right. Cells on an edge or corner have fewer neighbours, and only the neighbours that exist are compared. You will write one method of the HeatMap class.',
    setup: `public class HeatMap {
    private int[][] temps;

    public HeatMap(int[][] temps) {
        this.temps = temps;
    }

    /** Returns the number of hot spots in temps. */
    // part (a)
}`,
    parts: [
      {
        id: 'a',
        prompt: 'Write countHotSpots, which returns how many cells in temps are hot spots. Every cell is checked, including those on the edges. A single-cell array has one hot spot, since that cell has no neighbours.',
        header: 'public int countHotSpots()',
        solution: `    public int countHotSpots() {
        int count = 0;
        for (int r = 0; r < temps.length; r++) {
            for (int c = 0; c < temps[r].length; c++) {
                int v = temps[r][c];
                boolean hot = true;
                if (r > 0 && temps[r - 1][c] >= v) hot = false;
                if (r < temps.length - 1 && temps[r + 1][c] >= v) hot = false;
                if (c > 0 && temps[r][c - 1] >= v) hot = false;
                if (c < temps[r].length - 1 && temps[r][c + 1] >= v) hot = false;
                if (hot) {
                    count++;
                }
            }
        }
        return count;
    }`,
        points: [
          { id: 'a1', text: 'Visits every cell with nested loops and no index going out of bounds' },
          { id: 'a2', text: 'Compares each cell with the neighbours above and below, only when they exist' },
          { id: 'a3', text: 'Compares each cell with the neighbours to the left and right, only when they exist' },
          { id: 'a4', text: 'Uses strictly greater (an equal neighbour means it is not a hot spot)' },
          { id: 'a5', text: 'Counts a cell only when it beats every existing neighbour' },
          { id: 'a6', text: 'Returns the count' },
        ],
      },
    ],
    verify: `int[][] grid = {
    {5, 1, 4},
    {2, 3, 2},
    {9, 3, 8}
};
check(new HeatMap(grid).countHotSpots() == 4, "corners 5, 4, 9, 8");
check(new HeatMap(new int[][]{{7}}).countHotSpots() == 1, "single cell");
check(new HeatMap(new int[][]{{3, 3}}).countHotSpots() == 0, "ties are not hot spots");
check(new HeatMap(new int[][]{{1, 2, 1}, {2, 9, 2}}).countHotSpots() == 1, "middle peak");`,
    reviewed: false,
  },
];
