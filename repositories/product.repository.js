const { Product } = require('../models');

class ProductRepository {
  static async findAll() {
    const productList = await Product.findAll({
      where: {
        deleted: false,
      },
    });
    return productList;
  }

  static async create(name) {
    return await Product.create({ name });
  }

  static async update(id, updatedData) {
    return await Product.update(updatedData, {
      where: {
        id,
      },
    });
  }
}

module.exports = ProductRepository;
