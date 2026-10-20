import NavBar from "./NavBar.tsx";
import ScrollRotateModel from "./ScrollRotateModel.tsx"
import "../styles/Robot.scss"

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
        <h1>Robot Design</h1>
      </main>
    </>
  )
}

export default Robot;
