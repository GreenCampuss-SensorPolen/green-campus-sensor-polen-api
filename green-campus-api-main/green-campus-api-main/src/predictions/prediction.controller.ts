import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('predictions') // 👈 ¡CLAVE! Quitamos el v1/ de aquí
export class PredictionController {
  constructor(private readonly httpService: HttpService) {}

  @Get('week')
  async getWeeklyPrediction() {
    console.log('🤖 Petición recibida en NestJS. Llamando a Python...');
    try {
      const url = 'http://127.0.0.1:8000/predict/co2/week';
      const response = await firstValueFrom(this.httpService.get(url));
      console.log('✅ Python respondió correctamente.');
      return response.data;
    } catch (error) {
      // Quitamos el .message y que imprima el error completo
      console.error('❌ Error llamando a Python:', error);
      throw new HttpException('Error de comunicación con el motor IA', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}