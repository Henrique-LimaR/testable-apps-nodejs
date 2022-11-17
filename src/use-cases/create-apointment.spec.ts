import {  describe, it, expect } from "vitest";
import { CreateApointment } from "./create-apointment.ts";
import { Apointment } from "../entities/apointment.ts";
import { getFutureDate } from "../tests/utils/get-future-date.ts";
import { InMemoryApointmentsRepository } from "../repositories/in-memory/in-memory-apointment.ts";

describe("Create Apointment", () => {
it("it should be able to create an Apointment", () => {

    const inMemoryApointmentsRepository = new InMemoryApointmentsRepository();
    const apointmentRepository = new CreateApointment(inMemoryApointmentsRepository);
    
    const startsAt = getFutureDate("2022-09-22");
    const endsAt = getFutureDate("2022-09-26");

    expect(apointmentRepository.execute({
      customer: "Guga Mendes",
      startsAt,
      endsAt
    })
    ).resolves.toBeInstanceOf(Apointment);
  
  });

it("it should not be able to create an apointment with overlapping dates", async () => {

    const inMemoryApointmentsRepository = new InMemoryApointmentsRepository();
    const apointmentRepository = new CreateApointment(inMemoryApointmentsRepository);
    
    const startsAt = getFutureDate("2022-09-23");
    const endsAt = getFutureDate("2022-09-27");

    await apointmentRepository.execute({
      customer: "Guga Mendes",
      startsAt,
      endsAt
    });
 
    expect(apointmentRepository.execute({
      customer: "Guga Mendes",
      startsAt: getFutureDate("2022-09-24"),
      endsAt: getFutureDate("2022-09-28")
    }))
    .rejects
    .toBeInstanceOf(Error);
  
    expect(apointmentRepository.execute({
      customer: "Guga Mendes",
      startsAt: getFutureDate("2022-09-25"),
      endsAt: getFutureDate("2022-09-26")
    }))
    .rejects
    .toBeInstanceOf(Error);
 
    expect(apointmentRepository.execute({
      customer: "Guga Mendes",
      startsAt: getFutureDate("2022-09-26"),
      endsAt: getFutureDate("2022-09-29")
    })).rejects.toBeInstanceOf(Error);

  });
});
