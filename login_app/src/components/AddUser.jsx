import React, { useState} from 'react'; 
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal' ;
import { useEffect } from 'react';
import { useCallback } from 'react';


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

    const getDataHandler = useCallback(async()=>{
      const res = await fetch('https://login-92625-default-rtdb.firebaseio.com/pierwszekroki.json')
      const data = await res.json()
      
      const loadedData = []
      for (const key in data){
          loadedData.push({
          moj: data[key]
        })
      }
      console.log(loadedData)
    })
  
    useEffect(()=>{
      getDataHandler()
    }, [])


    async function addUserHandler(event){
        event.preventDefault();
        
        const res = await fetch('https://login-92625-default-rtdb.firebaseio.com/logowanie.json', 
          {
            method:'POST',
            body: JSON.stringify({imie:name, haslo:password, email:email, wiek:age}),
            headers:{
              'Content-type':'aplication/json'
            }
          }
        )

        if(+age < 1){
            setErrorModal({
                title:"Błędny wiek",
                msg:"Wiek musi być > 0"
            })
        }
        else if(name.length <=2){
          setErrorModal({
            title:"Błędna nazwa",
            msg:"Musi być więcej niż 2 znaki!"
        })
        }
          
        else if (password.length <=8){
          setErrorModal({
            title:"Błędne hasło",
            msg:"Hasło powinno mieć przynajmniej 9 znaków!"
        })
        }

        setAge('');
        setName('');
        setPassword('');
        setEmail('');
    }
   const errorHandler = () => {
    setErrorModal(null);
   }

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
        <div className={classes.left}>oijsofi</div>
        </Card>
        </>
    );
    
    }


export default AddUser