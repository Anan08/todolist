import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userData] = useState({
    profilePicture:
      "https://images.unsplash.com/photo-1750692115876-828f4f1b69e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    email: "john@example.com",
    gender: "Male",
    birthDate: "1995-08-20",
    bio: "Loves coding, coffee, and cats.",
  });

  useEffect(() => {
    // Optionally fetch user data here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-800 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="col-span-1 flex justify-center items-center border border-gray-200 rounded-2xl bg-white p-4">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          </div>

          {/* Main Info */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">First Name</p>
              <p className="font-semibold text-gray-800">{userData.firstName}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">Last Name</p>
              <p className="font-semibold text-gray-800">{userData.lastName}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">Username</p>
              <p className="font-semibold text-gray-800">{userData.username}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-gray-800">{userData.email}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">Gender</p>
              <p className="font-semibold text-gray-800">{userData.gender}</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">Birth Date</p>
              <p className="font-semibold text-gray-800">{userData.birthDate}</p>
            </div>
          </div>

          {/* Bio full-width */}
          <div className="col-span-1 md:col-span-3 bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">Bio</p>
            <p className="font-semibold text-gray-800">{userData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
