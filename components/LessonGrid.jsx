import React from "react";

const LessonGrid = () => {
    return (

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-4">
            <div className="text-primary border-primary-light bg-green-50 shadow-md card">
                <div className="card-header"><strong>Unité 1</strong><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M10.5 5a2.5 2.5 0 0 0-4.532-1.456c-.242.336-.66.559-1.052.428c-.393-.131-.611-.56-.41-.922A4 4 0 0 1 12 5v1h.001a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h6.5zm.75 2.5H4A1.5 1.5 0 0 0 2.5 9v3A1.5 1.5 0 0 0 4 13.5h8a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 12 7.5zM8 8.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 8.75" clipRule="evenodd"></path></svg></div>
                <div className="card-body">
                    <ui>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                    </ui>
                </div>
                <div className="justify-end card-footer bg-green-100 ">
                    <a href="#" className="btn btn-primary btn-sm">Suivre la leçon</a>
                </div>
            </div>
            <div className="text-primary border-primary-light bg-green-50 shadow-md card">
                <div className="card-header"><strong>Unité 2</strong><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M10.5 5a2.5 2.5 0 0 0-4.532-1.456c-.242.336-.66.559-1.052.428c-.393-.131-.611-.56-.41-.922A4 4 0 0 1 12 5v1h.001a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h6.5zm.75 2.5H4A1.5 1.5 0 0 0 2.5 9v3A1.5 1.5 0 0 0 4 13.5h8a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 12 7.5zM8 8.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 8.75" clipRule="evenodd"></path></svg></div>
                <div className="card-body">
                    <ui>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                    </ui>
                </div>
                <div className="justify-end card-footer bg-green-100 ">
                    <a href="#" className="btn btn-primary btn-sm">Suivre la leçon</a>
                </div>
            </div>
            <div className="border-neutral-400 bg-neutral-200 shadow-md card">
                <div className="card-header"><strong>Unité 3</strong><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M10.5 6V5a2.5 2.5 0 0 0-5 0v1zM4 5v1a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3V5a4 4 0 0 0-8 0m6.5 2.5H12A1.5 1.5 0 0 1 13.5 9v3a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 12V9A1.5 1.5 0 0 1 4 7.5zm-1.75 2a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0z" clipRule="evenodd"></path></svg></div>
                <div className="card-body">
                    <ui>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                    </ui>
                </div>
                <div className="justify-end card-footer">
                    <a href="#" className="btn btn-dark btn-sm">S'abonner</a>
                </div>
            </div>
        </div>

    );
};

export default LessonGrid;
