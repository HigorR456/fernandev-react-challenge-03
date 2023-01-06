/*
* CHALLENGE form progress

* INSTRUCTIONS
In this challenge your mission is to create a form and its 4 fields (with controlled inputs), along with a progress bar that changes as the user fills in the fields.
- Also create validations for each field as instructed below.

* PROGRESS BAR
To take advantage of already defined styling, create:
- the bar with a parent element called .bar-container and its child .bar

* FORM FIELDS:
input - full name - valid if you enter at least two names,
input - email - valid if entering an email,
select - marital status,
radio - genre

For email validation use the following RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\ .,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA- Z]{2,}))$/;

* OPERATION
The form is expected to have 4 fields in all. Therefore, when the user fills in the first field, the progress bar must assume 25% of the total size;
the second field, 50% and so on...

If the user has not defined values ​​for the select and radio elements, they should not be considered as fulfilled until then.

If the user fills in a field and deletes its value, this field must be considered as empty, causing the progress bar to rewind again.

Disable the submit button if all fields are not filled in/valid.

When sending, a javascript alert must be presented successfully, clear all fields of the form and reset the progress bar again.
*/

import { useState, useEffect } from 'react'

function App() {

  const [bar, setBar] = useState(0)
  const [nameProgress, setNameProgress] = useState(0)
  const [emailProgress, setEmailProgress] = useState(0)
  const [selectProgress, setSelectProgress] = useState(0)
  const [radioProgress, setRadioProgress] = useState(0)
  const [progressBar, setProgressBar] = useState(0)

  useEffect(() => {
    setProgressBar(nameProgress+emailProgress+selectProgress+radioProgress);
    console.log('useEffect')
  })

  const showBar = () => {
    setBar(1);
    console.log('bar', bar)
  }

  const nameValidate = (event) => {
    if (/(\w.+\s).+/i.test(event.target.value)) {
      console.log('true NAME');
      setNameProgress(100)
    } else setNameProgress(0)

    console.log(event.target.value)
  }

  const emailValidate = (event) => {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
      console.log('true EMAIL');
      setEmailProgress(100);
    } else setEmailProgress(0)

    console.log('progressBar', progressBar);
  }

  const handleOption = () => {
    if ((document.querySelector('.select').value) === '') {
      setSelectProgress(0);
    } else setSelectProgress(100);

    console.log(document.querySelector('.select').value)
  }

  const handleRadio = () => {
    setRadioProgress(100);
  }

  const handleFormSubmission = () => {
    document.querySelector('.input1').value = '';
    document.querySelector('.input2').value = '';
    document.querySelector('.select').value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;
    setNameProgress(0);
    setEmailProgress(0);
    setSelectProgress(0);
    setRadioProgress(0);

    alert('Formulário enviado com sucesso!');
  }

  return (
    <div className='App' onClick={showBar}>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        {/* create progress bar here */}
        {bar>0 && <div className='bar-container'>
          {progressBar>0 && <div className='bar' style={{width: progressBar}}></div>}
          </div>}

        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input className='input1' onChange={nameValidate} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input className='input2' onChange={emailValidate} />
        </div>
        <div className='form-group' >
          <label htmlFor=''>Estado Civil</label>
          <select className='select' onChange={handleOption}>
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input onClick={handleRadio} type='radio' name='gender' /> Masculino
            </span>
            <span>
              <input onClick={handleRadio} type='radio' name='gender' /> Feminino
            </span>
          </div>
        </div>
        <button disabled={progressBar != 400} onClick={handleFormSubmission} >Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;
