import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Edit from "../../../assets/Edit.svg";
export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [inputData, setInputData] = useState({
    username: "",
    bio: "",
    phonenumber: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const id = user.data.id;

  const postForm = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    e.preventDefault();
    const formData = new FormData();
    formData.append("username", inputData.username);
    formData.append("bio", inputData.bio);
    formData.append("phonenumber", inputData.phonenumber);
    formData.append("photo", photo);
    console.log(formData);
    axios
      .put(process.env.REACT_APP_BACKEND_API_HOST + "/users/edit", formData, {
        "content-type": "multipart/form-data",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("input data success");
        Swal.fire("Success", "Edit Profile Success", "success");
      })
      .catch((err) => {
        Swal.fire("Warning", "Error", "Warning");
        console.log(err);
      });
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  return (
    <>
      <img
        src={Edit}
        className="items-center"
        onClick={() => setShowModal(true)}
        style={{ width: "60px", height: "60px" }}
      ></img>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3
                    className="text-3xl font-semibold "
                    style={{ color: "#7e98df" }}
                  >
                    Edit Profile
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={postForm}>
                  <div className="relative p-6 flex-auto">
                    <div className="input-group flex row flex-row form-control">
                      <input
                        type="text"
                        placeholder="Username"
                        className="input w-full max-w-xs "
                        value={inputData.username}
                        name="username"
                        onChange={handleChange}
                      />
                      <hr />
                      <input
                        type="text"
                        placeholder="Phonenumber"
                        className="input w-full max-w-xs mt-5"
                        value={inputData.phonenumber}
                        name="phonenumber"
                        onChange={handleChange}
                      />
                      <hr />
                      <input
                        type="text"
                        placeholder="Bio"
                        className="input w-full max-w-xs mt-5"
                        value={inputData.bio}
                        name="bio"
                        onChange={handleChange}
                      />
                      <hr />
                      <div className="flex mt-5">
                        <span className="mt-4 bg-white">Photo</span>
                        <input
                          type="file"
                          placeholder="Photo"
                          name="photo"
                          className="input w-full max-w-xs mt-5"
                          onChange={handlePhoto}
                        />
                      </div>
                    </div>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onSubmit={postForm}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
