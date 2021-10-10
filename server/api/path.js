module.exports = {
  vendors: {
    create: "/apiv1/vendors/create",
    get: "/apiv1/vendors/get",
    update: "/apiv1/vendors/update",
    delete: "/apiv1/vendors/delete",
  },
  foodPath: {
    create: "/apiv1/food/create",
    get: "/apiv1/food/get",
    getByName: "/apiv1/food/get-by-name",
    update: "/apiv1/food/update",
    delete: "/apiv1/food/delete",
  },
  customers: {
    create: "/apiv1/customers/create",
    get: "/apiv1/customers/get",
    update: "/apiv1/customers/update",
    delete: "/apiv1/customers/delete",
    getByName: "/apiv1/customers/getId",
  },
  locations: {
    create: "/apiv1/locations/create",
    get: "/apiv1/locations/get",
    update: "/apiv1/locations/update",
    delete: "/apiv1/locations/delete",
  },
  orders: {
    create: "/apiv1/orders/create",
    get: "/apiv1/orders/get",
    getUnique: "/apiv1/orders/get-unique",
    getByCustomer: "/apiv1/orders/get-by-customer",
    update: "/apiv1/orders/update",
    delete: "/apiv1/orders/delete",
    token: "/apiv1/orders/token",
  },
  foodLists: {
    create: "/apiv1/foodList/create",
    get: "/apiv1/foodList/get",
    update: "/apiv1/foodList/update",
    delete: "/apiv1/foodList/delete",
    getByVendors: "/apiv1/foodList/get-by-vendors",
  },
  authenticate: {
    authentication: "/apiv1/authenticate",
  },
  register: {
    register: "/apiv1/register",
  },
};
