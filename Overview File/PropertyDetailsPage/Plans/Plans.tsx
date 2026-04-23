/* eslint-disable indent */
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import Title from '@/components/Title';
import FloorPlans from '@/containers/PropertyDetailsPage/FloorPlans';
import MasterPlans from '@/containers/PropertyDetailsPage/MasterPlans';
import TowerLightBox from '@/containers/PropertyDetailsPage/Plans/TowerLightBox';
import PlotConfigSlider from '@/containers/PropertyDetailsPage/PlotConfigSlider/PlotConfigSlider';
import TowerPlan from '@/containers/PropertyDetailsPage/TowerPlan';

import cardVariants, { theObj } from '@/utils/cardVariants';

import Lightbox from './Lightbox';

const Plans = ({
    item,
    yourHome,
    isPlotted,
}: {
    item: any;
    yourHome?: any;
    isPlotted?: boolean;
}) => {
    // Safe data presence checks
    const hasMasterPlan = !!item?.plans?.master_plan_fullscreen;
    const hasTowerPlan = (item?.plans?.tower_plan?.length ?? 0) > 0;
    const hasFloorPlans = (item?.plans?.floor_plans?.length ?? 0) > 0;
    const hasTypology =
        isPlotted && (item?.plot_configurations?.length ?? 0) > 0;

    // Check if any data exists - if not, don't render the section
    const hasAnyData =
        hasMasterPlan || hasTowerPlan || hasFloorPlans || hasTypology;

    // Determine default tab based on available data
    const getDefaultTab = () => {
        // For plotted properties, prioritize typology tab
        if (isPlotted && hasTypology) return 'typology';
        if (hasFloorPlans) return 'unit';
        if (hasTowerPlan) return 'floor';
        if (hasMasterPlan) return 'master';
        if (hasTypology) return 'typology';
        return 'master'; // fallback
    };

    const [tab, setTab] = React.useState(getDefaultTab());
    const [lightBox, setLightBox]: any = useState(null);
    const [masterLightBox, setMasterLightBox] = useState(null);
    const [towerLightBox, setTowerLightBox] = useState(null);

    // All hooks must be called before any early returns
    useEffect(() => {
        if (lightBox) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [lightBox]);

    useEffect(() => {
        if (masterLightBox) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [masterLightBox]);

    useEffect(() => {
        if (towerLightBox) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [towerLightBox]);

    // Don't render if no data exists - must be after all hooks
    if (!hasAnyData) {
        return null;
    }

    const renderTabs = () => {
        if (tab === 'master' && hasMasterPlan) {
            return <MasterPlans setLightBox={setMasterLightBox} item={item} />;
        }
        if (tab === 'floor' && hasTowerPlan) {
            return (
                <TowerPlan setTowerLightBox={setTowerLightBox} item={item} />
            );
        }
        if (tab === 'unit' && hasFloorPlans) {
            return <FloorPlans setLightBox={setLightBox} item={item} />;
        }
        if (tab === 'typology' && hasTypology) {
            return (
                <div className='mt-[20px] md:mt-[28px]'>
                    <PlotConfigSlider
                        plot_configurations={item?.plot_configurations}
                    />
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <motion.section
                className='plans-section pb-[20px] pt-[40px] md:pt-[80px]'
                id='plans'
                {...theObj}
                variants={cardVariants}
            >
                <div className='plans-container container mx-auto flex flex-col'>
                    <Title>Plans</Title>
                    <div className='plans-tab mt-[20px] flex flex-col md:mt-[28px]'>
                        <ul className='tab-list plans-tab-list tab-list-line flex items-center justify-center'>
                            {hasMasterPlan && (
                                <li
                                    className={`tab-list-item ${
                                        yourHome ? 'your-home-plan' : ''
                                    } plans-tab-list-item mx-4 ${
                                        tab == 'master'
                                            ? `active ${
                                                  yourHome ? 'plan-active' : ''
                                              }`
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setTab('master');
                                    }}
                                >
                                    <span>Master Plan</span>
                                </li>
                            )}
                            {hasTowerPlan && (
                                <li
                                    className={`tab-list-item plans-tab-list-item ${
                                        yourHome ? 'your-home-plan' : ''
                                    } mx-4 ${
                                        tab == 'floor'
                                            ? `${
                                                  yourHome ? 'plan-active' : ''
                                              } active`
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setTab('floor');
                                    }}
                                >
                                    <span>Floor Plans</span>
                                </li>
                            )}
                            {hasFloorPlans && (
                                <li
                                    className={`tab-list-item plans-tab-list-item ${
                                        yourHome ? 'your-home-plan' : ''
                                    } mx-4 ${
                                        tab == 'unit'
                                            ? `${
                                                  yourHome ? 'plan-active' : ''
                                              } active`
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setTab('unit');
                                    }}
                                >
                                    <span>Unit Plans</span>
                                </li>
                            )}
                            {hasTypology && (
                                <li
                                    className={`tab-list-item plans-tab-list-item ${
                                        yourHome ? 'your-home-plan' : ''
                                    } mx-4 ${
                                        tab == 'typology'
                                            ? `${
                                                  yourHome ? 'plan-active' : ''
                                              } active`
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setTab('typology');
                                    }}
                                >
                                    <span>Typology</span>
                                </li>
                            )}
                        </ul>
                        {renderTabs()}
                    </div>
                </div>
            </motion.section>
            {lightBox && (
                <Lightbox
                    onClose={() => {
                        setLightBox(null);
                    }}
                    item={lightBox}
                    active={lightBox}
                />
            )}
            {towerLightBox && (
                <TowerLightBox
                    onClose={() => {
                        setTowerLightBox(null);
                    }}
                    item={towerLightBox}
                    active={towerLightBox}
                />
            )}
        </>
    );
};

export default Plans;
