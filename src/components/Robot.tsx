import NavBar from "./NavBar.tsx";
import ScrollRotateModel from "./ScrollRotateModel.tsx"
import "../styles/Robot.scss"
import Footer from "./Footer.tsx";

import {
  PythonOriginal,
  CplusplusOriginal,
  DockerOriginal,
  OpencvOriginal,
  GithubOriginal,
  FusionOriginal,
  RosOriginal,
} from "devicons-react";
import { FaEye, FaMicrochip } from "react-icons/fa";
import { MdLabelOutline } from "react-icons/md";
import { TbCircuitResistor } from "react-icons/tb";

const techStack = [
  { name: "ROS2", icon: <RosOriginal size={24} color="#22314E" /> },
  { name: "Python", icon: <PythonOriginal size={24} /> },
  { name: "C++", icon: <CplusplusOriginal size={24} /> },
  { name: "Docker", icon: <DockerOriginal size={24} /> },
  { name: "OpenCV", icon: <OpencvOriginal size={24} /> },
  { name: "YOLOv8", icon: <FaEye size={24} color="#00FFFF" /> },
  { name: "CVAT/Roboflow", icon: <MdLabelOutline size={24} color="#6706CE" /> },
  { name: "Hailo software suite", icon: <FaMicrochip size={24} color="#00A8E8" /> },
  { name: "KiCad", icon: <TbCircuitResistor size={24} color="#314CB0" /> },
  { name: "Fusion 360", icon: <FusionOriginal size={24} /> },
  { name: "GitHub", icon: <GithubOriginal size={24} /> },
];

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
          <div className="captioned-image">
            <img src="/images/pcb/pcb-1.png" />
            <h2>PCB</h2>
          </div>
          <div className="captioned-image">
            <img src="/images/pcb/pcb-regulators.png" />
            <h2>Voltage Regulators</h2>
          </div>
          <div className="captioned-image">
            <img src="/images/pcb/pcb-stm32.png" />
            <h2>STM32</h2>
          </div>
          <div className="captioned-image">
            <img src="/images/pcb/pcb-usb-port.png" />
            <h2>USB Controller</h2>
          </div>
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
          <img src="/images/interface-diagram.png" />
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
                {techStack.map((item) => (
                  <li
                    key={item.name}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>

              <ul className="marquee-list" aria-hidden="true">
                {techStack.map((item) => (
                  <li
                    key={item.name}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h1>Line follow</h1>
          <p>This algorithm was created during the development of the robot, but was not used in the final competition due to insufficient time. It is shown here in its unfinished form as a proof of concept rather than a complete algorithm. The code for this algorithm can be found on <a href="https://github.com/will-da-pro/pathfinding">GitHub</a>.</p>
          <h2>Abstract</h2>
          <p>The RoboCup Junior Rescue Line competition requires teams to design an autonomous robot to navigate through an unknown path and rescue victims from a toxic chemical spill. This project focuses exclusively on the line follow and navigation portion of the task, designing an algorithm that can follow the line intelligently, mapping out the course in real-time and using logic-based reasoning to decide which path to follow. The methods used in this project are a significant improvement to existing approaches, which frequently rely on rudimentary tracking methods susceptible to line loss and navigation failures on complex routes. The proposed algorithm uses a four step process of identifying points of interest, linking intersections which are connected by lines, building a map of intersections and connecting lines identified over multiple frames, and navigating intelligently using said map.</p>
          <h2>Typical Approaches</h2>
          <p>The most basic line follow algorithm typically used for this purpose involves only two colour sensors faced down towards the front of the robot, usually less than a centimetre above the ground and only a few centimetres apart, such that the distance between them is slightly wider than the width of the line being followed. The robot is then positioned with the line between the two sensors, and is programmed to drive forward while keeping the line between the two sensors, by turning in the opposite direction when it senses black (the line) on one of the sensors. This works well enough for a simple, solid black line with constant width and no intersections, but becomes increasingly unreliable and difficult to program when additional rules are added, such as intersections where the robot must follow the path indicated by a green square. There is also the issue that if the line falls out of the narrow section between the two sensors, it is impossible to find it again, which is especially problematic on sharp corners. </p>
          <p>Another slightly more complicated, yet still relatively simple approach is to position a camera at the front of the robot facing down towards the ground, along with a source of light, and use the images produced, filtered through a lightness threshold to differentiate the line from its surroundings, to determine the centre of mass of all black pixels in the image. To make this even more reliable the image could first be processed to find all contours, and use the centre of mass of the largest to filter out any unwanted noise. This tends to be far more accurate than the previous approach at following the line, but can struggle at intersections and especially when features surrounding the line require the robot to perform a special action, such as performing a u-turn when there is a green square on both sides of the line. Since this algorithm cannot actually isolate the individual lines themselves, intersections, or any other features, it cannot fulfill any non-trivial demands that require a deeper understanding of the layout of the track.</p>
          <h2>A Graph-Based Solution</h2>
          <p>For a robot to actually navigate a track, rather than just mindlessly follow wherever the largest line happens to be at any given moment, there are some basic, high level requirements. First, it must be able to identify any points of interest in a particular frame, such as line intersections and green squares. Next, it must be able to record these points of interest and their position relative to the robot, which means the robot must know its own position, whether by precise odometry or matching points between frames, and continuously build a map of the track. Finally, the robot must determine what path it will navigate based on pre-defined rules, and knowing where its starting position is, create a path of nodes to follow, whilst continuously mapping unseen portions of the track. This makes it far more computationally expensive than other approaches. It must be able to do all this in real time, so any algorithms must be efficient and the hardware used should be powerful enough to run them.</p>
          <p>This approach can be broken down into the following main high-level individual problems which must be solved in order to have a complete algorithm:</p>
          <ol>
            <li>Identifying points of interest</li>
            <li>Linking connected nodes</li>
            <li>Building a map of nodes</li>
            <li>Pathfinding using the map</li>
          </ol>
          <h2>Identifying Points of Interest</h2>
          <p>Out of all the problems identified this is perhaps the simplest, but it still presents some unique challenges. There are a few possible ways this can be done, which have implications for what approaches can be taken in the following problems. One way is to skeletonise the image, which means to shrink every line to be only one pixel wide, and can be done using the opencv python library. Once this has been done, any pixel with a value of 1 is part of the skeletonised line, and any pixel with a value of 0 is not. In the 3x3 grid surrounding a pixel of value 1, if exactly 2 also are of value 1, then the pixel is part of a line segment. If there is only one surrounding pixel with that value, then it must be the end of a line segment. If there are more than two, then it must be an intersection between two or more lines. The basic logic is to iterate over every pixel in the frame, and apply this logic to determine where the intersections and ends of lines lie on the image. As well as line features, the algorithm must also be able to identify other points of interest such as green squares or silver. Detecting colour can be done by applying a threshold to the original image, finding all contours, and their centres of mass.</p>
          <h2>Linking Connected Nodes</h2>
          <p>The method used for finding how nodes are connected depends largely on the desired method of storing this information. For the purposes of this project, there are two arrays, one of nodes and one of connecting edges. This was chosen over other methods, as it provides much greater data integrity and the performance tradeoffs are minimal. After nodes are found, the script traces the skeletonized image from node to node, recording each unique edge. After this, the script removes small lines and merges close intersections since sometimes intersections are recorded as 2 very close nodes. Finally, the script removes all nodes that are no longer a part of the final graph.</p>
          <h2>Building a Map of Nodes</h2>
          <p>This stage requires nodes to be identified and linked between frames, and must be able to handle nodes disappearing off frame and phantom nodes appearing from random noise. Connecting nodes between frames is done using a kalman filter to predict where the tracked nodes should be based on odometry data, and then using the hungarian algorithm to match nodes in a frame with known nodes. To eliminate phantom nodes, they are not trusted immediately but are assigned an age attribute, and are only added to the map after it reaches a certain value. If the kalman filter predicts a node will leave the frame, it is removed from the graph.</p>
          <h2>Pathfinding Using the Map</h2>
          <p>When the script begins, it locates the edge closest to the centre and follows towards the node higher up in the frame. When calculating which path to follow, the algorithm follows along an edge until it reaches a node. Once at a node, if it is an intersection, the algorithm locates all green contours and finds their angle and distance relative to the node. If they are close enough, their direction is used to determine which edge to follow next based on the competition rules. If no green square is detected, it finds the edge closest to 180º and follows that one. If the node is an end node, the algorithm creates a line pointing out from the edge and finds the closest node to follow. If there are no close nodes, it continues straight until one is found. </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Robot;
