// AP Macroeconomics, Unit 6: the current account, the capital and
// financial account, and how international transactions are recorded.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// One year of international transactions for Country Z, billions of dollars.
const FLOWS = {
  goodsExports: 300, goodsImports: 400, netInvestmentIncome: 20, netTransfers: -10,
  foreignPurchasesOfZAssets: 150, zPurchasesOfForeignAssets: 60,
};
const FLOWS_TABLE = {
  type: 'table',
  caption: 'Country Z international transactions (billions of dollars)',
  columns: ['Transaction', 'Amount'],
  rows: [
    ['Exports of goods and services', FLOWS.goodsExports],
    ['Imports of goods and services', FLOWS.goodsImports],
    ['Net investment income from abroad', FLOWS.netInvestmentIncome],
    ['Net transfers', FLOWS.netTransfers],
    ['Foreign purchases of Country Z assets', FLOWS.foreignPurchasesOfZAssets],
    ['Country Z purchases of foreign assets', FLOWS.zPurchasesOfForeignAssets],
  ],
  alt: 'Table of Country Z international transactions in billions of dollars: exports 300, imports 400, net investment income from abroad 20, net transfers negative 10, foreign purchases of Country Z assets 150, and Country Z purchases of foreign assets 60.',
};
const currentAccount = () => FLOWS.goodsExports - FLOWS.goodsImports + FLOWS.netInvestmentIncome + FLOWS.netTransfers;
const financialAccount = () => FLOWS.foreignPurchasesOfZAssets - FLOWS.zPurchasesOfForeignAssets;

export default [
  {
    id: 'macro-balance-of-payments-001',
    topic: 'balance-of-payments',
    formulas: ['balance-of-payments'],
    difficulty: 2,
    prompt: 'Based on the table, what is Country Z\'s current account balance, in billions of dollars?',
    figure: FLOWS_TABLE,
    choices: ['−100', '+90', '−90', '−80'],
    answer: 2,
    explanation: 'The current account includes trade in goods and services, net investment income and net transfers: 300 − 400 + 20 − 10 = −90. −100 is only the balance of trade, leaving out income and transfers. Asset purchases belong in the financial account.',
    verify: 'numeric',
    solve: currentAccount,
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-002',
    topic: 'balance-of-payments',
    formulas: ['balance-of-payments'],
    difficulty: 2,
    prompt: 'Based on the table, what is Country Z\'s capital and financial account balance, in billions of dollars?',
    figure: FLOWS_TABLE,
    choices: ['+90', '−90', '+210', '+150'],
    answer: 0,
    explanation: 'Foreign purchases of Country Z assets bring funds in (+150), and Country Z purchases of foreign assets send funds out (−60), for a balance of +90. It exactly offsets the current account deficit of −90, as the balance of payments requires.',
    verify: 'numeric',
    solve: financialAccount,
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-003',
    topic: 'balance-of-payments',
    difficulty: 1,
    prompt: 'A U.S. company buys a factory in Germany. How is this recorded in the U.S. balance of payments?',
    choices: [
      'As an import in the current account',
      'As an outflow (debit) in the capital and financial account',
      'As an inflow (credit) in the capital and financial account',
      'As an export in the current account',
    ],
    answer: 1,
    explanation: 'Buying a foreign asset is foreign direct investment by the United States: money flows out to buy an asset, so it is a debit in the financial account. It is not trade in goods or services.',
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-004',
    topic: 'balance-of-payments',
    difficulty: 1,
    prompt: 'A tourist from Japan pays for hotel rooms and meals while visiting the United States. In the U.S. balance of payments, this is',
    choices: [
      'a debit in the current account',
      'a credit in the capital and financial account',
      'a debit in the capital and financial account',
      'a credit in the current account',
    ],
    answer: 3,
    explanation: 'Services sold to foreigners are U.S. exports, even when the foreigner buys them inside the United States. Exports are credits in the current account.',
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-005',
    topic: 'balance-of-payments',
    formulas: ['balance-of-payments'],
    difficulty: 2,
    prompt: 'A country has a current account deficit. Assuming no official reserve transactions, what must be true of its capital and financial account?',
    choices: [
      'It has a surplus of the same size.',
      'It has a deficit of the same size.',
      'It is balanced at zero.',
      'It has a surplus twice as large.',
    ],
    answer: 0,
    explanation: 'The balance of payments sums to zero: CA + CFA = 0. A country that buys more goods and services from abroad than it sells pays for the difference by selling assets to foreigners or borrowing from them, a financial account surplus.',
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-006',
    topic: 'balance-of-payments',
    difficulty: 2,
    prompt: 'A U.S. resident receives dividend payments from shares she owns in a Canadian company. How is this recorded in the U.S. balance of payments?',
    choices: [
      'As a credit in the capital and financial account',
      'As a debit in the current account',
      'As a credit in the current account',
      'It is not recorded, because no asset changed hands.',
    ],
    answer: 2,
    explanation: 'Investment income (interest and dividends) earned from abroad is part of the current account, as a credit. Buying the shares in the first place was a financial account transaction, but the income they pay is not.',
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-007',
    topic: 'balance-of-payments',
    formulas: ['net-exports'],
    difficulty: 1,
    prompt: 'A country exports $200 billion of goods and services and imports $260 billion. Its net exports are',
    choices: ['−60 billion', '+60 billion', '+460 billion', '−460 billion'],
    answer: 0,
    explanation: 'Net exports = exports − imports = 200 − 260 = −60 billion, a trade deficit. Net exports are negative whenever imports exceed exports.',
    verify: 'numeric',
    solve: () => 200 - 260,
    reviewed: false,
  },
  {
    id: 'macro-balance-of-payments-008',
    topic: 'balance-of-payments',
    difficulty: 3,
    prompt: 'Real interest rates in the United States rise relative to those in other countries. What is the most likely effect on the U.S. capital and financial account and on the U.S. current account?',
    choices: [
      'Financial account moves toward deficit; current account moves toward surplus',
      'Both move toward surplus',
      'Both move toward deficit',
      'Financial account moves toward surplus; current account moves toward deficit',
    ],
    answer: 3,
    explanation: 'Higher U.S. rates attract foreign saving into U.S. assets, a capital inflow that moves the financial account toward surplus. Buying dollars to make these purchases appreciates the dollar, which makes U.S. exports more expensive and imports cheaper, moving the current account toward deficit.',
    reviewed: false,
  },
];
