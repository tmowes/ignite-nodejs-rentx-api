// import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory"
// import AppError from "@shared/errors/AppError"
// import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase"
// let listRentalsByUserUseCase: ListRentalsByUserUseCase
// let rentalsRepositoryInMemory: RentalsRepositoryInMemory
// describe('ListRentalsByUser', () => {
//   beforeEach(() => {
//     rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
//     listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepositoryInMemory)
//   })
//   it('should be able to listRentalsByUser', async () => {
//     const createdRental = {
//       name: "Rental Name Test",
//       description: "Rental Description Test",
//     }
//     await listRentalsByUserUseCase.execute(createdRental)
//     const rentalCreated = await rentalsRepositoryInMemory.findByName(createdRental.name)
//     expect(rentalCreated).toHaveProperty('id')
//   })
//   it('should not be able to listRentalsByUser with same name', async () => {
//       const createdRental = {
//         name: "Rental Name Test",
//         description: "Rental Description Test",
//       }
//       await listRentalsByUserUseCase.execute(createdRental)
//     await expect(
//        listRentalsByUserUseCase.execute(createdRental)
//     ).rejects.toEqual(new AppError("Message"))
//   })
// })
"use strict";