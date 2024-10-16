const onInitial = async () => {
    const handler = (list) => {
        axios.post('/report', {
            data: list.getEntries();
        })
    };
    const observer = new PerformanceObserver(handler);
    observer.observe({ entryTypes: PerformanceObserver.supportedEntryTypes });
    await axios.post('/report', {
        data: performance.getEntries().map(entry => {
            entry.toJSON();
        })
    });
};
onInitial();
