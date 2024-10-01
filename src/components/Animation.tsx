// import { useFetchPopularBooks } from "@/hooks/useFetchBook";
// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import "./heroAnimation.css";

// const HeroAnimation = () => {
//   const { data: booksData } = useFetchPopularBooks();
//   const [clickedBookId, setClickedBookId] = useState<string | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleImageClick = (bookId: string) => {
//     setClickedBookId(bookId === clickedBookId ? null : bookId);
//   };

//   useEffect(() => {
//     if (containerRef.current && clickedBookId) {
//       const container = containerRef.current;
//       const index = booksData?.items.findIndex(book => book.bookId === clickedBookId) ?? 0;
//       const itemWidth = container.children[index].clientWidth;
//       const offset = itemWidth * index - container.clientWidth / 2 + itemWidth / 2;
//       container.scrollTo({ left: offset, behavior: 'smooth' });
//     }
//   }, [clickedBookId, booksData]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     let scrollDirection = 1; // 1 for right, -1 for left

//     const autoScroll = () => {
//       if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
//         scrollDirection = -1; // Scroll left
//       } else if (container.scrollLeft <= 0) {
//         scrollDirection = 1; // Scroll right
//       }

//       container.scrollBy({ left: scrollDirection * 2, behavior: 'smooth' });
//     };

//     const scrollInterval = setInterval(autoScroll, 50); // Adjust interval as needed

//     return () => clearInterval(scrollInterval); // Cleanup on unmount
//   }, []);

//   return (
//     <div  
//       ref={containerRef}
//       className="relative flex scrollbar-hidden overflow-x-auto"
//     >
//       {booksData?.items.map((book) => (
//         <motion.div
//           key={book.bookId}
//           className="relative flex-shrink-0 px-2 w-1/3"
//           initial={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
//           animate={{
//             opacity: clickedBookId === book.bookId ? 1 : 0.6,
//             scale: clickedBookId === book.bookId ? 1.1 : 0.9,
//             y: clickedBookId === book.bookId ? -1 : 0, // Moves the book up when clicked
//             filter: clickedBookId === book.bookId ? "blur(0px)" : "blur(2px)",
//             zIndex: clickedBookId === book.bookId ? 10 : 1,
//           }}
//           transition={{ duration: 0.3 }}
//           onClick={() => handleImageClick(book.bookId)}
//         >
//           <img
//             src={book.coverImage}
//             alt={book.title}
//             className="w-full h-auto cursor-pointer"
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default HeroAnimation;


import { useFetchPopularBooks } from "@/hooks/useFetchBook";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "./heroAnimation.css";
import { useNavigate } from "react-router-dom";

const HeroAnimation = () => {
  const { data: booksData } = useFetchPopularBooks();
  const navigate = useNavigate();
  const [clickedBookId, setClickedBookId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState(1); 

  const handleBook = (slug:string) => {
      navigate(`/book/${slug}`)
  }

  useEffect(() => {
    if (containerRef.current && clickedBookId) {
      const container = containerRef.current;
      const index = booksData?.items.findIndex(book => book.bookId === clickedBookId) ?? 0;
      const itemWidth = container.children[index].clientWidth;
      const offset = itemWidth * index - container.clientWidth / 2 + itemWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [clickedBookId, booksData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const autoScroll = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        setScrollDirection(-1); 
      } else if (container.scrollLeft <= 0) {
        setScrollDirection(1); 
      }

      container.scrollBy({ left: scrollDirection * 2, behavior: 'smooth' });
    };

    const scrollInterval = setInterval(autoScroll, 50); 

    return () => clearInterval(scrollInterval); 
  }, [scrollDirection]);

  useEffect(() => {
    if (!booksData) return;

    let currentIndex = scrollDirection === 1 ? 0 : booksData.items.length - 1;
    const cycleImages = () => {
      if (!booksData.items.length) return;
      setClickedBookId(booksData.items[currentIndex].bookId);
      currentIndex = (currentIndex + scrollDirection + booksData.items.length) % booksData.items.length;
    };

    const cycleInterval = setInterval(cycleImages, 2000); 

    return () => clearInterval(cycleInterval); 
  }, [booksData, scrollDirection]);

  return (
    <div  
      ref={containerRef}
      className="relative flex scrollbar-hidden overflow-x-auto"
    >
      {booksData?.items.map((book) => (
        <motion.div
          key={book.bookId}
          className="relative flex-shrink-0 px-2 w-1/3"
          initial={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          animate={{
            opacity: clickedBookId === book.bookId ? 1 : 0.6,
            scale: clickedBookId === book.bookId ? 1.1 : 0.9,
            y: clickedBookId === book.bookId ? -1 : 0, 
            filter: clickedBookId === book.bookId ? "blur(0px)" : "blur(2px)",
            zIndex: clickedBookId === book.bookId ? 10 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <img
            onClick={()=>handleBook(book.slug)}
            src={book.coverImage}
            alt={book.title}
            className="w-full h-auto cursor-pointer"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default HeroAnimation;
