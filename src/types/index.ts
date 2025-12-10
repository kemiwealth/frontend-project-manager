export interface Project {
    name: string;
    description: string;
    _id: string;
    tasks?: Task[];
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
}
