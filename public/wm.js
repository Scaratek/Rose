// Global variable to keep track of opened windows
var openedWindows = [];

// Load Windows and initialize the taskbar when the page loads
window.onload = function() {
    var windows = document.querySelectorAll(".window");
    for (var i = 0; i < windows.length; i++) {
        makeMovable(windows[i]);
        makeResizable(windows[i]);
        makeCloseable(windows[i]);
        makeFullscreen(windows[i]);
        addToTaskbar(windows[i].id);
    };
};

// Function to add a window to the taskbar
function addToTaskbar(windowId) {
    if (!openedWindows.includes(windowId)) {
        openedWindows.push(windowId);
        updateTaskbar();
    }
}

// Function to remove a window from the taskbar
function removeFromTaskbar(windowId) {
    var index = openedWindows.indexOf(windowId);
    if (index !== -1) {
        openedWindows.splice(index, 1);
        updateTaskbar();
    }
}

// Function to update the taskbar element
function updateTaskbar() {
    var taskbarElement = document.getElementById("taskbar");
    taskbarElement.innerHTML = ""; // Clear existing taskbar content

    // Create and add buttons for each opened window
    openedWindows.forEach(function(windowId) {
        var windowButton = document.createElement("div");
        windowButton.textContent = document.getElementById(windowId).querySelector(".title-bar p").textContent;
        windowButton.classList.add("taskbar-button");
        windowButton.addEventListener("click", function() {
            if (document.getElementById(windowId).style.display === "none") {
                document.getElementById(windowId).style.display = "block"; // Re-open the window if it's closed
            }
            focusWindow(windowId);
        });
        taskbarElement.appendChild(windowButton);
    });
}

// Function to focus on a specific window when its button is clicked in the taskbar
function focusWindow(windowId) {
    var windows = document.querySelectorAll(".window");
    for (var i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = "1"; // Lower z-index for all windows
    }
    document.getElementById(windowId).style.zIndex = "999"; // Raise z-index for the clicked window
}

// Movable Window
function makeMovable(window) {
    var titleBar = window.querySelector(".title-bar");
    var initialX, initialY, currentX, currentY;

    titleBar.addEventListener("mousedown", function(e) {
        initialX = e.clientX - window.offsetLeft;
        initialY = e.clientY - window.offsetTop;
        window.style.zIndex = "999";
        document.addEventListener("mousemove", moveWindow);
    });

    function moveWindow(e) {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        window.style.left = currentX + "px";
        window.style.top = currentY + "px";
    };

    document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", moveWindow);
    });
}

// Resizable Window
function makeResizable(window) {
    var handle = document.createElement("div");
    handle.style.position = "absolute";
    handle.style.width = "10px";
    handle.style.height = "10px";
    handle.style.bottom = "0";
    handle.style.right = "0";
    handle.style.cursor = "se-resize";
    window.appendChild(handle);

    var initialWidth, initialHeight, currentWidth, currentHeight;

    handle.addEventListener("mousedown", function(e) {
        initialWidth = window.offsetWidth;
        initialHeight = window.offsetHeight;
        window.style.zIndex = "999";
        document.addEventListener("mousemove", resizeWindow);
    });

    function resizeWindow(e) {
        currentWidth = initialWidth + (e.clientX - initialWidth);
        currentHeight = initialHeight + (e.clientY - initialHeight);
        window.style.width = currentWidth + "px";
        window.style.height = currentHeight + "px";
        resized1.style.width = currentWidth + "px";
        resized1.style.height = currentHeight + "px";
    }

    document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", resizeWindow);
    });
}

// Fullscreen Window
function makeFullscreen(window) {
    var fullscreenButton = window.querySelector(".fullscreen-button");
    var isFullscreen = false;
    var previousStyles = {};

    fullscreenButton.addEventListener("click", function() {
        if (!isFullscreen) {
            previousStyles.width = window.style.width;
            previousStyles.height = window.style.height;
            previousStyles.left = window.style.left;
            previousStyles.top = window.style.top;
            window.style.width = "100%";
            window.style.height = "100%";
            window.style.left = "0";
            window.style.top = "0";
            window.style.bottom = "0";
            isFullscreen = true;
        } else {
            window.style.width = previousStyles.width;
            window.style.height = previousStyles.height;
            window.style.left = previousStyles.left;
            window.style.top = previousStyles.top;
            window.style.bottom = "";
            isFullscreen = false;
        };
    });
};

function makeCloseable(targetWindow) {
    var closeButton = targetWindow.querySelector(".close-button");

    closeButton.addEventListener("click", function() {
        targetWindow.style.display = "none";
    });
};