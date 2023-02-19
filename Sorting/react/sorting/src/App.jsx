
import './App.css';
import { useEffect, useState } from 'react';
import {motion} from "framer-motion"
function App() { 
  // generating initail array of numbers 
  let colsCount = 40
  let initial = Array.from(Array(colsCount).keys())
  initial = initial.map(elem => elem +1 )
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp ;
    }
  }
  shuffleArray(initial)
  // animation duration to be set after rendering the columns
  let  duration = 0.5
  
  // numbers , animation duration and Interval function states
  const [numbers,setnumbers] = useState(initial)
  const [animationDuration,setAnimationDuration]  = useState(0)
  const [timeoutFunction,setTimeoutFunction]  = useState()
  const [columnsCount,setColumnsCount] = useState(colsCount)
  
  //function to swap numbers in the array 
  let newNumbers = [...numbers]
  const swapNumbers = (firstIndex,secondIndex) =>{
    newNumbers = [...newNumbers]
    let temp = newNumbers[secondIndex]
    newNumbers[secondIndex]= newNumbers[firstIndex]
    newNumbers[firstIndex]= temp
    setnumbers(newNumbers)
  }

  // bubble array single swap 
  const bubbleSortStep = ()=>{
    for(let i =0 ;i<numbers.length-1;i++){
      let currentCol = newNumbers[i]
      let adjCol = newNumbers[i+1]
      if (adjCol < currentCol){
        swapNumbers(i,i+1)
        break
      }
    }
  }

  // start or stop the sorting animation
  const toggleSort = ()=>{
    
    if (timeoutFunction){
      clearInterval(timeoutFunction)
      setTimeoutFunction()
    }else{
      let timeoutFunction1 = setInterval(bubbleSortStep, animationDuration * 1000)
      setTimeoutFunction(timeoutFunction1)
  
    }
  }

  // add event listener to window when space key presses and setting the duration of the animation
  useEffect(()=>{
    const handlekeyDown = (event)=>{    
      if (event.code === 'Space')
        document.getElementById('start-button').click()

    }
    if (!animationDuration)
      document.getElementById("animation-slider").value = duration
    setAnimationDuration(duration)
    window.addEventListener('keydown',handlekeyDown)
    return ()=>{
      window.removeEventListener('keydown', handlekeyDown);
    }
  },[timeoutFunction,duration])

  // get the animation duration from the slider and set the state of animation duration
  const updateAnimationDuration = (e)=>{
      let newAnimationDuration = e.target.value
      document.getElementById("animation-slider-label").innerText =newAnimationDuration
      if (timeoutFunction){
        clearInterval(timeoutFunction)
        setTimeoutFunction()
        let newTimeFuntion = setInterval(bubbleSortStep, newAnimationDuration * 1000)
        setTimeoutFunction(newTimeFuntion)
      }
      setAnimationDuration(parseFloat(newAnimationDuration))
  
    }
  // get the columns number from the slider and set the state of the columns number
  const updateColumnsCountDuration = (e)=>{
    let newColsCount = e.target.value
    document.getElementById("ColumnsCount-slider-label").innerText =newColsCount
    console.log(newColsCount)
    let initial = Array.from({length: newColsCount}, (_, i) => i + 1)
    shuffleArray(initial)
    setAnimationDuration(0)
    setnumbers(initial)
    setAnimationDuration(duration)

    newNumbers = [...numbers]

    if (timeoutFunction){
      clearInterval(timeoutFunction)
      setTimeoutFunction()
      let newTimeFuntion = setInterval(bubbleSortStep, animationDuration * 1000)
      setTimeoutFunction(newTimeFuntion)
    }
    setColumnsCount(parseInt(newColsCount))

  }


  // rendering the columns using the array of numbers
  let maxHeight = 100/colsCount
  let cols =   numbers.map((elem,index) =><motion.div 
    className='col' 
    key = {"col"+elem}
    transition={{type:"tween",duration:animationDuration}}
    animate={{x:index*2 + "vw"}}
    style = {
      { 
        height:elem*maxHeight,
      }
    }></motion.div>)

  return (
    <div className="App">
        <h1>This is a visual demonstration for bubble sorting</h1>
        <div className="cols-container" style={{width:(numbers.length) * 2+ "vw"}}>
          {cols}
        </div>
        <button id="start-button" className='control-button' onClick={toggleSort} > {timeoutFunction? "Stop":"Start"}</button>
        <div className='slider-container animation-slider-container'>
        <label>Animation Duration</label>

        <input id="animation-slider" min="0.1" step="0.1" max="4"   className='slider animation-slider' type='range' 
        onChange={updateAnimationDuration}  ></input>
          <label className='slider-label  animation-slider-label' id="animation-slider-label">0.5</label>
        
        </div>

        <div className='slider-container ColumnsCount-slider-container'>
        <label>Number of columns</label>

        <input id="ColumnsCount-slider" min="3" step="1" max="100"   className='slider ColumnsCount-slider' type='range' 
        onChange={updateColumnsCountDuration}  ></input>
          <label className='slider-label  ColumnsCount-slider-label' id="ColumnsCount-slider-label">{columnsCount}</label>
        
        </div>
        

    </div>
  );
}

export default App;
