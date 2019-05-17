export interface Project {
  id?: string;
  name?: string;
  isReady?: boolean;
  text?: string;
  userId?: string;
}

export interface User {
  id?: string;
  image?: string;
  displayName?: string;
  email?: string;
}
