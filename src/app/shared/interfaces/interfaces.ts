export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
  idToken?: string;
  userName?: string;
  uid?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  localId?: string;
}

export interface FbAuthResponse {
  email: string;
  idToken: string;
  expiresIn: string;
  returnSecureToken?: boolean;
}

export interface ExampleTab {
  label: string;
  content: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  date: string;
  status: string;
}

export interface UserData {
  uid?: string;
  email: string;
  displayName: string;
}
