import type { NextPage } from 'next'
import StyledIndex from './StyledIndex';
import Board from '../components/Board/Board';

const Home: NextPage = () => {
  return (
    <StyledIndex>
      <Board />
    </StyledIndex>
  )
}

export default Home
