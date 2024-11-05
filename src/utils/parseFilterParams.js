const parseBoolean = (value, defaultValue) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  const normalizedValue = value.toLowerCase();
  if (['true', '1', 'yes'].includes(normalizedValue)) {
      return true;
  }
  if (['false', '0', 'no'].includes(normalizedValue)) {
      return false;
  }

  return defaultValue;
};


  export const parseFilterParams = (query) => {
    const { isFavourite } = query;

    const parsedFilter = parseBoolean(isFavourite, 0);


    return {
      isFavourite: parsedFilter,
    };
  };
