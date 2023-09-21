import AllModels from "../../../db/models/index.model.js";
import { getPaginationInfo } from "../../../db/services/common.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";
import { getSearchTermCondition } from "./utils.resolver.js";

export const GetPaginationInfoResolver = {
  paginationInfo: async (_: any, args: any) => {
    let { page, limit, entityType, searchTerm = "" } = args;
    let searchCond = getSearchTermCondition({ entityType, searchTerm });

    return getFieldsMappedData(
      entityType,
      await getPaginationInfo({
        model: AllModels[entityType as keyof typeof AllModels],
        page,
        limit,
        searchCond,
      })
    );
  },
};
