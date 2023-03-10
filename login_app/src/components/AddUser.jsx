import React, { useState} from 'react'; 
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal' ;
function AddUser() {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [errorModal, setErrorModal] = useState(null)

    function namedChangeHandler(event){
        setName(event.target.value)
    }
    function passwordChangeHandler(event){
        setPassword(event.target.value)
    }
    function emailChangeHandler(event){
        setEmail(event.target.value)
    }
    function ageChangeHandler(event){
        setAge(event.target.value);
        console.log(age)
    }

    function addUserHandler(event){
        event.preventDefault();
        
        if(+age < 1){
            setErrorModal({
                title:"Błędny wiek",
                msg:"Wiek musi być > 0"
            })
        }

        setAge('');
        setName('');
    }
   const errorHandler = () => {
    setErrorModal(null);
   }
   ;
    return (
    <>
        {errorModal && <ErrorModal title={errorModal.title} 
                                   msg={errorModal.msg}
                                   removeError={errorHandler}/> }
        <Card className={classes.input}>
        <form onSubmit={addUserHandler} >
            <label htmlFor="username">Username</label>
            <input id="username" type="text"
                   onChange={namedChangeHandler} 
                   value={name}
            />
            <label htmlFor="email">Email</label>
            <input id="email" type="email"
                   onChange={emailChangeHandler} 
                   value={email}
            />
            <label htmlFor="age">Age</label>
            <input id="age" type="Number" 
                    onChange={ageChangeHandler}
                    value={age}
            />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" 
                    onChange={passwordChangeHandler}
                    value={password}
            />

            <Button myType="submit"> Add user </Button>
        </form>
        </Card>
        </>
    );
    
   
}

export default AddUser ;