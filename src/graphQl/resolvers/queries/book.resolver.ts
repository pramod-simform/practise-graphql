import { getColorBooks } from "../../../db/services/colorBook.service.js";
import { getTextBooks } from "../../../db/services/textbook.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";

export const BookResolver = {
  getBooks: async (_: any, args: any) => {
    const TextBooks = await getTextBooks({
      where: {},
    });

    const ColorBooks = await getColorBooks({
      where: {},
    });

    return [...TextBooks, ...ColorBooks];
  },
};

const _bookFieldResolver = {
  author: async (parent: any) => {
    const { authorId } = parent;

    return await getUserDetails({
      where: {
        _id: authorId,
      },
    });
  },
};

export const GetColorBookFieldsResolver = {
  TextBook: {
    ..._bookFieldResolver
  },
  ColorBook: {
    ..._bookFieldResolver
  },
};

export const BookResolverType = {
  AllBooks: {
    __resolveType(obj: any) {
      if (obj.color) {
        return "ColorBook";
      } else if (obj.subject) {
        return "TextBook";
      }

      return null;
    },
  },
};
