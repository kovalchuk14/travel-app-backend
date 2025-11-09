import createHttpError from 'http-errors';

export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page !== 1;
  const hasNextPage = Boolean(totalPages - page);

  if (count === 0) {
    throw createHttpError(404, 'Contacts not found');
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
