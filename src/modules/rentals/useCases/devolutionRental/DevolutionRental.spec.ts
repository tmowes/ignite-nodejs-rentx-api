// import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory'

// import AppError from '@shared/errors/AppError'

// import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

// let devolutionRentalUseCase: DevolutionRentalUseCase
// let rentalsRepositoryInMemory: RentalsRepositoryInMemory

// describe('DevolutionRental', () => {
//   beforeEach(() => {
//     rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
//     devolutionRentalUseCase = new DevolutionRentalUseCase(rentalsRepositoryInMemory)
//   })
//   it('should be able to devolutionRental', async () => {
//     const createdRental = {
//       name: "Rental Name Test",
//       description: "Rental Description Test",
//     }
//     await devolutionRentalUseCase.execute(createdRental)
//     const rentalCreated = await rentalsRepositoryInMemory.findByName(createdRental.name)
//     expect(rentalCreated).toHaveProperty('id')
//   })
//   it('should not be able to devolutionRental with same name', async () => {
//       const createdRental = {
//         name: "Rental Name Test",
//         description: "Rental Description Test",
//       }
//       await devolutionRentalUseCase.execute(createdRental)
//     await expect(
//        devolutionRentalUseCase.execute(createdRental)
//     ).rejects.toEqual(new AppError("Message"))
//   })
// })
