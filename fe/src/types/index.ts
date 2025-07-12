export interface User {
  readonly id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender : string;
  birthDate: Date;
  bio: string;
  profilePic: string;
}

export interface Task {
  readonly id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  description: string;
  assignedTo: string;
  status: "todo" | "in-progress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

export interface SideBarItem {
  id: number;
  title: string;
  icon: string;
  route: string;
}