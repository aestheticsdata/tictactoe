import StyledBox from './StyledBox';

interface Box {
  value: number;
  id: string;
}

const Box = ({value, id}: Box): JSX.Element => {
  return (
    <StyledBox className={`id-${id}`}>
      <span className="x-o">
        {value !== 0  && (value === 1 ? 'x' : 'o')}
      </span>
    </StyledBox>
  )
}

export default Box;
