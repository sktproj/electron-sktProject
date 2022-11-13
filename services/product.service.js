const ProductRepository = require('../repositories/product.repository');

class ProductService {
  static async findAll() {
    const allProductList = await ProductRepository.findAll();
    return allProductList;
  }

  static async create(name) {
    await ProductRepository.create(name);
  }

  static async update(id, updatedData) {
    await ProductRepository.update(id, updatedData);
  }
}

module.exports = ProductService;
