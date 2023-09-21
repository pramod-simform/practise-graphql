import { getColorBooks } from "../../../db/services/colorBook.service.js";
import { getTextBooks } from "../../../db/services/textbook.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const BookResolver = {
  getBooks: async () => {
    const TextBooks = getFieldsMappedData(
      "textbooks",
      await getTextBooks({
        where: {},
      })
    );
    const ColorBooks = getFieldsMappedData(
      "colorbooks",
      await getColorBooks({
        where: {},
      })
    );
    return [...TextBooks, ...ColorBooks];
  },
};

const _bookFieldResolver = {
  writer: async (parent: any) => {
    const { writerId: authorId } = parent;

    return getFieldsMappedData(
      "users",
      await getUserDetails({
        where: {
          _id: authorId,
        },
      })
    );
  },
};

export const GetColorBookFieldsResolver = {
  TextBook: {
    ..._bookFieldResolver,
  },
  ColorBook: {
    ..._bookFieldResolver,
  },
};

export const BookResolverType = {
  AllBooks: {
    __resolveType(obj: any) {
      let resolveType = null;
      if (obj.color) {
        resolveType = "ColorBook";
      } else if (obj.academicSubject) {
        resolveType = "TextBook";
      }
      return resolveType;
    },
  },
};
