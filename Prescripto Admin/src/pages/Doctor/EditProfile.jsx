import React, { useState } from 'react'
import { assets } from '../../assets/assets_admin/assets';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAuthDoctor, asyncEditDoctor } from '../../redux/action/doctorAction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function EditProfile() {
  const { doc } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const specialists = ["General physician", "Gynecologist", "Dermatologist", "Pediatricians",
    "Neurologist", "Gastroenterologist"];
  useEffect(() => {
    dispatch(asyncAuthDoctor(navigate));
  }, []);
  const [data, setData] = useState({
    image: "",
    name: "",
    email: "",
    speciality: "",
    degree: "",
    line1: "",
    line2: "",
    experience: "",
    description: "",
    fees: "",
    available: false
  });
  useEffect(() => {
    if (doc) {
      setData({
        image: doc.image || "",
        name: doc.name || "",
        email: doc.email || "",
        speciality: doc.speciality || "",
        degree: doc.degree || "",
        line1: doc.address?.line1 || "",
        line2: doc.address?.line2 || "",
        experience: doc.experience || "",
        description: doc.description || "",
        fees: doc.fees || "",
        available: doc.available || false
      });
    }
  }, [doc]);



  const onChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "image")
      setData({ ...data, [e.target.name]: e.target.files[0] });
    else
      setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = () => {
    e.preventDefault();
    console.log(data.speciality);
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("speciality", data.speciality);
    formData.append("degree", data.education);
    formData.append("email", data.email);
    formData.append("line1", data.line1);
    formData.append("line2", data.line2);
    formData.append("experience", data.experience);
    formData.append("description", data.about);
    formData.append("fees", data.fees);
    dispatch(asyncEditDoctor(formData));
  }
  return doc && (
  <form onSubmit={handleSubmit}>
      <div className='mx-20 mt-40'>
        <label htmlFor="image">
          <img src={doc.image || assets.upload_area} alt="Profile" />
        </label>
        {edit ? <input type="file" onChange={onChangeHandler} name='image' id='image' hidden /> : <></>}
        <div className='w-1/2 max-md:w-full'>
          {edit ? <input className='text-2xl font-bold  text-gray-700 py-2' onChange={onChangeHandler} value={data.name} type="text" name="name" id="name" />
            : <h1 className='text-2xl font-bold  text-gray-700 py-2'>{data.name}</h1>}
          <hr className='bg-gray-300 h-1' />
          <h1 className='text-gray-500 underline text-lg'>CONTACT INFORMATION</h1>

          <p className='flex flex-row  max-md:flex-col justify-between'><span>Email Id:</span>{doc.email} <span></span></p>
          <h1 className='text-gray-500 underline text-lg'>BASIC INFORMATION</h1>
          {
            !edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Speciality:</span> <span>{data.speciality}</span></p>
            </> :
              <>
                <div className='flex flex-col  space-y-2' >
                  <label htmlFor="">Speciality</label>
                  <select className='border-1 w-80 px-2 py-1 border-gray-600 rounded-md' value={data.speciality} onChange={onChangeHandler} name="speciality" id="">
                    {
                      specialists.map((speciality, index) => (
                        <option key={index} value={speciality} >{speciality}</option>
                      ))
                    }
                  </select>
                </div>
              </>
          }
          {
            edit ? <>
              <p className='flex flex-row   max-md:flex-col justify-between'><span>Degree</span> <input type='text' onChange={onChangeHandler} value={data.degree} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='degree' /></p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Degree</span> <span>{data.degree}</span></p>
              </>
          }
          <br />

          {
            edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Experience:</span> <input type='text' onChange={onChangeHandler} value={data.experience} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='experience' /> </p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Experience:</span> <span>{data.experience}</span></p>
              </>
          }
          {
            edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Description:</span> <input type='text' onChange={onChangeHandler} value={data.description} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='description' /></p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Description:</span> <span>{data.description}</span></p>
              </>
          }
          {
            edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Fees:</span> <input type='text' onChange={onChangeHandler} value={data.fees} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='fees' /></p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Fees:</span> <span>{data.fees}</span></p>
              </>
          }
          {
            edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Address1:</span> <input type='text' onChange={onChangeHandler} value={data.line1} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='line1' /></p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Address1:</span> <span>{data.line1}</span></p>
              </>
          }
          {
            edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Address2:</span> <input type='text' onChange={onChangeHandler} value={data.line2} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='line2' /></p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Address2:</span> <span>{data.line2}</span></p>
              </>
          }
          {
            edit ? <>
              <p className='flex flex-row  max-md:flex-col justify-between'><span>Available:</span> <input type='text' onChange={onChangeHandler} value={data.dob} className='border-1 border-gray-600 px-2 py-1 rounded-lg' name='dob' /></p>
            </> :
              <>
                <p className='flex flex-row  max-md:flex-col justify-between'><span>Available:</span> <span>{data.available ? 'True' : 'False'}</span></p>
              </>
          }
          <br />
          <div className='flex flex-row justify-between'>
            <button type="button" onClick={() => { setEdit(true) }} className={`px-6 py-1  ${edit ? 'disabled' : 'enabled'}   rounded-2xl border-gray-600 border-1`}>Edit</button>
            <button type='submit' onClick={() => { setEdit(false) }} className={`px-2 py-1 ${!edit ? 'disabled' : 'enabled'}  rounded-2xl border-gray-600 border-1`}>Save Information</button>
          </div>

        </div>

      </div>
    </form>
  )
}

export default EditProfile
