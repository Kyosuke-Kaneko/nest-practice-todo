import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// コントローラーに@UseGuards(RolesGuard)デコレータを使用してコントローラスコープ付きガードを設定する
// グローバルなガードを設定するには、NestアプリケーションインスタンスのuseGlobalGuards(new RolesGuard())メソッドを使用
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
