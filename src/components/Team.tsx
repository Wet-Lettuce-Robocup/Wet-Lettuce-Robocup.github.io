import Footer from "./Footer.tsx";
import NavBar from "./NavBar.tsx";

function Team() {
  return (
    <>
      <NavBar />
      <main>
        <h1>About the Team</h1>
        <section className="team-story">
          <h2>Team Story</h2>
          <p>Our team has competed together since 2022 and has had consistent success in RoboCupJunior Australia Rescue Line. We started with an EV3 robot programmed in MicroPython, and in 2024 challenged ourselves to design and build our own hardware from scratch. We spent 2024 learning how to use a Raspberry Pi and control motors with PWM, then built on that in 2025, when we won the National Championships and qualified for the internationals.</p>
        </section>
        <h1>Meet the team</h1>
        <section className="cards">
          <div className="card">
            <h2>Landon</h2>
            <p>Documentation Lead & Project Manager</p>
            <ul>
              <li>Involved in RoboCupJunior Australia since 2018</li>
              <li>Coordinates project development and manages testing procedures</li>
              <li>Keeps technical documentation to a high standard</li>
              <li>Oversees system validation and makes sure subsystems are integrated before competition</li>
            </ul>
          </div>
          <div className="card">
            <h2>Bain</h2>
            <p>Hardware & Software (Rescue systems)</p>
            <ul>
              <li>Involved in RoboCup Junior Australia since 2018</li>
              <li>Designed the claw, victim-lifting mechanism, sensor mounts and battery holder</li>
              <li>Developed the voltage regulation circuitry and routed PCB connections</li>
              <li>Assembled the surface-mount components</li>
            </ul>
          </div>
          <div className="card">
            <h2>Toby</h2>
            <p>Mechanical Design & Machine Learning</p>
            <ul>
              <li>Involved in RoboCup Junior Australia since 2018</li>
              <li>CAD modelling: Raspberry Pi/STM32 cooler housing, sensor mounts, motor mounts, part of the ball ramp</li>
              <li>Designed the PCB for the forward-facing LEDs, the LED driver circuitry, a fan controller and sensor connections</li>
              <li>Trained the machine-learning model on photos taken from the robot and integrated it into the software</li>
            </ul>
          </div>
          <div className="card">
            <h2>William</h2>
            <p>Embedded Systems & Core Software</p>
            <ul>
              <li>Participating since 2021</li>
              <li>Researched and designed a major portion of the custom PCB (microcontroller, LEDs, odometry integration, trace routing)</li>
              <li>Wrote much of the low-level core software, including the STM32 code and ROS2 nodes for interfacing with hardware</li>
              <li>Developed the line-following and control algorithms that underpin autonomous operation</li>
            </ul>
          </div>
        </section>
        <h1>How we work</h1>
        <section className="cards">
          <div className="card">
            <h2>Planning</h2>
            <p>We list robot requirements, set goals for each in Microsoft Planner, then set timelines based on how long each should take.</p>
          </div>
          <div className="card">
            <h2>Hardware first, then software</h2>
            <p>We chose sensors and chips first, so mechanical design and programming could proceed in parallel once we knew what we were writing software for.</p>
          </div>
          <div className="card">
            <h2>Modular by design</h2>
            <p>We defined the ROS2 topics each node would use before writing code, so we could build and test parts of the robot in isolation.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Team;
