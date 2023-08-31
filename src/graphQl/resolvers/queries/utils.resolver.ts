interface ISortBy {
  sortByOrder: string;
  sortByField: string;
  isString: number;
}

interface IFormattedSortBy {
  sortByOrder: number;
  sortByField: string;
}

export const getSearchTermCondition = ({
  entityType,
  searchTerm,
}: {
  entityType: string;
  searchTerm: string;
}) => {
  let condition = {};
  let regex = {
    $regex: new RegExp(searchTerm),
    $options: "i",
  };

  switch (entityType) {
    case "users":
      condition = {
        $or: [
          { name: regex },
          { email: regex },
          { location: regex },
          ...[!isNaN(+searchTerm) ? { age: +searchTerm } : ""],
        ].filter(Boolean),
      };
      break;

    default:
      break;
  }
  return condition;
};

export const getSortOrder = ({
  sortByOrder,
  sortByField,
  isString = 0,
}: ISortBy): IFormattedSortBy => {
  let mongoOrderBy: any = 1;
  if (!isString) {
    if (sortByOrder === "desc") {
      mongoOrderBy = -1;
    }
  } else {
    if (sortByOrder === "desc") {
      mongoOrderBy = `-${sortByField}`;
    } else {
      mongoOrderBy = sortByField;
    }
  }
  return {
    sortByOrder: mongoOrderBy,
    sortByField,
  };
};
