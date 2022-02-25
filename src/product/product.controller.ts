import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body } from '@nestjs/common';
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
    async getProduct(@Res() res): Promise<Product[]>{
        const products = await this.productService.getProducts()
        return res.status(HttpStatus.OK).json({
            message: 'All products',
            products
        })
    }
}
