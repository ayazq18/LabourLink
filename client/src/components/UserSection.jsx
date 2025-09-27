import { use, useEffect, useState } from "react";
import Popup from "../utils/Popup";
import useFetch from "../hooks/useFetch";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  console.log("users: ", users);

  const { data, loading, error } = useFetch(
    "http://localhost:5000/api/auth/fetchUsers"
  );

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  const handleOpen = (user) => {
    setOpen(true);
    setUser(user);
  };

  return (
    <div className=" h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-black">Users List</h1>

        <div className="overflow-x-auto ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left ">
                <th className="p-3 border text-black">Sr.</th>
                <th className="p-3 border text-black">Name</th>
                <th className="p-3 border text-black">Email</th>
                <th className="p-3 border text-black">Role</th>
                <th className="p-3 border text-black">Status</th>
                <th className="p-3 border text-black">Address</th>
                <th className="p-3 border text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-3 border text-black">{index + 1}</td>
                  <td className="p-3 border text-black">{user.name}</td>
                  <td className="p-3 border text-black">{user.email}</td>
                  <td className="p-3 border text-black">{user.role}</td>
                  <td className="p-3 border text-black">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.isVerified
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.isVerified === true ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="p-3 border text-black">
                    {user.address.tehsil}, {user.address.city},{" "}
                    {user.address.state}, {user.address.zip}
                  </td>
                  <td className="p-3 border space-x-2 text-black">
                    <button
                      onClick={() => handleOpen(user)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Popup isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New User
        </h2>
        <form className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={user?.name}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={user?.email}
          />
          <input
            type="role"
            placeholder="Role"
            className="w-full border p-2 rounded text-gray-400 bg-gray-200"
            value={user?.role}
            disabled
          />
          <input
            type="text"
            placeholder="Tehsil"
            className="w-full border p-2 rounded"
            value={user?.address.tehsil}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border p-2 rounded"
            value={user?.address.city}
          />
          <input
            type="text"
            placeholder="State"
            className="w-full border p-2 rounded"
            value={user?.address.state}
          />
          <input
            type="text"
            placeholder="Zip"
            className="w-full border p-2 rounded"
            value={user?.address.zip}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Save
          </button>
        </form>
      </Popup>
    </div>
  );
}
