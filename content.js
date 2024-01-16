console.log("Content script loaded and running");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.modifiedUrl) {
        navigator.clipboard.writeText(request.modifiedUrl)
            .then(() => console.log("URL copied to clipboard"));
            // Removed the .catch() method
    }
});

document.addEventListener('click', function(event) {
    // Check if the clicked element or any of its parents have a role="button" and include "Share" in their aria-label
    var shareButton = event.target.closest('[role="button"][aria-label*="Share"]');
    if (shareButton) {
        setTimeout(function() {
            navigator.clipboard.readText().then(function(clipboardContent) {
                // Check if clipboard content is a Twitter URL with "x.com"
                if (clipboardContent.includes("x.com")) {
                    const modifiedContent = clipboardContent.replace("x.com", "vxtwitter.com");
                    navigator.clipboard.writeText(modifiedContent).then(function() {
                        console.log("Modified URL copied to clipboard");
                    }).catch(function(err) {
                        console.error("Failed to copy modified URL:", err);
                    });
                }
            }).catch(function(err) {
                console.error("Failed to read clipboard:", err);
            });
        }, 1000); // Delay to allow Twitter's scripts to copy the link first
    }
});

            