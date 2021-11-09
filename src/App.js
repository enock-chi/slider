import { React, useState,useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import Data from './data/Data';
import Title from './component/Title';

function App() {
  const [people, setPeople] = useState(Data);
  const [index, setIndex] = useState(0);
   setPeople(Data);
  useEffect(() => {
    const lastIndex = people.length-1;
    if (index < 0){
      setIndex(lastIndex);
    } else if (index > people.length -1){
      setIndex(0)
    }
    return () => {
      
    }
  }, [index,people])

  useEffect(() => {
    let slider = setInterval(() =>{
      setIndex(index + 1)
    },3000 );
    return () => {
      clearInterval(slider);
    }
  }, [index])

  return (
    <section className='section'>
      <Title />
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';
          if (personIndex === index){
            position = 'activeSlide'
          } else if(personIndex === index -1 || (index === 0 && personIndex === people.length -1)){
            position = 'lastSlide'
          }

          return (
            <article key={id} className={position}>
              <img className='person-img' src={image} alt={name} />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          )
        })}
        <button className='prev' onClick={(() => setIndex(index - 1))}><FiChevronLeft /></button>
        <button className='next' onClick={(() => setIndex(index + 1))}><FiChevronRight /></button>
      </div>
    </section>
  );
}

export default App;
