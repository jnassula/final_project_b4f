import {React, useState } from 'react';

function Primeira({setLoggedIn}){
    return (
        <button onClick={ () => setLoggedIn(true)}>Fazer login</button>
    )
}

export default Primeira