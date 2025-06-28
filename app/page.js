"use client"
import React, { useState, useEffect } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [mainTask, setmainTask] = useState([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [lastCelebratedCount, setLastCelebratedCount] = useState(0);

  useEffect(() => {
    const allCompleted = mainTask.length > 0 && mainTask.every(task => task.completed);
    if (allCompleted && mainTask.length !== lastCelebratedCount) {
      setShowCelebration(true);
      setLastCelebratedCount(mainTask.length);
    } else if (!allCompleted) {
      setShowCelebration(false);
      setLastCelebratedCount(0);
    }
  }, [mainTask, lastCelebratedCount]);

  const submitHandler=(e)=>{
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      alert('Both fields are mandatory');
      return;
    }
    setmainTask([...mainTask, {title:title, desc:desc, completed: false}])
    settitle("")
    setdesc("")
  }
  const toggleCompleted = (i) => {
    let copytask = [...mainTask];
    copytask[i].completed = !copytask[i].completed;
    setmainTask(copytask);
  }
  const deleteHandler=(i)=>{
    let copytask = [...mainTask]
    copytask.splice(i, 1)
    setmainTask(copytask)
  }
  let renderTask =<h2>No Task Available</h2>
  if(mainTask.length>0){
    renderTask = mainTask.map((task, index)=>{
      return (
        <li key={index} className='text-2xl font-bold m-5 p-5 bg-blue-200 rounded-lg flex justify-between mb-5'>
          <div className='flex items-center justify-between mb-5 w-2/3'>
            <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(index)} className="mr-4 w-6 h-6" />
            <h3 className={`text-blue-900 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
            <h6 className={`text-blue-700 ${task.completed ? 'line-through' : ''}`}>{task.desc}</h6>
          </div>
          <button 
          onClick={()=>{
            deleteHandler(index)
          }}
          className='bg-red-600 text-white px-4 py-2 font-bold rounded-2xl'>
            Delete</button>
        </li>
      )
    })
  }
  return (
    <>
    {showCelebration && (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
        {/* Confetti effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className={`absolute rounded-full opacity-80 animate-confetti`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
                width: `${10 + Math.random() * 16}px`,
                height: `${10 + Math.random() * 16}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 90%, 60%)`,
                animationDelay: `${Math.random()}s`,
              }}
            />
          ))}
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center border-4 border-green-400 animate-bounce mt-20">
          <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
          <p className="text-xl text-gray-700">Today's whole task completed!</p>
        </div>
        <style jsx>{`
          @keyframes confetti {
            0% { transform: translateY(-40px) scale(1) rotate(0deg); opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(100vh) scale(0.8) rotate(360deg); opacity: 0; }
          }
          .animate-confetti {
            animation: confetti 2.5s linear infinite;
          }
        `}</style>
      </div>
    )}
    <h1 className='bg-blue-700 text-white p-5 text-2xl font-bold text-center '>AYUSHI's TO-DO LIST</h1>
    <form onSubmit={submitHandler}>
      <input type="text" className='text-2xl border-b-blue-900 border-4 m-5 px-4 py-2'placeholder='Enter Task here'
      value={title}
      onChange={(e)=>{
        settitle(e.target.value)
      }}/>
      <input type="text" className='text-2xl border-b-blue-900 border-4 m-5 px-4 py-2'placeholder='Enter Description here'
      value={desc}
      onChange={(e)=>{
        setdesc(e.target.value)
      }}/>
      <button className='bg-white text-black px-4 py-3 text-2xl font-bold rounded m-5 border-4'>Add Task</button>
    </form>
    <hr/>
    <div className='p-8 bg-blue-100'>
      <ul>
        {renderTask}
      </ul>
    </div>
    </>
  )
}

export default page