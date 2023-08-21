export const UserInputTypeDef = `
  input UserEmailInput {
    email: String! @constraint(format: "email", maxLength: 255)
    age: Int! @constraint(min: 10, max: 50)
    _id: String! @constraint(format: "uuid")
  }
`;