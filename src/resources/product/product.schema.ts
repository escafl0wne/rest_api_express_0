import { TypeOf, number, object, string } from "zod";


const payload = {
    body: object({
        title: string({ required_error: "Title is required" }),
        description: string({ required_error: "Description is required" }).min(10, "Description has to be at least 10 words."),
        price: number({ required_error: "Price is required" }),
        image: string(),
      }), 
}
export const params ={
    params: object({
        productId: string({ required_error: "ProductId is required" })
     
    })
}
export const productDto={
    create : object({
        ...payload 
      }),
      update : object({
        ...payload,...params
    }),
    delete : object({
        ...params
    }),
    find : object({
        ...params
    })

}
// export const createProductSchema = object({
//   ...payload 
// });
// export const updateProductSchema = object({
//     ...payload,...params
// })
// export const deleteProductSchema = object({
//     ...params
// })
// export const getProductSchema = object({
//     ...params
// })
 export type CreateProductInput = TypeOf<typeof productDto.create>
 export type UpdateProductInput = TypeOf<typeof productDto.update>
 export type DeleteProductInput = TypeOf<typeof productDto.delete>
 export type GetProductInput = TypeOf<typeof productDto.find>