import { connect } from "mongoose";

const createConnection = async () => {
  await connect("mongodb://localhost:27017/mock_users").then(() => {
    console.log("Connection create successfully!!!");
  });
};

export default createConnection;