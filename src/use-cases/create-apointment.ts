import { Apointment } from "../entities/apointment.ts";
import { ApointmentsRepository } from "../repositories/apointments-repositories.ts";

interface CreateApointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date
}

type CreateApointmentResponse = Apointment

export class CreateApointment {
  constructor(
    private apointmentsRepository: ApointmentsRepository
  ) {}

  async execute({
      customer,
      startsAt,
      endsAt
    }: CreateApointmentResponse): Promise<CreateApointmentResponse> {
      const overlappingApointment = await this.apointmentsRepository.findOverlappingApointment(
        startsAt,
        endsAt
      )

      if(overlappingApointment){
        throw new Error("This hour already marked!");
      }

      const apointment = new Apointment({
        customer,
        startsAt,
        endsAt
      });
      
      await this.apointmentsRepository.create(apointment);
     
      return apointment;
    }; 
};
