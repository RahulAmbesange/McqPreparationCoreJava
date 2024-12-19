const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then((webVitals) => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch((err) => {
      console.error('Error loading web-vitals:', err);
    });
  }
};

export default reportWebVitals;
