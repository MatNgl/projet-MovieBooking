import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly baseUrl: string;
  private readonly apiKey: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL', 'https://api.themoviedb.org/3');
    this.apiKey = this.configService.get<string>('TMDB_API_KEY');
    
    // Si API_KEY n'est pas défini, lève une exception
    if (!this.apiKey) {
      throw new Error('TMDB_API_KEY is not defined in environment variables');
    }
  
    console.log('TMDB_API_KEY:', this.apiKey);
  }  
  

  // Récupérer les films en salle actuellement
  async getNowPlayingMovies(page: number = 1): Promise<any> {
    try {
      const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des films en salle', HttpStatus.BAD_REQUEST);
    }
  }

  // Rechercher un film par titre
  async searchMovies(query: string, page: number = 1): Promise<any> {
    if (!query) {
      throw new HttpException('Le paramètre query est requis', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Erreur lors de la recherche de films', HttpStatus.BAD_REQUEST);
    }
  }

  // Obtenir les détails d’un film spécifique
  async getMovieDetails(movieId: number): Promise<any> {
    if (!movieId) {
      throw new HttpException('Le paramètre movieId est requis', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des détails du film', HttpStatus.BAD_REQUEST);
    }
  }

  // Obtenir la liste des genres de films
  async getMovieGenres(): Promise<any> {
    try {
      const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des genres', HttpStatus.BAD_REQUEST);
    }
  }
}
