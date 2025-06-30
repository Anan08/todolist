import { dummyTasks } from "../../../../constants/dummyTask";

const statuses = ["todo", "in-progress", "done"];
const statusLabels: Record<string, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "done": "Done",
};

export default function TaskKanbanView() {
  const tasksByStatus = statuses.reduce((acc: Record<string, typeof dummyTasks>, status) => {
    acc[status] = dummyTasks.filter((task) => task.status === status);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statuses.map((status) => (
        <div key={status} className={`bg-gray-50 p-4 rounded-lg shadow-sm hover:cursor-pointer`}>
          <div className="flex items-center space-x-2 mb-3">  
            <div className={`${status == "todo" ? "bg-amber-400" : status == "in-progress" ? "bg-blue-400" : "bg-green-400"} h-3 w-3 rounded-full`}/>
            <h3 className={`text-lg font-semibold text-gray-700`}>{statusLabels[status]}</h3>
          </div>
          <div className="space-y-3">
            {tasksByStatus[status].map((task) => (
              <div key={task.id} className="bg-white p-3 rounded-md shadow hover:shadow-md transition">
                <h4 className="font-semibold text-gray-800">{task.title}</h4>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">Due: {task.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
