import React, {useState,useEffect} from 'react';
import {FaQuoteRight} from 'react-icons/fa';
import {FiChevronLeft,FiChevronRight} from 'react-icons/fi';
import data from './data';
import Title from './Title';

function App() {
  
  const [people, setPeople] = useState(data)
  const [peopleIndex, setPeopleIndex] = useState(0)


  // Adding a useEffect to make the functionality better when you click
  useEffect(() => {
    const lastIndex = people.length - 1; //Getting the index of the last person in the array
    if(peopleIndex < 0){
      setPeopleIndex(lastIndex);
    }
    if (peopleIndex > lastIndex) {
      setPeopleIndex(0);
    }
  }, [peopleIndex, people])


  useEffect(() => {
    let sliderShuffule = setInterval(() => {
      setPeopleIndex(peopleIndex + 1)
    },3000)
    return () => clearInterval(sliderShuffule);
  }, [peopleIndex])



  return (
    <section className="section">
      <Title />
      <div className="section-center">
        {people.map((person, index) => {
          // Destructuring
          const {id,image,name,title,quote} = person;
          let position  = 'nextSlide';
          if (index === peopleIndex) {
            position = 'activeSlide'
          }
          if(index === peopleIndex - 1 || (peopleIndex === 0 && index === people.length - 1)){
            position = 'lastSlide'
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="quote">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          )
        })}
        <button onClick={() => setPeopleIndex(peopleIndex - 1)} className="prev"><FiChevronLeft /></button>
        <button onClick={() => setPeopleIndex(peopleIndex + 1)} className="next"><FiChevronRight /></button>
      </div>
    </section>
  );
}

export default App;
