'use client';

import styles from './commits.module.css';
import MetricsPage from '@/components/MetricsPage/MetricsPage';
import { metricsData, pageConfigs } from '@/data/metricsData';

export default function Commits() {
    const config = pageConfigs.commits;
    
    return (
        <MetricsPage
            title={config.title}
            layoutId={config.layoutId}
            data={metricsData.commits}
            iconName={config.iconName}
            styles={styles}
        />
    );
}