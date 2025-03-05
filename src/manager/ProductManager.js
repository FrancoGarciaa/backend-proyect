import { Product } from "../models/product.model.js";

class ProductManager {
  constructor() {}

  async getProducts({ limit = 12, page = 1, sort, query } = {}) {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort && (sort === "asc" || sort === "desc") ? { price: sort } : {},
      customLabels: {
        totalDocs: "totalProducts",
        docs: "products",
      },
    };

    const queryFilter = query ? { title: { $regex: query, $options: "i" } } : {};

    try {
      const result = await Product.paginate(queryFilter, { ...options, lean: true });
      const { totalProducts, products, totalPages, page, prevPage, nextPage, hasPrevPage, hasNextPage } = result;

      return {
        status: "success",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit}` : null,
        nextLink: hasNextPage ? `/api/products?page=${nextPage}&limit=${limit}` : null,
      };
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return { status: "error", message: error.message };
    }
  }

  async createProduct(productData) {
    try {
      if (!productData.name || !productData.price) {
        throw new Error("Título (name) y precio son obligatorios");
      }
      const product = new Product(productData);
      await product.save();
      return { status: "success", message: "Producto creado correctamente", product };
    } catch (error) {
      console.error("Error al crear producto:", error);
      return { status: "error", message: error.message };
    }
  }

  async getProductById(id) {
    try {
      if (!id) throw new Error("ID del producto es requerido");
      const product = await Product.findById(id);
      if (!product) {
        return { status: "error", message: "Producto no encontrado" };
      }
      return { status: "success", payload: product };
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return { status: "error", message: error.message };
    }
  }

  async updateProduct(id, productData) {
    try {
      if (!id) throw new Error("ID del producto es requerido");
      if (!productData || Object.keys(productData).length === 0) {
        throw new Error("Datos de actualización no proporcionados");
      }
      const product = await Product.findByIdAndUpdate(id, productData, { new: true });
      if (!product) {
        return { status: "error", message: "Producto no encontrado" };
      }
      return { status: "success", message: "Producto actualizado correctamente", product };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return { status: "error", message: error.message };
    }
  }

  async deleteProduct(id) {
    try {
      if (!id) throw new Error("ID del producto es requerido");
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return { status: "error", message: "Producto no encontrado" };
      }
      return { status: "success", message: "Producto eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { status: "error", message: error.message };
    }
  }
}

export default ProductManager;