import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const WhereWeShip = ({ title, data, styles }) => {
  return (
    <div className="w-full">
      <h4 className="md:text-3xl text-xl text-brandBluish font-bold "></h4>
      <h1 className="md:text-5xl text-2xl tracking-wide font-bold  mb-3 md:w-5/12">{title}</h1>
      <div className={styles}>
        {data.map((card, idx) => (
          <Card key={idx}>
            <div className="relative">
              <img src={card.img} alt="globeflight" className="h-40 w-full object-cover rounded-t-lg" />
              <div className="absolute bottom-0 left-0 bg-white rounded-sm p-2">
                <img src={card.flag}  alt="rollinscodes.com" className="w-10 object-cover" />
              </div>
            </div>
            <CardHeader className="py-3">
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <CardDescription>{card.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WhereWeShip