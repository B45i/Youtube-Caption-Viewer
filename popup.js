const getTranscriptFromContentScript = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
        type: 'getTranscript',
    });
    // do something with response here, not outside the function
    console.log(response);
};

getTranscriptFromContentScript();
