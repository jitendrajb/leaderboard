import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { CreateScoreDto } from './dto/create-score.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post('scores')
  async submitScore(@Body() body: CreateScoreDto, @Req() req) {
    const { name, score } = body;
    const authenticatedUsername = req.user.username;
    if (req.user.role == Role.Admin || (req.user.role == Role.User && authenticatedUsername == name)) {
      return this.leaderboardService.submitScore(body.name, score)
    } else {
      return { status: 'error', message: 'You can only submit scores for yourself or submit by admin for other users' };
    }
  }

  @Get()
  async getTopScores() {
    return this.leaderboardService.getTopScores();
  }
}
