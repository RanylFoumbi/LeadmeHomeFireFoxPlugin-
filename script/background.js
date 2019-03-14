
/* add listener to browser tab update */
browser.tabs.onUpdated.addListener(tabId =>{
    Initialize(tabId);
});

function Initialize(tabId) {
    browser.pageAction.setIcon({
        tabId: tabId,
        path: "images/icon.png"
    });
    browser.pageAction.setTitle({
        tabId: tabId,
        title: "LeadMeHome"
    });
    browser.pageAction.show(tabId);
    browser.pageAction.setPopup({
        tabId: tabId,
        popup: "home.html"
    });
}