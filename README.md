# メモ
https://zenn.dev/kisihara_c/books/nest-officialdoc-jp
## 03-overview-controllers
コントローラは常にモジュールに属している為、コントローラの配列を@Module()デコレータに含めている。ルートのAppModule以外のモジュールを定義してCatsControllerを導入する。

app.module.ts
```
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

モジュールクラスに@Module()デコレータを使ってメタデータをアタッチすれば、どのコントローラをマウントするか簡単に設定できる。

## 04-overview-providers
プロパイダはNestの基本的な概念である。Nestの基本的なクラスの多く――サービス、リポジトリ、ファクトリ、ヘルパー他――はプロバイダとして扱われる、とも言える。プロバイダについて主要なスタンスは、依存関係をインジェクション（注入）する事である。インジェクションによってオブジェクト同士は様々な依存関係を形作る事ができる。

プロパティベースインジェクション
もしトップレベルのクラスが１つまたは複数のプロバイダに依存している場合、コンストラクタからサブクラスのsuper()を呼び出してすべて渡していくのは非常に面倒な作業になる。それを避ける為には、プロパティレベルで@Injectデコレータを使用する。

```
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

## 05-overview-modules
### 共有モジュール
Nestにおいてはモジュールは標準でシングルトンである為、複数のモジュール間で任意のプロバイダのインスタンスを共有できる。
すべてのモジュールは自動的に共有モジュールとなる。一度作成されたモジュールは、全てのモジュールで再利用できる。
例えば、CatsServiceのインスタンスを他の複数のモジュール間で共有したい場合をイメージする。まず、CatsServiceプロバイダをモジュールのexports配列に追加し、エクスポートする。

cats.module.ts
```
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
 controllers: [CatsController],
 providers: [CatsService],
 exports: [CatsService]
})
export class CatsModule {}
```

CatsModuleをインポートしたモジュールはCatsServiceにアクセスでき、CatServiceをインポートした他のすべてのモジュールと同じインスタンスを共有します。

## 08-overview-pipes
### パイプ
パイプは@Injectable()デコレータで装飾されたクラスだ。PipeTransformインターフェイスの実装が必要となる。

パイプには２つのユースケースがある。

変換：入力データを希望の形に変換する（例：文字列→整数）
検証：入力データを評価し、データが正しければそのまま実行を続け、データが間違っていれば例外をthrowする

いずれもパイプはコントローラのルートハンドラによって処理されるargumentsを操作する。Nestはメソッドが呼び出される直前にパイプを挿入し、パイプはメソッドの引数を受け取って処理する。変換・検証はその時点で行われ、最後に変換された（かもしれない）引数でルートハンドラが呼び出される。

## 09-overview-guard
### ガード
ガードは@Injectable()デコレータで装飾されたクラスです。ガードはCanActivateインターフェイスを実装する必要がある。
ガードが持つ責任は一つ。ランタイムに存在する特定の条件（パーミッション、ロール、ACL等）に依存して、与えられたリクエストがルートハンドラによって処理されるかどうかを決定する事。これはしばしば認可と呼ばれる。認可（と、通常一緒に動く親戚的な存在の「認証」）は、伝統的なExpressアプリケーションでは通常ミドルウェアで処理されてきた。トークンの検証やリクエストオブジェクトへのプロパティのアタッチのような事柄は、特定のルートコンテキスト（とそのメタデータ）にはあまり関係がないので、ミドルウェアは検証には最適な選択といえる。
しかし、ミドルウェアはその性質上少し頭が弱い。next()関数を呼び出した後どのハンドラが呼ばれるかを把握していない。一方ガードはExecutionContextインスタンスにアクセスできる為、次に何が実行されるかを確かめられる。ガードは、例外フィルタやパイプ、インターセプタと同様に、リクエスト/レスポンスのサイクルの適切なタイミングで処理ロジックを挿入できるように設計されており、宣言的に処理を行う事ができる。よって、コードをDRYで宣言的なものに保つ事ができる。

## 10-overview-interceptors
### インターセプター
インターセプターは@Injectable()デコレータでアノテーションされたクラスだ。NestInterceptorインターフェースを実装する必要がある。
インターセプターはアスペクト指向プログラミング（AOP）の技術に触発された便利な機能を持ち、以下の事が可能になっている。

- メソッドの前後に追加のロジックをバインド
- 関数の結果を変換
- 関数からthrowされた例外を変換
- 基本関数の動作を拡張
（例えばキャッシュを目的として）特定の条件で関数を完全にオーバーライドする。
