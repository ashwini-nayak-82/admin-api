import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

let sequelize = null;

const getConnection = async () => {
  try {
    
    if (sequelize) return sequelize;

  
    const dbName = process.env.PGDATABASE;
    const dbUser = process.env.PGUSER;
    const dbPassword = String(process.env.PGPASSWORD);
    const dbHost = process.env.PGHOST;
    const dbPort = process.env.PGPORT || 5432;

    console.log("DB CONFIG:", dbName, dbUser, dbPassword, dbHost, dbPort);

    sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: "postgres",
      logging: false,
    });

    
    await sequelize.authenticate();
    console.log(" Database connected successfully");

    return sequelize;
  } catch (error) {
    console.error("DB connection error:", error.message);
    throw error;
  }
};

export default getConnection;