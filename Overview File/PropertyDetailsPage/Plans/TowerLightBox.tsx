/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import ReactImage from '@/components/ReactImage';

import ZoomIn from '~/svg/property-details/zoom-in.svg';
import ZoomOut from '~/svg/property-details/zoom-out.svg';

interface Props {
    onClose: any;
    active: boolean;
    item: any;
}
const TowerLightBox = (props: Props) => {
    const { onClose, active, item } = props;
    const { name } = item;
    const modalEl: any = useRef(null);
    const [currentIndex, setcurrentIndex] = useState(0);
    const items = item?.individual_tower_plan || [];
    useEffect(() => {
        const onKeyup = (e: any) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        };
        window.addEventListener('keyup', onKeyup, true);
        return () => window.removeEventListener('keyup', onKeyup, true);
    }, [onClose]);

    // const renderLeftArrow = () => {
    //     if (currentIndex > 0) {
    //         return (
    //             <button
    //                 className='arrows arrow-prev'
    //                 onClick={() => setcurrentIndex(currentIndex - 1)}
    //             >
    //                 <Prev />
    //             </button>
    //         );
    //     }
    // };

    // const renderRightArrow = () => {
    //     if (currentIndex < items.length - 1) {
    //         return (
    //             <button
    //                 className='arrows arrow-next'
    //                 onClick={() => setcurrentIndex(currentIndex + 1)}
    //             >
    //                 <Next />
    //             </button>
    //         );
    //     }
    // };

    return (
        <TransformWrapper initialScale={1} centerOnInit={true}>
            {({ resetTransform, zoomIn, zoomOut }) => (
                <div className={`lightbox ${active ? 'active' : ''}`}>
                    <div className='ligbox-header flex items-center justify-between px-4 md:px-10'>
                        <div className='flex items-center'>
                            <span className='tower-name mr-6 font-primary'>
                                {name || item.name}
                            </span>
                            {name ? (
                                <select
                                    className='form-control tower-select font-primary'
                                    value={currentIndex}
                                    onChange={(e) => {
                                        setcurrentIndex(
                                            parseInt(e.target.value, 10)
                                        );
                                        resetTransform();
                                    }}
                                >
                                    {items.map((item: any, index: number) => (
                                        <option value={index} key={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            ) : null}
                        </div>
                        <ul className='tab-list plans-tab-list center flex items-center justify-center py-4'>
                            <li className='tab-list-item plans-tab-list-item mx-4 flex items-center'>
                                <span className='tower-title font-display'>
                                    Tower Plan
                                </span>
                            </li>
                        </ul>
                        <div className='flex'>
                            <div
                                className='zoom zoom-out ml-5'
                                onClick={() => {
                                    zoomOut();
                                }}
                            >
                                <ZoomOut />
                            </div>
                            <div
                                className='zoom zoom-in ml-5'
                                onClick={() => {
                                    zoomIn();
                                }}
                            >
                                <ZoomIn />
                            </div>
                            <div
                                className='close ml-5 flex items-center justify-center'
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onClose();
                                }}
                            >
                                <Image
                                    src='/images/modal-close.png'
                                    alt='close'
                                    width={24}
                                    height={24}
                                    quality={60}
                                    sizes='24px'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='lightbox-main master-lightbox'>
                        <div className='ligbox-body vh pb-14 pt-9'>
                            <div
                                className='view-2d image-mapper flex w-full items-center justify-center'
                                ref={modalEl}
                            >
                                <TransformComponent>
                                    <ReactImage
                                        src={
                                            item?.individual_tower_plan[
                                                currentIndex
                                            ]?.tower_image.url
                                        }
                                        alt={item?.name}
                                        layout='fill'
                                    />
                                </TransformComponent>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </TransformWrapper>
    );
};

export default TowerLightBox;
