import { fromJS } from 'immutable';

const AssetTypes = [
  {
    Id: 1,
    Type: 'Cash and Investments',
  },
  {
    Id: 2,
    Type: 'Long Term Assets',
  }
];

const LiabilityTypes = [
  {
    Id: 1,
    Type: 'Short Term Liabilties',
  },
  {
    Id: 2,
    Type: 'Long Term Debt',
  }
];

const Assets = [
  {
    TypeId: 1,
    Name: 'Chequing',
    Amount: 2000
  },
  {
    TypeId: 1,
    Name: 'Savings for Taxes',
    Amount: 4000
  },
  {
    TypeId: 1,
    Name: 'Rainy Day Fund',
    Amount: 506
  },
  {
    TypeId: 1,
    Name: 'Savings for Fun',
    Amount: 5000
  },
  {
    TypeId: 1,
    Name: 'Savings for Travel',
    Amount: 400
  },
  {
    TypeId: 1,
    Name: 'Savings for Personal Development',
    Amount: 200
  },
  {
    TypeId: 1,
    Name: 'Investment 1',
    Amount: 5000
  },
  {
    TypeId: 1,
    Name: 'Investment 2',
    Amount: 60000
  },
  {
    TypeId: 1,
    Name: 'Investment 3',
    Amount: 30000
  },
  {
    TypeId: 1,
    Name: 'Investment 4',
    Amount: 50000
  },
  {
    TypeId: 1,
    Name: 'Investment 5',
    Amount: 24000
  },
  {
    TypeId: 2,
    Name: 'Primary Home',
    Amount: 455000
  },
  {
    TypeId: 2,
    Name: 'Second Home',
    Amount: 1564321
  },
  {
    TypeId: 2,
    Name: 'Other',
    Amount: null
  }
];

const Liabilites = [
  {
    TypeId: 2,
    Name: 'Mortgage 1',
    Amount: 250999
  },
  {
    TypeId: 2,
    Name: 'Mortgage 2',
    Amount: 632634
  },
  {
    TypeId: 1,
    Name: 'Credit Card 1',
    Amount: 4342
  },
  {
    TypeId: 1,
    Name: 'Credit Card 2',
    Amount: 322
  },
  {
    TypeId: 2,
    Name: 'Line of Credit',
    Amount: 10000
  },
  {
    TypeId: 2,
    Name: 'Investment Loan',
    Amount: 10000
  },
  {
    TypeId: 2,
    Name: 'Student Loan',
    Amount: null
  },
  {
    TypeId: 2,
    Name: 'Car Loan',
    Amount: null
  },
];

const NetWorth = {
  TotalAssets: 0,
  TotalLiabilites: 0,
  NetWorth: 0
};

export const netWorth = {
  AssetTypes: AssetTypes,
  LiabilityTypes: LiabilityTypes,
  Assets: Assets,
  Liabilites: Liabilites,
  NetWorth
};

export const getDefaultState = () => {
  const defaultState = {
    netWorth
  };

  return fromJS(defaultState);
};