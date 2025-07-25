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

  async getAwardIntervals(): Promise<{
    min: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[];
    max: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[];
  }> {
    const winners = await this.movieRepo.find({ where: { winner: true } });
    const map = new Map<string, number[]>();

    winners.forEach((movie) => {
      const producers = movie.producers.replace(/ and /g, ',').split(',');
      producers.forEach((raw) => {
        const name = raw.trim();
        if (!map.has(name)) map.set(name, []);
        map.get(name)!.push(movie.year);
      });
    });

    const intervals: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[] = [];

    for (const [producer, years] of map.entries()) {
      if (years.length < 2) continue;
      const sorted = years.sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        intervals.push({
          producer,
          interval: sorted[i] - sorted[i - 1],
          previousWin: sorted[i - 1],
          followingWin: sorted[i],
        });
      }
    }

    if (intervals.length === 0) return { min: [], max: [] };

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }
}
