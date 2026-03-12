import { Link } from 'react-router-dom';
import { FiBook, FiHome, FiPlusCircle, FiList } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FiBook className="text-3xl" />
          <span>Book Manager</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">
            <FiHome />
            <span>Home</span>
          </Link>
          <Link to="/add-book">
            <FiPlusCircle />
            <span>Add Book</span>
          </Link>
          <Link to="/view-books">
            <FiList />
            <span>View Books</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
