import { Card, CardDescription } from '@/components/ui/card';
import { ourTeam } from '@/constants/aboutpage';
import React from 'react'

const Team = () => {
  return (
    <div className="py-10">
      <h1 className="md:text-5xl text-xl text-brandRed font-bold text-center mb-3">MEET THE TEAM</h1>

      <p className="text-gray-500 text-lg text-center">Our experienced team is always ready to serve.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5">
        {ourTeam.map((member, idx) => (
          <Card key={idx} className="flex flex-col rounded-xl p-4 md:p-6 bg-white border border-gray-200 dark:bg-slate-900 dark:border-gray-700">
            <div className="flex items-center gap-x-4">
              <img className="rounded-full size-24 object-cover" src={member.img} alt="rollinscodes.com" />
              <CardDescription className="grow">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-lg">{member.name}</h3>
                <p className="text-xs uppercase text-gray-500">{member.position}</p>
              </CardDescription>
            </div>

            <p className="mt-3 text-gray-500">{member.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Team