import { IsString, IsISO8601 } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  movieId: string;

  startTime: string;
}
