export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

// クラスばりデータ
// import { IsString, IsInt } from 'class-validator';
// CreateCatDtoクラスはポストのbodyオブジェクトに対し、（複数のバリデーションクラスを作る必要はなく、）真実にして単一のソースであり続けることが可能になる
// export class CreateCatDto {
//   @IsString()
//   name: string;

//   @IsInt()
//   age: number;

//   @IsString()
//   breed: string;
// }
