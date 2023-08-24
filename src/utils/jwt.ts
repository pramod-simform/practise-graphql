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
  /**
   * If authorization is disabled then we will not check the token and let the request go without check authentication.
   */
  if (process.env.ENABLE_AUTHORIZATION === "false") {
    return false;
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_KEY!, {
      algorithms: ["HS256"],
    });

    if (decoded) {
      return decoded;
    }
  } catch (e: any) {
    _throwException(e.message);
  }

  _throwException("Unauthorized request. Please login again.");
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
