import { validateCreateProduct } from "../../util/validation.js";
import { Product } from "./product.model.js";

class ProductController {
  async getAllProducts() {
    try {
      return await Product.find();
    } catch (err) {
      throw {
        code: 1,
        message: "Error while fetching product documens",
      };
    }
  }
  async getProductById(id) {
    const product = await Product.getProductDocByID();
    if (!product) {
      throw {
        code: 1,
        message: `Product with id: ${id} not found`,
      };
    }
    return product;
  }

  async createNewProduct({
    name,
    description,
    image,
    size,
    color,
    category,
    price,
    rating,
  }) {
    // validate creation inputs
    const { error } = validateCreateProduct({
      name,
      description,
      image,
      size,
      color,
      category,
      price,
      rating,
    });
    if (error) {
      throw {
        code: 1,
        message: error.details[0].message,
      };
    }

    try {
      const product = await Product.create({
        name,
        description,
        image,
        size,
        color,
        category,
        price,
        rating,
      });
      return product;
    } catch (err) {
      // console.log(err)
      throw {
        code: 2, //MongoDB error while saving
        message: "Error while saving product",
      };
    }
  }
}
export default new ProductController();
