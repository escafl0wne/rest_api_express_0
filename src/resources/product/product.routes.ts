import { Express } from "express";
import validateBody from "../../middleware/validateResource";
import { productDto } from "./product.schema";
import { productController } from "./product.controller";
import { requireUser } from "../../middleware/requireUser";
export default function productRoutes(app: Express, path: string) {
  app.get(path, productController.findProducts);
  app.post(
    path,
    [requireUser, validateBody(productDto.create)],
    productController.createProduct
  );
  app.get(
    path+"/:productId",
    validateBody(productDto.find),
    productController.findProductById
  );
  app.delete(
    path+"/:productId",
    [requireUser, validateBody(productDto.delete)],
    productController.deleteProduct
  );
  app.put(
    path+"/:productId",
    [requireUser, validateBody(productDto.update)],
    productController.updateProduct
  );
}
