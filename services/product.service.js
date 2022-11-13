const ProductRepository = require('../repositories/product.repository');

class ProductService {
  static async findAll() {
    const allProductList = await ProductRepository.findAll();
    return allProductList;
  }

  static async create(name) {
    await ProductRepository.create(name);
  }
}

module.exports = ProductService;
