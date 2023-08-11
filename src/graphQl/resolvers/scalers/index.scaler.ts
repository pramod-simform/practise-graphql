import DateScalar from "./date.scaler.js";
import GraphQLJSON from "graphql-type-json";

const CustomScalers = {
  Date: DateScalar,
  JSON: GraphQLJSON,
};

export default CustomScalers;
