// const { QueryInterface } = require("sequelize/types");
const { connectToDb, Sequelize } = require("./connectToDb");
const createDb = require("./createDb");

//create db
try {
  createDb();
} catch (error) {
  console.log(error);
}

const sequelize = connectToDb();

const queryInterface = sequelize.getQueryInterface();

queryInterface.addColumn("Customers", "imageUrl", {
  type: Sequelize.STRING,
  allowNull: true,
  unique: true,
});

// queryInterface.addColumn("Vendors", "token", {
//   type: Sequelize.STRING,
//   unique: true,
// });

// queryInterface.addColumn("Customers", "token", {
//   type: Sequelize.STRING,
//   unique: true,
// });

const customer = sequelize.define("Customer", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  whatsupNo: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  token: {
    type: Sequelize.STRING,
    unique: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
});

const food = sequelize.define("Food", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
});

const vendors = sequelize.define("Vendor", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  whatsupNo: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  birthdate: {
    type: Sequelize.DATE,
    allowNull: false,
    isDate: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  token: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const order = sequelize.define("Order", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  food: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

customer.hasMany(order);
order.belongsTo(customer);

vendors.hasMany(order);
order.belongsTo(vendors);

const vendorFoodList = sequelize.define("vendorList", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  count: {
    type: Sequelize.INTEGER,
  },
});

food.hasMany(vendorFoodList, {
  foreignKey: {
    name: "food",
    type: Sequelize.UUID,
    unique: true,
    allowNull: false,
  },
});
vendorFoodList.belongsTo(food);

vendors.hasMany(vendorFoodList);
vendorFoodList.belongsTo(vendors);

const location = sequelize.define("Location", {
  ward: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  district: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

location.hasMany(vendors);

vendors.belongsTo(location);

location.hasMany(customer);

customer.belongsTo(location);

module.exports = {
  location: location,
  customer: customer,
  vendor: vendors,
  food: food,
  order: order,
  foodList: vendorFoodList,
  sequelize: sequelize,
  Sequelize: Sequelize,
};
