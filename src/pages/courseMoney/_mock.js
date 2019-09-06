import { parse } from 'url';

// mock tableListDataSource
const tableListDataSource = [];

for (let i = 0; i < 8; i += 1) {
  tableListDataSource.push({
    key: i,
    year: Math.floor(Math.random() * 1000),
    semester: `暑期${i}`,
    name: `TradeCode ${i}`,
    id: i,
    classNum: Math.floor(Math.random() * 10) % 4,
    income: Math.ceil(Math.random() * 100),
  });
}

function getRule(req, res, u) {
  let url = u;

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = parse(url, true).query;
  const dataSource = tableListDataSource;

  let pageSize = 10;

  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1,
    },
  };
  return res.json(result);
}

export default {
  'GET /api/courseMoney': getRule,
  'POST /api/courseMoney': getRule,
};
