import { Apointment } from "../../entities/apointment.ts";
import { ApointmentsRepository } from "../apointments-repositories.ts";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryApointmentsRepository implements ApointmentsRepository {
  public items: Apointment[] = [];

  async create(apointment: Apointment): Promise<void> {
    await this.items.push(apointment);
  };

  async findOverlappingApointment(startsAt: Date, endsAt: Date): Promise<Apointment | null> {
    const overlappingApointment = await this.items.find((apointment) => {
      return areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt
        },
        {
          start: apointment.startsAt,
          end: apointment.endsAt
        },
        {
          inclusive: true
        }
      )
    });
    
    if(!overlappingApointment){
      return null;
    }
    return overlappingApointment;
  };
}; 
