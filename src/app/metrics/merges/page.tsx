'use client';

import styles from './merges.module.css';
import MetricsPage from '@/components/MetricsPage/MetricsPage';
import { metricsData, pageConfigs } from '@/data/metricsData';

export default function Merges() {
    const config = pageConfigs.merges;
    
    return (
        <MetricsPage
            title={config.title}
            layoutId={config.layoutId}
            data={metricsData.merges}
            iconName={config.iconName}
            styles={styles}
        />
    );
}