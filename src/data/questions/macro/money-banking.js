// AP Macroeconomics, Unit 4: functions and measures of money, bank balance
// sheets, reserves and money creation by the banking system.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// One bank's balance sheet; the reserve requirement is 10%.
const BANK = { reserves: 50000, loans: 150000, deposits: 200000 };
const RESERVE_REQUIREMENT = 0.1;
const BALANCE_SHEET = {
  type: 'table',
  caption: 'First Bank balance sheet (reserve requirement 10%)',
  columns: ['Assets', 'Asset value ($)', 'Liabilities', 'Liability value ($)'],
  rows: [
    ['Reserves', BANK.reserves, 'Demand deposits', BANK.deposits],
    ['Loans', BANK.loans, '', ''],
  ],
  alt: 'Balance sheet for First Bank with a 10 percent reserve requirement. Assets: reserves of $50,000 and loans of $150,000. Liabilities: demand deposits of $200,000.',
};
const requiredReserves = () => BANK.deposits * RESERVE_REQUIREMENT;
const excessReserves = () => BANK.reserves - requiredReserves();

export default [
  {
    id: 'macro-money-banking-001',
    topic: 'money-banking',
    difficulty: 1,
    prompt: 'A shopper compares the prices of two jackets listed at $80 and $120. Which function of money does this illustrate?',
    choices: ['Medium of exchange', 'Store of value', 'Unit of account', 'Standard of deferred payment'],
    answer: 2,
    explanation: 'Money as a unit of account gives a common measure for comparing the values of different goods. Paying for the jacket would be using money as a medium of exchange, and saving money for later is a store of value.',
    reviewed: false,
  },
  {
    id: 'macro-money-banking-002',
    topic: 'money-banking',
    difficulty: 1,
    prompt: 'Which of the following is included in the M1 measure of the money supply?',
    choices: [
      'Currency held by the public',
      'The unused credit limit on a credit card',
      'Shares of corporate stock',
      'U.S. Treasury bonds held by households',
    ],
    answer: 0,
    explanation: 'M1 is the most liquid money: currency in circulation and checkable (demand) deposits. A credit card is a way to borrow, not money. Stocks and bonds are financial assets that must be sold before they can be spent.',
    reviewed: false,
  },
  {
    id: 'macro-money-banking-003',
    topic: 'money-banking',
    formulas: ['required-reserves'],
    difficulty: 1,
    prompt: 'Based on First Bank\'s balance sheet, what is the amount of its required reserves, in dollars?',
    figure: BALANCE_SHEET,
    choices: ['5,000', '15,000', '20,000', '50,000'],
    answer: 2,
    explanation: 'Required reserves are a share of deposits: 10% × $200,000 = $20,000. 50,000 is the bank\'s total reserves, and 15,000 takes 10% of loans instead of deposits.',
    verify: 'numeric',
    solve: requiredReserves,
    reviewed: false,
  },
  {
    id: 'macro-money-banking-004',
    topic: 'money-banking',
    formulas: ['required-reserves'],
    difficulty: 2,
    prompt: 'Based on First Bank\'s balance sheet, what is the maximum amount First Bank can lend right now, in dollars?',
    figure: BALANCE_SHEET,
    choices: ['20,000', '30,000', '50,000', '300,000'],
    answer: 1,
    explanation: 'A single bank can lend only its excess reserves: total reserves minus required reserves = $50,000 − $20,000 = $30,000. 300,000 is the most the whole banking system could create from those excess reserves, not what one bank can lend.',
    verify: 'numeric',
    solve: excessReserves,
    reviewed: false,
  },
  {
    id: 'macro-money-banking-005',
    topic: 'money-banking',
    formulas: ['money-multiplier', 'deposit-change'],
    difficulty: 2,
    prompt: 'Based on First Bank\'s balance sheet, if First Bank lends all of its excess reserves, what is the maximum possible increase in the money supply for the banking system as a whole, in dollars?',
    figure: BALANCE_SHEET,
    choices: ['30,000', '200,000', '500,000', '300,000'],
    answer: 3,
    explanation: 'The money multiplier is 1/0.10 = 10, so $30,000 of excess reserves can become at most $30,000 × 10 = $300,000 of new money as loans are re-deposited and re-lent. 500,000 multiplies total reserves, including the required part, which cannot be lent.',
    verify: 'numeric',
    solve: () => excessReserves() / RESERVE_REQUIREMENT,
    reviewed: false,
  },
  {
    id: 'macro-money-banking-006',
    topic: 'money-banking',
    formulas: ['deposit-change'],
    difficulty: 3,
    prompt: 'The reserve requirement is 20%. A person deposits $1,000 of cash, which she had kept at home, into her checking account. What is the maximum possible change in the money supply, in dollars?',
    choices: ['800', '5,000', '1,000', '4,000'],
    answer: 3,
    explanation: 'The deposit itself only moves $1,000 from currency to checkable deposits, so M1 does not change at first. The bank must keep $200 and can lend $800 in excess reserves. With a money multiplier of 1/0.20 = 5, new loans can create at most $800 × 5 = $4,000. 5,000 multiplies the whole deposit.',
    verify: 'numeric',
    solve: () => 1000 * (1 - 0.2) * (1 / 0.2),
    reviewed: false,
  },
  {
    id: 'macro-money-banking-007',
    topic: 'money-banking',
    formulas: ['money-multiplier', 'deposit-change'],
    difficulty: 2,
    prompt: 'The reserve requirement is 10%. The Federal Reserve buys $10 million of government bonds from a commercial bank. What is the maximum possible increase in the money supply, in millions of dollars?',
    choices: ['100', '90', '10', '1'],
    answer: 0,
    explanation: 'The Fed pays the bank with new reserves, and since no deposit was created, all $10 million is excess reserves. Multiplied by 1/0.10 = 10, the money supply can rise by up to $100 million. 90 subtracts required reserves as if a $10 million deposit had been made, and 10 ignores the multiplier.',
    verify: 'numeric',
    solve: () => 10 * (1 / RESERVE_REQUIREMENT),
    reviewed: false,
  },
  {
    id: 'macro-money-banking-008',
    topic: 'money-banking',
    difficulty: 3,
    prompt: 'Which of the following would make the actual increase in the money supply smaller than the amount predicted by the money multiplier?',
    choices: [
      'Banks lend out all of their excess reserves.',
      'Borrowers keep part of their loans as cash instead of depositing it.',
      'The reserve requirement is lowered.',
      'The Federal Reserve buys government bonds.',
    ],
    answer: 1,
    explanation: 'The money multiplier assumes every loan is re-deposited in full and banks lend all excess reserves. Cash kept outside banks (a currency drain) is never re-lent, so less money is created. Lending all excess reserves is the assumption itself, and a lower reserve requirement makes the multiplier larger.',
    reviewed: false,
  },
];
