import NavBar from "./NavBar.tsx";
import ScrollRotateModel from "./ScrollRotateModel.tsx"

function Robot() {
  return (
    <>
      <NavBar />
      <ScrollRotateModel url="/models/pcbv2.glb" scrollScreens={2} axis="y" size={2.5} tilt={15} />
      <main>
        <h1>Robot Design</h1>
      </main>
    </>
  )
}

export default Robot;
