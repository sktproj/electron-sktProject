const ProductRepository = require('../repositories/product.repository');

class ProductService {
  static async findAll() {
    const allProductList = await ProductRepository.findAll();
    return allProductList;
  }

  static async create(name) {
    return await ProductRepository.create(name);
  }

  static async update(id, updatedData) {
    return await ProductRepository.update(id, updatedData);
  }
}

module.exports = ProductService;
