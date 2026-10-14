// Topic: writing classes and constructors (Unit 3). Feeds FRQ 2, Class Design.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-classes-001',
    topic: 'classes',
    difficulty: 1,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Counter {
    private int count;

    public Counter(int start) {
        count = start;
    }

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}`,
    code: `Counter c = new Counter(3);
c.increment();
c.increment();
System.out.println(c.getCount());`,
    choices: ['2', '5', '3', '4'],
    answer: 1,
    explanation: 'The constructor sets count to 3. Each call to increment adds 1, so after two calls count is 5. getCount returns the current value of the instance variable.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-classes-002',
    topic: 'classes',
    difficulty: 2,
    prompt: 'Consider the Counter class shown. What is printed when the code segment below it is executed?',
    setup: `public class Counter {
    private int count;

    public Counter(int start) {
        count = start;
    }

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}`,
    code: `Counter a = new Counter(0);
Counter b = a;
b.increment();
a.increment();
System.out.println(a.getCount() + " " + b.getCount());`,
    choices: ['1 1', '1 2', '2 1', '2 2'],
    answer: 3,
    explanation: 'Counter b = a copies the reference, not the object. a and b both refer to the same single Counter, so both increment calls change the same count. Reading it through either variable gives 2.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-classes-003',
    topic: 'classes',
    difficulty: 3,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Point {
    private int x;
    private int y;

    public Point(int x, int y) {
        x = x;
        this.y = y;
    }

    public String show() {
        return "(" + x + ", " + y + ")";
    }
}`,
    code: `Point p = new Point(3, 4);
System.out.println(p.show());`,
    choices: ['(0, 4)', '(3, 4)', '(0, 0)', '(3, 0)'],
    answer: 0,
    explanation: 'Inside the constructor, the parameter x hides the instance variable x, so x = x just assigns the parameter to itself. The instance variable keeps its default value 0. this.y = y does set the instance variable, so y is 4. Write this.x = x to fix it.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-classes-004',
    topic: 'classes',
    difficulty: 1,
    prompt: 'Which of the following is a correct header for a constructor of a class named Book?',
    choices: ['public void Book(String title)', 'public Book Book(String title)', 'public Book(String title)', 'public book(String title)'],
    answer: 2,
    explanation: 'A constructor has the same name as the class, spelled exactly the same way, and no return type, not even void. Adding void or Book before the name turns it into an ordinary method, and Java names are case-sensitive, so book is not Book.',
    reviewed: false,
  },
  {
    id: 'csa-classes-005',
    topic: 'classes',
    difficulty: 2,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Box {
    private int size;

    public Box(int s) {
        size = s;
    }

    public void grow(int amount) {
        size += amount;
        amount = 0;
    }

    public int getSize() {
        return size;
    }
}`,
    code: `Box b = new Box(5);
int n = 3;
b.grow(n);
System.out.println(b.getSize() + " " + n);`,
    choices: ['8 3', '8 0', '5 3', '5 0'],
    answer: 0,
    explanation: 'grow adds 3 to size, so size becomes 8. The parameter amount is a copy of n, so setting amount to 0 inside the method changes only the copy. n is still 3 afterwards. A primitive passed to a method can never be changed by that method.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-classes-006',
    topic: 'classes',
    difficulty: 2,
    prompt: 'Consider the Box class shown. What is printed when the code segment below it is executed?',
    setup: `public class Box {
    private int size;

    public Box(int s) {
        size = s;
    }

    public void grow(int amount) {
        size += amount;
        amount = 0;
    }

    public int getSize() {
        return size;
    }
}`,
    code: `Box a = new Box(4);
Box b = new Box(4);
Box c = a;
System.out.println((a == b) + " " + (a == c));`,
    choices: ['true true', 'false false', 'false true', 'true false'],
    answer: 2,
    explanation: '== on objects compares references, meaning whether two variables point at the same object. a and b are two separate objects that happen to hold the same size, so a == b is false. c was assigned a, so a == c is true.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-classes-007',
    topic: 'classes',
    difficulty: 3,
    prompt: 'Consider the following class. What is printed when the code segment below it is executed?',
    setup: `public class Account {
    private double balance;

    public Account(double start) {
        balance = start;
    }

    public boolean withdraw(double amount) {
        if (amount > balance) {
            return false;
        }
        balance -= amount;
        return true;
    }

    public double getBalance() {
        return balance;
    }
}`,
    code: `Account acct = new Account(50.0);
boolean first = acct.withdraw(30.0);
boolean second = acct.withdraw(30.0);
System.out.println(first + " " + second + " " + acct.getBalance());`,
    choices: ['true true -10.0', 'true false 20.0', 'true false 50.0', 'true true 20.0'],
    answer: 1,
    explanation: 'The first withdrawal is allowed: 30 is not more than 50, so balance becomes 20.0 and true is returned. The second asks for 30 when only 20 is left, so return false runs before balance is changed. A return ends the method right away.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-classes-008',
    topic: 'classes',
    difficulty: 2,
    prompt: 'Consider the Counter class shown. Which line of this client code causes a compile error?',
    setup: `public class Counter {
    private int count;

    public Counter(int start) {
        count = start;
    }

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}`,
    code: `Counter c = new Counter(1);   // line 1
c.increment();                // line 2
c.count = 5;                  // line 3
int n = c.getCount();         // line 4`,
    choices: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
    answer: 2,
    fixedOrder: true,
    explanation: 'count is declared private, so only code inside the Counter class can use it directly. Client code has to go through public methods like increment and getCount. The other three lines only use the public constructor and methods.',
    reviewed: false,
  },
];
