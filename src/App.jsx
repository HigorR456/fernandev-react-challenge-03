import { useState, useEffect } from 'react'

/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

function App() {

  const [bar, setBar] = useState(0)
  const [nameProgress, setNameProgress] = useState(0)
  const [emailProgress, setEmailProgress] = useState(0)
  const [selectProgress, setSelectProgress] = useState(0)
  const [radioProgress, setRadioProgress] = useState(0)
  const [progressBar, setProgressBar] = useState(0)

  useEffect(() => {
    setProgressBar(nameProgress+emailProgress+selectProgress+radioProgress);
    console.log('hey')
  })

  const showBar = () => {
    setBar(1);
    console.log(bar)
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

    console.log('progressBar');
    console.log(progressBar);
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
    alert('Formulário enviado com sucesso!');
    document.querySelector('.input').reset;
  }

  return (
    <div className='App' onClick={showBar}>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        {/* crie a barra de progresso aqui */}
        {bar>0 && <div className='bar-container'>
          {progressBar>0 && <div className='bar' style={{width: progressBar}}></div>}
          </div>}

        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input className='input' onChange={nameValidate} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input onChange={emailValidate} />
        </div>
        <div className='form-group' >
          <label htmlFor=''>Estado Civil</label>
          <select className='select' onClick={handleOption}>
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
