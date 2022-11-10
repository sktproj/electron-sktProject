const { Product } = require('../models');

class ProductRepository {
  static async findAll() {
    const productList = await Product.findAll();
    return productList;
  }
}

module.exports = ProductRepository;
