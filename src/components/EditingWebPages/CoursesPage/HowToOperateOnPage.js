import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const componentStyles = {
  container: {
    height: '500px',
    overflow: 'auto',
    color: 'black',
    padding: '0 1rem'
  }
}

const HowToOperateOnPage = () => {

  return (
    <div style={componentStyles.container}>
      <div className='about-titles pt-3 pb-4'>
        <p className='m-0 fw-bold'>Titluri:</p>
        <RadioButtonCheckedIcon fontSize='small' />
        <span className='ms-3'>
          Titlurile celor 2 secțiuni ( <span className='fst-italic'>"Info Cursuri Modul 1 si Info Cursuri Modul 2"</span> ) vor conține obligatoriu caracterele "[break]" (fără ghilimele), astfel marcând locul din care se vor separa pe 2 rânduri.
        </span>
        <p className='m-0 text-decoration-underline mt-2'>Exemplu:</p>
        <p className='m-0'> LISTA DE CURSURI MODULUL 1 </p>
        <span>se va nota:</span> <span> LISTA DE CURSURI <span className='fw-bold'>[break]</span> MODULUL 1 </span>
        <p className='mt-2 mb-0'>Rezultat final:</p>
        <span className='text-center'>
          LISTA DE CURSURI
          <br />
          MODULUL 1
        </span>
      </div>
      
      <p className='m-0'>-----------------------------------------------------------------</p>

      <div className='about-paragraphs pt-4'>
        <p className='m-0 fw-bold'>Paragrafe:</p>
        <RadioButtonCheckedIcon fontSize='small' />
        <span className='ms-3'>
          Paragrafele care vor conține cuvinte cu link (clickable words) vor marca fiecare cuvânt prin caracterele "[link]" (fără ghilimele), în locul dedicat din text. Ulterior, cuvântul si link-ul aferent acestuia se vor adauga prin click pe butonul 'Adaugă link pe cuvânt'.
        </span>
        <br />
        <span className='fw-bold'>ATENTIE </span>
        <span>asupra ordinii în care cuvintele se adaugă în secțiunea 'Adaugă link pe cuvânt'. Ordinea lor, va urma ordinea recurenței caracterelor "[link]" din textul paragrafului, păstrând astfel înțelesul logic al mesajului. </span>

        <p className='m-0 text-decoration-underline mt-2'>Exemplu:</p>
        <p className='m-0 fst-italic'> "Atentie! Printr-un simplu click pe acest <span className='fw-bold'>[link]</span> vei putea accesa contul tau. Daca mesajul nu este afisat corect, te rog acceseaza-l din nou cu click <span className='fw-bold'>[link]</span>". </p>
        <p className='mt-1 mb-0 fw-bold'>Cuvintele cu link ce se vor adauga:</p>
        <span>1. buton - https://www.example.com</span>
        <br />
        <span>2. aici - https://www.example2.com</span>

        <p className='mt-2 mb-0'>Rezultat final:</p>
        <p className='fst-italic'> "Atentie! Printr-un simplu click pe acest <span style={{color: 'blue'}}>buton</span> vei putea accesa contul tau. Daca mesajul nu este afisat corect, te rog acceseaza-l din nou cu click <span style={{color: 'blue'}}>aici</span> ". </p>
      </div>

      <p className='m-0'>-----------------------------------------------------------------</p>

      <div className='about-paragraphs pt-4 pb-4'>
        <p className='m-0 fw-bold'>Ștergerea completă a unui Paragraf:</p>
        <RadioButtonCheckedIcon fontSize='small' />
        <span className='ms-3'>
          Dacă se dorește ștergerea completă a unui paragraf (astfel încât acel text să nu mai fie afișat deloc pe pagină web),
        </span>
          <br />
        <span>
          se va selecta întregul conținut și se va șterge.
        </span>
          <br />
        <span>
          Editorul va avertiza lipsa conținutului, printr-un mesaj de eroare.
        </span>
          <br />
        <span>
          Pentru a trece peste această eroare, este necesară introducerea unui simplu spațiu gol în căsuța aferentă (keyboard space bar).
        </span>
      </div>
    </div>
  )
}

export default HowToOperateOnPage