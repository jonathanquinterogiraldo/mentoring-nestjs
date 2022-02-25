import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductProductDto: CreateProductDTO): Promise<Product>{
        const product = await this.productService.createProduct(createProductProductDto)
        
        return res.status(HttpStatus.OK).json({
            message: 'received',
            product
        })

    }

    @Get('/')
    async getProducts(@Res() res): Promise<Product[]>{
        const products = await this.productService.getProducts()
        return res.status(HttpStatus.OK).json({
            message: 'All products',
            products
        })
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID): Promise<Product[]>{
        const product = await this.productService.getProduct(productID);
        if (!product){
            throw new NotFoundException('This product does not exist')
        }
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const deletedProduct = await this.productService.deleteProduct(productID);
        if (!deletedProduct){
            throw new NotFoundException('This product does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'product deleted succefully',
            deletedProduct
        });

    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID, ) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct){
            throw new NotFoundException('This product does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'product updated succefully',
            updatedProduct
        });

    }
}
