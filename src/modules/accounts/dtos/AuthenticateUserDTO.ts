export interface AuthenticateUserDTO {
  email: string
  password: string
}

export interface AuthenticateUserResponseDTO {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}
