import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define the ordered list of main pages for scroll navigation
const PAGE_ORDER = ['/', '/products', '/about', '/contact'];
const PAGE_LABELS = ['Home', 'Showroom', 'About', 'Contact'];

const ScrollNavigator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isNavigating = useRef(false);
    const touchStartY = useRef(null);

    const currentIndex = PAGE_ORDER.indexOf(location.pathname);

    useEffect(() => {
        // Only enable scroll navigation on the ordered pages
        if (currentIndex === -1) return;

        const handleWheel = (e) => {
            if (isNavigating.current) return;

            const scrollingDown = e.deltaY > 50;
            const scrollingUp = e.deltaY < -50;

            if (scrollingDown && currentIndex < PAGE_ORDER.length - 1) {
                isNavigating.current = true;
                navigate(PAGE_ORDER[currentIndex + 1]);
                setTimeout(() => { isNavigating.current = false; }, 1000);
            } else if (scrollingUp && currentIndex > 0) {
                isNavigating.current = true;
                navigate(PAGE_ORDER[currentIndex - 1]);
                setTimeout(() => { isNavigating.current = false; }, 1000);
            }
        };

        // Touch support for mobile swipe
        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            if (touchStartY.current === null || isNavigating.current) return;
            const deltaY = touchStartY.current - e.changedTouches[0].clientY;

            if (deltaY > 60 && currentIndex < PAGE_ORDER.length - 1) {
                isNavigating.current = true;
                navigate(PAGE_ORDER[currentIndex + 1]);
                setTimeout(() => { isNavigating.current = false; }, 1000);
            } else if (deltaY < -60 && currentIndex > 0) {
                isNavigating.current = true;
                navigate(PAGE_ORDER[currentIndex - 1]);
                setTimeout(() => { isNavigating.current = false; }, 1000);
            }
            touchStartY.current = null;
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentIndex, navigate]);

    // Only show dots on the main scroll pages
    if (currentIndex === -1) return null;

    return (
        <div className="scroll-indicator">
            {PAGE_ORDER.map((path, index) => (
                <motion.div
                    key={path}
                    className={`scroll-dot ${index === currentIndex ? 'active' : ''}`}
                    title={PAGE_LABELS[index]}
                    onClick={() => navigate(path)}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                />
            ))}
        </div>
    );
};

export default ScrollNavigator;
