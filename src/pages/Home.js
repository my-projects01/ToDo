import React from 'react';
import TodoList from './TodoList';
import image from '../assets/cover-image.jpg';

const Home = () => {
  return (
    <>
      <section className='relative overflow-hidden'>
        {/* Background image */}
        <div
          className='w-screen h-80 md:h-100 bg-cover bg-center'
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Dark overlay to make text more readable */}
          <div className='flex items-center justify-center h-full bg-black bg-opacity-50'>
            <div className='text-center text-white px-4 md:px-8'>
              <h1 className='text-3xl md:text-5xl font-bold mb-4'>
                Welcome to TaskMaster
              </h1>
              <p className='text-lg md:text-xl'>
                Manage your tasks efficiently and stay organized. Our app helps you keep track of your to-dos, deadlines, and priorities with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='todoList'></section>
      <TodoList />
    </>
  );
};

export default Home;

