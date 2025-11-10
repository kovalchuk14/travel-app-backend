const allowedCategories = [
  '68fb50c80ae91338641121f0', // Азія
  '68fb50c80ae91338641121f1', // Гори
  '68fb50c80ae91338641121f2', // Європа
  '68fb50c80ae91338641121f3', // Америка
  '68fb50c80ae91338641121f4', // Африка
  '68fb50c80ae91338641121f6', // Пустелі
  '68fb50c80ae91338641121f7', // Балкани
  '68fb50c80ae91338641121f8', // Кавказ
  '68fb50c80ae91338641121f9', // Океанія
];

const parseCategory = (categoryId) => {
  const isString = typeof categoryId === 'string';
  if (!isString) return;

  return allowedCategories.includes(categoryId) ? categoryId : undefined;
};

export const parseFilterParams = (query) => {
  const { category } = query;

  const parsedCategory = parseCategory(category);

  return { category: parsedCategory };
};
