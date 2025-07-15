import { Controller, Get } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Producers')
@Controller('producers')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Get('interval-awards')
  @ApiOperation({
    summary: 'Retorna os produtores com maior e menor intervalo entre prêmios',
  })
  getIntervals() {
    return this.awardsService.getAwardIntervals();
  }
}
