import { connect } from "mongoose";

const createConnection = async () => {
  await connect(process.env.DB_URL!).then(() => {
    console.log("Connection create successfully!!!");
  });
};

export default createConnection;