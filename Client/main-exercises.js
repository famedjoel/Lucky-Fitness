document.addEventListener("DOMContentLoaded", () => {
    // Get all expandable boxes
    const expandableBoxes = document.querySelectorAll(".expandable-box");

    // Attach click event listener to each box
    expandableBoxes.forEach(box => {
        box.addEventListener("click", (event) => {
            // Hide all hidden contents
            hideAllHiddenContents();

            // Show the hidden content associated with the clicked box
            const hiddenContent = box.querySelector(".hidden-content");
            if (hiddenContent) {
                hiddenContent.style.display = "block";

                // Add click event listener to the close button
                const closeButton = hiddenContent.querySelector(".tiny-close-button");
                if (closeButton) {
                    closeButton.addEventListener("click", (event) => {
                        event.stopPropagation(); // Prevent the click from reaching the box
                        hiddenContent.style.display = "none";
                    });
                }
            }
        });
    });

    // Hide all hidden contents
    const hideAllHiddenContents = () => {
        const allHiddenContents = document.querySelectorAll(".hidden-content");
        allHiddenContents.forEach(content => {
            content.style.display = "none";
        });
    };
});


