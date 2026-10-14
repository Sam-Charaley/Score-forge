// Topic: this, variable scope and static members (Unit 3).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-scope-static-001',
    topic: 'scope-static',
    difficulty: 2,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Ticket {
    private static int issued = 0;
    private int number;

    public Ticket() {
        issued++;
        number = issued;
    }

    public int getNumber() {
        return number;
    }

    public static int getIssued() {
        return issued;
    }
}`,
    code: `Ticket t1 = new Ticket();
Ticket t2 = new Ticket();
Ticket t3 = new Ticket();
System.out.println(t2.getNumber() + " " + Ticket.getIssued());`,
    choices: ['2 3', '3 3', '2 2', '1 3'],
    answer: 0,
    explanation: 'issued is static, so there is one copy shared by every Ticket. Each constructor adds 1 to it and copies the new value into that ticket\'s own number. t2 was the second ticket made, so its number is 2, and after three tickets issued is 3.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-002',
    topic: 'scope-static',
    difficulty: 1,
    prompt: 'The following code segment does not compile. Why?',
    code: `int total = 0;
for (int i = 0; i < 3; i++) {
    int step = i * 2;
    total += step;
}
System.out.println(total + step);`,
    choices: ['total cannot be changed inside the loop', 'step is declared inside the loop, so it does not exist after the loop', 'i cannot be used inside the loop body', 'step must be declared before total'],
    answer: 1,
    explanation: 'A variable exists only inside the block where it is declared. step is declared inside the loop body, so the last line, which is outside the loop, cannot use it. total is declared before the loop, so it is still available afterwards.',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-003',
    topic: 'scope-static',
    difficulty: 3,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Score {
    private int points = 10;

    public int add(int points) {
        points = points + 5;
        return this.points + points;
    }
}`,
    code: `Score s = new Score();
System.out.println(s.add(3));`,
    choices: ['15', '23', '18', '13'],
    answer: 2,
    explanation: 'Inside add, the name points means the parameter, so points = points + 5 changes the parameter from 3 to 8. this.points means the instance variable, which is still 10. The method returns 10 + 8 = 18.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-004',
    topic: 'scope-static',
    difficulty: 2,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Player {
    private static int teamScore = 0;
    private int myScore = 0;

    public void score(int pts) {
        myScore += pts;
        teamScore += pts;
    }

    public int getMyScore() {
        return myScore;
    }

    public static int getTeamScore() {
        return teamScore;
    }
}`,
    code: `Player a = new Player();
Player b = new Player();
a.score(3);
b.score(4);
a.score(2);
System.out.println(a.getMyScore() + " " + b.getMyScore() + " " + Player.getTeamScore());`,
    choices: ['5 4 5', '9 9 9', '5 4 4', '5 4 9'],
    answer: 3,
    explanation: 'Each Player has its own myScore: a gets 3 + 2 = 5 and b gets 4. teamScore is static, so a single copy collects every score: 3 + 4 + 2 = 9.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-005',
    topic: 'scope-static',
    difficulty: 2,
    prompt: 'The following class does not compile. Why?',
    setup: `public class Tally {
    private int count;

    public static void reset() {
        count = 0;
    }
}`,
    choices: ['A static method cannot use the instance variable count', 'count must be declared public', 'reset must return an int', 'count is never given a starting value'],
    answer: 0,
    explanation: 'A static method belongs to the class, not to any one object, so there is no particular object whose count it could change. Static methods can only use static variables and their own parameters directly. Making reset non-static fixes it.',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-006',
    topic: 'scope-static',
    difficulty: 2,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Light {
    private boolean on;

    public Light(boolean on) {
        this.on = on;
    }

    public Light flip() {
        on = !on;
        return this;
    }

    public boolean isOn() {
        return on;
    }
}`,
    code: `Light lamp = new Light(false);
System.out.println(lamp.flip().flip().flip().isOn());`,
    choices: ['false', 'Nothing is printed; flip cannot be called on its own result', 'true', 'Nothing is printed; the code does not compile'],
    answer: 2,
    explanation: 'flip returns this, the same Light it was called on, so the calls can be chained and all three act on one object. Starting from false, three flips give true, false, true.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-007',
    topic: 'scope-static',
    difficulty: 1,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Tax {
    public static final double RATE = 0.05;

    public static double withTax(double price) {
        return price + price * RATE;
    }
}`,
    code: `System.out.println(Tax.withTax(100.0));`,
    choices: ['105', '100.05', '5.0', '105.0'],
    answer: 3,
    explanation: 'A static method is called through the class name, with no object needed. 100.0 * 0.05 is 5.0, and 100.0 + 5.0 is 105.0. The result is a double, so it prints with .0.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-scope-static-008',
    topic: 'scope-static',
    difficulty: 3,
    prompt: 'Consider the following variable and methods. What is printed when the code segment below them is executed?',
    setup: `static int count = 0;

static void bump() {
    int count = 0;
    count++;
}

static void bumpShared() {
    count++;
}`,
    code: `bump();
bump();
bumpShared();
System.out.println(count);`,
    choices: ['3', '1', '0', '2'],
    answer: 1,
    explanation: 'bump declares its own local variable named count, which hides the static one. It changes only that local copy, which disappears when the method ends. Only bumpShared changes the static count, so it ends at 1.',
    verify: 'output',
    reviewed: false,
  },
];
