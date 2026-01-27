/**
 * Custom hook for observing element intersections using the Intersection Observer API.
 *
 * This hook provides a simple way to detect when an element enters or leaves the viewport,
 * which is commonly used for triggering animations, lazy loading, or other viewport-based behaviors.
 *
 * @param options - Configuration options for the Intersection Observer
 * @param options.threshold - A number or array of numbers indicating at what percentage of the target's visibility the observer's callback should be executed (default: 0)
 * @param options.root - The element that is used as the viewport for checking visibility of the target (default: browser viewport)
 * @param options.rootMargin - Margin around the root element (default: '0px')
 * @param options.freezeOnceVisible - If true, the hook will stop observing once the element becomes visible (default: false)
 *
 * @returns {[React.RefObject<T>, boolean]} A tuple containing:
 * - A ref object to attach to the element you want to observe
 * - A boolean indicating whether the element is currently intersecting/visible
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [ref, isVisible] = useIntersectionObserver({
 *     threshold: 0.1,
 *     freezeOnceVisible: true
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       {isVisible ? 'Now visible!' : 'Not yet visible'}
 *     </div>
 *   );
 * };
 * ```
 */
import { useEffect, useState, useRef } from 'react';
/**
 * Custom hook for observing element intersections using the Intersection Observer API.
 *
 * @param options - Configuration options for the Intersection Observer
 * @returns A tuple containing a ref object and a boolean indicating intersection status
 */
function useIntersectionObserver(options = {}) {
    const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false, } = options;
    // State to track whether the element is intersecting
    const [isIntersecting, setIsIntersecting] = useState(false);
    // Ref to attach to the target element
    const targetRef = useRef(null);
    // Ref to track if we should freeze the intersection state
    const wasIntersecting = useRef(false);
    useEffect(() => {
        const targetElement = targetRef.current;
        // Early return if no target element or if we've frozen the state
        if (!targetElement || (freezeOnceVisible && wasIntersecting.current)) {
            return;
        }
        // Create Intersection Observer instance
        const observer = new IntersectionObserver(([entry]) => {
            const isElementIntersecting = entry.isIntersecting;
            // Update state
            setIsIntersecting(isElementIntersecting);
            // Mark as intersecting if we should freeze once visible
            if (freezeOnceVisible && isElementIntersecting) {
                wasIntersecting.current = true;
            }
        }, {
            threshold,
            root,
            rootMargin,
        });
        // Start observing the target element
        observer.observe(targetElement);
        // Cleanup function to disconnect the observer
        return () => {
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, freezeOnceVisible]);
    return [targetRef, isIntersecting];
}
export default useIntersectionObserver;
