import React from 'react';

const WordMain = ({ words }) => {

    return (
        <div className="container mx-auto p-4 bg-[url('/bg.jpg')] bg-repeat bg-contain">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {words.map((word, index) => {
                    // Vérifiez si word.phonetic et word.arab sont des chaînes simples
                    const isPhoneticSimple = typeof word?.phonetic === 'string';
                    const isArabSimple = typeof word?.arab === 'string';

                    return (

                        <div key={index} class="card border border-primary shadow shadow-sm">
                            <div class="card-header">

                                {/* Nom ----------------------------------------------------------- */}
                                {word?.type == "name" && isPhoneticSimple && isArabSimple && (
                                    <strong>{word.arab} {word.phonetic}</strong>
                                )}
                                {word?.type == "name" && word?.phonetic?.coll && word?.arab?.coll && (
                                    <p>
                                        coll: <strong>{word.arab.coll} {word.phonetic.coll}</strong> &ensp;
                                        unit: <strong>{word.arab.unit} {word.phonetic.unit}</strong> <br />
                                        plur: <strong>{word.arab.plur} {word.phonetic.plur}</strong>
                                    </p>
                                )}
                                {word?.type == "name" && !word?.phonetic?.coll && !word?.arab?.coll && word?.phonetic?.plur && word?.arab?.plur && (
                                    <>
                                        <p>
                                            unit: <strong>{word.arab.unit} {word.phonetic.unit}</strong> &emsp;
                                            plur: <strong>{word.arab.plur} {word.phonetic.plur}</strong>
                                        </p>
                                    </>
                                )}
                                {/* Adjectifs ----------------------------------------------------------- */}
                                {word?.type == "adjective" && (
                                    <p>
                                        masc: <strong>{word.arab.m} {word.phonetic.m}</strong> &ensp;
                                        femi: <strong>{word.arab.f} {word.phonetic.f}</strong> <br/>
                                        p.m: <strong>{word.arab.pm} {word.phonetic.pm}</strong> &ensp;
                                        p.f: <strong>{word.arab.pf} {word.phonetic.pf}</strong>
                                    </p>
                                )}
                                {/* Interjection ----------------------------------------------------------- */}
                                {word?.type == "interjection" && (
                                    <strong>{word.arab} {word.phonetic}</strong>
                                )}
                                {/* Verbes ----------------------------------------------------------- */}
                                {word?.type == "verb" && (
                                    <strong>{word.arab} {word.phonetic}</strong>
                                )}

                                {/* Région ----------------------------------------------------------- */}
                                {word?.region &&
                                    (word?.region == "*" ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M418.4 23.98c-87.5-7.58-164.6 2.58-228 35.99l11.3 83.23l-181.56 71.3l-5.99 43.4L294.5 490.4l57-2.2l146.4-114c-60.4-73.4-22.3-118.9-45.6-161.2c-48-86.8-45.2-133.74-33.9-189.02"></path></svg> : word.region)
                                }
                            </div>
                            <div class="card-body">
                                {word?.detail && (
                                        <p dangerouslySetInnerHTML={{ __html: word.detail.replace(/\\n/g, '<br>') }} />
                                    )}
                            </div>
                            <div class="card-footer">
                                {word?.type && (
                                    <p>
                                        {word.type == "name" && "nom"}
                                        {word.type == "adjective" && "adjectif"}
                                        {word.type == "interjection" && "interjection"}
                                        {word.type == "verb" && "verbe " + word.group + " (forme " + word.form + ")"}
                                    </p>
                                )}
                                &ensp;
                                {word?.gender && (
                                    <p>
                                        {word.gender == "m" && "(masculin)"}
                                        {word.gender == "f" && "(féminin)"}
                                        {word.gender == "c" && "(commun)"}
                                        {word.gender == "v" && "(variable)"}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WordMain;
