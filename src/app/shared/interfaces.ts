export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
  idToken?: string
}

export interface FbAuthResponse {
  email: string
  idToken: string
  expiresIn: string
  returnSecureToken?: boolean
}

