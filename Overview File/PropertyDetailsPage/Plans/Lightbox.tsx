/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import LightboxItem from '@/containers/PropertyDetailsPage/Plans/LightboxItem';

import View2DIcon from '~/svg/property-details/2d-view.svg';
import View3DIcon from '~/svg/property-details/3d-view.svg';
import ZoomIn from '~/svg/property-details/zoom-in.svg';
import ZoomOut from '~/svg/property-details/zoom-out.svg';
interface Props {
    onClose: any;
    active: boolean;
    item: any;
}
const Lightbox = (props: Props) => {
    const { onClose, active, item } = props;
    const { name } = item;
    const [tab, setTab] = useState('View2D');
    const [currentIndex, setcurrentIndex] = useState(0);
    const items = item?.individualFloorPlan || [];
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

    const renderActive = (resetTransform: any) => {
        if (items[currentIndex]) {
            return (
                <LightboxItem
                    item={items[currentIndex]}
                    tab={tab}
                    name={item?.name}
                    items={items}
                    onChange={(index: number) => {
                        setcurrentIndex(index);
                        resetTransform();
                    }}
                    selectedIndex={currentIndex}
                />
            );
        }
    };

    return (
        <TransformWrapper initialScale={1} centerOnInit={true}>
            {({ zoomIn, zoomOut, resetTransform }: any) => (
                <div className={`lightbox active ${active ? 'active' : ''}`}>
                    <div className='ligbox-header flex items-center justify-between px-4 md:px-10'>
                        <div className='flex items-center'>
                            <span className='mr-6 font-primary'>
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
                        <ul className='tab-list center plans-tab-list flex items-center justify-center py-4'>
                            {item.floor_plan_3D?.url ? (
                                <li
                                    className={`tab-list-item plans-tab-list-item mx-4 flex items-center ${
                                        tab == 'View2D' ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        setTab('View2D');
                                    }}
                                >
                                    <div className='icon mr-3'>
                                        <View2DIcon />
                                    </div>
                                    <span className='uppercase'>View2D</span>
                                </li>
                            ) : (
                                <li className='tab-list-item plans-tab-list-item mx-4 flex items-center'>
                                    <span className='tower-title font-display'>
                                        Unit Plan
                                    </span>
                                </li>
                            )}
                            {item.floor_plan_3D?.url ? (
                                <li
                                    className={`tab-list-item plans-tab-list-item mx-4 flex items-center ${
                                        tab == 'View3D' ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        setTab('View3D');
                                    }}
                                >
                                    <div className='icon mr-3'>
                                        <View3DIcon />
                                    </div>
                                    <span className='uppercase'>View3D</span>
                                </li>
                            ) : null}
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
                    <div className='lightbox-main plans-lightbox'>
                        <div className='ligbox-body  pb-14 pt-9'>
                            <div className='lightbox-full-zoom container mx-auto px-4 lg:px-24'>
                                <div className='ligbox-slider flex flex-col'>
                                    {renderActive(resetTransform)}
                                    <ul className='indicator mt-6'>
                                        <li className='active' />
                                        <li />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </TransformWrapper>
    );
};

export default Lightbox;
