function Cv(){
   const url = "https://drive.google.com/file/d/1x-Us3shpN2LRQvnTkORgFiNKnmV3A3Bu/view?usp=drive_link";
   window.open(url,'_blank');
}

export default function Nav(){
    return(
       <>
  
       <nav className="navbar">
        <div className="logo" >Portfolio</div>
        <ul className="nav-link">
            <li><a href="#Home">Home</a></li>
            <li><a href="#About">About Me</a></li>
            <li><a href="#skills">Skills & Tools</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Contact</a></li>
            </ul>
       </nav>
       <div className="front" id="Home">
        <div className="details">
            <h2>Hello, it's Me  <h1 className="simp" id="head1">Sahil Mahajan</h1></h2>
       
       <h2 className="simp">And I'm a  <h1 className="simp" id="head2">Frontend Developer</h1></h2>
        <p>I'm passionate about crafting user-friendly and visually appealing web experiences. This portfolio website, which I designed and developed myself using HTML, CSS,JavaScript, and React JS showcases my skills and projects. I enjoy the entire process of bringing ideas to life.</p>
       <button onClick={Cv}>Download Cv</button>
       </div>
       <div className="im">
        <img src="profile.jpeg" alt="image" />
       </div>
       </div>
       <br /><br />
       <hr color="black" />
    </>
    );
}