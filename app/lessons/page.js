import React from 'react';
import Title from '@/components/Title';
import LessonGrid from '@/components/LessonGrid';
import Layout from '../layout';

const Lessons = () => {
    return (
        <Layout type="root">
            <Title title={"Leçons"}/>
            <LessonGrid limited={false}/>
        </Layout>
    );
};

export default Lessons;