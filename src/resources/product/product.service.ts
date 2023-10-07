import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../../models/product.model";
import { CreateProductInput } from "./product.schema";
import UserModel from "../../models/user.model";

export const productService = {
  async createProduct(createProductDto: CreateProductInput, userId: string) {
    try {
      const newProduct = await ProductModel.create({
        ...createProductDto.body,
        user: userId,
      });
      if (!newProduct) throw new Error("Product not created");

      //update user's product list
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { products: newProduct._id } }
      );

      return { payload: newProduct, message: "Product created successfully" };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  async findProduct(query: FilterQuery<ProductDocument>) {
    try {
      const result = await ProductModel.findOne(query);
      if (!result) throw new Error("Product not found");
      return {payload:result,message:"Product found successfully"}
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  async findProducts() {
    return ProductModel.find();
  },
  async deleteProduct(
    query: FilterQuery<ProductDocument>
  ) {
    try {
      
      const deleted = await ProductModel.findOneAndDelete(query);
      
      if (!deleted)
        throw new Error("Product not found in our database");
        await UserModel.findOneAndUpdate(
        { _id: query.user },
        { $pull: { products: query._id } }
      );
     
      return { message: `Product: ${query._id} deleted successfully` };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  async updateProduct(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions
  ) {
    try{
      const updatedProduct= await ProductModel.findOneAndUpdate(query, update, options);
      if(!updatedProduct) throw new Error("Product not found");
      return {payload:updatedProduct,message:"Product updated successfully"}
    }catch(error:any){
      console.error(error);
      throw new Error(error.message);
    }
    
    
  },
};
