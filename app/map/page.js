import React from 'react';
import Title from '@/components/Title';
import Layout from '../layout';

const Map = () => {
    return (
        <Layout type={'root'}>
            <Title>
                Carte des dialectes
            </Title>
            <div className="bg-gray-300 p-4">
                <div className='bg-white p-4'>
                    <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1SxM3YmwY0TCRv2kZ1j-VnjR85ajRH1I&ehbc=2E312F&noprof=1" width="100%" height="525"></iframe>
                </div>
            </div>
        </Layout>
    );
};

export default Map;