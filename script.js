document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero-image');
    const heroText = document.querySelector('.hero-text h1');
    
    // Store original positions
    const originalPositions = {};
    images.forEach(img => {
        originalPositions[img.id] = {
            x: img.offsetLeft,
            y: img.offsetTop
        };
    });

    // Mouse move handler with smoother following
    const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgCenterX = rect.left + rect.width / 2;
            const imgCenterY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(mouseX - imgCenterX, 2) + 
                Math.pow(mouseY - imgCenterY, 2)
            );
            
            // Magnetic effect - stronger when closer
            if (distance < 200) {
                const strength = 1 - (distance / 400);
                const moveX = (mouseX - imgCenterX) * 0.15 * strength;
                const moveY = (mouseY - imgCenterY) * 0.15 * strength;
                
                gsap.to(img, {
                    x: `+=${moveX}`,
                    y: `+=${moveY}`,
                    duration: 0.6,
                    ease: "power2.out"
                });
            } else {
                // Return to original position
                gsap.to(img, {
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    };

    // Enhanced hover effects
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.2,
                zIndex: 20,
                opacity: 1,
                duration: 0.3
            });
            
            // Hide other images but show placeholders
            images.forEach(otherImg => {
                if (otherImg !== img) {
                    gsap.to(otherImg, {
                        opacity: 0,
                        duration: 0.3
                    });
                    gsap.to(otherImg.querySelector('img'), {
                        opacity: 0,
                        duration: 0.3
                    });
                }
            });
            
            // Text effect
            gsap.to(heroText, {
                color: 'transparent',
                '-webkit-text-stroke': '1px white',
                duration: 0.3
            });
        });

        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                zIndex: 1,
                opacity: 0.3,
                duration: 0.5
            });
            
            // Show other images again
            images.forEach(otherImg => {
                gsap.to(otherImg, {
                    opacity: 0.3,
                    duration: 0.5
                });
                gsap.to(otherImg.querySelector('img'), {
                    opacity: 1,
                    duration: 0.5
                });
            });
            
            // Reset text
            gsap.to(heroText, {
                color: 'white',
                '-webkit-text-stroke': '0px transparent',
                duration: 0.3
            });
        });
    });

    document.addEventListener('mousemove', handleMouseMove);
});

// Add this to your existing mouseenter event handler
img.addEventListener('mouseenter', () => {
    // ... existing hover code ...
    
    // Animate label
    gsap.to(img.querySelector('.image-label'), {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Add this to mouseleave handler
img.addEventListener('mouseleave', () => {
    // ... existing leave code ...
    
    // Hide label
    gsap.to(img.querySelector('.image-label'), {
        opacity: 0,
        duration: 0.3
    });
});