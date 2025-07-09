import { connect } from "mongoose";

const dbConnection = async (url) => {
  try {
    await connect(url);
    console.log(`connected to db`);
  } catch (error) {
    console.log(`db connecton failed`, error);
  }
};
export default dbConnection;
