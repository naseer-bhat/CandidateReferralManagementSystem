// import { connect } from "mongoose";
import dbConnection from "./config/db.js";
const startServer = async (url, app, port) => {
  try {
    await dbConnection(url);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default startServer;
