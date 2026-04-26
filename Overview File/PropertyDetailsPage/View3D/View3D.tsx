/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TransformComponent } from 'react-zoom-pan-pinch';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactImage from '@/components/ReactImage';

const View3D = ({ item, name, items, onChange, selectedIndex }: any) => {
    return (
        <div className='view-3d w-100 mx-auto px-20'>
            <div className='flex items-center'>
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
            </div>
            <div className='ligbox-slider mt-6'>
                <div className='ligbox-slider-inner flex flex-col'>
                    <TransformComponent>
                        <ReactImage
                            className='slider-image'
                            layout='fill'
                            // width='100%'
                            src={item.floor_plan_3D?.url}
                            alt={`${item.name}-3D`}
                        />
                    </TransformComponent>
                </div>
            </div>
        </div>
    );
};

export default View3D;
