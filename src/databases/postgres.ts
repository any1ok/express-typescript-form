import config from "config";
import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product";
import { ProductDibs } from "../models/product_dibs";
import { ProductReview } from "../models/product_review";
import { RefreshToken } from "../models/refresh_token";
import { User } from "../models/user";
import path = require("path")

const sequelize = new Sequelize(process.env.SHOP_DATABASE_URL);
//sequelize.authenticate();
const mybatisMapper = require("mybatis-mapper");
const sqlPath = path.join(__dirname, "..", "..", ".", '/src/sql');
console.log(sqlPath);
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
