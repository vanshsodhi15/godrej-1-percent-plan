import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PlotConfig {
    __typename?: string;
    id?: string;
    area: string;
    price: string;
}

interface PlotConfigSliderProps {
    plot_configurations?: PlotConfig[];
}

const PlotConfigSlider: React.FC<PlotConfigSliderProps> = ({
    plot_configurations,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const loopResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
    const realLength = plot_configurations?.length || 0;
    const isSingle = realLength === 1;
    const isDouble = realLength === 2;
    const isLoopEnabled = !isMobile && realLength >= 3;
    const showArrows = realLength > 1 && (isMobile || realLength >= 3);
    const visibleCards = isMobile ? 1 : isSingle ? 1 : isDouble ? 2 : 3;
    const startIndex =
        realLength > 1 ? realLength + Math.floor(visibleCards / 2) - 1 : 0;
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const extendedConfigs =
        realLength > 1
            ? [
                  ...(plot_configurations || []),
                  ...(plot_configurations || []),
                  ...(plot_configurations || []),
              ]
            : plot_configurations || [];
    const activeIndex =
        realLength > 0
            ? ((currentIndex % realLength) + realLength) % realLength
            : 0;
    const cardWidth = visibleCards > 0 ? viewportWidth / visibleCards : 0;
    const translateX = -(currentIndex * cardWidth);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Measure viewport width for transform-based movement.
    useEffect(() => {
        const updateWidth = () => {
            if (sliderRef.current) {
                setViewportWidth(sliderRef.current.clientWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Reset to the middle copy whenever item count changes.
    useEffect(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(startIndex);
        const id = requestAnimationFrame(() => {
            setIsTransitionEnabled(true);
        });
        return () => cancelAnimationFrame(id);
    }, [startIndex, realLength]);

    // Seamless loop reset (middle copy) after movement completes.
    useEffect(() => {
        if (realLength <= 1) return;
        if (loopResetTimeoutRef.current) {
            clearTimeout(loopResetTimeoutRef.current);
        }

        if (currentIndex >= realLength * 2 || currentIndex < realLength) {
            loopResetTimeoutRef.current = setTimeout(() => {
                setIsTransitionEnabled(false);
                setCurrentIndex((prev) => {
                    if (prev >= realLength * 2) return prev - realLength;
                    if (prev < realLength) return prev + realLength;
                    return prev;
                });
                requestAnimationFrame(() => {
                    setIsTransitionEnabled(true);
                });
            }, 400);
        }

        return () => {
            if (loopResetTimeoutRef.current) {
                clearTimeout(loopResetTimeoutRef.current);
            }
        };
    }, [currentIndex, realLength]);

    // Don't render if no configurations
    if (!plot_configurations?.length) {
        return null;
    }

    const scrollLeft = () => {
        if (realLength <= 1) return;
        setCurrentIndex((prev) => prev - 1);
    };

    const scrollRight = () => {
        if (realLength <= 1) return;
        setCurrentIndex((prev) => prev + 1);
    };

    return (
        <section className='plot-config-slider w-full '>
            <div className='container mx-auto'>
                <div className='relative mx-auto flex items-center justify-center lg:max-w-[1000px]'>
                    {/* Prev Arrow - show only in carousel mode */}
                    {showArrows && (
                        <button
                            onClick={scrollLeft}
                            className='pointer-events-auto absolute left-2 top-1/2 z-[8] -translate-y-1/2 rounded-full border border-gray-300 bg-white p-3 text-gray-600 shadow-md hover:bg-gray-100'
                            aria-label='Previous Slide'
                        >
                            <FaArrowLeft />
                        </button>
                    )}

                    {/* Slider Window */}
                    <div
                        ref={sliderRef}
                        className={`scrollbar-hide flex w-full pb-4 lg:max-w-[900px] ${
                            isSingle
                                ? 'items-center justify-center overflow-x-hidden'
                                : !isMobile && isDouble
                                ? 'justify-center gap-4 overflow-x-hidden'
                                : 'overflow-x-hidden'
                        }`}
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <div
                            className={`flex w-full ${
                                isSingle ? 'items-center justify-center' : ''
                            }`}
                            style={{
                                transform: isSingle
                                    ? 'none'
                                    : `translateX(${translateX}px)`,
                                transition: isSingle
                                    ? 'none'
                                    : isTransitionEnabled
                                    ? 'transform 0.4s ease'
                                    : 'none',
                            }}
                        >
                            {extendedConfigs.map((item, index) => {
                                // Calculate real index for active state
                                const realIndex =
                                    realLength > 0 ? index % realLength : 0;
                                const centerOffset =
                                    !isMobile && realLength >= 3 ? 1 : 0;

                                const isActive =
                                    isSingle ||
                                    realIndex ===
                                        (activeIndex + centerOffset) %
                                            realLength;
                                return (
                                    <div
                                        key={`${
                                            item.id || 'plot-config'
                                        }-${index}`}
                                        data-index={realIndex}
                                        className={`flex-shrink-0 ${
                                            isSingle
                                                ? 'mx-auto w-auto'
                                                : 'px-4 lg:px-3'
                                        } ${
                                            !isSingle && isMobile
                                                ? 'w-full'
                                                : !isSingle && isDouble
                                                ? 'w-1/2'
                                                : !isSingle
                                                ? 'w-1/3'
                                                : ''
                                        }`}
                                        style={
                                            !isSingle && cardWidth
                                                ? { width: `${cardWidth}px` }
                                                : undefined
                                        }
                                    >
                                        <div
                                            className={`group mx-auto flex min-h-[137px] w-full max-w-[400px] flex-col border shadow-sm ${
                                                isMobile
                                                    ? 'min-w-full'
                                                    : isLoopEnabled
                                                    ? 'min-w-0'
                                                    : 'min-w-0'
                                            } ${
                                                isActive
                                                    ? 'border-[#c3aa62] bg-[#c3aa62]'
                                                    : 'border-gray-200 bg-[#F9F9F9] hover:border-[#c3aa62] hover:bg-[#c3aa62]'
                                            }`}
                                        >
                                            {/* Top Section - Area */}
                                            <div
                                                className={`px-6 pb-2 pt-6 text-center ${
                                                    isActive
                                                        ? 'text-white'
                                                        : 'text-black group-hover:text-white'
                                                }`}
                                            >
                                                <h3
                                                    className={`font-display text-[20px] font-medium  ${
                                                        isActive
                                                            ? 'text-white'
                                                            : 'group-hover:text-white'
                                                    }`}
                                                >
                                                    {item.area}
                                                </h3>
                                                <div
                                                    className={`mt-4 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent ${
                                                        isActive
                                                            ? 'via-white'
                                                            : 'via-gray-300 group-hover:via-white'
                                                    }`}
                                                ></div>
                                            </div>

                                            {/* Bottom Section - Price */}
                                            <div
                                                className={`mx-auto max-w-[58%] px-6 pb-6 pt-2 text-center lg:max-w-[65%] ${
                                                    isActive
                                                        ? 'text-white'
                                                        : 'text-black group-hover:text-white'
                                                }`}
                                            >
                                                <p className='font-primary text-[18px] font-medium leading-[1.3]'>
                                                    {item.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Next Arrow - show only in carousel mode */}
                    {showArrows && (
                        <button
                            onClick={scrollRight}
                            className='pointer-events-auto absolute right-2 top-1/2 z-[8] -translate-y-1/2 rounded-full border border-gray-300 bg-white p-3 text-gray-600 shadow-md hover:bg-gray-100'
                            aria-label='Next Slide'
                        >
                            <FaArrowRight />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PlotConfigSlider;
