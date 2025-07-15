'use client';

import styles from './issues.module.css';
import MetricsPage from '@/components/MetricsPage/MetricsPage';
import { metricsData, pageConfigs } from '@/data/metricsData';

export default function Issues() {
    const config = pageConfigs.issues;
    
    return (
        <MetricsPage
            title={config.title}
            layoutId={config.layoutId}
            data={metricsData.issues}
            iconName={config.iconName}
            styles={styles}
        />
    );
}