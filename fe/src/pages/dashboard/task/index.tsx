import { useEffect, useState } from "react";
import { taskViewLayouts } from "../../../constants/task"
import { DynamicIcon } from "lucide-react/dynamic";
import TaskListView from "./views/list";
import TaskGridView from "./views/grid";
import TaskKanbanView from "./views/kanban";

export default function TaskPage() {
    const [activeLayout, setActiveLayout] = useState<string>(taskViewLayouts[0].value);
    const [formActive, setFormActive] = useState<boolean>(false);
    const layouts = taskViewLayouts;
    useEffect(() => {
    }, []);

    return (
        <div>
            {/* {formActive && <TaskForm onClose={() => setFormActive(false)} isOpen={formActive} />} */}
            <div className="flex justify-between h-10 px-8 py-2 flex-col space-y-2">
                <h1 className="text-lg font-medium text-gray-800 ">Task</h1>
                <p className="text-sm text-gray-400">Task overview</p>
            </div>
            <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center p-4 border-b border-gray-200 space-x-5">
                        {layouts.map((item) => (
                            <button>
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition w-25 hover:bg-gray-200 ${activeLayout === item.value ? "bg-blue-100 text-blue-700 font-medium shadow-sm shadow-blue-700" : "text-gray-700"}`}
                                    onClick={() => setActiveLayout(item.value)}
                                >
                                    <i className={`icon-${item.icon} text-lg`}></i>
                                    <DynamicIcon name={item.value} color="black" size={20}/>
                                    <span className="text-sm">{item.title}</span>
                                </div>
                            </button>))
                        }
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="text" className="px-4 py-1 text-gray-700 rounded-md hover:bg-white transition border border-gray-200"/>
                        <button className="px-4 py-2 text-white rounded-md hover:bg-blue-600 transition border border-gray-200">
                            <DynamicIcon name="list-filter-plus" color="black" size={16} />
                        </button>
                        <button className="px-4 py-2 text-white rounded-md hover:bg-blue-600 transition border border-gray-200">
                            <DynamicIcon name="sliders-horizontal" color="black" size={16} />
                        </button>
                        <button className="px-4 py-2 text-white rounded-md hover:bg-gray-400 transition border border-gray-200" onClick={() => setFormActive(!formActive)}>
                            <DynamicIcon name="plus" color="black" size={16} />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {activeLayout === "kanban" && <TaskKanbanView />}
                    {activeLayout === "grid" && <TaskGridView />}
                    {activeLayout === "list" && <TaskListView />}
                </div>
            </div>
        </div>
    )
}