import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import "../styles/Home.scss";

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <section className="hero-banner">
          <img src="/images/thumbnail.jpg" alt="The robot following a line." className="hero-background" role="presentation" />
          <div className="hero-content">
          </div>
        </section>
        <section className="description">
          <p>We are a team of four students from New South Wales, Australia. We have competed in RoboCupJunior Rescue Line since 2022, progressing from an off-the-shelf EV3 to a fully custom robot with its own circuit board, software stack and machine-learning vision system. In 2025 we won the Australian National Championships and qualified for the international competition in Incheon, South Korea.</p>
        </section>
        <section className="highlight-cards">
          <div className="card">
            <h2>Custom Hardware</h2>
            <p>One custom PCB with an STM32 microcontroller handles motors, servos and PWM. Fewer wires, cleaner signals.</p>
          </div>
          <div className="card">
            <h2>Smart Software</h2>
            <p>Built on ROS2, with a custom-trained YOLOv8 vision model to find rescue victims and SLAM to navigate the evacuation zone.</p>
          </div>
          <div className="card">
            <h2>Four-wheel drive</h2>
            <p>More traction and torque for the larger speed bumps and hills at international competition.</p>
          </div>
        </section>
        <section className="stats">
          <h2>4 Team Members</h2>
          <h2>Competing Since 2022</h2>
          <h2>3x NSW State Champions</h2>
          <h2>2025 Australian National Champions</h2>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home;
