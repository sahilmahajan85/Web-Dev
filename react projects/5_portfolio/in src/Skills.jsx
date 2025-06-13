export default function Skills(){
    return(
    <>
    <div className="bar">
        <h1>HTML</h1>
        <h1>Css</h1>
        <h1>JS</h1>
        <h1>ReactJS</h1>
        <h1>NodeJs</h1>
        <h1>Git</h1>

    </div>

    <div className="skill" id="skills">
        <h1>Skills & Tools</h1>
        <br />
        <div className="combo">
        <div className="tool">
        <img id="imglogo" src="language.png" />
        <h2>Programming Languages</h2>
        </div>
        <div className="tool">
        <img id="imglogo" src="tools.png" />
        <h2>Tools</h2>
        </div>
         <div className="tool">
        <img id="imglogo" src="backend.png" />
        <h2>Backend</h2>
        </div>
        </div>
        <hr color="black" />
    </div>
    
    </>
    );
}