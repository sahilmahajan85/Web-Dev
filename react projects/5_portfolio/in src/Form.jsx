import { useState } from "react";
export default function Form(){
    let [formData, SetFormData]= useState({
        fullName:"",
        userName:""
    });

   // let handleNameChange = (event) => {
    //    SetFullName(event.target.value)
   // };
   let handleInputChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value; 
    SetFormData( (currData) => {
        return{ ...currData, [fieldName]: newValue};
    });
   };
    return (
        <form>
            <label htmlFor="fullName">Full Name</label>
            <input type="text"
             placeholder="enter full name" 
             value={formData.fullName} 
             onChange={handleInputChange}
             id="fullName" 
             name="fullName" />

             <br /><br />

             <label htmlFor="userName">User Name</label>
            <input type="text"
             placeholder="enter full name" 
             value={formData.userName} 
             onChange={handleInputChange}
             id="userName"
             name="userName" />

        <button>Submit</button>
        </form>
    );
}