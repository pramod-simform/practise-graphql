export const SubscriptionTypeDef = `
  type SubUserData {
    id: ID!
    fullName: String!
    username: String!
    ageGroup: Int!
    address: String!
    posts: [Post!]!
    createdAt: Date
    contactInfo: JSON
  }
  type Subscription {
    createUser: SubUserData
  }
`;