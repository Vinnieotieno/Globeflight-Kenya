import React from 'react'
import planning from '@/assets/planning.png'

const PlanningProcess = () => {
  return (
    <div className="py-10">
      <div className="md:flex w-full items-start  lg:space-x-10 ">
        <div className="md:sticky md:top-28  md:w-4/12   z-[999] flex flex-col space-y-4  ">
          <h4 className="md:text-base text-xs text-brandBluish font-medium ">How it Works</h4>
          <h1 className="md:text-4xl text-2xl tracking-wide text-brandRed font-bold  mb-3">Planning & Process</h1>
          <p className="md:text-base text-sm text-gray-500">
            Proper logistic planning entails considering logistical aspects throughout the various stages of the procurement process. It contributes
            to efficient procurement processes and reduces the risk of incurring problems that may lead to additional cost and delay
          </p>
        </div>
        <div className="md:w-8/12 w-full md:pt-0 pt-5">
          <img src={planning} alt="" />
        </div>
      </div>
    </div>
  );
}

export default PlanningProcess