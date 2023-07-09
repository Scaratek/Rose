window.onload = function() {
    var windows = document.querySelectorAll(".window");
    for (var i = 0; i < windows.length; i++) {
        // Window Functionallity
        makeMovable(windows[i]);
        makeResizable(windows[i]);
        makeCloseable(windows[i]);
        makeFullscreen(windows[i]);
    }
};

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
    }

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
        }
    });
}

// logging
console.log(window.document.querySelector(".title-bar"));
console.log(document.getElementById("taskbar-list"));

// Closable Window
function makeCloseable(targetWindow) {
    var closeButton = targetWindow.querySelector(".close-button");

    closeButton.addEventListener("click", function() {
        targetWindow.style.display = "none";
    });
}

window.addEventListener('load', function() {
    var taskbar = document.getElementById("taskbar");

    document.addEventListener("mousemove", function(e) {
        if (e.clientY > window.innerHeight - 50) {
            taskbar.style.display = "block";
        } else {
            taskbar.style.display = "none";
        }
    });

    // Taskbar
    var taskbarList = document.getElementById("taskbar-list");
    var taskbarButton = document.createElement("button");
    taskbarButton.classList.add("taskbar-button");
    taskbarButton.style.border = "2px solid black";
    taskbarButton.style.borderRadius = "50%";
    taskbarButton.setAttribute("id", "taskbar-button-" + targetWindow.id);
    taskbarButton.addEventListener("click", function() {
        if (targetWindow.style.display === "none") {
            targetWindow.style.display = "block";
        }
    });

    taskbarList.appendChild(taskbarButton);
});