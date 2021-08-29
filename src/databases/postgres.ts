import config from "config";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product";
import { ProductDibs } from "../models/product_dibs";
import { ProductReview } from "../models/product_review";
import { RefreshToken } from "../models/refresh_token";
import { User } from "../models/user";
import path = require("path");
import mybatisMapper = require("mybatis-mapper");
const sequelize = new Sequelize("postgres://postgres:password@127.0.0.1:5432/postgres",
{
  dialect: "postgres",
  dialectOptions: {
    statement_timeout: 5000,
    idle_in_transaction_session_timeout: 5000
  },
  define: {},
  pool: {
    max: 60,
    min: 0,
    idle: 10000,
    acquire: 20000
  },
  logging: console.log,

});
//sequelize.authenticate();

const sqlPath = path.join(__dirname, "..", "..", ".", '/src/sql');
console.log("sqlPath",sqlPath);
mybatisMapper.createMapper([`${sqlPath}/product.xml`]);

sequelize.addModels([User, RefreshToken, Product, ProductDibs, ProductReview]);

//sequelize.sync({ force: false, });

// if (process.env.MODE == "dev") {
//     sequelize.sync({ force: true });
// }

const DB = {
    User,
    RefreshToken,
    Product,
    ProductDibs,
    ProductReview,
    sequelize, // connection instance (RAW queries)
    connection: sequelize,
    Sequelize, // library
};

export default DB;
