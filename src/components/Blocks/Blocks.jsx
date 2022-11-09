import Block from "components/Block";
import { useSelector } from "react-redux";

const Blocks = () => {
  const blocks = useSelector((state) => state.blocks.blocksPositions);

  return blocks.map((item) => <Block key={item.id} {...item} />);
};

export default Blocks;
