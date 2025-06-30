import { dummyTasks } from "../../../../constants/dummyTask";

export default function TaskListView() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-sm rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600">
            <th className="p-3"><input type="checkbox" disabled /></th>
            <th className="p-3 text-center">Title</th>
            <th className="p-3 w-30 items-center text-center">Status</th>
            <th className="p-3 w-30 items-center text-center">Priority</th>
            <th className="p-3">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyTasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 text-sm">
              <td className="p-3"> <input type="checkbox" disabled /> </td>
              <td className="p-3 font-medium text-gray-700">{task.title}</td>
              <td className={`${task.status == "todo" ? "text-blue-500" : task.status == "done" ? "text-green-500" : "text-amber-500"} items-center text-center w-30  justify-center`}>{task.status}</td>
              <td className={`${task.priority == "high" ? "text-red-500" : task.priority == "medium" ? "text-amber-500" : "text-green-500"} items-center w-30 justify-center text-center`}>{task.priority}</td>
              <td className="p-3">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
