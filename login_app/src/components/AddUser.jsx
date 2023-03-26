import React, { useState, useEffect} from 'react'; 
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal' ;
import { useCallback } from 'react';


function AddUser() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [errorModal, setErrorModal] = useState(null)
    const [loadedData, setLoadedData] = useState([]);

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

    const getDataHandler = async () => {
      const res = await fetch('https://loginapp-5a2b5-default-rtdb.firebaseio.com/.json');
      const data = await res.json();
      const loadedData = [];
      for (const key in data.logowanie) {
        loadedData.push({
          name: data.logowanie[key].imie,
          password: data.logowanie[key].haslo,
          email: data.logowanie[key].email,
          age: data.logowanie[key].wiek,
        });
      }
      setLoadedData(loadedData);
    };
  
    useEffect(() => {
      getDataHandler();
    }, []);

    async function addUserHandler(event) {
      event.preventDefault();
    
      let isValid = true;
    
      if (+age < 1) {
        setErrorModal({
          title: "Błędny wiek",
          msg: "Wiek musi być > 0"
        });
        isValid = false;
      } else if (name.length <= 2) {
        setErrorModal({
          title: "Błędna nazwa",
          msg: "Musi być więcej niż 2 znaki!"
        });
        isValid = false;
      } else if (password.length <= 8) {
        setErrorModal({
          title: "Błędne hasło",
          msg: "Hasło powinno mieć przynajmniej 9 znaków!"
        });
        isValid = false;
      } else if (!password.match(/[0-9]/)) {
        setErrorModal({
          title: "Błędne hasło",
          msg: "Hasło powinno mieć przynajmniej jedną cyfrę!"
        });
        isValid = false;
      } else if (!password.match(/[A-Z]/)) {
        setErrorModal({
          title: "Błędne hasło",
          msg: "Hasło powinno zawierać dużą literę!"
        });
        isValid = false;
      }
    
      if (isValid) {
        const res = await fetch('https://loginapp-5a2b5-default-rtdb.firebaseio.com/logowanie.json', {
          method: 'POST',
          body: JSON.stringify({
            imie: name,
            haslo: password,
            email: email,
            wiek: age
          }),
          headers: {
            'Content-type': 'aplication/json'
          }
        });
        
        setAge('');
        setName('');
        setPassword('');
        setEmail('');

        getDataHandler();
      }
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
          <main>
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
        <div className={classes.left}>
          {loadedData.map((data, index) => (
            <p key={index} onClick={(event) => { event.target.style.display = 'none' }}>Witaj {data.name}!</p>
          ))}
        </div>
          </main>
        </Card>
        </>
    );
    
    }


export default AddUser