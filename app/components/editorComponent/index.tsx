import PaintIcon from '../icons/paintIcon';
import CopyIcon from '../icons/copyIcon';
import DeleteIcon from '../icons/deleteIcon';
import AddFileIcon from '../icons/addFileIcon';
import { useState } from 'react';
import Menu from '../icons/menuIcon';

const EditorComponent = () => {
  const [title, setTitle] = useState("Add quiz title");

  const handleInput = (event) => {
    setTitle(event.target.innerText);
  };

  return (
    <div className='bg-white rounded-md h-[50px] p-[10px] px-[20px] items-center flex gap-[20px] text-black justify-end'>
      <span className='lg:hidden'><Menu/></span>
      <p
        contentEditable={true}
        className='text-black w-[150px] outline-none'
        suppressContentEditableWarning={true} 
        onInput={handleInput}
      >
        {title}
      </p>
      {/* <div className='bg-gray-400 w-[2px] h-[70%]'></div> */}
      {/* <input type='color' className='w-[30px] h-[30px] rounded-full border-none' /> */}
      {/* <div className='bg-gray-400 w-[2px] h-[70%]'></div>
      <span>
        <PaintIcon />
      </span>
      <span>
        <PaintIcon />
      </span>
      <span>
        <PaintIcon />
      </span> */}
      {/* <div className='bg-gray-400 w-[2px] h-[70%]'></div>
      <div className='flex gap-[10px]'>
        <button className='border-black border rounded-[5px] px-[5px] bg-transparent text-black'>Default</button>
        <button className='border-black border rounded-[5px] px-[5px] bg-transparent text-black'>Hover</button>
        <button className='border-black border rounded-[5px] px-[5px] bg-transparent text-black'>Clicked</button>
      </div> */}
      {/* <div className='bg-gray-400 w-[2px] h-[70%]'></div> */}
      {/* <span><CopyIcon/></span> */}
      <span><DeleteIcon/></span>
      <span><AddFileIcon/></span>
    </div>
  );
};

export default EditorComponent;
