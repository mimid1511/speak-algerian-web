"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllUnits } from '@/api/units';

const LessonGrid = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const unitsData = await getAllUnits();
                setUnits(unitsData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch units:', error);
                setLoading(false);
            }
        };

        fetchUnits();
    }, []);

    if (loading) {
        return <p>Loading units...</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-4">
            {units.map((unit) => (
                <div
                    key={unit.id}
                    className={`text-${unit.reserved ? 'gray-900' : 'primary'} border-${unit.reserved ? 'neutral-400' : 'primary-light'} bg-${unit.reserved ? 'neutral-200' : 'green-50'} shadow-md card`}
                >
                    <div className="card-header">
                        <strong>{`Unité ${unit.order}`}</strong>
                        {unit.reserved ? <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M144 144v48h160v-48c0-44.2-35.8-80-80-80s-80 35.8-80 80m-64 48v-48C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64v192c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64z"></path></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64v192c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144z"></path></svg>
                        }
                    </div>
                    <div className="card-body">
                        <ul className='list list-flush'>
                            {unit.lessons.map((lesson, index) => (
                                <li className="list-item" key={index}>
                                    <p>
                                        {unit.reserved
                                            ? <span className="badge bg-gray-100 text-gray-900">{lesson.type}</span>
                                            : <span className="badge bg-green-200 text-green-800">{lesson.type}</span>
                                        }
                                        &nbsp; {lesson.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`justify-end card-footer bg-${unit.reserved ? 'neutral' : 'green-100'}`}>
                        <Link href="/registration" className={`btn btn-${unit.reserved ? 'dark' : 'primary'} btn-sm`}>
                            {unit.reserved ? "S'abonner" : "Suivre la leçon"}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonGrid;
