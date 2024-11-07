// videoResizer.jsx
// This script is your trusty sidekick in the quest to resize MP4 videos to the legendary 16:9 aspect ratio using the mystical powers of Adobe After Effects

// Function to resize a video to 16:9
function resizeTo16x9() {
    // Summon the file dialog to beseech the user for an MP4 file offering
    var file = File.openDialog("Select an MP4 file to resize", "*.mp4", false);
    if (file == null) {
        // If the user dares to cancel the quest, we must retreat with a warning
        alert("No file selected. Exiting script. The resizing adventure is postponed!");
        return;
    }

    // Import the chosen artifact into the grand project realm
    var importOptions = new ImportOptions(file);
    var importedFile = app.project.importFile(importOptions);

    // Forge a new composition with the exact dimensions of the imported artifact
    var comp = app.project.items.addComp(
        importedFile.name, // Name it after the artifact for posterity
        importedFile.width, // Width of the original artifact
        importedFile.height, // Height of the original artifact
        importedFile.pixelAspect, // Maintain the pixel aspect ratio
        importedFile.duration, // Duration of the video saga
        importedFile.frameRate // Frame rate to keep the motion smooth
    );

    // Add the imported artifact to the composition, like placing a jewel in a crown
    var layer = comp.layers.add(importedFile);

    // Calculate the new dimensions to achieve the coveted 16:9 aspect ratio
    var newWidth = comp.width; // Keep the width as is, for it is sacred
    var newHeight = (newWidth / 16) * 9; // The magic formula to transform height

    // Resize the composition to the new 16:9 dimensions, a transformation worthy of legends
    comp.width = newWidth;
    comp.height = newHeight;

    // Adjust the layer scale to fit the new composition size, ensuring it fills the frame like a hero's cape
    var scaleFactor = (newHeight / importedFile.height) * 100; // Calculate the scale factor in percentage
    layer.property("Scale").setValue([scaleFactor, scaleFactor]); // Apply the scale factor to both width and height

    // Announce the successful completion of the resizing quest to the user
    alert("Video has been resized to 16:9 aspect ratio. Your video is now ready to conquer the widescreen realm!");
}

// Embark on the resizing adventure
resizeTo16x9();