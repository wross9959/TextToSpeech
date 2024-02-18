chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "readSelectedText",
        title: "Read Selected Text",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "readSelectedText" && info.selectionText) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: textToSpeechFunction,
            args: [info.selectionText]
        });
    }
});
function textToSpeechFunction(selectedText) {
    let speech = new SpeechSynthesisUtterance(selectedText);
    speech.rate = 1; // Assuming a global rate or you can modify to pass this dynamically
    window.speechSynthesis.speak(speech);
}
