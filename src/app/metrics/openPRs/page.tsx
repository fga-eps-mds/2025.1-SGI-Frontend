'use client';

import styles from './openPRs.module.css';
import MetricsPage from '@/components/MetricsPage/MetricsPage';
import { metricsData, pageConfigs } from '@/data/metricsData';

export default function OpenPRs() {
    const config = pageConfigs.openPRs;
    
    return (
        <MetricsPage
            title={config.title}
            layoutId={config.layoutId}
            data={metricsData.openPRs}
            iconName={config.iconName}
            styles={styles}
        />
    );
}