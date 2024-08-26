import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAsync, fetchAllUsersAsync, selectUsers } from "../userSlice";
import profile from "../../../assets/profile.png";
import { CiEdit } from "react-icons/ci";
import { MdCall, MdDeleteOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Userlist = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const handleDelete = (e, id) => {
    dispatch(deleteAsync(id));
  };
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-bold text-3xl text-gray-700">User Accounts</h2>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Delete</th>
                <th className="px-5 py-3">Edit</th>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">User Role</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Address</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">
                        <MdDeleteOutline
                          onClick={(e) => handleDelete(e, user.id)}
                          className="text-gray-700 cursor-pointer"
                          size={20}
                        />
                      </p>
                    </td>
                    <td className="bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">
                        <Link to={`/admin/users/${user.id}`}>
                          <CiEdit
                            className="text-gray-700 cursor-pointer hover:text-blue-600"
                            size={20}
                          />
                        </Link>
                      </p>
                    </td>
                    <td className="bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.id}</p>
                    </td>
                    <td className="bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.name}</p>
                    </td>
                    <td className="bg-white px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src={profile}
                            alt="profile"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">{user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.email}</p>
                    </td>
                    <td className="bg-white px-5 py-5 text-sm">
                      {user.addresses.map((address, index) => (
                        <p
                          key={index}
                          className="whitespace-no-wrap text-nowrap flex flex-row items-center gap-2"
                        >
                          <MdCall /> {address.phone || "-"}
                        </p>
                      ))}
                    </td>
                    <td className="bg-white px-5 py-5 text-sm w-30">
                      {user.addresses.map((address, index) => (
                        <p
                          key={index}
                          className="whitespace-no-wrap m-2 flex flex-row items-center gap-1"
                        >
                          <FaLocationDot size={12} />
                          {address.city || "-"}
                        </p>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
