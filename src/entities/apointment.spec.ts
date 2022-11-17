import { test, expect } from "vitest";
import { Apointment } from "./apointment.ts";
import { getFutureDate } from "../tests/utils/get-future-date.ts"; 

test("create a apointment", () => {

  const startsAt = getFutureDate("2022-09-25"); 
  const endsAt = getFutureDate("2022-09-28");
 
  startsAt.setDate(startsAt.getDate() + 1); 
  endsAt.setDate(endsAt.getDate() + 2);
    
  const apointment = new Apointment({
    customer: "Guga Mendes",
    startsAt,
    endsAt
  });

  expect(apointment).toBeInstanceOf(Apointment)
  expect(apointment.customer).toEqual("Guga Mendes")
});

test("cannot create a apointmet with end date before to start date", () => {
  const startsAt = getFutureDate("2022-09-25");
  const endsAt =  getFutureDate("2022-09-24");
 
  startsAt.setDate(startsAt.getDate() + 2);
  endsAt.setDate(endsAt.getDate() + 1);

  expect(() => {
    return new Apointment({
      customer: "Guga Mendes",
      startsAt,
      endsAt
    })
  }).toThrow()
});

test("cannot create a apointmet with start date before now", () => {

  const startsAt = new Date();
  const endsAt = new Date();
 
  startsAt.setDate(startsAt.getDate() - 2);

  expect(() => {
    return new Apointment({
      customer: "Guga Mendes",
      startsAt,
      endsAt
    })
  }).toThrow("Can't add start date before now!")
});
