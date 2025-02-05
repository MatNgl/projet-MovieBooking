import { Controller, Get, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { MoviesService } from './movies.service';

@ApiTags('Movies')  // Catégorie générale pour la documentation Swagger
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Récupérer les films en salle actuellement
  @Get('now_playing')
  @ApiOperation({ summary: 'Obtenir les films actuellement en salle' })  // Explication de l'opération
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de la page pour la pagination des résultats', type: Number })
  getNowPlayingMovies(@Query('page') page: number = 1) {
    return this.moviesService.getNowPlayingMovies(page);
  }

  // Rechercher un film par titre
  @Get('search')
  @ApiOperation({ summary: 'Rechercher un film par titre' })
  @ApiQuery({ name: 'query', required: true, description: 'Titre du film à rechercher', type: String })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de la page pour la pagination des résultats', type: Number })
  searchMovies(@Query('query') query: string, @Query('page') page: number = 1) {
    if (!query) {
      throw new HttpException('Le paramètre query est requis', HttpStatus.BAD_REQUEST);
    }
    return this.moviesService.searchMovies(query, page);
  }

  // Obtenir les détails d’un film spécifique
  @Get(':movieId')
  @ApiOperation({ summary: 'Obtenir les détails d\'un film spécifique' })
  @ApiParam({ name: 'movieId', description: 'ID du film à récupérer', type: Number })
  getMovieDetails(@Param('movieId') movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }

  // Obtenir la liste des genres de films
  @Get('genres')
  @ApiOperation({ summary: 'Obtenir la liste des genres de films' })
  getMovieGenres() {
    return this.moviesService.getMovieGenres();
  }
}
