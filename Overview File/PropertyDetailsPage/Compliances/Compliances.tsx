import React from 'react';

import Title from '@/components/Title';

import Download from '~/svg/investors/download.svg';

const Compliances = ({ compliance }: { compliance: any }) => {
    return (
        <section
            id='compliance'
            className='container mx-auto py-[40px] !pb-[20px] md:py-[80px]'
        >
            <Title>Compliances</Title>
            <div
                className={`mt-[28px] grid gap-4 lg:mb-0 lg:gap-5
    ${
        compliance?.length === 1
            ? 'grid-cols-1 place-items-center text-center'
            : 'grid-cols-1 sm:grid-cols-2'
    }
  `}
            >
                {compliance?.map((item: any) => {
                    return (
                        <div
                            className={`flex flex-col ${
                                compliance?.length === 1 ? 'items-center' : ''
                            }`}
                            key={item.id}
                        >
                            <a
                                href={item.pdf.url}
                                className='single-list flex !w-fit cursor-pointer items-center'
                            >
                                <div className='icon icon-download mr-4'>
                                    <Download />
                                </div>
                                <span>{item.title}</span>
                            </a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Compliances;
