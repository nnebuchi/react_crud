import React, { useState, useEffect } from "react";


export default function Users(){
    const [users, setUser] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await fetch(`https://jsonplaceholder.typicode.com/users`);
            const feedback = await allUsers.json();
            // console.log(feedback)
            setUser(feedback)
        }
         getUsers();
       
    }, []);

    
    
    function deleteUser(event){
   
        var filtered = users.filter(filterUser)
        console.log(filtered)
        setUser(filtered)

        function filterUser(value, index, arr){ 
            return arr[index] !== users[event.target.id];
        };
    }
    
    

    return(
        <>
            <table>
                <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>  
                    <th>Address</th>
                    {/* <th>Website</th> */}
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user, index)=>(
                        <tr key={user.id}>
                            <td><input type={'checkbox'}  /></td>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.username}</td>
                            <td>{user.company.name}</td>
                            <td>{user.address.suite} {user.address.street} {user.address.city}</td>
                            <td>
                                <button onClick={deleteUser} id={index}>Delete</button>
                                <button>Edit</button>
                                <button>View</button>
                            </td>
                        </tr>
                    ))}

            
                </tbody>
            </table>

           <img src="images/girl.jpg" alt="photo of a lady"/>
        </>
    )
}




