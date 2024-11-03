import React, { useEffect, useRef, useState } from 'react';
import { Check, Pencil, Trash2, Undo } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : ["create more"];
  });

  const [query, setQuery] = useState("");
  const [isDone, setIsDone] = useState(Array(todos.length).fill(false));
  const [isDisable, setIsDisable] = useState(Array(todos.length).fill(true));

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddClick = () => {
    if (query.length > 0) {
      setTodos([...todos, query]);
      setIsDone([...isDone, false]);
      setIsDisable([...isDisable, true]);
    }
    setQuery("");
  };

  const updateTodo = (index) => {
    setIsDisable((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  const handleDone = (index) => {
    setIsDone((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  const handleEditChange = (e, index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = e.target.value;
    setTodos(updatedTodos);
  };

  const focusInputRef = useRef(null);
  useEffect(() => {
    if (focusInputRef.current) {
      focusInputRef.current.focus();
    }
  }, [isDisable]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // New function to handle key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };
  const handleupdated = (e) => {
    if (e.key === 'Enter') {
      handleDone();
    }
  }
  return (
    <>
      <div className='bg-black text-white h-auto min-h-screen w-full flex flex-col items-center justify-start'>
        <h1 className='font-bold mt-3'>Add Your ToDo</h1>
        <div className='flex w-full items-center justify-center h-auto mt-3 gap-0'>
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Attach the key down handler
            value={query}
            type="text"
            className='w-1/2 py-2 px-5 rounded-s-full bg-gray-800 border-[1px] border-black outline-none '
          />
          <button onClick={handleAddClick} className='bg-blue-700 py-2 px-5 hover:bg-blue-800 rounded-e-full'>Add</button>
        </div>

        <div className='todos w-full mt-9 flex items-center justify-center flex-col'>
          {
            todos.map((val, i) => {
              return (
                <div key={i} className='flex justify-between border-[1px] w-full m-2 md:w-[90%] py-2 px-3 md:mx-4 mx-0 mb-1 border-white'>
                  <input
                    type="text"
                    disabled={isDisable[i]}
                    onKeyDown={handleupdated}
                    ref={isDisable[i] ? null : focusInputRef}
                    value={val}
                    onChange={(e) => handleEditChange(e, i)}
                    className={`${isDone[i] ? "line-through" : ""} bg-black text-gray-300 font-semibold text-sm md:text-xl`}
                  />

                  <div className='btns flex gap-1'>
                    {isDisable[i] && (
                      <button
                        onClick={() => handleDone(i)}
                        className='bg-gray-800 md:py-1 md:px-5 py-[2px] px-[3px] hover:bg-blue-800'>
                        {isDone[i] ? (<Undo />) : (<Check className='text-green-500' />)}
                      </button>
                    )}

                    <button
                      onClick={() => updateTodo(i)}
                      className='bg-yellow-600 md:py-1 md:px-5 py-[2px] px-[3px] hover:bg-blue-800'>
                      <Pencil />
                    </button>

                    {isDisable[i] && (
                      <button
                        onClick={() => {
                          setTodos(todos.filter((_, index) => index !== i));
                          setIsDone(isDone.filter((_, index) => index !== i));
                          setIsDisable(isDisable.filter((_, index) => index !== i));
                        }}
                        className='bg-red-700 md:py-1 md:px-5 py-[2px] px-[3px] hover:bg-blue-800'>
                        <Trash2 />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          }
        </div>

        
      </div>
      <div className='h-[8vh] w-full bg-gray-800 flex items-center justify-center text-gray-300'>
        <h1>Made with ❤️ by <a href='https://rishiai.vercel.app' className='font-bold underline'>Rishi</a></h1>
      </div>
    </>
  );
}

export default App;
