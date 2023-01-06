import {useEffect} from 'react';
import Link from 'next/link'

export default function App() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div>


      <Link href="https://www.wikipedia.org">
  <a target="_blank" rel="noopener noreferrer">
  mabvaffaf
  </a>
</Link>
    </div>
  );
}
