import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../contacts/index.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
    userId,
    }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
    const query ={ userId };

    if (filter.contactType) {
        query.contactType = filter.contactType;
    }
    if (typeof filter.isFavourite === 'boolean') {
        query.isFavourite = filter.isFavourite;
    }

const [contactsCount, contacts] = await Promise.all([
ContactsCollection.countDocuments(query),
    ContactsCollection.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
        ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
return ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
    return ContactsCollection.create(payload);
};

export const updateContact = async (contactId, payload, userId) => {
    return ContactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        { new: true }
    );
};

export const deleteContact = async (contactId, userId) => {
return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};
