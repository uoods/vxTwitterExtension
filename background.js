chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.includes("twitter.com")) {
        const modifiedUrl = tab.url.replace("twitter.com", "vxtwitter.com");
        chrome.tabs.sendMessage(tab.id, { modifiedUrl: modifiedUrl });
    }
});
