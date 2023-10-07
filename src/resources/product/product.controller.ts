import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from "./product.schema"
import { productService } from "./product.service"
import { Request, Response } from "express"


export const productController = {
    async findProducts(req: Request, res: Response){
        try {
            const products = await productService.findProducts()
            return res.send(products)
        } catch (error:any) {
            return res.status(400).send(error)
        }
       
    },
    async findProductById(req: Request<GetProductInput['params']>, res: Response){
        const userId=res.locals.user._id
        const _id =req.params.productId
        try {
            
            const product = await productService.findProduct({_id})
            if(!product) throw new Error("Product not found")
           
            return res.send(product)
        } catch (error:any) {
            return res.status(404).send(error.message)
        }
       
    }
    ,
    async deleteProduct(req: Request<DeleteProductInput['params']>, res: Response){
        const userId=res.locals.user._id
        const productId =req.params.productId
        try {
            const result = await productService.deleteProduct({_id:productId,user:userId})
            
            return res.status(204).send(result)
        } catch (error:any) {
            
            return res.status(400).send(error.message)
        }
    },
    async createProduct(req: Request<{},{},CreateProductInput['body']>, res: Response){
        const userId = res.locals.user._id
        const body = req.body
        try {
            const product = await productService.createProduct({body}, userId)
            return res.status(201).send(product) 
        } catch (error:any) {
            return res.status(400).send(error)
        }
        
     
    },
    async updateProduct(req: Request<UpdateProductInput['params']>, res: Response){

        const userId=res.locals.user._id
        const porductId =req.params.productId
        const body = req.body
        try {
           const updated = await productService.updateProduct({_id:porductId,user:userId},body,{new:true})
            return res.status(200).send(updated)
        } catch (error:any) {
            return res.status(400).send(error)
        }
     
    }
}
