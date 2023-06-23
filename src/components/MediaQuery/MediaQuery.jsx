import Media from 'react-media';
import { device } from '../../assets/theme';

export const MediaQuery = ({ deviceName, children }) => {
  return (
    <Media queries={device}>
      {matches => {
        return matches[deviceName] && children;
      }}
    </Media>
  );
};
