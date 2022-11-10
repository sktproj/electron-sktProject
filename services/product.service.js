const ProductRepository = require('../repositories/product.repository');

class ProductService {
  static async findAll() {
    const allProductList = await ProductRepository.findAll();
    return allProductList;
  }
}

module.exports = ProductService;
