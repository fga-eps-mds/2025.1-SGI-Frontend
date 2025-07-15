'use client';

import styles from './PRsclosed.module.css';
import MetricsPage from '@/components/MetricsPage/MetricsPage';
import { metricsData, pageConfigs } from '@/data/metricsData';

export default function PRsclosed() {
    const config = pageConfigs.prsClosed;
    
    return (
        <MetricsPage
            title={config.title}
            layoutId={config.layoutId}
            data={metricsData.prsClosed}
            iconName={config.iconName}
            styles={styles}
        />
    );
}