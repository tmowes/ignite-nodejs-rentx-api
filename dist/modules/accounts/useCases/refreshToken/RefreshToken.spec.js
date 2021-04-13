// import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory'
// import AppError from '@shared/errors/AppError'
// import { RefreshTokenUseCase } from './RefreshTokenUseCase'
// let refreshTokenUseCase: RefreshTokenUseCase
// let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
// describe('RefreshToken', () => {
//   beforeEach(() => {
//     usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
//     refreshTokenUseCase = new RefreshTokenUseCase(usersTokensRepositoryInMemory)
//   })
//   it('should be able to refreshToken', async () => {
//     const createdUserToken = {
//       name: 'UserToken Name Test',
//       description: 'UserToken Description Test',
//     }
//     await refreshTokenUseCase.execute(createdUserToken)
//     const userTokenCreated = await usersTokensRepositoryInMemory.findByName(
//       createdUserToken.name
//     )
//     expect(userTokenCreated).toHaveProperty('id')
//   })
//   it('should not be able to refreshToken with same name', async () => {
//     const createdUserToken = {
//       name: 'UserToken Name Test',
//       description: 'UserToken Description Test',
//     }
//     await refreshTokenUseCase.execute(createdUserToken)
//     await expect(refreshTokenUseCase.execute(createdUserToken)).rejects.toEqual(
//       new AppError('Message')
//     )
//   })
// })
"use strict";