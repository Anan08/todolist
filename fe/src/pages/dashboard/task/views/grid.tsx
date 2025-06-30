import { dummyTasks } from "../../../../constants/dummyTask";

export default function TaskGridView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyTasks.map((task) => (
        <div key={task.id} className="bg-white rounded-xl shadow p-4 hover:shadow-md hover:scale-105 transition-transform duration-200 hover:cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${task.status === "todo" ? "bg-yellow-100 text-yellow-800" : task.status === "in-progress" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`${task.priority === "high" ? "text-red-800" : task.priority === "medium" ? "text-yellow-800" : "text-green-800"} text-xs text-gray-500`}>{task.priority}</span>
          </div>
          <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
          <div className="mt-2 text-xs text-gray-400">
            <p>Due: {task.dueDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
