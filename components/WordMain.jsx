import React from 'react';

const WordMain = ({ words }) => {

    // Fonction pour générer le contenu HTML du header
    const generateHeaderHtml = (word) => {
        let html = '';

        if (word?.type === "name" || (word?.type === "adjective" && (word?.gender == "m" || word?.gender == "f"))) {
            if (typeof word.phonetic === 'string' && typeof word.arab === 'string') {
                html = `<strong>${word.arab} ${word.phonetic}</strong>`;
            } else if (word?.phonetic?.coll && word?.arab?.coll && word?.phonetic?.plur && word?.arab?.plur) {
                html = `coll: <strong>${word.arab.coll} ${word.phonetic.coll}</strong>&nbsp;(unit: <strong>${word.arab.unit} ${word.phonetic.unit}</strong>,&nbsp;pl: <strong>${word.arab.plur} ${word.phonetic.plur}</strong>)`;
            } else if (word?.phonetic?.coll && word?.arab?.coll && !word?.phonetic?.plur && !word?.arab?.plur) {
                html = `coll: <strong>${word.arab.coll} ${word.phonetic.coll}</strong>&nbsp;(unit: <strong>${word.arab.unit} ${word.phonetic.unit}</strong>)`;            
            } else if (word?.phonetic?.plur && word?.arab?.plur && !word?.phonetic?.coll && !word?.arab?.coll) {
                html = `<strong>${word.arab.unit} ${word.phonetic.unit}</strong>&nbsp;(pl: <strong>${word.arab.plur} ${word.phonetic.plur}</strong>)`;
            }
        } else if (word?.type === "adjective" && (word?.gender == "v" || !word?.gender)) {
            html = `m: <strong>${word.arab.m} ${word.phonetic.m}</strong> (pl: <strong>${word.arab.pm} ${word.phonetic.pm}</strong>)&nbsp;f: <strong>${word.arab.f} ${word.phonetic.f}</strong> (pl: <strong>${word.arab.pf} ${word.phonetic.pf}</strong>)`;
        }
        else if (word?.type === "interjection" || word?.type === "adverb") {
            html = `<strong>${word.arab} ${word.phonetic}</strong>`;
        } else if (word?.type === "verb") {
            if (
                ((word?.group === "s" ||  word?.group === "c") && word?.form !== 1)
                || (word?.group === "h" && word?.form !== 4)
                || (word?.group === "r")
                || (word?.group === "a")
            ) 
            {
                html = `<strong>${word.arab} ${word.phonetic}</strong>`;
            } else {
                html = `<strong>${word?.arab?.present} ${word?.phonetic?.present}</strong> (<strong>${word?.arab?.futur} ${word?.phonetic?.futur}</strong>)`;
            }
        }

        return html;
    };

    return (
        <div className="mx-auto p-4 bg-font">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {words.map((word, index) => (
                    <div key={index} className="card rounded-none border-none">
                        <div className="card-header bg-back">
                            <div dangerouslySetInnerHTML={{ __html: generateHeaderHtml(word) }} />
                            {word?.region && (
                                word?.region === "*" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M418.4 23.98c-87.5-7.58-164.6 2.58-228 35.99l11.3 83.23l-181.56 71.3l-5.99 43.4L294.5 490.4l57-2.2l146.4-114c-60.4-73.4-22.3-118.9-45.6-161.2c-48-86.8-45.2-133.74-33.9-189.02"></path>
                                    </svg>
                                ) : (
                                    word.region
                                )
                            )}
                        </div>
                        <div className="card-body text-justify">
                            {word?.detail && (
                                <p dangerouslySetInnerHTML={{ __html: word.detail.replace(/\\n/g, '<br>') }} />
                            )}
                        </div>
                        <div className="card-footer rounded-none border-none">
                            {word?.type && (
                                <p>
                                    {word.type === "name" && "nom"}
                                    {word.type === "adjective" && "adjectif"}
                                    {word.type === "interjection" && "interjection"}
                                    {word.type === "adverb" && "adverbe"}
                                    {word.type === "verb" && `verbe ${word.group === "d" ? "défectueux" : ""}${word.group === "a" ? "assimilé" : ""}${word.group === "s" ? "sourd" : ""}${word.group === "r" ? "régulier" : ""}${word.group === "c" ? "concave" : ""}${word.group === "h" ? "hamzé" : ""}${word.group === "df" ? "doublement faible" : ""} (forme ${word.form})`}
                                </p>
                            )}
                            &nbsp;
                            {word?.gender && (
                                <p>
                                    {word.gender === "m" && "(masculin)"}
                                    {word.gender === "f" && "(féminin)"}
                                    {word.gender === "c" && "(commun)"}
                                    {word.gender === "v" && "(variable)"}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordMain;