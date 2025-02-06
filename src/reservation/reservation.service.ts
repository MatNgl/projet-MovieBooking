import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<Reservation>) {}

  // Créer une réservation
  async create(userId: string, createReservationDto: CreateReservationDto) {
    const { movieId, startTime } = createReservationDto;
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2);
  
    const existingReservation = await this.reservationModel.findOne({
      movieId,
      startTime: { $lt: endTime },  // Vérifie si la nouvelle réservation chevauche une ancienne
      endTime: { $gt: startTime }
    });
  
    if (existingReservation) {
      throw new BadRequestException('Plage horaire déjà réservée');
    }
  
    const reservation = new this.reservationModel({
      userId,
      movieId,
      startTime: new Date(startTime),
      endTime: endTime,
    });
  
    return reservation.save();
  }
  
  
  async findAll(userId: string) {
    return this.reservationModel.find({ userId });
  }

  // Supprimer une réservation
  async remove(userId: string, reservationId: string) {
    const reservation = await this.reservationModel.findOneAndDelete({ _id: reservationId, userId });
    if (!reservation) {
      throw new NotFoundException('Réservation introuvable.');
    }
    return { message: 'Réservation annulée avec succès' };
  }
}
