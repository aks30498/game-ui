// src/interfaces/player.ts
export interface Address {
  street?: string
  city: string
  state: string
  zipCode: string
}

export interface PersonalDetails {
  firstName: string
  lastName: string
  dob: Date
  email: string
  phoneNumber: string
  address: Address
}

export interface Player {
  _id: string
  username: string
  personalDetails: PersonalDetails
  games: string[]
  teams: string[]
  createdAt: Date
  updatedAt: Date
}
