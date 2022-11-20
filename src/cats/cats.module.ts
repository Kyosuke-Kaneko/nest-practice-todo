import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global() //@Global()デコレータを使用してモジュールをグローバルに設定できる
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //CatsModuleをインポートしたモジュールはCatsServiceにアクセスでき、CatServiceをインポートした他のすべてのモジュールと同じインスタンスを共有
})
export class CatsModule {}
