import { useState } from "react";

const FormTable = () => {
    const[formdata, setFormData] = useState({id:"", Name:"", Gender:""});
    const [array, setArray] = useState([]);
    const[temp, setTemp] = useState(false);
    const [idDisabled, setIdDisabled] = useState(false);

    const { id, Name, Gender } = formdata;

    const data = (event) => {
        const updateData = {
        id: id,
        Name: Name,
        Gender: Gender,
        [event.target.id]: event.target.value
      };
    setFormData(updateData);
    };
 
    const submit = () => {
        if (id === "" || Name === "" || Gender === "") {
            alert("Please enter valid input.");
            return;
        } 
    
        let itemIndex = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                itemIndex = i;
                break;
            }
        }
    
        if (itemIndex !== -1 && !temp) {
            alert("ID already exists.");
            return;
        }
    
        if (temp) {
            const updatedArray = [...array];
            updatedArray[itemIndex] = formdata;
            setArray(updatedArray);
            setTemp(false);
        } else {
            setArray([...array, formdata]);
        }
        setFormData({ id: "", Name: "", Gender: "" });
        setIdDisabled(false);
    };
    

    const cancelData = () => {
        setFormData({id:"", Name:"", Gender:""});
        setTemp(false);
        setIdDisabled(false);
    }

    const editData = (item) => {
    setTemp(true);
    setFormData(item); 
    setIdDisabled(true);
};


const deleteData = (idToDelete) => {
    const updatedArray = [];
    for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.id !== idToDelete) {
        updatedArray[updatedArray.length] = item;
    }
}
     setArray(updatedArray);
    
    if (formdata.id === idToDelete) {
        setFormData({ id: "", Name: "", Gender: "" });
        setTemp(false);
        setIdDisabled(false);
    }
};


    const bindTable = () => {
        return (
            <table style={{borderCollapse: 'collapse', width: '60%', marginTop: "10px"}}>
                <thead>
                    <tr>
                        <th style ={{border:'1px solid black'}}>Id</th>
                        <th style ={{border:'1px solid black'}}>Name</th>
                        <th style ={{border:'1px solid black'}}>Gender</th>
                        <th style ={{border:'1px solid black'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((item, index) => (
                        <tr>
                            <td style ={{border:'1px solid black'}} >{item.id}</td>
                            <td style ={{border:'1px solid black'}}>{item.Name}</td>
                            <td style ={{border:'1px solid black'}}>{item.Gender}</td>
                            <td style ={{border:'1px solid black'}}>
                                <button onClick={() => editData(item)}>Edit</button>
                                <button onClick={()=>deleteData(item.id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <>
           <div> Id: <input id="id" value={id} onChange={data} readOnly={temp} disabled={idDisabled}/></div>
            <div> Name: <input id="Name" value={Name} onChange={data} /></div>
            <div>Gender: <input id="Gender" value={Gender} onChange={data} /></div>
            <button onClick={submit}>Submit</button>
            <button onClick={cancelData}>Cancel</button>

            {array.length > 0 && bindTable()}
        </>
    )
}

export default FormTable;