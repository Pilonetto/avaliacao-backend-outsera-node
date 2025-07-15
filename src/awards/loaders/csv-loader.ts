import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Movie } from '../entities/movie.entity';
import { Repository } from 'typeorm';

export async function loadCSV(path: string, repository: Repository<Movie>) {
  return new Promise<void>((resolve, reject) => {
    const records: Movie[] = [];

    fs.createReadStream(path)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        const movie = new Movie();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        movie.year = parseInt(data.year);
        movie.title = data.title;
        movie.studios = data.studios;
        movie.producers = data.producers;
        movie.winner = data.winner?.trim().toLowerCase() === 'yes';
        records.push(movie);
      })
      .on('end', async () => {
        await repository.save(records);
        resolve();
      })
      .on('error', reject);
  });
}
