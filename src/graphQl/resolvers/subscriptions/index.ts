import pubsub from "../../../utils/pubSub.utils.js";

const UserSubscriptionResolvers = {
  createUser: {
    subscribe: () => pubsub.asyncIterator(["USER_CREATED"]),
  },
};

export default UserSubscriptionResolvers;
