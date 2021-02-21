import React from 'react';
function Categories() {
const move = (e) => {
const x = (window.innerWidth /2 - e.pageX) / 2;
const y = (window.innerHeight /2 - e.pageY) / 2; 

const div = document.querySelector('.h');
const img = document.querySelector('img');
div.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
img.style.transform = `rotateX(${x * 20}deg) rotateY(${y * 20}deg)`;
}



    return (
        <div onMouseMove ={move} style={{width:'400px',height:'600px'}} className='categories'>
            <div className="h">
        <img style={style.img} src='https://th.bing.com/th/id/R4404671c47fbb1a1fc857174f220dd6a?rik=XrX3G80s6tRNxw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2flight-png-transparent-image-1600.png&ehk=VGg6X%2flva%2ffKRt%2b9GOlby7XzBcJ%2bN%2f0it%2b1pt8crfsE%3d&risl=&pid=ImgRaw' alt='' />
       </div>
        </div>
    )
}

const style = {
    img: {
        width: '100%'
    }
}

export default Categories
