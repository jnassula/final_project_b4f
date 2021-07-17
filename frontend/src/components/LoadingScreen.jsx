import React from 'react';
import styles from '../styles/LoadingScreen.module.css'


function LoadingScreen() {
    return (
        <div className={styles.loading}>
            <img src="../docs/imagens/small_logo_ss.png" alt="loadning logo" />
            <img className={styles.load} src="../docs/imagens/loading.gif" alt="loadning" />
        </div>
    )
}

export default LoadingScreen;