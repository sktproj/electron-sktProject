const { Product } = require('../models');

class ProductRepository {
  static async findAll() {
    const productList = await Product.findAll();
    return productList;
  }

  static async create(name) {
    await Product.create({ name });
  }
}

module.exports = ProductRepository;
