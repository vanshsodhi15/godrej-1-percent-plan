/* eslint-disable @next/next/no-img-element */
import React from 'react';

import View2D from '@/containers/PropertyDetailsPage/View2D';
import View3D from '@/containers/PropertyDetailsPage/View3D';

interface Props {
    tab: any;
    item: any;
    name?: any;
    items?: any;
    onChange?: any;
    selectedIndex?: any;
    zoom?: any;
    setZoom?: any;
}
const LightboxItem = (props: Props) => {
    const { item, tab, name, items, onChange, selectedIndex } = props;

    const renderTabs = () => {
        if (tab === 'View2D') {
            return (
                <View2D
                    item={item}
                    name={name}
                    items={items}
                    onChange={onChange}
                    selectedIndex={selectedIndex}
                />
            );
        }
        if (tab === 'View3D') {
            return (
                <View3D
                    item={item}
                    name={name}
                    items={items}
                    onChange={onChange}
                    selectedIndex={selectedIndex}
                />
            );
        }
    };

    return <>{renderTabs()}</>;
};

export default LightboxItem;
