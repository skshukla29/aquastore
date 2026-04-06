export interface AuthUser {
  name: string;
  email: string;
}

export interface PrototypeTask {
  id: string;
  title: string;
  note: string;
  completed: boolean;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
