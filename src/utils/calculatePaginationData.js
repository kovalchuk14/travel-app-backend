import createHttpError from 'http-errors';

export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(page < totalPages);
  const hasPreviousPage = page !== 1;

  if (count === 0) {
    throw createHttpError(404, 'Items not found');
  }

  if (page > totalPages) {
    throw createHttpError(400, 'Page number exceeds total pages');
  }


  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,

  };
};
