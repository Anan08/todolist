import { useState } from "react";
import { sideBarItems } from "../../constants/sidebar";
import type { SideBarItem } from "../../types"; // import types for better type safety
import { useNavigate, Outlet } from "react-router";
import { DynamicIcon } from 'lucide-react/dynamic';
import useAuthStore from "../../store/useAuthStore";

export default function DashboardLayout() {
  const [activeId, setActiveId] = useState<number | null>(1); 
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeName, setActiveName] = useState<string>("Dashboard");
  const [activeIcon, setActiveIcon] = useState<string>('dashboard');
  const currentUser = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }
  const Navigate = useNavigate();
  const handleSidebarItemClick = (item : SideBarItem) => {
    setActiveId(item.id);
    setActiveName(item.title);
    setActiveIcon(item.icon);
    Navigate(item.route);
  }

  const handleLogout = () => {
    logout();
    Navigate("/login");
  }

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className= {`${isCollapsed ? "w-32" : "w-64"} bg-gray-100 border-r-[1px] border-r-gray-300 shadow-sm transition-all duration-300`}>
        <nav className="flex p-4 space-y-1 flex-col transition-all duration-300 justify-between h-full">
          <div className="p-4 flex flex-col items-center">
            <div className="mb-10">
              <img className={`${isCollapsed ? "w-10 h-10" : "h-20 w-20"} rounded-full object-cover transition-all duration-300`} src={currentUser?.profilePic ? import.meta.env.VITE_BACKEND_URL + currentUser.profilePic : "https://images.unsplash.com/photo-1750692115876-828f4f1b69e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
            </div>
              {sideBarItems.map((item : SideBarItem) => {
                  const isActive = item.id === activeId;
                  return (
                  <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition hover:bg-gray-200 ${isCollapsed? "" : "w-full"} ${
                      isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                      }`}
                      onClick={() => handleSidebarItemClick(item)}
                  >
                  <DynamicIcon name={item.icon} color="black" size={20}/>
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                  </div>
                  );
              })}
          </div>
          <div className="flex flex-col items-center p-4">
            <div
              className={`p-3 flex items-end gap-3 justify-start text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300 ${isCollapsed ? "" : "w-full"}`}
              onClick={handleLogout}
            >
              <DynamicIcon name="log-out" color="black" size={20}/>
              {!isCollapsed && <span className="text-sm">Logout</span>}
            </div>
              <div className="flex items-center w-full justify-center mb-4">
                <button
                  onClick={toggleSidebar}
                  className={`p-3 flex items-end gap-3 justify-start text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300 ${isCollapsed ? "" : "w-full"}`}
                >
                  {isCollapsed ? <DynamicIcon name="chevron-right" color="black" size={20}/> : <DynamicIcon name="chevron-left" color="black" size={20}/> }
                  {!isCollapsed && <span className="text-sm">Collapse</span>}
                </button>
            </div>

          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-10 border-b border-gray-200 p-8">
          <h1 className="text-lg font-bold text-gray-800 flex items-center"> <span className="pr-5"><DynamicIcon name={activeIcon}/></span> {activeName}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {isCollapsed ? <DynamicIcon name="chevron-right" color="white" size={14}/> : <DynamicIcon name="chevron-left" color="white" size={14}/>}
            </button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
