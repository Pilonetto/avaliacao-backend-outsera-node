import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { loadCSV } from './loaders/csv-loader';

@Injectable()
export class AwardsService implements OnModuleInit {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  async onModuleInit() {
    const count = await this.movieRepo.count();
    if (count === 0) {
      await loadCSV('Movielist.csv', this.movieRepo);
      console.log('CSV carregado com sucesso');
    }
  }

  async getAwardIntervals() {
    const winners = await this.movieRepo.find({ where: { winner: true } });
    const map = new Map<string, number[]>();

    winners.forEach((movie) => {
      const producers = movie.producers.replace(' and ', ',').split(',');
      producers.forEach((raw) => {
        const name = raw.trim();
        if (!map.has(name)) map.set(name, []);
        map.get(name)!.push(movie.year);
      });
    });

    const result: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[] = [];

    for (const [producer, years] of map.entries()) {
      if (years.length < 2) continue;
      const sorted = years.sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        result.push({
          producer,
          interval: sorted[i] - sorted[i - 1],
          previousWin: sorted[i - 1],
          followingWin: sorted[i],
        });
      }
    }

    if (result.length === 0) return { min: [], max: [] };

    const min = Math.min(...result.map((r) => r.interval));
    const max = Math.max(...result.map((r) => r.interval));

    return {
      min: result.filter((r) => r.interval === min),
      max: result.filter((r) => r.interval === max),
    };
  }
}
