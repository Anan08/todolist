export interface User {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Task {
  readonly id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SideBarItem {
  id: number;
  title: string;
  icon: string;
  route: string;
}