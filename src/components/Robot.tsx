import NavBar from "./NavBar.tsx";
import ScrollRotateModel from "./ScrollRotateModel.tsx"
import "../styles/Robot.scss"
import Footer from "./Footer.tsx";

function Robot() {
  return (
    <>
      <NavBar />
      <ScrollRotateModel url="/models/pcbv2.glb" scrollScreens={2} axis="y" size={2.5} tilt={15}>
        <div className="model-label">
          <h1>Robot Design</h1>
        </div>

      </ScrollRotateModel>
      <main>
        <section className="overview">
          <h1>Overview</h1>
          <p>Our robot is four-wheel drive and built around a tightly integrated hardware and software stack. Apart from the Raspberry Pi and most sensors, all electronics sit on a single custom PCB with an STM32 microcontroller that drives the motors, servos and all PWM components. This reduces wiring complexity and improves signal integrity.</p>
          <p>Closed-loop control combines the onboard IMU and motor encoders for precise, repeatable movement, which matters most in the rescue section. Four-wheel drive gives extra traction and stability over inclines, debris and speed bumps.</p>
          <p>The software runs on ROS2, which keeps it modular and maintainable. A forward-facing camera with a custom-trained machine-learning model detects victims, while SLAM lets the robot build and navigate a map of the rescue zone.</p>
          <p>Design story (callout box): For 2026 we rebuilt the robot almost completely. International rules limit height and footprint, and the speed bumps and hills are much larger than at the Australian competition, so we compacted the robot and moved to four-wheel drive. The biggest change was picking up a ball instead of a can, which needed an entirely new claw.</p>
        </section>
        <section id="mechanical-design">
          <h1>Mechanical Design</h1>
          <h2>Structure</h2>
          <p>A laser-cut acrylic sheet forms the base, carrying the battery and motors. Aluminium standoffs separate it from the PCB above, which serves as the top layer for most sensors, the claw, the ball tray and the Raspberry Pi. Hex bolts hold everything together, and 3D-printed parts (designed in Fusion 360) are used widely, especially for sensor mounts.</p>
          <h2>Power and Actuators</h2>
          <p>One 11.1V 7200mAh 120C LiPo battery, regulated by four separate regulators. Three servos: one for the claw, one for the lift, one for releasing victims.</p>
          <h2>Rescue mechanism</h2>
          <p>Kept deliberately compact. There's room for two live victims on the robot, and a third (dead) victim can be held in the claw so it doesn't interfere with the release process.</p>
        </section>
        <section id="electronics">
          <h1>Electronics</h1>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Part</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Main computer</td>
                <td>Raspberry Pi 5 (8GB) + AI HAT</td>
                <td>Runs ROS2, image processing and ML inference. The AI HAT offloads AI work from the CPU</td>
              </tr>
              <tr>
                <td>Microcontroller</td>
                <td>STM32F407VGTx</td>
                <td>Motor, servo and ultrasonic control; talks to the Pi over I2C as a slave</td>
              </tr>
              <tr>
                <td>IMU</td>
                <td>BNO086</td>
                <td>Improves odometry alongside wheel feedback, reducing drift</td>
              </tr>
              <tr>
                <td>Motor drivers</td>
                <td>MAX14870</td>
                <td>Handle the motors' stall current</td>
              </tr>
              <tr>
                <td>Camera</td>
                <td>Raspberry Pi Camera Module 3 Wide</td>
                <td>Wide field of view so more of the line is visible at once</td>
              </tr>
              <tr>
                <td>Distance sensors</td>
                <td>VL53L0X (time-of-flight), HC-SR04 (ultrasonic)</td>
                <td>Complementary: ToF resists interference but struggles with transparent/reflective objects; ultrasonic handles those but is prone to interference</td>
              </tr>
              <tr>
                <td>LED driver</td>
                <td>STCS1APUR</td>
                <td>Constant-current drive for front LEDs at 1.5A (resistors are unpredictable at that current)</td>
              </tr>
              <tr>
                <td>USB-C PD controller</td>
                <td>Infineon CYPD3175</td>
                <td>Negotiates 5V/5A so the Pi can be powered via USB-C with its built-in protections</td>
              </tr>
            </tbody>
          </table>
          <h2>Power Regulators</h2>
          <table><thead>
            <tr>
              <th>Rail</th>
              <th>Regulator</th>
              <th>Powers</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>3.3V</td>
                <td>AP64501SP-13</td>
                <td>Most sensors</td>
              </tr>
              <tr>
                <td>5V</td>
                <td>AP64501SP-13</td>
                <td>LEDs and fan</td>
              </tr>
              <tr>
                <td>5.1V (5A)</td>
                <td>AP64501SP-13</td>
                <td>Raspberry Pi only, so high-current loads elsewhere can't brown it out</td>
              </tr>
              <tr>
                <td>12V (6.4A peak)</td>
                <td>XLM51772RHAR</td>
                <td>Motors; sized for the combined stall current of all four</td>
              </tr>
            </tbody>
          </table>
          <h3>Why an STM32?</h3>
          <p>The Pi doesn't have enough hardware PWM channels. The STM32F407 has built-in encoder timers, plenty of high-resolution PWM channels, and accurate input-capture timers for the ultrasonic sensor.</p>
          <h3>Why power the Pi over USB-C?</h3>
          <p>It gets the port's voltage and current protections, which don't exist when powering over the GPIO pins.</p>
          <h3>Design process</h3>
          <p>The PCB was designed in KiCad and checked with its electrical and design rules checkers.</p>
        </section>
        <section id="software">
          <h1>Software</h1>
          <h2>How the robot thinks</h2>
          <ol className="how-robot-thinks">
            <li>State machine reads the on-button and switches between idle and line follow/rescue by enabling or disabling lifecycle nodes. It also listens for line follow or rescue finishing so it can switch modes or end the round.</li>
            <li>Line following: the navigation node processes the down-facing camera and publishes line error → the PID loop turns that into steering on /cmd_vel.</li>
            <li>Motor control: the twist subscriber turns /cmd_vel into commands for the STM32, and the odom publisher returns encoder data on /odom.</li>
            <li>Rescue: the ML model detects victims, then the robot navigates to them and to evacuation points, operates the claw and ball ramp, and leaves the zone.</li>
          </ol>
          <h2>Tools & technologies</h2>
          <div className="tools-technologies marquee-container">
            <div className="marquee-track">
              <ul className="marquee-list">
                <li>ROS2</li>
                <li>Python</li>
                <li>C++</li>
                <li>Docker</li>
                <li>OpenCV</li>
                <li>YOLOv8</li>
                <li>CVAT/Roboflow</li>
                <li>Hailo software suite</li>
                <li>KiCad</li>
                <li>Fusion 360</li>
                <li>Microsoft Planner</li>
                <li>GitHub</li>
              </ul>

              <ul className="marquee-list" aria-hidden="true">
                <li>ROS2</li>
                <li>Python</li>
                <li>C++</li>
                <li>Docker</li>
                <li>OpenCV</li>
                <li>YOLOv8</li>
                <li>CVAT/Roboflow</li>
                <li>Hailo software suite</li>
                <li>KiCad</li>
                <li>Fusion 360</li>
                <li>Microsoft Planner</li>
                <li>GitHub</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Robot;
