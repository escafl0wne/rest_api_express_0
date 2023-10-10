import { Express } from "express";
import validateBody from "../../middleware/validateResource";
import { productDto } from "./product.schema";
import { productController } from "./product.controller";
import { requireUser,caching } from "../../middleware";
import { ProductLimiter } from "../rateLimit/rateLimit.service";

export default function productRoutes(app: Express, path: string) {
  const productMiddlewareLimiter = new ProductLimiter();
  
  app.get(path,[productMiddlewareLimiter.limit(15,50),caching()], productController.findProducts);
  app.post(
    path,
    [requireUser, validateBody(productDto.create)],
    productController.createProduct
  );
  app.get(
    path+"/:productId",
    [validateBody(productDto.find),caching(),productMiddlewareLimiter.limit(10,50)],
    productController.findProductById
  );
  app.delete(
    path+"/:productId",
    [requireUser, validateBody(productDto.delete),productMiddlewareLimiter.limit(5,50)],
    productController.deleteProduct
  );
  app.put(
    path+"/:productId",
    [requireUser, validateBody(productDto.update),productMiddlewareLimiter.limit(10,50)],
    productController.updateProduct
  );
}
