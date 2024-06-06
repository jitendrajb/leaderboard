// src/leaderboard/dto/create-score.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
