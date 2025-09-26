const parseType = (contactType) => {
  return typeof contactType === 'string' ? contactType : undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return undefined;
  if (isFavourite.toLowerCase() === 'true') return true;
  if (isFavourite.toLowerCase() === 'false') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
    const parsedContactType = parseType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
     isFavourite: parsedIsFavourite,
    };
};
