import { config } from "dotenv";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

config();

const _throwException = (error: string) => {
  throw new GraphQLError(error, {
    extensions: {
      code: "UNAUTHENTICATED",
      http: {
        status: 401,
      },
    },
  });
};

export const decodeJWTToken = (token: string) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_KEY!, {
      algorithms: ["HS256"],
    });

    if (decoded) {
      return decoded;
    }
  } catch (e: any) {
    return false;
  }

  return false;
};

export const generateJWTToken = (data: any) => {
  try {
    data = JSON.stringify(data);
    var token = jwt.sign(data, process.env.JWT_KEY!, {
      algorithm: "HS256",
    });

    if (token) {
      return token;
    }
  } catch (e) {}

  return null;
};
