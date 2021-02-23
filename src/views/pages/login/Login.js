import React,{ useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';



function Login() {
  let start = true;
  const change = (e) => {
    if (start === true) {
      const login = e.target;
      let canvas = document.createElement("canvas");
      let width = (canvas.width = window.innerWidth * 1.5);
      let height = (canvas.height = window.innerHeight * 1.5);
      login.appendChild(canvas);
      let gl = canvas.getContext("webgl");

      let numMetaballs = 40;
      let metaballs = [];

      for (let i = 0; i < numMetaballs; i++) {
        let radius = Math.random() * 60 + 10;
        metaballs.push({
          x: Math.random() * (width - 1 * radius) + radius,
          y: Math.random() * (height - 1 * radius) + radius,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          r: radius * 0.75,
        });
      }

      let vertexShaderSrc = `
attribute vec2 position;

void main() {
// We set z to be 0.0, and w to be 1.0
gl_Position = vec4(position, 0.0, 1.0);
}
`;

      let fragmentShaderSrc =
        `
precision highp float;

const float WIDTH = ` +
        (width >> 0) +
        `.0;
const float HEIGHT = ` +
        (height >> 0) +
        `.0;

uniform vec3 metaballs[` +
        numMetaballs +
        `];

void main(){
float x = gl_FragCoord.x;
float y = gl_FragCoord.y;

float sum = 0.0;
for (int i = 0; i < ` +
        numMetaballs +
        `; i++) {
vec3 metaball = metaballs[i];
float dx = metaball.x - x;
float dy = metaball.y - y;
float radius = metaball.z;

sum += (radius * radius) / (dx * dx + dy * dy);
}

if (sum >= 0.99) {
gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
return;
}

gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}

`;

      let vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
      let fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

      let program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      let vertexData = new Float32Array([
        -1.0,
        1.0, // top left
        -1.0,
        -1.0, // bottom left
        1.0,
        1.0, // top right
        1.0,
        -1.0, // bottom right
      ]);
      let vertexDataBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      let positionHandle = getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionHandle);
      gl.vertexAttribPointer(
        positionHandle,
        2, // position is a vec2
        gl.FLOAT, // each component is a float
        gl.FALSE, // don't normalize values
        2 * 4, // two 4 byte float components per vertex
        0 // offset into each span of vertex data
      );

      let metaballsHandle = getUniformLocation(program, "metaballs");

      loop();
      function loop() {
        for (let i = 0; i < numMetaballs; i++) {
          let metaball = metaballs[i];
          metaball.x += metaball.vx;
          metaball.y += metaball.vy;

          if (metaball.x < metaball.r || metaball.x > width - metaball.r)
            metaball.vx *= -1;
          if (metaball.y < metaball.r || metaball.y > height - metaball.r)
            metaball.vy *= -1;
        }

        let dataToSendToGPU = new Float32Array(3 * numMetaballs);
        for (let i = 0; i < numMetaballs; i++) {
          let baseIndex = 3 * i;
          let mb = metaballs[i];
          dataToSendToGPU[baseIndex + 0] = mb.x;
          dataToSendToGPU[baseIndex + 1] = mb.y;
          dataToSendToGPU[baseIndex + 2] = mb.r;
        }
        gl.uniform3fv(metaballsHandle, dataToSendToGPU);

        //Draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(loop);
      }

      function compileShader(shaderSource, shaderType) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.log("not find " + gl.getShaderInfoLog(shader));
        }

        return shader;
      }

      function getUniformLocation(program, name) {
        let uniformLocation = gl.getUniformLocation(program, name);
        if (uniformLocation === -1) {
          console.log("not find " + name);
        }
        return uniformLocation;
      }

      function getAttribLocation(program, name) {
        let attributeLocation = gl.getAttribLocation(program, name);
        if (attributeLocation === -1) {
          console.log("not find " + name);
        }
        return attributeLocation;
      }
}

      start = false;
    }
    
  const dispatch = useDispatch();
  const Submit =() =>{
  dispatch({
    type:"login",
    user: 'Admin'
  })
}
const [adminUsername,setAdminUsername] = useState('');
const [adminPassword,setAdminPassword] = useState('');

  return (
    <div
      className="login"
    >
      <div className='animation'
       onMouseOver={change}>
      </div>
      <div className="login-box">
        <h2>Login Admin</h2>
        <form>
          <div className="user-box">
            <input onChange={(e) => setAdminUsername(e.target.value)} type="text" name="name" required />
            <label>Usernamess</label>
          </div>
          <div className="user-box">
            <input onChange={(e) => setAdminPassword(e.target.value)} type="password" name="password" required />
            <label>Password</label>
          </div>
          <p onClick={Submit}>

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
