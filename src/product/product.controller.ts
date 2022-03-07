import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    HttpStatus,
    Body,
    Param,
    NotFoundException,
    Query 
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';
import { UseGuards, Logger, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('product')
export class ProductController {    

    constructor(
        private productService: ProductService,
        private readonly logger: Logger,
        ){}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getProducts(@Req() req, @Res() res): Promise<Product[]>{

        const products = await this.productService.getProducts()
        this.logger.log(
            `Get request ('/') User ${req.user.email} retrieving all products`,
            ProductController.name);
        
        return res.status(HttpStatus.OK).json({
            message: 'All products',
            products
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:productID')
    async getProduct(@Req() req, @Res() res, @Param('productID') productID): Promise<Product[]>{

        const product = await this.productService.getProduct(productID);
        if (!product){
            throw new NotFoundException('This product does not exist')
        }
        this.logger.log(
            `Get request ('/${productID}') User ${req.user.email} retrieving one product`,
            ProductController.name);
        
        return res.status(HttpStatus.OK).json(product);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createProduct(@Req() req, @Res() res, @Body() createProductProductDto: CreateProductDTO): Promise<Product>{

        const product = await this.productService.createProduct(createProductProductDto)
        this.logger.log(
            `Post request ('/create') User ${req.user.email} creating a product`,
            ProductController.name);
        
        return res.status(HttpStatus.OK).json({
            message: 'received',
            product
        })
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put('/update')
    async updateProduct(@Req() req, @Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID): Promise<Product> {

        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct){
            throw new NotFoundException('This product does not exist')
        }
        this.logger.log(
            `Put request ('/update') User ${req.user.email} updating a product`,
            ProductController.name);
        
        return res.status(HttpStatus.OK).json({
            message: 'product updated succefully',
            updatedProduct
        });

    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete('/delete')
    async deleteProduct(@Req() req, @Res() res, @Query('productID') productID) {
        const deletedProduct = await this.productService.deleteProduct(productID);
        if (!deletedProduct){
            throw new NotFoundException('This product does not exist')
        }
        this.logger.log(
            `Delete request ('/delete') User ${req.user.email} deleting a product`,
            ProductController.name);
        
        return res.status(HttpStatus.OK).json({
            message: 'product deleted succefully!',
            deletedProduct
        });
    }
}
