import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Reservation } from './schemas/reservation.schema';

@ApiTags('Reservations')
@ApiBearerAuth()
@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({ summary: 'Créer une réservation de film' })
  @ApiResponse({ status: 201, description: 'Réservation effectuée avec succès', type: Reservation })
  @ApiResponse({ status: 400, description: 'Plage horaire déjà réservée' })
  @ApiBody({
    description: 'Données nécessaires pour réserver un film',
    required: true,
    schema: {
      type: 'object',
      properties: {
        movieId: { type: 'string', example: '939243' },
        startTime: { 
          type: 'string', 
          format: 'date-time', 
          example: '2025-02-06T10:00',
          description: 'Date et heure de début de la réservation, format ISO 8601 (YYYY-MM-DDTHH:mm)' 
        }
      }
    }
  })
  @Post()
  create(@Req() req, @Body() createReservationDto: CreateReservationDto) {
    const userId = req.user.sub;
    return this.reservationService.create(userId, createReservationDto);
  }

  @ApiOperation({ summary: 'Récupérer les réservations de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des réservations', type: [Reservation] })
  @Get()
  findAll(@Req() req) {
    return this.reservationService.findAll(req.user.sub);  // Utilisation de req.user.sub au lieu de req.user.userId
  }

  @ApiOperation({ summary: 'Supprimer une réservation' })
  @ApiResponse({ status: 200, description: 'Réservation annulée avec succès' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée' })
  @ApiParam({ name: 'id', required: true, example: '65be88e5b0c94b001fa7a2d5' })
  @Delete(':id')
  remove(@Req() req, @Param('id') reservationId: string) {
    return this.reservationService.remove(req.user.sub, reservationId);
  }
}
