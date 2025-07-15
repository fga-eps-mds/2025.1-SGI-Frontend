'use client';

import styles from './PRsdone.module.css';
import MetricsPage from '@/components/MetricsPage/MetricsPage';
import { metricsData, pageConfigs } from '@/data/metricsData';

export default function PRsdone() {
    const config = pageConfigs.prsDone;
    
    return (
        <MetricsPage
            title={config.title}
            layoutId={config.layoutId}
            data={metricsData.prsDone}
            iconName={config.iconName}
            styles={styles}
        />
    );
}