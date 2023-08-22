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
    uniform float lineWidth; // Добавили uniform для ширины линий
  
    void main() {
      vec2 uv = vUv;
  
      // Угол для штриховки (45 градусов)
      float angle = radians(45.0);
      vec2 rotatedUV = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * uv;
  
      // Создание штриховки
      float stripeDensity = 10.0; // Плотность штриховки
      float stripeValue = mod(rotatedUV.y * stripeDensity + time, 1.0);
  
      // Красные линии
      float threshold = lineWidth / 2.0; // Порог для определения прозрачных областей
      float lineDistance = abs(mod(rotatedUV.y * stripeDensity + time, 1.0) - 0.5) * 2.0;
      float alpha = step(threshold, lineDistance);

      // Красные линии
      vec3 stripeColor = vec3(1.0, 0.0, 0.0); // Красный цвет
      vec3 finalColor = mix(vec3(0.0), stripeColor, step(threshold, stripeValue));
  
      gl_FragColor = vec4(finalColor, step(threshold, stripeValue));
    }
    `
  }
}