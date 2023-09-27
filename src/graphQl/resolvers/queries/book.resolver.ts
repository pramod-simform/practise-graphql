import { getColorBooks } from "../../../db/services/colorBook.service.js";
import { getTextBooks } from "../../../db/services/textbook.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";
import { getFieldNodes } from "./utils.resolver.js";

export const BookResolver = {
  getBooks: async (_: any, __: any, ___: any, info: any) => {
    let queryFieldsTextBooks = getFieldNodes({
      field: info.fieldNodes[0],
      mappingFieldType: "textbooks",
      specificFieldValues: "TextBook",
    });

    if (!queryFieldsTextBooks.authorId) {
      queryFieldsTextBooks["authorId"] = 1;
    }

    if (!queryFieldsTextBooks.subject) {
      queryFieldsTextBooks["subject"] = 1;
    }

    let queryFieldsColorBooks = getFieldNodes({
      field: info.fieldNodes[0],
      mappingFieldType: "colorbooks",
      specificFieldValues: "ColorBook",
    });

    if (!queryFieldsColorBooks.authorId) {
      queryFieldsColorBooks["authorId"] = 1;
    }

    if (!queryFieldsColorBooks.color) {
      queryFieldsColorBooks["color"] = 1;
    }

    const TextBooks = getFieldsMappedData(
      "textbooks",
      await getTextBooks({
        where: {},
        selectedFields: queryFieldsTextBooks,
      })
    );
    const ColorBooks = getFieldsMappedData(
      "colorbooks",
      await getColorBooks({
        where: {},
        selectedFields: queryFieldsColorBooks,
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
