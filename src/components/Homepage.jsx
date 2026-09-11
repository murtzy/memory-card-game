import { Link } from 'react-router';

export const Homepage = () => {
  return (
    <div className="homepage">
      <div className="choose-link">
        <Link to="/single">Play Single</Link>
      </div>
      <div className="choose-link">
        <Link to="/vscomp">Play VS COMP</Link>
      </div>
    </div>
  );
};
