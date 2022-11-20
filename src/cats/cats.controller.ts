import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  SetMetadata,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { Roles } from 'src/common/roles.decorator';

// import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

// @Controller({ host: 'admin.example.com' })　サブドメインの指定も可能

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin') //ルートで直接@SetMetadata()を使うのは良い習慣とはいえないので独自のデコレータを利用
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  //   @Post()
  //   @SetMetadata('roles', ['admin']) //権限による場合わけ。ハンドラごとのロールの設定
  //   async create(@Body() createCatDto: CreateCatDto) {
  //     this.catsService.create(createCatDto);
  //   }

  //   @Post()
  //   async create(@Body() createCatDto: CreateCatDto) {
  //     this.catsService.create(createCatDto);
  //     return 'This action adds a new cat';
  //   }

  //フィルターの検証 HttpExceptionFilterは単一のcreate()ルート・ハンドラにのみ適用され、メソッドでスコープ化されている
  //   @Post()
  //   @UseFilters(new HttpExceptionFilter())
  //   async create(@Body() createCatDto: CreateCatDto) {
  //     throw new ForbiddenException();
  //   }
  //   @Post()
  //   async create(@Body() createCatDto: CreateCatDto) {
  //     ペイロードからのリクエストを受け付けることができる
  //     return 'This action adds a new cat';
  //   }

  //   @Get()
  //   findAll(): string {
  //     return 'This action returns all cats';
  //   }
  @Get()
  async findAll() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  //   @Get(':id')
  //   findOne(@Param() params): string {
  //     console.log(params.id);
  //     return `This action returns a #${params.id} cat`;
  //   }
  // 下の書き方もできるぽい
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.catsService.findOne(id);
    return `This action returns a #${id} cat`;
  }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //     return `This action updates a #${id} cat`;
  //   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
