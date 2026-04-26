/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TransformComponent } from 'react-zoom-pan-pinch';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactImage from '@/components/ReactImage';

// const View2D = ({ item, name, items, onChange, selectedIndex }: any) => {
const View2D = ({ item }: any) => {
    return (
        <div className='view-2d mx-auto w-full'>
            {/* <div className='flex items-center'>
                <span className='mr-6'>{name || item.name}</span>
                {name ? (
                    <select
                        className='form-control'
                        value={selectedIndex}
                        onChange={(e) => {
                            onChange(parseInt(e.target.value, 10));
                        }}
                    >
                        {items.map((item: any, index: number) => (
                            <option value={index} key={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div> */}
            <div className='ligbox-slider'>
                <div className='ligbox-slider-inner flex flex-col'>
                    <div
                        className='zoom-wrapper'
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <TransformComponent>
                            <ReactImage
                                className='slider-image'
                                layout='fill'
                                src={item.floor_plan_2D?.url}
                                alt={`${item.name}-2D`}
                            />
                        </TransformComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View2D;
