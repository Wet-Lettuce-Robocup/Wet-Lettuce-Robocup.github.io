import Footer from "./Footer.tsx";
import NavBar from "./NavBar.tsx";
import Timeline from "./Timeline.tsx"
import "../styles/Achievements.scss";

function Achievements() {
  return (
    <>
      <NavBar />
      <main>
        <h1 className="achievements-title">Achievements</h1>
        <section id="results">
          <h2>Results</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>NSW State</th>
                <th>Australian Nationals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022</td>
                <td>1st</td>
                <td>3rd</td>
              </tr>
              <tr>
                <td>2023</td>
                <td>1st</td>
                <td>3rd</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>2nd</td>
                <td>2nd</td>
              </tr>
              <tr>
                <td>2025</td>
                <td>1st</td>
                <td>1st (National Champions)</td>
              </tr>
            </tbody>
          </table>
          <h1>18th Globally (Incheon 2026)</h1>
        </section>
        <section id="timeline">
          <Timeline />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Achievements;
