import { Controller, Get, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Récupérer les films en salle actuellement
  @Get('now_playing')
  getNowPlayingMovies(@Query('page') page: number = 1) {
    return this.moviesService.getNowPlayingMovies(page);
  }

  // Rechercher un film par titre
  @Get('search')
  searchMovies(@Query('query') query: string, @Query('page') page: number = 1) {
    if (!query) {
      throw new HttpException('Le paramètre query est requis', HttpStatus.BAD_REQUEST);
    }
    return this.moviesService.searchMovies(query, page);
  }

  // Obtenir les détails d’un film spécifique
  @Get(':movieId')
  getMovieDetails(@Param('movieId') movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }

  // Obtenir la liste des genres de films
  @Get('genres')
  getMovieGenres() {
    return this.moviesService.getMovieGenres();
  }
}
