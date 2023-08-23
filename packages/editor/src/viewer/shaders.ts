export const shaders = {
  hatching: {
    v: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    f: `
    varying vec2 vUv;
    uniform float time;
    uniform float density;
    uniform float opacity;
    uniform float threshold;
    uniform float angle;
    uniform float r;
    uniform float g;
    uniform float b;
  
    void main() {
      vec2 uv = vUv;
  
      float angleRadians = radians(angle);
      vec2 rotatedUV = mat2(cos(angleRadians), -sin(angleRadians), sin(angleRadians), cos(angleRadians)) * uv;
  
      // Создание штриховки
      float stripeValue = mod(rotatedUV.y * density + time, 1.0);
 
      gl_FragColor = vec4(vec3(r, g, b), step(threshold, stripeValue) + opacity);
    }
    `
  }
}