import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { NavBar } from '../components/NavBar'

const Index = () => (
  <>
  <NavBar />
  <Container height="100vh">
    <DarkModeSwitch />
    <div>
      hello world!
    </div>
  </Container>
  </>
)

export default Index
