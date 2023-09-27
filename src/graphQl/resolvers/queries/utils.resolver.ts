import { IDynamicObject } from "../../../interfaces/common.interface.js";
import { RootMapper } from "../../../mappers/index.mapper.js";

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

/**
 *
 * @param field object This is resolver info field nodes.
 * @param mappingFieldType string Type of the mapper (e.g., users, posts).
 * @param specificFieldValues string(optional) Get specific field all sub fields.
 * @returns array All fields of the query
 */
export function getFieldNodes({
  field,
  mappingFieldType,
  specificFieldValues = "",
}: {
  field: IDynamicObject;
  mappingFieldType: string;
  specificFieldValues?: string;
}): IDynamicObject {
  let fieldNodes = {};

  // Get the values of the type
  const rootMapper = RootMapper[mappingFieldType as keyof typeof RootMapper];

  const mappingFields = Object.values(rootMapper);
  const mappingKeys = Object.keys(rootMapper);

  // If the specific field value is needed then we will check the node type.
  // If it's same then we will not find for the nested nodes.
  const fieldName =
    field.kind === "InlineFragment"
      ? field?.typeCondition?.name?.value
      : field?.name?.value;
      
  const isNeedToFindNested =
    specificFieldValues && fieldName === specificFieldValues;

  if (field.selectionSet) {
    // Iterating all the selections of the query
    for (let row of field?.selectionSet?.selections || []) {
      if (specificFieldValues && !isNeedToFindNested) {
        let rowFieldNodes = getFieldNodes({
          field: row,
          specificFieldValues,
          mappingFieldType,
        });

        fieldNodes = { ...fieldNodes, ...rowFieldNodes };
      } else if (!row.selectionSet && row?.name?.value) {
        let fieldKeyIndex = mappingFields.findIndex(
          (field: string) => field === row?.name?.value
        );

        if (fieldKeyIndex > -1) {
          let fieldMappedKey = mappingKeys[fieldKeyIndex];
          fieldNodes = { ...fieldNodes, [fieldMappedKey]: 1 };
        }
      }
    }
  }
  return fieldNodes;
}
