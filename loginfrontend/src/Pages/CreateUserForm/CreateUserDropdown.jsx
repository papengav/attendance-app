//Name: Sam Miller
//Project: Attendance App - This is a full stack attendance tracking and managament software
//Purpose: Attempt at a fancier dropdown menu
import "./CreateUserDropdown.css";
import React, { useState } from 'react';
import list from "./list.json";
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

function CreateUserDropdown () {
    const [isOpen, setIsOpen] = useState(false)
    
    return(
        <div className="realtive flex flex-col items-center x-[340px] h-[340px] rounded-lg">
            <button onClick={() => setIsOpen((prev) => !prev)} className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
                User Type
                {!isOpen ? (
                    <AiOutlineCaretDown className="h-8"/>
                ): (
                    <AiOutlineCaretUp className="h-8"/>
                )
            }
                </button>
                {isOpen && (
                <div className="bg-blue-400 absolute top-20 flex flex-col item-start rounded-lg p-2 w-full">
                    {list.map((item, i) => (
                        <div className="flex x-full justify-between p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4" key={i}>
                            <h3 className="font-bold">
                                {item.userType}
                            </h3>
                            <h3>
                                {item.emote}
                            </h3>
                            </div>
                    ))}</div>)}
        </div>
    )
}
export default CreateUserDropdown;