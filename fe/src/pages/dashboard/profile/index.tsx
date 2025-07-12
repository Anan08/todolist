import { useEffect, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { DynamicIcon } from 'lucide-react/dynamic';

interface formProps {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    gender: string,
    birthDate: string,
    bio: string,
    profilePic: string,
}

export default function ProfilePage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<formProps>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    birthDate: "",
    bio: "",
    profilePic: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [previewPic, setPreviewPic] = useState<string>(import.meta.env.VITE_BACKEND_URL + currentUser?.profilePic);

  useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        birthDate: currentUser.birthDate && !isNaN(Date.parse(currentUser.birthDate))
        ? new Date(currentUser.birthDate).toISOString().split("T")[0]
        : "",
        bio: currentUser.bio || "",
        profilePic: currentUser.profilePic || "",
      });
      console.log(currentUser.profilePic);
      setPreviewPic(currentUser.profilePic || "");
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewPic(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  // const uploadImage = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("profilePic", file);

  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/udpate-profile`, {
  //       method: "POST",
  //       credentials: "include",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (res.ok && data?.url) {
  //       setForm((prev) => ({ ...prev, profilePic: data.url }));
  //     } else {
  //       alert("Failed to upload image.");
  //     }
  //   } catch (err) {
  //     console.error("Upload error:", err);
  //     alert("Something went wrong during image upload.");
  //   }
  // };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("gender", form.gender);
      formData.append("birthDate", form.birthDate);
      formData.append("bio", form.bio);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);

      if (selectedImageFile) {
        formData.append("profilePicture", selectedImageFile)
      }


      await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile/update`, {
        method: "PUT",
        credentials: "include",
        body: formData
      });

      setIsEdit(false);
      fetchCurrentUser();
    } catch {
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    if (currentUser) {
      setForm({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        birthDate: new Date(currentUser.birthDate).toISOString().slice(0, 10) || "",
        bio: currentUser.bio || "",
        profilePic: currentUser.profilePic || "",
      });
      setPreviewPic(`${import.meta.env.VITE_BACKEND_URL}/${form.profilePic}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-gray-800">My Profile</h1>
          {!isEdit ? (
            <button onClick={() => setIsEdit(true)} className="text-blue-600 hover:underline flex items-center gap-1">
              <DynamicIcon name="pen" size={16} />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">Cancel</button>
              <button onClick={handleSave} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Save</button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="col-span-1 flex flex-col gap-2 justify-center items-center border border-gray-200 rounded-2xl bg-white p-4">
            <img
              src={isEdit && previewPic ? previewPic :`${import.meta.env.VITE_BACKEND_URL}${currentUser?.profilePic}`}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            {isEdit && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            )}
          </div>

          {/* Info Fields */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["firstName", "lastName", "username", "email", "gender"].map((field) => (
              <div key={field} className="bg-white rounded-2xl shadow p-4">
                <p className="text-gray-500 text-sm capitalize">{field}</p>
                {isEdit ? (
                  <input
                    type="text"
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="mt-1 w-full px-2 py-1 border border-gray-300 rounded-md text-gray-800"
                  />
                ) : (
                  <p className="font-semibold text-gray-800">{(form as any)[field] || "—"}</p>
                )}
              </div>
            ))}

            {/* Birth Date */}
            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-gray-500 text-sm">Birth Date</p>
              {isEdit ? (
                <input
                  type="date"
                  name="birthDate"
                  value={form.birthDate.slice(0, 10)}
                  onChange={handleChange}
                  className="mt-1 w-full px-2 py-1 border border-gray-300 rounded-md text-gray-800"
                />
              ) : (
                <p className="font-semibold text-gray-800">{new Date(form.birthDate).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="col-span-1 md:col-span-3 bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">Bio</p>
            {isEdit ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="mt-1 w-full px-2 py-1 border border-gray-300 rounded-md text-gray-800"
              />
            ) : (
              <p className="font-semibold text-gray-800">{form.bio || "—"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
