const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parseNumber = parseInt(number);

  if (Number.isNaN(parseNumber)) {
    return defaultValue;
  }
  return parseNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 9);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
