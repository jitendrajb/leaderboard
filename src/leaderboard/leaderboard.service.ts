import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async submitScore(name: string, score: number) {
    const player = this.playersRepository.create({ name, score });
    await this.playersRepository.save(player);
    return player;
  }

  async getTopScores() {
    return this.playersRepository.find({
      order: { score: 'DESC' },
      take: 10,
    });
  }
}
