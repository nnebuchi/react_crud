import React, { useState, useEffect, useRef  } from "react";

export default function RegisteredUsers(){
    const createModal = useRef('createModal');
    const deleteModal = useRef('deleteModal');
    const confirmDeleteBtn = useRef('confirmDeleteBtn');
    const deleteUSerName = useRef('deleteUSerName');
    const editModal = useRef('editModal');
    const editName  = useRef('editName');
    const editEmail  = useRef('editEmail');
    const updateBtn = useRef('updateBtn');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [users, setUser] = useState([]);
    useEffect(() => {
        
         getUsers();
       
    }, []);
    
    function showForm(){
        // console.log(createModal.current)
        createModal.current.style.display = 'block'
    }


    async function getUsers(){
        const allUsers = await fetch("http://localhost/bukkasa/api/fetch-users", {
            method: "GET",
            headers:{
                Authorization: "Bearer Z2yG20oN6lSx6qZhlI1zEOxKmH1dSHewfATVDWcD8AIMRGP45pJuPhBTxDxuqdGx4KiepV8E1bDdWPWVSjdXnFI9SsqlKZQLFx1uxExc8fFguNNjien8V7O6D7hiyHA1i8V6c7CrDAlws6dIjMlsexNsMJJIHYGa"
            }
        });
        const feedback = await allUsers.json();
        console.log(feedback)
        if(feedback.status == 'success'){
            setUser(feedback.users)
        }
        
    }

    async function submitForm(){
            hideInputForm()
           const addUser = await fetch("http://localhost/bukkasa/api/register", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name: name,
                    email   : email,
                    password: password
                }),
            });

            
            const feedback = await addUser.json();
            // if your backend APi returns the updated list of users, Set Users with it so the dom will be updated
            setUser(feedback.users);
             
            // if your backend APi does not return the update list of users, call the getUsers function (in the getUser function above, we fetched the users and updates the dom with it)
            // getUsers()
            console.log(feedback)
            
    }

    function hideInputForm(){
        createModal.current.style.display = 'none'
    }

    async function showDeleteModal(event){
        // get the value of the target attribute from the delete button that was clicked
        let userId = event.target.getAttribute('target');
        // Show confirm delete modal
        deleteModal.current.style.display = 'block';
        // add the name of the user to be deleted on the confirmation modal
        deleteUSerName.current.textContent = event.target.getAttribute('username')
        // pass the value of the target attribute gotten from the delete button to the confirm delete button(procced) in the confirm delete modal
        confirmDeleteBtn.current.setAttribute('target', userId);
        
    }

    
    async function deleteUser(event){
        // hide the modal
        closeDeleteModal();

        let id = event.target.getAttribute('target')
        console.log(id);
        // return;
        const deleteUser = await fetch(`http://localhost/bukkasa/api/delete-user/${id}`, {
            method: "POST"
        });

        const response = await deleteUser.json();

        if(response.hasOwnProperty('status') && response.status=='success'){
            setUser(response.users)
            // getUsers()
        }else{
            alert('something went wrong')
        }
        // console.log(response)

    }

    async function closeDeleteModal(){
        deleteModal.current.style.display = 'none'
    }

    async function showEditModal(event){
        const userId = event.target.getAttribute('target')
        editModal.current.style.display = 'block'
        const newEmail = event.target.closest('tr').children[3].textContent
        const newName = event.target.closest('tr').children[2].textContent
        editEmail.current.value = newEmail
        editName.current.value = newName
        setEmail(newEmail);
        setName(newName)
        // console.log(newEmail)
        updateBtn.current.setAttribute('target', userId)
    }

    async function updateUser(event){
        closeEditModal();
       
        const modifyUser = await fetch("http://localhost/bukkasa/api/update-user", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name    : name,
                email   : email,
                id      : event.target.getAttribute('target')
            }),
        });
        const feedback = await modifyUser.json();
        // if your backend APi returns the updated list of users, Set Users with it so the dom will be updated
        // setUser(feedback.users);
            
        // if your backend APi does not return the update list of users, call the getUsers function (in the getUser function above, we fetched the users and updates the dom with it)
        getUsers()
        console.log(feedback)
    }


    async function closeEditModal(){
        editModal.current.style.display = 'none'
    }
    return(
        <>
            <h2>
               Users List
                <button className="form-btn" onClick={showForm}>Add user +</button>
            </h2>
            <hr />
            <table>
                <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>S/N</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user, index)=>(
                        <tr key={user.id} id={index}>
                            <td><input type="checkbox"/></td>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-primary" onClick={showEditModal} target={user.id}>Edit</button>
                                <button className="btn btn-danger" onClick={showDeleteModal} target={user.id}username={user.name}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="form-bg w-25" id="form-modal" ref={createModal}>
                <form>
                    <div style={{textAlign: "right"}}>
                        <strong id="close" onClick={hideInputForm}>X</strong>
                    </div>
                    <div className="form-group">
                        <label>Email</label><br/>
                        <input type="email" name="email" className="form-control" onChange={(event)=>{
                            setEmail(event.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Name</label><br/>
                        <input type="text" name="fullname" className="form-control"  onChange={(event)=>{
                            setName(event.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label><br/>
                        <input type="password" name="password" className="form-control"  onChange={(event)=>{
                            setPassword(event.target.value)
                        }}/>
                    </div>
                    
                    <button className="btn submit-form" type="button" onClick={submitForm}>Submit</button>
                </form>
                
            </div>

        
            <div className="deleteModal" ref={deleteModal}>
                <h3>Delete <span ref={deleteUSerName}></span></h3>
                <p>This action cannot be undone</p>

                <button className="close-modal-btn" onClick={closeDeleteModal}>Go back </button>
                <button className="proceed-modal-btn" ref={confirmDeleteBtn} onClick={deleteUser}>Proceed</button>
            </div>


            <div className="form-bg w-25 edit-modal" ref={editModal}>
                <h3>Edit User</h3>
                <form>
                    <div style={{textAlign: "right"}}>
                        <strong id="close" onClick={closeEditModal}>X</strong>
                    </div>
                    <div className="form-group">
                        <label>Email</label><br/>
                        <input type="email" name="email" className="form-control"  ref={editEmail} onChange={(event)=>{
                            setEmail(event.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Name</label><br/>
                        <input type="text" name="fullname" className="form-control" ref={editName}  onChange={(event)=>{
                            setName(event.target.value)
                        }}/>
                    </div>
                    
                    
                    <button className="btn submit-form" type="button" onClick={updateUser} ref={updateBtn}>Submit</button>
                </form>
                
            </div>
        </>
    )
}