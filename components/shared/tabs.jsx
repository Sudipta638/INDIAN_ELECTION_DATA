"use client"
import { navComponents } from '@/constants';
import { useState } from 'react';
import Image from "next/image";
import StateView from '../Views/StateView';
import AcView from '../Views/AcView';
import PcView from '../Views/PcView';
import PartyView from '../Views/PartyView';
const Tab = () => {
  const [activeTab, setActiveTab] = useState('State View');
  return (
    <div className=' -mt-12'>
      <div className=' border-b-2 border-black w-full pb-12    ml-48'>
      <div className="grid w-full grid-cols-4 gap-12 ">
        {navComponents.map((navComponent) => (
          <button
            key={navComponent.label}
            onClick={() => setActiveTab(navComponent.label)}
            className={`w-[300px] h-40 border-2 flex flex-col items-center p-4 mx-8 border-rounded rounded-2xl ${
              activeTab === navComponent.label
                ? 'shadow-lg border-black bg-gray-400'
                : 'border-gray-200 bg-gray-100'
            }`}
          >
            <Image src={navComponent.icon} alt={navComponent.label} width={80} height={80} />
            <span className="mt-6 text-2xl">{navComponent.label}</span>
          </button>
        ))}
</div>
      </div>
       <div className='ml-48'>
       {activeTab === 'State View' && <div>
        <StateView/>
        </div>}
      {activeTab === 'AC View' && <div>
        <AcView/>
        </div>}
      {activeTab === 'PC View' && <div>
        <PcView/>
        </div>}
      {activeTab === 'Party View' && <div>
        <PartyView/>
        </div>}
       </div>
     
    
    </div>
  );
};

export default Tab;
