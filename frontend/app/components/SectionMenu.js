/* 
SectionMenu.js is at the top of the component tree.
Article.js, embedded, recives section props from a selection.
It seems a little easier to have this arangement, rather than having compaonents at the same level.
 */

import React, { useState } from 'react'
import Articles from './Articles'

export default function SectionMenu(){
    const [section, setSection] = useState("home");

    const sections = [
        ["arts","Arts"],
        ["automobiles","Automobiles"],
        ["books","Books"],
        ["business","Business"],
        ["fashion","Fashion"],
        ["food","Food"],
        ["health","Health"],
        ["home","Home"],
        ["insider","Times Insider"],
        ["magazine","Magazine"],
        ["movies","Movies"],
        ["nyregion","NY Region"],
        ["obituaries","Obituaries"],
        ["opinion","Opinion"],
        ["politics","Politics"],
        ["realestate","Real Estate"],
        ["science","Science"],
        ["sports","Sports"],
        ["sundayreview","Sunday Review"],
        ["technology", "Technology"],
        ["theater","Theater"],
        ["t-magazine","T-Magazine"],
        ["travel","Travel"],
        ["upshot","Upshot"],
        ["us","U.S."],
        ["world","World"],
      ];

      return (
         <div className="menu-wrapper">
             <ul>
                 {sections.map((section, index)=>(
                     <li key={index} onClick={()=>{setSection(section[0])}} style={{cursor:"pointer"}}>
                         {section[1]}
                     </li>
                 ))}
             </ul>
             <Articles section={section}/>
         </div>
      )

}