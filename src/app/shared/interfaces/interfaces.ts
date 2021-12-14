export interface User {
  email: string;
  password: string;
  id?: string;
  uid?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  localId?: string;
  birthday?: string;
  gender?: string;
  address?: string;
  about?: string;
  phoneNumber?: string;
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
  dateAdd: string;
  newComment?: string;
  dateAddComment?: string;
}

export interface UserData {
  id?: any;
  uid?: string;
  email: string;
  displayName: string;
  birthday?: string;
  gender?: string;
  address?: string;
  about?: string;
  phoneNumber?: string;
}

export interface Comment {
  id?: string;
  newComment: string;
  dateAddComment: string;
}
